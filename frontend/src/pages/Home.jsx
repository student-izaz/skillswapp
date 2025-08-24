import React, { useState, useEffect, useRef } from "react";
import { FiMessageCircle } from "react-icons/fi";
import Sidebar from "./Sidebar";
import UsersCardPage from "./UsersCardPage";
import { Users } from "../DummyUsers/dummyUsers";
import MessageWindow from "./UsersChatList"; // This is your chat list page
import { useUserContext } from "../store/UserContext";

const HomePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [users] = useState(Users);
  const messageRef = useRef(null);
  const { user } = useUserContext();

  console.log(user)

  // Filter users
  const filteredUsers = users.filter((user) => {
    const term = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(term) ||
      user.skillsOffered.some((skill) => skill.toLowerCase().includes(term)) ||
      user.skillsWanted.some((skill) => skill.toLowerCase().includes(term))
    );
  });

  // Close message window when clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (messageRef.current && !messageRef.current.contains(e.target)) {
        setIsMessageOpen(false);
      }
    };
    if (isMessageOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMessageOpen]);

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-white shadow-md sticky top-0 z-20">
        <img
          src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740"
          alt="User"
          className="w-10 h-10 rounded-full object-cover cursor-pointer"
          onClick={() => setIsSidebarOpen(true)}
        />

        <input
          type="text"
          placeholder="Search by skill or name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 mx-4 px-3 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />

        <FiMessageCircle
          className="text-xl text-gray-700 cursor-pointer"
          onClick={() => setIsMessageOpen(true)}
        />
      </header>

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Welcome */}
      <section className="p-4">
        <h1 className="text-2xl font-bold text-center mb-4 text-yellow-500">
          👋 Welcome to SkillSwap
        </h1>
        <p className="text-sm text-center text-gray-600 max-w-2xl mx-auto">
          Discover a community where skills are shared, not sold. Whether you're
          a designer wanting to learn guitar, a developer looking to master
          cooking, or a teacher eager to explore coding — SkillSwap connects
          people who want to exchange skills and grow together.
        </p>
      </section>

      {/* User Cards */}
      <section className="px-4 py-2">
        <h2 className="text-lg font-semibold text-center text-gray-800 mb-4">
          🔍 Find People to Learn and Share Skills With
        </h2>
        {filteredUsers.length > 0 ? (
          <UsersCardPage users={filteredUsers} />
        ) : (
          <p className="text-center text-gray-500 py-6">
            😔 No users found matching "<span className="font-semibold">{searchTerm}</span>"
          </p>
        )}
      </section>

      {/* Full Screen Chat List (Like WhatsApp) */}
      {isMessageOpen && (
        <div
          ref={messageRef}
          className="fixed inset-0 bg-white z-50 overflow-hidden"
        >
          <MessageWindow onClose={() => setIsMessageOpen(false)} />
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white text-center text-sm py-3 shadow-inner mt-auto">
        &copy; 2025 SkillSwap. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;
