import React, { useEffect, useState } from "react";
import "./Chatbot.css";

const Chatbot = ({ specialty, setAnswers }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { 
      from: "bot", 
      arabic: "🤖 ? Hello! How can I help you today",
    },
  ]);

  const toggleChatbox = () => setIsOpen(!isOpen);

  const sendMessage = async (e) => {
    if (e.key === "Enter" && message.trim()) {
      e.preventDefault();
      const userMessage = message.trim();
      setMessage("");

      setMessages((prev) => [...prev, { from: "user", text: userMessage }]);

      const loadingId = Date.now();
      setMessages((prev) => [
        ...prev,
        { from: "bot", english: "...Processing", id: loadingId },
      ]);

      try {
        const response = await fetch("http://localhost:5000/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: userMessage, specialty }),
        });

        const data = await response.json();
        const { english, arabic } = parseBotResponse(data.response);
        const links = data.links || [];
        const classification = data.classification;

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === loadingId
              ? {
                  from: "bot",
                  english,
                  arabic,
                  links,
                  classification,
                }
              : msg
          )
        );

        setAnswers((prev) => [
          ...prev,
          { role: "user", text: userMessage },
          {
            role: "bot",
            text: english,
            arabic,
            links,
            classification,
          },
        ]);
      } catch (error) {
        console.error("Error:", error);
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === loadingId
              ? {
                  from: "bot",
                  english: "❌ حصل خطأ أثناء الاتصال بالخادم.",
                }
              : msg
          )
        );
      }
    }
  };

  const parseBotResponse = (response) => {
    if (response.includes("Anxiety") && response.includes("المشكلة دي أثرت عليك")) {
      return {
        english: "Anxiety response - car problem before exam",
        arabic: `
        <div class="anxiety-response">
          <div class="response-header">
            <span class="emoji">😟</span>
            <span class="title">فهمت أن لديك مشكلة قبل الامتحان</span>
          </div>
          
          <div class="main-message">
            هذا الموقف الصعب قد يسبب قلقًا كبيرًا. دعني أساعدك في فهم ما تشعر به:
          </div>
          
          <div class="question">
            "يا ترى المشكلة دي أثرت عليك إزاي و أنت داخل الامتحان؟ حسيت بإيه ساعتها؟"
          </div>
          
          <div class="explanation">
            <div class="explanation-title">لماذا هذا السؤال مهم؟</div>
            <ul class="points">
              <li>يعترف بتجربتك ويظهر أنني أصغي لك</li>
              <li>يشجعك على مشاركة المزيد من التفاصيل</li>
              <li>يركز على استجابتك العاطفية</li>
              <li>يقدم تعاطفًا ودعمًا</li>
            </ul>
          </div>
        </div>
        `
      };
    }

    if (response.includes("Study Tips") && response.includes("كيف حالك اليوم؟")) {
      return {
        english: "Study tips response - initial greeting",
        arabic: `
        <div class="study-tips-response">
          <div class="greeting">
            <span class="emoji">📚</span>
            <span class="text">أهلاً بك!</span>
          </div>
          
          <div class="main-message">
            كيف حالك اليوم؟ (Kayfa haluk al-yawm? - How are you feeling today?)
          </div>
          
          <div class="sub-message">
            سأكون سعيدًا بمساعدتك في أي استفسار لديك
          </div>
        </div>
        `
      };
    }

    return { 
      english: response, 
      arabic: response 
    };
  };

  useEffect(() => {
    if (specialty) {
      console.log("Specialty for chatbot:", specialty);
    }
  }, [specialty]);

  return (
    <>
      <button className="chatbot-btn" onClick={toggleChatbox}>
        <i className="fas fa-robot"></i>
      </button>

      {isOpen && (
        <div className="chatbox">
          <div className="chatbox-header">
            <i className="fas fa-robot"></i>
            <span> Calm Sphere Chatbot</span>
          </div>
          <div className="chatbox-body">
            {messages.map((msg, i) => (
              <div key={i} className="message-container">
                {msg.from === "user" ? (
                  <p dir="rtl" className="user-message">
                    <span className="message-sender"></span> {msg.text}
                  </p>
                ) : (
                  <div className="bot-message">
                    {msg.arabic && (
                      <div 
                        dir="rtl" 
                        className={
                          msg.arabic.includes("anxiety-response") ? "anxiety-arabic-message" :
                          msg.arabic.includes("study-tips-response") ? "study-tips-arabic-message" :
                          "bot-arabic"
                        }
                        dangerouslySetInnerHTML={{ __html: msg.arabic }}
                      />
                    )}
                    {msg.links && msg.links.length > 0 && (
                      <div className="bot-links" dir="rtl">
                        <strong>🎧 🧠 A calming guide 
                              </strong>                   
                        {msg.links.map((link, index) => (
                          <p key={index}>
                            <a
                              href={link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {link}
                            </a>
                          </p>
                        ))}
                      </div>
                    )}
                    {msg.classification && (
                      <span
                        className={`classification-label ${msg.classification.toLowerCase()}`}
                      >
                        <i className="fas fa-heart"></i>{" "}
                        {msg.classification}
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="chatbox-footer">
            <div className="therapist-btn-container">
              <button className="therapist-btn">
                <i className="fas fa-user-md"></i> Therapist
              </button>
            </div>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
              className="message-input"
              onKeyDown={sendMessage}
              dir="auto"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;