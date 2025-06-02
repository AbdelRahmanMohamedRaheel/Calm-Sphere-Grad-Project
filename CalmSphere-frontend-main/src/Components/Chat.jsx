
import React, { useState, useEffect, useRef } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import axios from "axios";

function Chat() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! How can I help you?", isSent: false },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: inputValue,
      isSent: true,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");

    try {
      const res = await axios.post("http://127.0.0.1:5000/api/chat", {
        message: inputValue,
      });

      const reply = res.data;
      const emotion = `${reply.emotion.label} ${reply.emotion.emoji} (${reply.emotion.confidence})`;
      const sentiment = `${reply.sentiment.description}`;
      const resources = reply.resources || [];

      const botMessage = {
        id: Date.now() + 1,
        text: ` ${reply.response}\nEmotion: ${emotion}\nSentiment: ${sentiment}`,
        resources: resources,
        isSent: false,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("Error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 2,
          text: "⚠️ Sorry, something went wrong. Please try again.",
          isSent: false,
        },
      ]);
    }
  };

  return (
    <div className="chat-only-container">
      <div className="chat-area">
        <div className="messages">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`message-row ${msg.isSent ? "sent" : "received"}`}
            >
              {!msg.isSent && (
                <div className="avatar">
                  <img src="body2.png" alt="bot" />
                </div>
              )}
              <div className={`message-bubble ${msg.isSent ? "blue" : "gray"}`}>
                <div style={{ whiteSpace: "pre-line" }}>{msg.text}</div>
                {msg.resources && msg.resources.length > 0 && (
                  <div className="resources" style={{ marginTop: "8px" }}>
                    <strong>A Calming guide 🎧 🧠 </strong>
                    <ul style={{ paddingLeft: "20px", margin: "5px 0 0 0" }}>
                      {msg.resources.map((resource, index) => (
                        <li key={index}>
                          <a
                            href={resource}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: "#1d4ed8", textDecoration: "underline" }}
                          >
                            {resource}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSendMessage} className="message-input-form">
          <input
            type="text"
            className="message-input"
            placeholder="Type a message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit" className="send-button">
            <PaperAirplaneIcon className="icon" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
