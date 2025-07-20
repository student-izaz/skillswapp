import React from 'react';
import { FiMessageCircle } from "react-icons/fi";


const Header = ({searchTerm}) => {
  return (
    <div>
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
    </div>
  )
}

export default Header
