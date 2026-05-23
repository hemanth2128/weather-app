import { useTheme } from "../context/ThemeContext";

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  const isLight = theme === "light";

  return (
    <header className="header">
      <div>
        <h1>Weather Now</h1>
        <p>Search real-time weather by city</p>
      </div>

      <button
        type="button"
        className={`theme-toggle ${isLight ? "light-toggle" : "dark-toggle"}`}
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        <span className="toggle-circle"></span>
      </button>
    </header>
  );
};

export default Header;