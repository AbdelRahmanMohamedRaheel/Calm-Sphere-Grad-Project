import json
import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.preprocessing.text import tokenizer_from_json
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from textblob import TextBlob
import re
import random
from sentence_transformers import SentenceTransformer, util
import os

class TextPreprocessor:
    def __init__(self):
        for resource in ['punkt', 'stopwords', 'wordnet', 'averaged_perceptron_tagger']:
            try:
                nltk.data.find(resource)
            except LookupError:
                nltk.download(resource)

        self.lemmatizer = WordNetLemmatizer()
        self.stop_words = set(stopwords.words('english'))

    def clean_text(self, text):
        text = text.lower()
        text = re.sub(r'[^a-zA-Z\s]', '', text)
        tokens = word_tokenize(text)
        tokens = [self.lemmatizer.lemmatize(token) for token in tokens if token not in self.stop_words]
        return ' '.join(tokens)

    def extract_nlp_features(self, text):
        blob = TextBlob(text)
        sentiment = blob.sentiment.polarity
        subjectivity = blob.sentiment.subjectivity
        pos_tags = blob.tags
        noun_count = len([tag for word, tag in pos_tags if tag.startswith('NN')])
        verb_count = len([tag for word, tag in pos_tags if tag.startswith('VB')])
        adj_count = len([tag for word, tag in pos_tags if tag.startswith('JJ')])
        return np.array([sentiment, subjectivity, noun_count, verb_count, adj_count])


