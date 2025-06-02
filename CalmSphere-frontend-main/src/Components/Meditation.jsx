import React, { useEffect, useState } from 'react';

export default function Meditation() {
  const [timeLeft, setTimeLeft] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionType, setSessionType] = useState(null);

  useEffect(() => {
    document.title = 'Meditation';
  }, []);

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      setSessionType(null);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const startTimer = (duration) => {
    setTimeLeft(duration * 60);
    setIsRunning(true);
    setSessionType(duration);
  };

  const renderSessionContent = () => {
    const tips = {
      5: "💡 Tip: If your mind wanders, gently bring your focus back to your breath.",
      10: "💡 Tip: Don’t try to force relaxation. Just be aware and let go of any tension naturally.",
      20: "💡 Tip: Try this before sleep for deep relaxation and better rest."
    };

    const titles = {
      5: "5-Minute Breathing Exercise (Quick Stress Relief)",
      10: "10-Minute Mindfulness Meditation (For Awareness & Relaxation)",
      20: "20-Minute Deep Relaxation (Full-Body Calmness)"
    };

    const descriptions = {
      5: "Purpose: A short breathing technique to reduce stress, improve focus, and calm your mind.",
      10: "Purpose: Helps you stay present, reduce anxiety, and increase mental clarity.",
      20: "Purpose: A deep relaxation exercise that relieves stress, tension, and prepares you for sleep or deep focus."
    };

    const steps = {
      5: [
        "Find a Comfortable Position – Sit or lie down in a quiet place. Keep your back straight but relaxed.",
        "Close Your Eyes & Relax – Gently close your eyes and take a moment to release any tension.",
        "Inhale Slowly (4 Seconds) – Breathe in deeply through your nose, allowing your belly to expand.",
        "Hold Your Breath (2 Seconds) – Pause for a moment, keeping the air in your lungs.",
        "Exhale Gently (6 Seconds) – Slowly breathe out through your mouth, letting go of any tension.",
        "Repeat for 5 Minutes – Continue this rhythmic breathing, focusing only on your breath.",
        "Gently Return – Slowly open your eyes and stretch lightly before resuming your day."
      ],
      10: [
        "Find a Quiet Place – Sit in a comfortable position with a straight back. You can also lie down if preferred.",
        "Close Your Eyes & Breathe Naturally – No need to control your breath, just observe it.",
        "Bring Attention to the Present – Focus on the sensation of your breath entering and leaving your body.",
        "Observe Your Thoughts – If thoughts arise, don’t judge them. Just acknowledge and let them pass.",
        "Focus on the Present Moment – Pay attention to sensations like your heartbeat, body warmth, or sounds around you.",
        "Use a Simple Mantra (Optional) – Repeat a calming word like peace, calm, or relax with each breath.",
        "Gently Return – After 10 minutes, open your eyes, take a deep breath, and slowly return to your surroundings."
      ],
      20: [
        "Find a Comfortable Position – Lie down on your back or sit in a relaxed position.",
        "Close Your Eyes & Breathe Deeply – Take slow, deep breaths to settle into relaxation.",
        "Body Scan Relaxation – Bring attention to different parts of your body:",
        "Visualize a Calm Place – Imagine yourself in a peaceful location (like a beach or forest). Feel the warmth, hear the sounds, and immerse yourself in it.",
        "Let Go of Stress – With each exhale, imagine tension leaving your body.",
        "Stay in This State for 20 Minutes – Let your body completely relax. If your mind wanders, gently bring it back to your breath.",
        "Slowly Wake Up – After 20 minutes, wiggle your fingers and toes, stretch gently, and open your eyes."
      ]
    };

    const bodyScanSteps = [
      "Start with your toes, notice any tension, and relax them.",
      "Move to your feet, then your legs, consciously relaxing each area.",
      "Continue scanning upwards: hips, abdomen, chest, shoulders, arms, hands, neck, and face."
    ];

    if (!sessionType) return null;

    return (
      <div className="session-container">
        <h2 className="session-title">{titles[sessionType]}</h2>
        <p className="session-desc">{descriptions[sessionType]}</p>
        <ul className="session-list">
          {steps[sessionType].map((step, index) => {
            if (step === "Body Scan Relaxation – Bring attention to different parts of your body:") {
              return (
                <li key={index}>
                  {step}
                  <ul className="session-sublist">
                    {bodyScanSteps.map((s, i) => (
                      <li key={`sub-${i}`}>{s}</li>
                    ))}
                  </ul>
                </li>
              );
            }
            return <li key={index}>{step}</li>;
          })}
        </ul>
        <p className="session-tip">{tips[sessionType]}</p>
      </div>
    );
  };

  return (
    <div className="meditation-wrapper">
      <h1 className="meditation-title">Meditation Sessions</h1>
      {timeLeft !== null && (
        <div className="meditation-timer">
          Time Left: {Math.floor(timeLeft / 60)}:{('0' + (timeLeft % 60)).slice(-2)}
        </div>
      )}
      <div className="meditation-cards">
        {[5, 10, 20].map((duration) => (
          <div key={duration} className="meditation-card">
            <h5 className="card-title">{duration}-Minute Breathing</h5>
            <p className="card-desc">{duration} mins</p>
            <button onClick={() => startTimer(duration)} className="card-btn">Play</button>
          </div>
        ))}
      </div>
      {renderSessionContent()}
    </div>
  );
}
