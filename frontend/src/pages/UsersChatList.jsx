import React from "react";
import { IoArrowBack } from "react-icons/io5";
import { ChatUsers } from "../DummyUsers/dummyChatUser"; // Update the path if needed

const ChatListPage = ({ onClose, onSelectUser }) => {
  return (
    <div className="h-screen w-full max-w-md mx-auto bg-white shadow-lg flex flex-col">
      {/* Header */}
      <div className="flex items-center p-4 shadow-md border-b bg-yellow-100 sticky top-0 z-10">
        <IoArrowBack
          className="text-2xl text-gray-700 cursor-pointer mr-3"
          onClick={onClose}
        />
        <h2 className="text-xl font-bold text-gray-800">Chats</h2>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {ChatUsers.map((user, index) => (
          <div
            key={index}
            className="flex items-center px-4 py-3 border-b hover:bg-yellow-50 transition cursor-pointer"
            onClick={() => onSelectUser(user)}
          >
            <img
              src={user.avatar || "https://i.pravatar.cc/100"}
              alt={user.name}
              className="w-12 h-12 rounded-full object-cover mr-4 shadow"
            />
            <div className="flex-1">
              <div className="flex justify-between">
                <h3 className="text-md font-semibold text-gray-800">{user.name}</h3>
                <span className="text-xs text-gray-400">{user.lastSeen || "Online"}</span>
              </div>
              <p className="text-sm text-gray-500 truncate">{user.lastMessage || "Tap to start chatting..."}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatListPage;
