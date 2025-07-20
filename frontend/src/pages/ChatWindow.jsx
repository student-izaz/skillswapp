import React, { useState, useRef, useEffect } from "react";
import { FiArrowLeft, FiSend } from "react-icons/fi";

const ChatWindow = ({ user, onBack }) => {
  const [messages, setMessages] = useState([
    { sender: "them", text: "Hey there! 👋" },
    { sender: "me", text: "Hi! I'd love to skill swap!" },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (newMessage.trim() === "") return;
    setMessages([...messages, { sender: "me", text: newMessage }]);
    setNewMessage("");
    // Optionally: send to backend here
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="flex items-center bg-white p-4 shadow-md">
        <FiArrowLeft
          className="text-2xl mr-4 cursor-pointer"
          onClick={onBack}
        />
        <img
          src={user.image}
          alt={user.name}
          className="w-10 h-10 rounded-full object-cover mr-2"
        />
        <div>
          <h2 className="text-lg font-semibold">{user.name}</h2>
          <p className="text-sm text-gray-500">Online</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-3">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-xs px-4 py-2 rounded-xl text-sm ${
              msg.sender === "me"
                ? "bg-yellow-500 text-white self-end ml-auto"
                : "bg-white text-gray-800 self-start"
            }`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 bg-white border-t flex items-center">
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        <button
          onClick={handleSend}
          className="ml-3 text-yellow-500 text-xl hover:text-yellow-600"
        >
          <FiSend />
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
