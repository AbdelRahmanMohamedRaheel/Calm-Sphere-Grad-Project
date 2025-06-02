import json
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import confusion_matrix, classification_report
import tensorflow as tf
from sklearn.metrics import confusion_matrix, classification_report, roc_auc_score, roc_curve, log_loss
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Embedding, SpatialDropout1D, Bidirectional
from tensorflow.keras.callbacks import EarlyStopping
import matplotlib.pyplot as plt
import seaborn as sns
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from textblob import TextBlob
import re
from collections import Counter
from wordcloud import WordCloud

# Download required NLTK data
nltk.download('punkt')
nltk.download('stopwords')
nltk.download('wordnet')
nltk.download('averaged_perceptron_tagger')
nltk.download('averaged_perceptron_tagger_eng')
class TextPreprocessor:
    def __init__(self):
        self.lemmatizer = WordNetLemmatizer()
        self.stop_words = set(stopwords.words('english'))
    
    def clean_text(self, text):
        if not isinstance(text, str):
            text = str(text)
        # Convert to lowercase
        text = text.lower()
        
        # Remove special characters and numbers
        text = re.sub(r'[^a-zA-Z\s]', '', text)
        
        # Tokenize
        tokens = word_tokenize(text)
        
        # Remove stop words and lemmatize
        tokens = [self.lemmatizer.lemmatize(token) for token in tokens 
                 if token not in self.stop_words]
        
        return ' '.join(tokens)
    
    def extract_nlp_features(self, text):
        if not isinstance(text, str):
            text = str(text)
        # Perform sentiment analysis
        blob = TextBlob(text)
        sentiment = blob.sentiment.polarity
        subjectivity = blob.sentiment.subjectivity
        
        # Get POS tags
        pos_tags = blob.tags
        
        # Count different types of words
        noun_count = len([tag for word, tag in pos_tags if tag.startswith('NN')])
        verb_count = len([tag for word, tag in pos_tags if tag.startswith('VB')])
        adj_count = len([tag for word, tag in pos_tags if tag.startswith('JJ')])
        
        return {
            'sentiment': sentiment,
            'subjectivity': subjectivity,
            'noun_count': noun_count,
            'verb_count': verb_count,
            'adj_count': adj_count
        }

class ConfusionMatrixCallback(tf.keras.callbacks.Callback):
    def __init__(self, X_val, y_val, label_encoder):
        self.X_val = X_val
        self.y_val = y_val
        self.label_encoder = label_encoder
        self.final_y_pred = None  # Store final prediction

    def on_epoch_end(self, epoch, logs={}):
        y_pred = np.argmax(self.model.predict(self.X_val), axis=-1)
        self.final_y_pred = y_pred
        
        cm = confusion_matrix(self.y_val, y_pred)
        plt.figure(figsize=(10,8))
        sns.heatmap(cm, annot=True, fmt='d', cmap='Blues',
                   xticklabels=self.label_encoder.classes_,
                   yticklabels=self.label_encoder.classes_)
        plt.title(f'Confusion Matrix - Epoch {epoch+1}')
        plt.ylabel('True Label')
        plt.xlabel('Predicted Label')
        plt.savefig(f'confusion_matrix_epoch_{epoch+1}.png')
        plt.close()


def plot_training_history(history):
    plt.figure(figsize=(12,4))
    
    epochs = range(1, len(history.history['accuracy']) + 1)
    
    plt.subplot(1,2,1)
    plt.plot(epochs, history.history['accuracy'], label='Training Accuracy')
    plt.plot(epochs, history.history['val_accuracy'], label='Validation Accuracy')
    plt.title('Model Accuracy')
    plt.xlabel('Epoch')
    plt.ylabel('Accuracy')
    plt.legend()
    
    plt.subplot(1,2,2)
    plt.plot(epochs, history.history['loss'], label='Training Loss')
    plt.plot(epochs, history.history['val_loss'], label='Validation Loss')
    plt.title('Model Loss')
    plt.xlabel('Epoch')
    plt.ylabel('Loss')
    plt.legend()
    
    plt.tight_layout()
    plt.savefig('training_history.png')
    plt.close()


