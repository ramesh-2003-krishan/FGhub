import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../styles/OZzz.css";

function OZzzAgent({ setPage, agentImg }) {
  const [messages, setMessages] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    
    const username = localStorage.getItem("username") || "Explorer";
    setMessages([
      { sender: "OZzz", text: `Hey ${username}, how are you, I am OZzz tell me your favor`, media: [] }
    ]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const userMessage = { sender: "user", text: inputVal, media: [] };
    setMessages((prev) => [...prev, userMessage]);
    setInputVal("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:9090/api/ai/recommend", {
        message: userMessage.text,
      });

      const mediaResults = response.data;

      let replyText = "Here is what I found for you:";
      if (mediaResults.length === 0) replyText = "I couldn't find anything matching your request.";

      const ozMessage = {
        sender: "OZzz",
        text: replyText,
        media: mediaResults,
      };

      setMessages((prev) => [...prev, ozMessage]);
    } catch (error) {
      setMessages((prev) => [...prev, { sender: "OZzz", text: "Oops, my circuits are acting up! Check server connection.", media: [] }]);
    }

    setLoading(false);
  };

  return ( 
    <div className="ozzz-container">
      <div className="ozzz-header">
        {agentImg ? (
          <img className="ozzz-avatar-img" src={agentImg} alt="OZzz" />
        ) : (
          <div className="ozzz-avatar"></div>
        )}
        <div className="ozzz-title">
          <h3>OZzz AI</h3>
          <span className="online-dot"></span> Online
        </div>
      </div>

      <div className="ozzz-chat-box">
        {messages.map((msg, idx) => (
          <div key={idx} className={`ozzz-msg-row ${msg.sender === "user" ? "user-row" : "oz-row"}`}>
            {msg.sender === "OZzz" &&
              (agentImg ? (
                <img className="ozzz-mini-avatar-img" src={agentImg} alt="OZzz" />
              ) : (
                <div className="ozzz-mini-avatar"></div>
              ))}
            <div className={`ozzz-bubble ${msg.sender === "user" ? "user-bubble" : "oz-bubble"}`}>
              <p>{msg.text}</p>
              {msg.media && msg.media.length > 0 && (
                <div className="ozzz-media-cards">
                  {msg.media.map(m => (
                    <div
                      key={m.id}
                      className="ozzz-media-card"
                      onClick={() => {
                        if (setPage) {
                          localStorage.setItem("searchTargetId", m.id);
                          setPage("Media");
                        }
                      }}
                    >
                       <img src={m.img} alt={m.title} />
                       <div className="ozzz-media-info">
                         <span>{m.title}</span>
                         <small>{m.category}</small>
                       </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="ozzz-msg-row oz-row">
            {agentImg ? (
              <img className="ozzz-mini-avatar-img" src={agentImg} alt="OZzz" />
            ) : (
              <div className="ozzz-mini-avatar"></div>
            )}
            <div className="ozzz-bubble oz-bubble typing-indicator">
              <span></span><span></span><span></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form className="ozzz-input-area" onSubmit={handleSend}>
        <input 
          type="text" 
          value={inputVal} 
          onChange={e => setInputVal(e.target.value)} 
          placeholder="Ask OZzz for movie or game recommendations..."
        />
        <button type="submit">SEND</button>
      </form>
    </div>
  );
}

export default OZzzAgent;
