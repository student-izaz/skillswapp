import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../store/UserContext";
import LoadingSpinner from "../components/LoadingSpinner";

const RegisterForm = () => {
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const {API_URL} = useUserContext();
  const [loading, setLoadig] = useState(false);
  

  const handleChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadig(true);

    if (registerData.password !== registerData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("✅ Register successful:", data);
        alert("Registration successful!");
        setRegisterData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        navigate("/login");
      } else {
        console.error("❌ Register failed:", data.message || "Unknown error");
        alert(data.message || "Registration failed");
      }
      setLoadig(false)
    } catch (error) {
      console.error("🚨 Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center ">
      <h2 className="text-lg font-semibold text-gray-700 px-8 pt-4">
        Discover new skills, share your talents — sign up and start swapping!
      </h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white px-8 py-6 rounded-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-yellow-500 mb-6">
          Register Now
        </h2>

        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={registerData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={registerData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={registerData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="Enter password"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 text-gray-700">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={registerData.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="Confirm password"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          {loading ? <LoadingSpinner/> : "Register"}
        </button>

        {/* Already have an account */}
        <p className="text-center text-gray-600 mt-4 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
