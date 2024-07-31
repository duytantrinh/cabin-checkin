import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
  // thay vì dùng useState như thông thường ta dùng useLocalStorageState(); để state imediately store vào localStorage
  // const [isDarkMode, setIsDarkMode] = useLocalStorageState(false, "isDarkMode");

  // window.matchMedia("(prefers-color-scheme:dark)").matches : dung Mode default của trình duyệt
  // default trình duyệt là Dark Mode  => dùng Dark Mode
  // default trình duyệt là Light Mode  => dùng Light Mode
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    window.matchMedia("(prefers-color-scheme:dark)").matches,
    "isDarkMode"
  );

  useEffect(
    function () {
      if (isDarkMode) {
        // tác động đến root (<html/>)
        document.documentElement.classList.add("dark_mode");
        document.documentElement.classList.remove("light_mode");
      } else {
        document.documentElement.classList.add("light_mode");
        document.documentElement.classList.remove("dark_mode");
      }
    },
    [isDarkMode]
  );

  function toggleDarkMode() {
    setIsDarkMode((isDark) => !isDark);
  }

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined)
    throw new Error("DarkModeContext was used outside of DarkModeProvider");

  return context;
}

export { DarkModeProvider, useDarkMode };