class MentalHealthPredictor:
    def __init__(self, model_path='mental_health_model.h5', tokenizer_path='tokenizer.json',
                 label_encoder_path='label_encoder_classes.npy', max_len=100):

        self.preprocessor = TextPreprocessor()
        self.model = tf.keras.models.load_model(model_path)

        with open(tokenizer_path, 'r') as f:
            tokenizer_json = f.read()
        self.tokenizer = tokenizer_from_json(tokenizer_json)
        self.label_classes = np.load(label_encoder_path)
        self.max_len = max_len

        with open('supportive_resources.json', 'r') as f:
            self.resources = json.load(f)

        self.dataset_path = 'mental_health_dataset.json'
        if os.path.exists(self.dataset_path):
            with open(self.dataset_path, 'r', encoding='utf-8') as f:
                raw_data = json.load(f)
            self.responses = [{'input': d.get('prompt', d.get('input')), 'response': d['response']} for d in raw_data]
        else:
            self.responses = []

        self.semantic_model = SentenceTransformer('all-MiniLM-L6-v2')
        self._prepare_dataset_embeddings()

        self.last_bot_message = None
        self.conversation_history = []
        self.context_memory = []
        self.therapist_mode = True
        self.recent_inputs = []

    def _prepare_dataset_embeddings(self):
        if self.responses:
            self.dataset_embeddings = self.semantic_model.encode(
                [entry['input'] for entry in self.responses],
                convert_to_tensor=True
            )
        else:
            self.dataset_embeddings = None

    def save_new_entry(self, user_input, bot_response):
        new_entry = {'input': user_input, 'response': bot_response}
        self.responses.append(new_entry)
        with open(self.dataset_path, 'w', encoding='utf-8') as f:
            json.dump(self.responses, f, indent=4, ensure_ascii=False)
        self._prepare_dataset_embeddings()

    def is_yes_intent(self, text):
        return text.strip().lower() in ["yes", "yeah", "yup", "sure", "okay", "ok", "of course", "definitely"]

    def is_no_intent(self, text):
        return text.strip().lower() in ["no", "nah", "nope", "not really", "never"]

    def handle_simple_intent(self, text):
        if self.is_yes_intent(text):
            if self.last_bot_message and "Would you like" in self.last_bot_message:
                return "Great! Let's explore it together. Take your time to share whatever you feel."
            return "I'm glad you're open to this. Let's continue when you're ready."
        elif self.is_no_intent(text):
            return "That's completely okay. We can talk about whatever you feel comfortable with."
        return None

    def is_follow_up(self, text):
        follow_up_starters = ["what", "how", "can you", "why", "could you", "tell me"]
        return any(text.lower().startswith(kw) for kw in follow_up_starters)

    def find_similar_dataset_response(self, user_input, threshold=0.7):
        if not self.responses or self.dataset_embeddings is None:
            return None
        input_embedding = self.semantic_model.encode(user_input, convert_to_tensor=True)
        cosine_scores = util.cos_sim(input_embedding, self.dataset_embeddings)[0]
        best_score_idx = int(cosine_scores.argmax())
        best_score = float(cosine_scores[best_score_idx])
        if best_score >= threshold:
            return self.responses[best_score_idx]['response']
        return None

    def generate_therapeutic_followup(self):
        if not self.context_memory:
            return None
        emotions = [entry['emotion'] for entry in self.context_memory]
        common_emotion = max(set(emotions), key=emotions.count)
        followups = {
            'Anxiety': "You've shared some anxiety-related thoughts. Would you like to talk about what's been making you feel anxious?",
            'Depression': "You've described a few situations that sound really heavy. Can we explore what’s been weighing on you lately?",
            'Stress': "Stress seems to come up often. What's been the biggest stressor for you recently?"
        }
        return followups.get(common_emotion)

    def ask_open_ended_question(self):
        return random.choice([
            "What's been on your mind lately?",
            "Would you like to share a bit more about that feeling?",
            "What do you think is contributing most to how you're feeling?"
        ])

    def get_response(self, emotional_state, user_input, sentiment_score):
        simple_response = self.handle_simple_intent(user_input)
        if simple_response:
            return simple_response

        dataset_response = self.find_similar_dataset_response(user_input)
        if dataset_response:
            return dataset_response

        emotion_responses = {
            'Anxiety': "It seems like you're feeling anxious.",
            'Depression': "That sounds emotionally heavy.",
            'Stress': "It looks like you're under pressure."
        }

        response = emotion_responses.get(emotional_state, "I'm here to support you.")

        if self.therapist_mode:
            follow_up = self.generate_therapeutic_followup()
            if follow_up:
                response += f" {follow_up}"
            else:
                response += f" {self.ask_open_ended_question()}"

        return response

    def predict(self, text):
        try:
            # Store input history
            self.recent_inputs.append(text)
            if len(self.recent_inputs) > 3:
                self.recent_inputs.pop(0)

            # Use previous input if current is a follow-up
            if self.is_follow_up(text) and len(self.recent_inputs) >= 2:
                combined_text = self.recent_inputs[-2] + " " + text
            else:
                combined_text = text

            cleaned_text = self.preprocessor.clean_text(combined_text)
            nlp_features = self.preprocessor.extract_nlp_features(combined_text)
            sequence = self.tokenizer.texts_to_sequences([cleaned_text])
            padded = pad_sequences(sequence, maxlen=self.max_len)
            prediction = self.model.predict([padded, nlp_features.reshape(1, -1)])
            predicted_class = self.label_classes[prediction.argmax()]
            confidence = float(prediction.max())

            response = self.get_response(predicted_class, combined_text, nlp_features[0])

            if not self.find_similar_dataset_response(combined_text):
                self.save_new_entry(combined_text, response)

            self.last_bot_message = response
            self.conversation_history.append({'user': text, 'bot': response})
            self.context_memory.append({
                'text': text,
                'emotion': predicted_class,
                'sentiment': nlp_features[0]
            })

            return {
                'predicted_class': predicted_class,
                'confidence': confidence,
                'response': response,
                'supportive_resources': self.resources.get(predicted_class, [])[:3],
                'sentiment': nlp_features[0]
            }

        except Exception as e:
            return {"error": str(e)}


def main():
    try:
        predictor = MentalHealthPredictor()
        test_inputs = [
            "I can't speak in group conversations.",
            "what this steps to avoid this problem",
            "Every day feels heavy and grey.",
            "How can I feel better?",
            "yes",
            "no"
        ]

        for text in test_inputs:
            print(f"\nInput: {text}")
            result = predictor.predict(text)

            if 'error' in result:
                print(result['error'])
            else:
                print(f"Emotional State: {result['predicted_class']}")
                print(f"Confidence: {result['confidence']:.2f}")
                print(f"Sentiment Score: {result['sentiment']:.2f}")
                print(f"Response: {result['response']}")
                print("Supportive Resources:")
                for resource in result['supportive_resources']:
                    print(f"- {resource}")

    except Exception as e:
        print(f"Error in main: {str(e)}")


if __name__ == "__main__":
    main()