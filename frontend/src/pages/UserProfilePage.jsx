import React, { useEffect, useState } from "react";
import { Users } from "../DummyUsers/dummyUsers";
import { useParams } from "react-router-dom";

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState(null); // ✅ correct useState
  const { id } = useParams();

  useEffect(() => {
    const user = Users.find((u) => u.id.toString() === id); // ✅ find returns a single object
    setUserProfile(user);
  }, [id]);

  if (!userProfile) return <div className="p-6">Loading user profile...</div>;

  return (
    <div className="min-h-screen flex justify-center items-start p-6">
      <div className="bg-white rounded-lg  max-w-md w-full p-6 relative">
        {/* Profile Picture */}
        <div className="flex justify-center">
          <img
            src={userProfile.image}
            alt={userProfile.name}
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
          />
        </div>

        {/* Connect Button */}
        {/* Name & Title */}
        <div className="text-center mt-4">
          <h2 className="text-2xl font-bold text-gray-800">{userProfile.name}</h2>
          <p className="text-sm text-gray-500">{userProfile.title}</p>

           <div className="connect-btn">
            <button className="bg-yellow-500 border-0 p-2 px-6 text-white font-bold rounded-full mt-3 align-center hover:bg-yellow-600">Connect</button>
            </div>
        </div>


        {/* Description */}
        <div className="mt-4 text-sm text-gray-700 text-center">
          {userProfile.description}
        </div>

        {/* Skills Offered */}
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-green-600 mb-2">
            Skills Offered
          </h3>
          <div className="flex flex-wrap gap-2">
            {userProfile.skillsOffered.map((skill, idx) => (
              <span
                key={idx}
                className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Skills Wanted */}
        <div className="mt-4">
          <h3 className="text-sm font-semibold text-blue-600 mb-2">
            Skills Wanted
          </h3>
          <div className="flex flex-wrap gap-2">
            {userProfile.skillsWanted.map((skill, idx) => (
              <span
                key={idx}
                className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-6 text-sm text-gray-600 space-y-1">
          <p>
            <strong>📍 Location:</strong> {userProfile.location}
          </p>
          <p>
            <strong>📧 Email:</strong>{" "}
            <a
              href={`mailto:${userProfile.email}`}
              className="text-blue-500 hover:underline"
            >
              {userProfile.email}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
