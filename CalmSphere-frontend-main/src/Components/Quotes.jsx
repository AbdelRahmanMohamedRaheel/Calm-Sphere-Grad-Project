import React, { useState } from "react";
import { motion } from "framer-motion";

const quotes = [
    {
        text: "Mental health is not a destination, but a process. It's about how you drive, not where you're going.",
        author: "Noam Shpancer",
    },
    {
        text: "The greatest discovery of my generation is that a human being can alter his life by altering his attitudes.",
        author: "William James",
    },
    {
        text: "What mental health needs is more sunlight, more candor, and more unashamed conversation.",
        author: "Glenn Close",
    },
    {
        text: "Happiness can be found even in the darkest of times, if one only remembers to turn on the light.",
        author: "Albus Dumbledore (J.K. Rowling)",
    },
    {
        text: "The good life is a process, not a state of being. It is a direction, not a destination.",
        author: "Carl Rogers",
    },
    {
        text: "You don’t have to control your thoughts. You just have to stop letting them control you.",
        author: "Dan Millman",
    },
    {
        text: "It’s up to you today to start making healthy choices. Not choices that are just healthy for your body, but healthy for your mind.",
        author: "Steve Maraboli",
    },
    {
        text: "Self-care is how you take your power back.",
        author: "Lalah Delia",
    },
    {
        text: "Your mental health is a priority. Your happiness is essential. Your self-care is a necessity.",
        author: "Unknown",
    },
    {
        text: "Healing takes time, and asking for help is a courageous step.",
        author: "Mariska Hargitay",
    },
    {
        text: "The only journey is the journey within.",
        author: "Rainer Maria Rilke",
    },
    {
        text: "You are not a drop in the ocean. You are the entire ocean in a drop.",
        author: "Rumi",
    },
    {
        text: "The soul usually knows what to do to heal itself. The challenge is to silence the mind.",
        author: "Caroline Myss",
    },
    {
        text: "Mental health…is not a destination, but a process. It’s about how you drive, not where you’re going.",
        author: "Noam Shpancer",
    },
    {
        text: "You don’t have to be positive all the time. It’s perfectly okay to feel sad, angry, annoyed, frustrated, scared, or anxious. Having feelings doesn’t make you a negative person. It makes you human.",
        author: "Lori Deschene",
    },
    {
        text: "The only way to make sense out of change is to plunge into it, move with it, and join the dance.",
        author: "Alan Watts",
    },
    {
        text: "Out of suffering have emerged the strongest souls; the most massive characters are seared with scars.",
        author: "Khalil Gibran",
    },
    {
        text: "The wound is the place where the light enters you.",
        author: "Rumi",
    },
    {
        text: "You are allowed to be both a masterpiece and a work in progress simultaneously.",
        author: "Sophia Bush",
    },
    {
        text: "The only way to do great work is to love what you do.",
        author: "Steve Jobs",
    },
    {
        text: "Your present circumstances don’t determine where you can go; they merely determine where you start.",
        author: "Nido Qubein",
    },
    {
        text: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
        author: "Nelson Mandela",
    },
    {
        text: "The mind is everything. What you think you become.",
        author: "Buddha",
    },
    {
        text: "You are enough just as you are.",
        author: "Unknown",
    },
    {
        text: "The only limit to our realization of tomorrow is our doubts of today.",
        author: "Franklin D. Roosevelt",
    },
    {
        text: "You are never too old to set another goal or to dream a new dream.",
        author: "C.S. Lewis",
    },
    {
        text: "The best way to predict the future is to create it.",
        author: "Peter Drucker",
    },
    {
        text: "The only person you are destined to become is the person you decide to be.",
        author: "Ralph Waldo Emerson",
    },
    {
        text: "Believe you can and you’re halfway there.",
        author: "Theodore Roosevelt",
    },
    {
        text: "Happiness is not something ready-made. It comes from your own actions.",
        author: "Dalai Lama",
    },
    {
        text: "The greatest weapon against stress is our ability to choose one thought over another.",
        author: "William James",
    },
    {
        text: "You are braver than you believe, stronger than you seem, and smarter than you think.",
        author: "A.A. Milne",
    },
    {
        text: "The only way to achieve the impossible is to believe it is possible.",
        author: "Charles Kingsleigh",
    },
    {
        text: "Your calm mind is the ultimate weapon against your challenges. So relax.",
        author: "Bryant McGill",
    },
    {
        text: "The more you know yourself, the more patience you have for what you see in others.",
        author: "Erik Erikson",
    },
    {
        text: "The greatest healing therapy is friendship and love.",
        author: "Hubert H. Humphrey",
    },
    {
        text: "The best and most beautiful things in the world cannot be seen or even touched—they must be felt with the heart.",
        author: "Helen Keller",
    },
    {
        text: "You are not alone. You are seen. You are loved.",
        author: "Unknown",
    },
    {
        text: "The strongest people are not those who show strength in front of us but those who win battles we know nothing about.",
        author: "Unknown",
    },
    {
        text: "Healing is an art. It takes time, it takes practice. It takes love.",
        author: "Maza Dohta",
    },
    {
        text: "The only way to heal is to let go of what’s hurting you.",
        author: "Unknown",
    },
    {
        text: "You are not your illness. You have an individual story to tell. You have a name, a history, a personality. Staying yourself is part of the battle.",
        author: "Julian Seifter",
    },
    {
        text: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
        author: "Nelson Mandela",
    },
    {
        text: "The only way to make sense out of change is to plunge into it, move with it, and join the dance.",
        author: "Alan Watts",
    },
    {
        text: "The soul usually knows what to do to heal itself. The challenge is to silence the mind.",
        author: "Caroline Myss",
    },
    {
        text: "You are allowed to be both a masterpiece and a work in progress simultaneously.",
        author: "Sophia Bush",
    },
    {
        text: "The only way to do great work is to love what you do.",
        author: "Steve Jobs",
    },
    {
        text: "Your present circumstances don’t determine where you can go; they merely determine where you start.",
        author: "Nido Qubein",
    },
    {
        text: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
        author: "Nelson Mandela",
    },
    {
        text: "The mind is everything. What you think you become.",
        author: "Buddha",
    },
    {
        text: "You are enough just as you are.",
        author: "Unknown",
    },
    {
        text: "The only limit to our realization of tomorrow is our doubts of today.",
        author: "Franklin D. Roosevelt",
    },
    {
        text: "You are never too old to set another goal or to dream a new dream.",
        author: "C.S. Lewis",
    },
    {
        text: "The best way to predict the future is to create it.",
        author: "Peter Drucker",
    },
    {
        text: "The only person you are destined to become is the person you decide to be.",
        author: "Ralph Waldo Emerson",
    },
    {
        text: "Believe you can and you’re halfway there.",
        author: "Theodore Roosevelt",
    },
    {
        text: "Happiness is not something ready-made. It comes from your own actions.",
        author: "Dalai Lama",
    },
    {
        text: "The greatest weapon against stress is our ability to choose one thought over another.",
        author: "William James",
    },
    {
        text: "You are braver than you believe, stronger than you seem, and smarter than you think.",
        author: "A.A. Milne",
    },
    {
        text: "The only way to achieve the impossible is to believe it is possible.",
        author: "Charles Kingsleigh",
    },
    {
        text: "Your calm mind is the ultimate weapon against your challenges. So relax.",
        author: "Bryant McGill",
    },
    {
        text: "The more you know yourself, the more patience you have for what you see in others.",
        author: "Erik Erikson",
    },
    {
        text: "The greatest healing therapy is friendship and love.",
        author: "Hubert H. Humphrey",
    },
    {
        text: "The best and most beautiful things in the world cannot be seen or even touched—they must be felt with the heart.",
        author: "Helen Keller",
    },
    {
        text: "You are not alone. You are seen. You are loved.",
        author: "Unknown",
    },
    {
        text: "The strongest people are not those who show strength in front of us but those who win battles we know nothing about.",
        author: "Unknown",
    },
    {
        text: "Healing is an art. It takes time, it takes practice. It takes love.",
        author: "Maza Dohta",
    },
    {
        text: "The only way to heal is to let go of what’s hurting you.",
        author: "Unknown",
    },
    {
        text: "You are not your illness. You have an individual story to tell. You have a name, a history, a personality. Staying yourself is part of the battle.",
        author: "Julian Seifter",
    },
];

export default function Quotes() {
    const [quote, setQuote] = useState(quotes[0]);

    const generateQuote = () => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        setQuote(quotes[randomIndex]);
    };

    return (
        <div className="quotes-container">
            <motion.div
                className="quote-box"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="quote-title">
                    Mental Health Quote of the Day
                </h1>
                <p className="quote-subtitle">
                    Click the button below for inspiration and insight!
                </p>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="quote-button"
                    onClick={generateQuote}
                >
                    New Quote
                </motion.button>
                <motion.div
                    className="quote-text"
                    key={quote.text}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    "{quote.text}"
                </motion.div>
                <motion.div
                    className="quote-author"
                    key={quote.author}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    -- {quote.author}
                </motion.div>
            </motion.div>
        </div>
    );
}
