import { createContext, useEffect, useState } from "react";

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  const [typingIndicator, setTypingIndicator] = useState(false);
  const [activeStatus, setActiveStatus] = useState(false);

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");

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
