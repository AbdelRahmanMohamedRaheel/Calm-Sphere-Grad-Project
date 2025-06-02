from flask import Flask, request, jsonify
from predict import MentalHealthPredictor
import traceback
from flask_cors import CORS
import os
import logging

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[logging.StreamHandler()]
)
logger = logging.getLogger(__name__)

app = Flask(__name__)
# Enable CORS for React frontend on localhost:3000 (optional with proxy, but good for fallback)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000",}})

predictor = None

def get_emoji_for_emotion(emotion, sentiment):
    """Return appropriate emoji based on emotion and sentiment"""
    emoji_map = {
        'Anxiety': '😟' if sentiment < 0 else '😌',
        'Depression': '😢' if sentiment < 0 else '🌤',
        'Normal' : '😀' if sentiment == 0 else '😀' ,
        'Study Tips': '📚',
    }
    return emoji_map.get(emotion, '🤔')

def format_response(prediction_result):
    """Format the prediction result for display"""
    emotion = prediction_result['predicted_class']
    sentiment = prediction_result['sentiment']
    confidence = prediction_result['confidence']
    
    emoji = get_emoji_for_emotion(emotion, sentiment)
    confidence_pct = f"{confidence * 100:.1f}%"
    sentiment_desc = "negative" if sentiment < -0.2 else "positive" if sentiment > 0.2 else "neutral"
    
    return {
        'response': prediction_result['response'],
        'emotion': {
            'label': emotion,
            'emoji': emoji,
            'confidence': confidence_pct
        },
        'sentiment': {
            'score': sentiment,
            'description': sentiment_desc
        },
        'resources': prediction_result['supportive_resources']
    }

@app.route('/api/chat', methods=['POST'])
def chat():
    global predictor
    
    try:
        if predictor is None:
            logger.info("Initializing MentalHealthPredictor")
            predictor = MentalHealthPredictor()
        
        data = request.json
        user_input = data.get('message', '').strip()
        
        if not user_input:
            logger.warning("No message provided in request")
            return jsonify({'error': 'No message provided'}), 400
        
        logger.info(f"Received message: {user_input}")
        prediction = predictor.predict(user_input)
        formatted_response = format_response(prediction)
        logger.info(f"Prediction result: {formatted_response}")
        
        return jsonify(formatted_response)
    except Exception as e:
        error_trace = traceback.format_exc()
        logger.error(f"Error in chat endpoint: {error_trace}")
        return jsonify({'error': 'An error occurred', 'message': str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    try:
        if predictor is None:
            logger.info("Initializing MentalHealthPredictor for health check")
            predictor = MentalHealthPredictor()
        
        test_result = predictor.predict("test message")
        logger.info("Health check passed")
        return jsonify({'status': 'healthy', 'model_loaded': True})
    except Exception as e:
        logger.error(f"Health check failed: {str(e)}")
        return jsonify({'status': 'unhealthy', 'error': str(e)}), 500

if __name__ == '__main__':
    debug_mode = os.getenv('FLASK_ENV', 'development') == 'development'
    app.run(debug=debug_mode, host='0.0.0.0', port=5000)  # Changed to port 8000