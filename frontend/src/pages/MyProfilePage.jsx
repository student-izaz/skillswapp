import React, { useEffect, useState } from "react";
import { useUserContext } from "../store/UserContext";

const MyProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { user, token, API_URL } = useUserContext();

  const [formData, setFormData] = useState(user ?? {});

  // Fetch user data from backend
  const fetchUserData = async () => {
    try {
      const response = await fetch(`${API_URL}/api/users/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setFormData({ ...data });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Update formData when user changes
  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  // Fetch user data when mounted
  useEffect(() => {
    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const saveChanges = () => {
    // 🔹 Here you should send `formData` to backend to update user profile
    console.log("Saving changes:", formData);
    setIsEditing(false);
  };

    return (
    <div className="min-h-screen flex justify-center p-6 bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-3xl">
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

        <p className="text-gray-600 mb-6 text-sm text-center">
          Keep your profile up to date so others can discover your skills and
          connect with you for the perfect skill swap. ✨
        </p>

        {/* Profile Info */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {[
            { label: "Name", name: "name" },
            { label: "Email", name: "email" },
            { label: "Phone", name: "phone" },
            { label: "Gender", name: "gender" },
            { label: "Country", name: "country" },
          ].map((field) => (
            <div key={field.name}>
              <p className="text-xs text-gray-500">{field.label}</p>
              {isEditing ? (
                <input
                  name={field.name}
                  value={formData?.[field.name] ?? ""}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded mt-1 text-sm"
                />
              ) : (
                <p className="font-semibold text-gray-800">
                  {formData?.[field.name] ?? "—"}
                </p>
              )}
            </div>
          ))}

          {/* Profile Status */}
          <div>
            <p className="text-xs text-gray-500">Profile Status</p>
            <p
              className={`font-semibold ${
                formData?.isProfileComplete ? "text-green-600" : "text-red-600"
              }`}
            >
              {formData?.isProfileComplete ? "Complete ✅" : "Incomplete ❌"}
            </p>
          </div>

          {/* Dates */}
          <div>
            <p className="text-xs text-gray-500">Created At</p>
            <p className="text-sm text-gray-700">
              {new Date(formData?.createdAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Last Updated</p>
            <p className="text-sm text-gray-700">
              {new Date(formData?.updatedAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Skills To Teach
          </h2>
          {isEditing ? (
            <input
              name="skillsToTeach"
              value={formData?.skillsToTeach?.join(", ") ?? ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  skillsToTeach: e.target.value.split(",").map((s) => s.trim()),
                })
              }
              className="w-full border px-3 py-2 rounded mt-1"
            />
          ) : formData?.skillsToTeach?.length ? (
            <div className="flex flex-wrap gap-2">
              {formData.skillsToTeach.map((skill, idx) => (
                <span
                  key={idx}
                  className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No skills added</p>
          )}
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Skills To Learn
          </h2>
          {isEditing ? (
            <input
              name="skillsToLearn"
              value={formData?.skillsToLearn?.join(", ") ?? ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  skillsToLearn: e.target.value.split(",").map((s) => s.trim()),
                })
              }
              className="w-full border px-3 py-2 rounded mt-1"
            />
          ) : formData?.skillsToLearn?.length ? (
            <div className="flex flex-wrap gap-2">
              {formData.skillsToLearn.map((skill, idx) => (
                <span
                  key={idx}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No skills added</p>
          )}
        </div>

        {/* Buttons */}
        {isEditing && (
          <div className="mt-6 flex justify-end space-x-2">
            <button
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              onClick={() => {
                setIsEditing(false);
                setFormData(user ?? {}); // Reset
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
