import React, { useContext, useState } from "react";

const ThemeContext = React.createContext();

function ThemeContextProvider(props) {
  const [theme, setTheme] = useState("dark");

  function toggleTheme() {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    // localStorage.setItem("theme", JSON.stringify(theme))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
}

export {ThemeContextProvider, ThemeContext}