def evaluate_model(model, X_val, y_val, label_encoder):
    y_pred_proba = model.predict(X_val)
    y_pred = np.argmax(y_pred_proba, axis=-1)

    # Confusion Matrix
    cm = confusion_matrix(y_val, y_pred)
    plt.figure(figsize=(10,8))
    sns.heatmap(cm, annot=True, fmt='d', cmap='Blues',
               xticklabels=label_encoder.classes_,
               yticklabels=label_encoder.classes_)
    plt.title('Final Confusion Matrix')
    plt.ylabel('True Label')
    plt.xlabel('Predicted Label')
    plt.savefig('final_confusion_matrix.png')
    plt.close()
    print("Final Confusion Matrix:\n", cm)

    # Classification Report
    print("\nClassification Report:")
    print(classification_report(y_val, y_pred, target_names=label_encoder.classes_))

    # ROC Curve and AUC (for binary or one-vs-rest)
    try:
        if y_pred_proba.shape[1] == 2:
            fpr, tpr, _ = roc_curve(y_val, y_pred_proba[:, 1])
            auc_score = roc_auc_score(y_val, y_pred_proba[:, 1])
        else:
            # One-vs-rest for multiclass
            from sklearn.preprocessing import label_binarize
            y_val_bin = label_binarize(y_val, classes=range(len(label_encoder.classes_)))
            fpr, tpr, _ = roc_curve(y_val_bin.ravel(), y_pred_proba.ravel())
            auc_score = roc_auc_score(y_val_bin, y_pred_proba, multi_class='ovr')

        plt.figure()
        plt.plot(fpr, tpr, label=f'AUC = {auc_score:.2f}')
        plt.plot([0, 1], [0, 1], 'k--')
        plt.xlabel('False Positive Rate')
        plt.ylabel('True Positive Rate')
        plt.title('ROC Curve')
        plt.legend(loc='lower right')
        plt.savefig('roc_curve.png')
        plt.close()
        print(f"\nAUC Score: {auc_score:.4f}")
    except Exception as e:
        print("\nROC Curve could not be generated:", str(e))

    # Log Loss / Cross-Entropy
    try:
        loss = log_loss(y_val, y_pred_proba)
        print(f"\nLog Loss (Cross-Entropy): {loss:.4f}")
    except Exception as e:
        print("\nLog Loss could not be calculated:", str(e))


def load_and_preprocess_data():
    # Initialize preprocessor
    preprocessor = TextPreprocessor()
    
    print("Loading CSV data...")
    # Try different encodings
    encodings = ['utf-8', 'latin1', 'cp1252']
    df = None
    for encoding in encodings:
        try:
            df = pd.read_csv('Calm_Sphere.csv', encoding=encoding)
            print(f"Successfully read CSV with {encoding} encoding")
            break
        except UnicodeDecodeError:
            continue
    
    if df is None:
        raise Exception("Failed to read CSV file with any encoding")
    
    print("Loading JSON dataset...")
    # Load JSON dataset
    with open('mental_health_dataset.json', 'r', encoding='utf-8') as f:
        json_data = json.load(f)
    
    # Extract English conversations from JSON
    statements = [item['input'] for item in json_data]
    
    # Combine with CSV data
    all_statements = list(df['statement']) + statements
    
    print("Preprocessing texts...")
    # Preprocess texts
    processed_texts = []
    nlp_features = []
    
    for text in all_statements:
        # Clean text
        cleaned_text = preprocessor.clean_text(text)
        processed_texts.append(cleaned_text)
        
        # Extract NLP features
        features = preprocessor.extract_nlp_features(text)
        nlp_features.append(list(features.values()))
    
    # Convert NLP features to numpy array
    nlp_features = np.array(nlp_features)
    
    # Create labels (for CSV data only)
    labels = list(df['status'])
    if len(labels) > len(processed_texts):
        labels = labels[:len(processed_texts)]
    elif len(labels) < len(processed_texts):
        processed_texts = processed_texts[:len(labels)]
        nlp_features = nlp_features[:len(labels)]
    
    print(f"Processed texts length: {len(processed_texts)}")
    print(f"NLP features length: {len(nlp_features)}")
    print(f"Labels length: {len(labels)}")
    
    return processed_texts, nlp_features, labels

