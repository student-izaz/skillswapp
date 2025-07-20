import React, { useState } from "react";
import ChatListPage from "./UsersChatList";
import ChatWindow from "./ChatWindow";

const MessagesPage = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="w-[40%] bg-white p-4 rounded-lg shadow">
      {selectedUser ? (
        <ChatWindow user={selectedUser} onBack={() => setSelectedUser(null)} />
      ) : (
        <ChatListPage
          onSelectUser={(user) => setSelectedUser(user)} // ✅ THIS FIXES THE ERROR
          onClose={() => console.log("Close button clicked")}
        />
      )}
    </div>
  );
};

export default MessagesPage;
