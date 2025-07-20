import React, { useState } from "react";

const MyProfile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [user, setUser] = useState({
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    name: "Aarav Mehta",
    title: "Full Stack Developer",
    description:
      "I'm a passionate developer with 3+ years of experience in building full-stack apps.",
    skillsOffered: ["React", "Node.js", "MongoDB"],
    skillsWanted: ["DevOps", "UI/UX"],
    email: "aarav@example.com",
    location: "Mumbai, India",
  });

  const [formData, setFormData] = useState({ ...user });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const saveChanges = () => {
    setUser(formData);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen flex justify-center p-6 bg-gray-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
          {!isEditing && (
            <button
              className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
          )}
        </div>
          <p className="text-gray-600 mb-4 text-sm text-center">
              Keep your profile up to date so others can discover your skills and connect with you for the perfect skill swap. Your profile reflects your passions — make it shine! ✨
          </p>

        {/* Profile Image */}
        <div className="text-center">
          <img
            src={user.image}
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto border-2 object-cover shadow"
          />
        </div>

        {/* Editable Fields */}
        <div className="mt-6 space-y-4">
          {[
            { label: "Name", name: "name" },
            { label: "Title", name: "title" },
            { label: "Location", name: "location" },
            { label: "Email", name: "email" },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700">
                {field.label}
              </label>
              {isEditing ? (
                <input
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded mt-1"
                />
              ) : (
                <p className="text-gray-800">{user[field.name]}</p>
              )}
            </div>
          ))}

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            {isEditing ? (
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded mt-1"
              />
            ) : (
              <p className="text-gray-800">{user.description}</p>
            )}
          </div>

          {/* Skills Offered */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Skills Offered
            </label>
            {isEditing ? (
              <input
                name="skillsOffered"
                value={formData.skillsOffered.join(", ")}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    skillsOffered: e.target.value.split(",").map((s) => s.trim()),
                  })
                }
                className="w-full border px-3 py-2 rounded mt-1"
              />
            ) : (
              <div className="flex flex-wrap gap-2 mt-1">
                {user.skillsOffered.map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Skills Wanted */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Skills Wanted
            </label>
            {isEditing ? (
              <input
                name="skillsWanted"
                value={formData.skillsWanted.join(", ")}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    skillsWanted: e.target.value.split(",").map((s) => s.trim()),
                  })
                }
                className="w-full border px-3 py-2 rounded mt-1"
              />
            ) : (
              <div className="flex flex-wrap gap-2 mt-1">
                {user.skillsWanted.map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Buttons */}
        {isEditing && (
          <div className="mt-6 flex justify-end space-x-2">
            <button
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              onClick={() => {
                setIsEditing(false);
                setFormData(user); // Reset
              }}
            >
              Cancel
            </button>
            <button
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              onClick={saveChanges}
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
