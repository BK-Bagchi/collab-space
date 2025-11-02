import { createContext, useState, useEffect } from "react";
import { AuthAPI } from "../api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load user info from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    const verifyToken = async () => {
      try {
        if (storedUser && storedToken) {
          const res = await AuthAPI.verifyToken();
          if (res.status === 200) {
            setUser(JSON.parse(storedUser));
            setLoggedIn(true);
          } else logout();
        } else logout();
      } catch (error) {
        console.error("Error verifying token:", error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, []);

  // Login method
  const login = (userData, token) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
    setUser(userData);
    setLoggedIn(true);
  };
  // Logout method
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, loading, loggedIn, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

// Custom hook for easy use. Moved to hooks.
// export const useAuth = () => useContext(AuthContext);
