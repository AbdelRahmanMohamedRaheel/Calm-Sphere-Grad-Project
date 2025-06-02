import React from 'react';

export default function Card1() {
  return (
    <div className="card1-container mb-5">
      <div className="card1-article">
        <p className="card1-tag">Theories</p>
        <h1 className="card1-title">Science Says the Best Way to Score a Date Is Your Manicure Color—No, Really</h1>
        <div className="card1-image-wrapper">
          <img className="card1-image" src="/photo1.webp" alt="Red Nails" />
        </div>
        <div className="card1-prose">
          <p className="card1-paragraph">
            Throw away all of the dating advice you’ve ever received. Why? Because, apparently all you need to score a date is to paint your nails red.
          </p>
          <p className="card1-paragraph">
            If you’re someone whose morning routine consists of doomscrolling through TikTok for an hour...
          </p>
          {/* Add the rest of the paragraphs similarly with className="card1-paragraph" */}

          <h2 className="card1-subtitle">Understanding the Red Nail Theory</h2>
          <p className="card1-paragraph">
            The red nail theory, simply, “suggests that men are more attracted to women who wear red nail polish,” says Dr. Melissa Cook...
          </p>

          <h2 className="card1-subtitle">Red Color Psychology</h2>
          <p className="card1-paragraph">
            Culturally, red is linked with power, seduction, and femininity, adds Dr. Cook...
          </p>

          <h2 className="card1-subtitle">Science (and Personal Experiences!) Say the Red Nail Theory Is Legit</h2>
          <p className="card1-paragraph">
            So if you thought the red nail theory was a fluke, research shows that it’s quite legit...
          </p>

          <h2 className="card1-subtitle">How to Test Out the Red Nail Theory</h2>
          <p className="card1-paragraph">
            So, you want to test out the red nail theory? Apart from science saying a red manicure will make you instantly more attractive...
          </p>

          <h2 className="card1-subtitle">Keep in Mind</h2>
          <p className="card1-paragraph">
            Despite countless research pointing to the validity of the red nail theory, the idea isn’t without its fair share of hiccups.
          </p>

          <h2 className="card1-subtitle">The Red Nail Theory Has Its Limitations</h2>
          <p className="card1-paragraph">
            Moreover, the red nail theory simplifies attraction, says Dr. Cook...
          </p>
        </div>
      </div>
    </div>
  );
}
