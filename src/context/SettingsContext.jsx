import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../hooks/useAuth";

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const { user } = useAuth();

  const [theme, setTheme] = useState(localStorage.getItem("theme") || null);
  const [typingIndicator, setTypingIndicator] = useState(null);
  const [activeStatus, setActiveStatus] = useState(null);

  useEffect(() => {
    if (!user) return;

    setTheme(user?.theme);
    setTypingIndicator(user?.typingIndicator);
    setActiveStatus(user?.activeStatus);
  }, [user]);

  useEffect(() => {
    const root = document.getElementById("root");
    if (!root) {
      toast.warn("No root class");
      return;
    }

    root.classList.remove("light", "dark");
    root.classList.add(theme);

    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const toggleTypingIndicator = () => {
    setTypingIndicator((prev) => !prev);
  };

  const toggleActiveStatus = () => {
    setActiveStatus((prev) => !prev);
  };

  return (
    <SettingsContext.Provider
      value={{
        theme,
        toggleTheme,
        typingIndicator,
        toggleTypingIndicator,
        activeStatus,
        toggleActiveStatus,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsContext;
