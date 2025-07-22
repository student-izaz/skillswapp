import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();
export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); // wait for localStorage check


  // ✅ Restore user/token from localStorage
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");

      if (storedUser) setUser(JSON.parse(storedUser));
      if (storedToken) setToken(storedToken);
    } catch (error) {
      console.error("❌ Error restoring session:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // ✅ Login method updates state + localStorage
  const login = ({ userData, tokenData }) => {
    setUser(userData);
    setToken(tokenData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", tokenData);
  };

  // ✅ Logout method
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  // ✅ Check login status
  const isLoggedIn = () => !!token;

  const API_URL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000"
      : "https://skillswapp-yslg.onrender.com";

  return (
    <UserContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isLoggedIn,
        loading,
        API_URL,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
