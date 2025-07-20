import React, { useState } from "react";
import { FiEdit2, FiSave } from "react-icons/fi";

const MySkills = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [skills, setSkills] = useState({
    offered: ["React", "Node.js", "MongoDB"],
    wanted: ["UI/UX Design", "DevOps"],
  });

  const [formSkills, setFormSkills] = useState({
    offered: skills.offered.join(", "),
    wanted: skills.wanted.join(", "),
  });

  const handleChange = (e) => {
    setFormSkills({ ...formSkills, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setSkills({
      offered: formSkills.offered.split(",").map((s) => s.trim()),
      wanted: formSkills.wanted.split(",").map((s) => s.trim()),
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">🎯 My Skills</h1>
          {isEditing ? (
            <button
              onClick={handleSave}
              className="flex items-center gap-1 text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
            >
              <FiSave /> Save
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-1 text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
            >
              <FiEdit2 /> Edit
            </button>
          )}
        </div>

        {/* Skills Offered */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Skills I Offer</h2>
          {isEditing ? (
            <textarea
              name="offered"
              value={formSkills.offered}
              onChange={handleChange}
              rows={2}
              className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Comma-separated (e.g., React, Python, Figma)"
            />
          ) : (
            <div className="flex flex-wrap gap-2">
              {skills.offered.map((skill, idx) => (
                <span
                  key={idx}
                  className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Skills Wanted */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Skills I Want to Learn</h2>
          {isEditing ? (
            <textarea
              name="wanted"
              value={formSkills.wanted}
              onChange={handleChange}
              rows={2}
              className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Comma-separated (e.g., DevOps, UI/UX)"
            />
          ) : (
            <div className="flex flex-wrap gap-2">
              {skills.wanted.map((skill, idx) => (
                <span
                  key={idx}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MySkills;
