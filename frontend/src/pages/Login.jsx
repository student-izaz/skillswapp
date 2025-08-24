import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../store/UserContext";
import LoadingSpinner from "../components/LoadingSpinner";

const Login = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const { API_URL, login } = useUserContext();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Login failed:", data.message || "Unknown error");
        return alert(data.message || "Login failed");
      }

      // Update user context and localStorage
      login({ userData: data.user, tokenData: data.token });

      // Navigate conditionally
      navigate(data.user.isProfileComplete ? "/home" : "/multi-step-form");
      setLoading(false);
    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h2 className="text-xl font-semibold text-gray-700 px-8 text-center">
        Unlock new learning opportunities — log in now!
      </h2>

      <div className="w-full max-w-md p-8 rounded-2xl">
        <h2 className="text-2xl font-bold text-yellow-500 mb-6">
          Login to Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-500 font-medium mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={loginData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-500 font-medium mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={loginData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition duration-200"
          >
            {loading ? <LoadingSpinner/> : "Sign In"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-4">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
