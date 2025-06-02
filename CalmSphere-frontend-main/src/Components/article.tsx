import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


export default function Article() {
  const [activeCategory, setActiveCategory] = useState("all");

  const allArticles = [
    { id: 1, title: "Science Says the Best Way to Score a Date Is Your Manicure Color—No, Really", author: "Reviewed by Sabrina Romanoff, PsyD", image: "/photo1.webp", category: "Behavioral Psychology" },
    { id: 2, title: "The Fiedler Contingency Model: Matching Leadership Style to the Situation", author: "By Cynthia Vinney, PhD", image: "/photo2.webp", category: "Social Psychology" },
    { id: 3, title: "Science Says the Best Way to Score a Date Is Your Manicure Color—No, Really", author: "Reviewed by Sabrina Romanoff, PsyD", image: "/photo3.webp", category: "Behavioral Psychology" },
    { id: 4, title: "How to Spot and Avoid the Slippery Slope Fallacy in Everyday Conversations", author: "Reviewed by Sabrina Romanoff, PsyD", image: "/photo4.webp", category: "Anxiety" },
    { id: 5, title: "Taking a Closer Look at Sexual Sadism", author: "Medically reviewed by Rachel Goldman, PhD, FTOS", image: "/photo5.webp", category: "Depression" },
    { id: 6, title: "Critical Period in Brain Development: Definition, Importance", author: "By Toketemu Ohwovoriole", image: "/photo6.webp", category: "Behavioral Psychology" },
    { id: 7, title: "Understanding the Biopsychosocial Model of Health and Wellness", author: "Medically reviewed by Steven Gans, MD", image: "/photo7.webp", category: "Anxiety" },
    { id: 8, title: "How the Madonna-Whore Complex Affects Men's and Women's Mental Health", author: "Reviewed by Ivy Kwong, LMFT", image: "/photo8.webp", category: "Depression" },
    { id: 9, title: "Autonomy in Psychology—What It Means and How to Be More Autonomous", author: "Reviewed by Daniel B. Block, MD", image: "/photo9.webp", category: "Behavioral Psychology" },
    { id: 10, title: "Ethnocentrism in Psychology: Definitions, Examples, and How to Combat Biases", author: "Reviewed by Akeem Marsh, MD", image: "/photo10.webp", category: "Social Psychology" },
    { id: 11, title: "Understanding Cultural Relativism and Its Importance", author: "Reviewed by Akeem Marsh, MD", image: "/photo11.webp", category: "Anxiety" },
    { id: 12, title: "Information Processing Theory in Psychology", author: "Reviewed by Daniel B. Block, MD", image: "/photo12.webp", category: "Depression" },
    { id: 13, title: "Temperaments: Which of the 4 Types Are You?", author: "Reviewed by Sabrina Romanoff, PsyD", image: "/photo13.webp", category: "Behavioral Psychology" },
    { id: 14, title: "What Is Objective Morality?", author: "Reviewed by Ivy Kwong, LMFT", image: "/photo14.webp", category: "Social Psychology" },
    { id: 15, title: "Daddy Issues: Psychology, Causes, Signs, Treatment", author: "Reviewed by Daniel B. Block, MD", image: "/photo15.webp", category: "Anxiety" },
    { id: 16, title: "What Is Reaction Formation?", author: "Reviewed by Rachel Goldman, PhD, FTOS", image: "/photo16.webp", category: "Depression" },
    { id: 17, title: "What to Know About The Uncanny Valley", author: "Fact checked by Cara Lustik", image: "/photo17.webp", category: "Behavioral Psychology" },
    { id: 18, title: "Dependent Personality Disorder Signs and Symptoms", author: "Medically reviewed by Daniel B. Block, MD", image: "/photo18.webp", category: "Social Psychology" },
  ];

  const categorizedArticles = {
    all: allArticles,
    "Behavioral Psychology": allArticles.filter(article => article.category === "Behavioral Psychology").slice(0, 6),
    "Social Psychology": allArticles.filter(article => article.category === "Social Psychology").slice(0, 6),
    Anxiety: allArticles.filter(article => article.category === "Anxiety").slice(0, 6),
    Depression: allArticles.filter(article => article.category === "Depression").slice(0, 6),
  };

  useEffect(() => {
    document.title = "Awareness & Tips";
  }, []);

  return (
    <div className="article-container">
      <div className="header">
        <p className="category">PSYCHOLOGY</p>
        <h1 className="title">Explore Theories of Mental Health</h1>
      </div>
      <div className="button-group">
        <button
          className={`category-btn ${activeCategory === "all" ? "active" : ""}`}
          onClick={() => setActiveCategory("all")}
        >
          All
        </button>
        <button
          className={`category-btn ${activeCategory === "Behavioral Psychology" ? "active" : ""}`}
          onClick={() => setActiveCategory("Behavioral Psychology")}
        >
          Behavioral Psychology
        </button>
        <button
          className={`category-btn ${activeCategory === "Social Psychology" ? "active" : ""}`}
          onClick={() => setActiveCategory("Social Psychology")}
        >
          Social Psychology
        </button>
        <button
          className={`category-btn ${activeCategory === "Anxiety" ? "active" : ""}`}
          onClick={() => setActiveCategory("Anxiety")}
        >
          Anxiety
        </button>
        <button
          className={`category-btn ${activeCategory === "Depression" ? "active" : ""}`}
          onClick={() => setActiveCategory("Depression")}
        >
          Depression
        </button>
      </div>
      <div className="article-grid">
        {categorizedArticles[activeCategory].map((article) => (
          <Link to={`/theory${article.id}`} key={article.id} className="article-card">
            <div className="card-image">
              <img src={article.image} alt={article.title} />
            </div>
            <div className="card-content">
              <p className="tag">THEORIES</p>
              <h5 className="card-title">{article.title}</h5>
              <p className="card-author">{article.author}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}