Overview:
Calm Sphere is an AI-powered mental health support system designed to provide emotional assistance and early detection of psychological conditions. It does not offer treatment but aims to guide users toward professional help based on their mental state.

Model Type:
Hybrid Deep Learning Classifier using a Multi-Input Neural Network architecture that combines:

Text Branch: Bidirectional LSTM for analyzing the meaning and context of user-written text.

NLP Features Branch: A dense network that processes manually extracted linguistic features such as sentiment polarity, subjectivity, and part-of-speech statistics.

Fusion:
Outputs from both branches are concatenated and passed through a final dense layer for multi-class classification (Anxiety, Depression, Normal).

Key Features:

Chat-Based Interaction: Users input text describing their feelings or state.
Mental Health Classification: Predicts the likelihood of psychological conditions based on both text and linguistic features.
Probabilistic Feedback: Outputs are presented as probabilities (e.g., 30% Anxiety, 60% Depression).
Non-Diagnostic Support: Encourages users to consult professionals based on predictions.
Early Stopping & Regularization: Applied to avoid overfitting and improve generalization.

Training Insights:

Best performance observed around Epoch 2 or 3.

Validation accuracy peaks early, then slightly declines—indicating potential overfitting.

Recommended techniques: Early stopping, dropout increase, class rebalancing, and class weighting.
