import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "acid" ? "dracula" : "acid");
  };

  return (
    <label className="swap swap-rotate">
      <input
        type="checkbox"
        className="toggle"
        defaultChecked={theme === "dracula"}
        onChange={toggleTheme}
      />
      <span className="swap-on">🌞</span>{" "}
      <span className="swap-off text-right">🌙</span>
    </label>
  );
};

export default ThemeToggle;