def create_model(max_words, max_len, embedding_dim, num_classes, nlp_features_dim):
    # Text input branch
    text_input = tf.keras.Input(shape=(max_len,))
    embedding = Embedding(max_words, embedding_dim)(text_input)
    spatial_dropout = SpatialDropout1D(0.2)(embedding)
    lstm = Bidirectional(LSTM(100, dropout=0.2, recurrent_dropout=0.2))(spatial_dropout)
    
    # NLP features branch
    nlp_input = tf.keras.Input(shape=(nlp_features_dim,))
    nlp_dense = Dense(32, activation='relu')(nlp_input)
    
    # Combine branches
    combined = tf.keras.layers.concatenate([lstm, nlp_dense])
    dense1 = Dense(64, activation='relu')(combined)
    output = Dense(num_classes, activation='softmax')(dense1)
    
    # Create model
    model = tf.keras.Model(inputs=[text_input, nlp_input], outputs=output)
    
    model.compile(
        optimizer='adam',
        loss='sparse_categorical_crossentropy',
        metrics=['accuracy']
    )
    
    return model

   

def main():
    # Parameters
    MAX_WORDS = 5000
    MAX_LEN = 100
    EMBEDDING_DIM = 100
    VALIDATION_SPLIT = 0.2
    EPOCHS = 8
    BATCH_SIZE = 32

    print("Loading and preprocessing data...")
    texts, nlp_features, labels = load_and_preprocess_data()

    print("Tokenizing texts...")
    tokenizer = Tokenizer(num_words=MAX_WORDS)
    tokenizer.fit_on_texts(texts)
    sequences = tokenizer.texts_to_sequences(texts)
    X_text = pad_sequences(sequences, maxlen=MAX_LEN)

    print("Encoding labels...")
    label_encoder = LabelEncoder()
    y = label_encoder.fit_transform(labels)

    print("Splitting data...")
    X_text_train, X_text_test, X_nlp_train, X_nlp_test, y_train, y_test = train_test_split(
        X_text, nlp_features, y, test_size=VALIDATION_SPLIT, random_state=42
    )

    print("Creating model...")
    model = create_model(
        MAX_WORDS, 
        MAX_LEN, 
        EMBEDDING_DIM, 
        len(set(y)), 
        nlp_features.shape[1]
    )

    # Callbacks
    early_stopping = EarlyStopping(
        monitor='val_loss',
        patience=3,
        restore_best_weights=True
    )

    confusion_matrix_callback = ConfusionMatrixCallback(
        [X_text_test, X_nlp_test], 
        y_test, 
        label_encoder
    )

    print("Training model...")
    history = model.fit(
        [X_text_train, X_nlp_train],
        y_train,
        epochs=EPOCHS,
        batch_size=BATCH_SIZE,
        validation_data=([X_text_test, X_nlp_test], y_test),
        callbacks=[early_stopping, confusion_matrix_callback]
    )

    # Plot training history
    plot_training_history(history)

    # Evaluate model using full performance metrics
    print("\nEvaluating model...")
    evaluate_model(model, [X_text_test, X_nlp_test], y_test, label_encoder)

    # Save model and tokenizer
    print("\nSaving model and tokenizer...")
    model.save('mental_health_model.h5')

    tokenizer_json = tokenizer.to_json()
    with open('tokenizer.json', 'w', encoding='utf-8') as f:
        f.write(tokenizer_json)

    np.save('label_encoder_classes.npy', label_encoder.classes_)

if __name__ == "__main__":
    main()
