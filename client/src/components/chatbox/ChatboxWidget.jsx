import { useState } from "react";
import axios from "axios";
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function ChatboxWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const toggleChatbox = () => setIsOpen(!isOpen);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");
    setIsTyping(true);

    try {
      const response = await axios.post("http://localhost:5000/get_advice", {
        query: input,
      });
      setMessages([
        ...newMessages,
        { text: response.data.response, sender: "bot" },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMessages([
        ...newMessages,
        { text: "Error reaching AI service.", sender: "bot" },
      ]);
    }
    setIsTyping(false);
  };

  return (
    <div className="chatbox-container">
      <motion.div
        className="chat-icon"
        whileHover={{ scale: 1.1 }}
        onClick={toggleChatbox}
      >
        <MessageCircle size={28} />
      </motion.div>
      {isOpen && (
        <motion.div
          className="chatbox"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ position: "absolute", bottom: "70px", right: "0" }}
        >
          <div className="chatbox-header">
            <h4>AI Chat Assistant</h4>
            <button onClick={toggleChatbox}>X</button>
          </div>
          <div className="chatbox-body">
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                className={`message ${msg.sender}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {msg.text}
              </motion.div>
            ))}
            {isTyping && (
              <div className="typing-indicator">AI is typing...</div>
            )}
          </div>
          <div className="chatbox-footer">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type a message..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </motion.div>
      )}
      <style jsx>{`
        .poppins-light {
          font-family: "Poppins", sans-serif;
          font-weight: 300;
          font-style: normal;
        }
        .chatbox-container {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 1000;
        }
        .chat-icon {
          background: #fece51;
          color: white;
          border-radius: 50%;
          width: 55px;
          height: 55px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
          transition: transform 0.2s ease;
        }
        .chat-icon:hover {
          transform: scale(1.1);
        }
        .chatbox {
          width: 340px;
          height: 460px;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
          display: flex;
          flex-direction: column;
        }
        .chatbox-header {
          background: #fece51;
          color: white;
          padding: 12px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-radius: 12px 12px 0 0;
        }
        .chatbox-header h4 {
          font-size: 18px;
          font-weight: 500;
        }
        .chatbox-header button {
          background: transparent;
          color: white;
          font-size: 18px;
          cursor: pointer;
          border: none;
          font-weight: bold;
        }
        .chatbox-body {
          flex: 1;
          padding: 12px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
        }
        .message {
          max-width: 80%;
          margin-bottom: 8px;
          padding: 10px 15px;
          border-radius: 15px;
          font-size: 16px;
          line-height: 1.4;
        }
        .message.user {
          align-self: flex-end;
          background: #fece51;
          color: white;
          border-radius: 20px 20px 0 20px;
        }
        .message.bot {
          align-self: flex-start;
          background: #f1f1f1;
          color: #333;
          border-radius: 20px 20px 20px 0;
        }
        .typing-indicator {
          font-style: italic;
          color: #888;
          margin-top: 5px;
        }
        .chatbox-footer {
          display: flex;
          padding: 10px 20px;
          border-top: 1px solid #f0f0f0;
          border-radius: 0 0 12px 12px;
          background: #f9f9f9;
        }
        .chatbox-footer input {
          flex: 1;
          padding: 10px 15px;
          border: 1px solid #ccc;
          border-radius: 25px;
          font-size: 14px;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        }
        .chatbox-footer button {
          background: #fece51;
          color: white;
          padding: 10px 15px;
          margin-left: 10px;
          border-radius: 30px;
          font-size: 16px;
          cursor: pointer;
          border: none;
          transition: background 0.3s ease;
        }
        .chatbox-footer button:hover {
          background: #fbbf24;
        }
        .chatbox-footer input:focus {
          outline: none;
          box-shadow: 0px 0px 5px rgba(254, 206, 81, 0.5);
        }
      `}</style>
    </div>
  );
}
