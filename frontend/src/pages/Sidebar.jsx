import React from "react";
import { IoClose } from "react-icons/io5";
import { FiUser, FiSettings, FiLogOut, FiMessageSquare, FiBookmark, FiBriefcase } from "react-icons/fi";
import { useUserContext } from "../store/UserContext";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const {logout} = useUserContext();
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-xl z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Profile</h2>
          <IoClose
            className="text-2xl text-gray-600 cursor-pointer hover:text-red-500"
            onClick={() => setIsOpen(false)}
          />
        </div>

        {/* User Info */}
        <div className="flex flex-col items-center p-4">
          <img
            src="https://randomuser.me/api/portraits/men/45.jpg"
            alt="User"
            className="w-20 h-20 rounded-full shadow-md"
          />
          <h3 className="mt-3 text-lg font-semibold text-gray-800">Aarav Mehta</h3>
          <p className="text-sm text-gray-500">Full Stack Developer</p>
        </div>

        {/* Menu Options */}
        <nav className="px-4">
          <ul className="space-y-3 mt-4 text-sm text-gray-700">
            <li className="flex items-center space-x-3 hover:text-yellow-600 cursor-pointer">
              <FiUser />
              <a href="/my-profile">My Profile</a>
            </li>
            <li className="flex items-center space-x-3 hover:text-yellow-600 cursor-pointer">
              <FiBriefcase />
              <a href="/my-skills">My Skills</a>
            </li>
            <li className="flex items-center space-x-3 hover:text-yellow-600 cursor-pointer">
              <FiBookmark />
              <a href="/saved">Saved Matches</a>
            </li>
            <li className="flex items-center space-x-3 hover:text-yellow-600 cursor-pointer">
              <FiMessageSquare />
              <a href="/messages">Messages</a>
            </li>
            <li className="flex items-center space-x-3 hover:text-yellow-600 cursor-pointer">
              <FiSettings />
              <a href="/settings">Settings</a>
            </li>
            <li onClick={()=>logout()} className="flex items-center space-x-3 text-red-500 hover:text-red-700 cursor-pointer">
              <FiLogOut />
              <span>Logout</span>
            </li>
          </ul>
        </nav>

        {/* Footer */}
        <div className="absolute bottom-4 w-full px-4 text-xs text-gray-400 text-center">
          © 2025 SkillSwap
        </div>
      </div>
    </>
  );
};

export default Sidebar;
