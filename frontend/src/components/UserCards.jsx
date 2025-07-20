import React from "react";
import { BsBookmark } from "react-icons/bs";
import { FaAngleRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const UserCards = ({users}) => {
  const navigate = useNavigate();

  const showProfile = (id) => {
    navigate(`/user-profile/${id}`);
  };

  return (
    <div className="space-y-4">
      {users.map((user) => (
        <div
          key={user.id}
          onClick={() => showProfile(user.id)}
          className="bg-white p-4 rounded-lg relative flex items-start space-x-4 border border-gray-300 hover:shadow-md cursor-pointer transition"
        >
          
        {/* Bottom-Right Arrow */}
          <div className="absolute top-3 right-0 text-yellow-400">
            <FaAngleRight size={18} />
          </div>
          {/* User Image */}
          <img
            src={user.image}
            alt={user.name}
            className="w-14 h-14 rounded-full object-cover border-2"
          />

          {/* Info */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold">{user.name}</h3>
            <p className="text-sm text-gray-600 mb-2 line-clamp-2">
              {user.description}
            </p>
            <p className="text-sm">
              <span className="font-medium text-gray-900">Skill Offered:</span>{" "}
              {user.skillsOffered.join(", ")}
            </p>
            <p className="text-sm">
              <span className="font-medium text-gray-900">Skill Wanted:</span>{" "}
              {user.skillsWanted.join(", ")}
            </p>
          </div>
{/* Save Icon */}
          <button
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-3 right-3 text-gray-500 hover:text-blue-600"
          >
            <BsBookmark size={18} />
          </button>
          
        </div>
      ))}
    </div>
  );
};

export default UserCards;
