import { useState } from "react";

const SearchBar = ({
  city,
  setCity,
  fetchWeather,
  suggestions,
  suggestionLoading,
  fetchWeatherByCoords,
}) => {
  const [activeIndex, setActiveIndex] = useState(-1);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (activeIndex >= 0 && suggestions[activeIndex]) {
      fetchWeatherByCoords(suggestions[activeIndex]);
      setActiveIndex(-1);
      return;
    }

    fetchWeather(city);
    setActiveIndex(-1);
  };

  const handleKeyDown = (event) => {
    if (!suggestions.length) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();

      setActiveIndex((previousIndex) =>
        previousIndex < suggestions.length - 1 ? previousIndex + 1 : 0
      );
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();

      setActiveIndex((previousIndex) =>
        previousIndex > 0 ? previousIndex - 1 : suggestions.length - 1
      );
    }

    if (event.key === "Enter") {
      if (activeIndex >= 0 && suggestions[activeIndex]) {
        event.preventDefault();
        fetchWeatherByCoords(suggestions[activeIndex]);
        setActiveIndex(-1);
      }
    }

    if (event.key === "Escape") {
      setActiveIndex(-1);
    }
  };

  const handleInputChange = (event) => {
    setCity(event.target.value);
    setActiveIndex(-1);
  };

  const handleSuggestionClick = (item) => {
    fetchWeatherByCoords(item);
    setActiveIndex(-1);
  };

  return (
    <div className="search-wrapper">
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />

        <button type="submit">Search</button>
      </form>

      {suggestionLoading && (
        <p className="suggestion-status">Searching suggestions...</p>
      )}

      {suggestions.length > 0 && (
        <div className="suggestions-box">
          {suggestions.map((item, index) => (
            <button
              type="button"
              className={`suggestion-item ${
                activeIndex === index ? "active-suggestion" : ""
              }`}
              key={`${item.name}-${item.lat}-${item.lon}-${index}`}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => handleSuggestionClick(item)}
            >
              <span>
                <span className="suggestion-city">
                  {item.name}
                  {item.state ? `, ${item.state}` : ""}
                </span>

                <span className="suggestion-country">
                  {item.countryName || item.country}
                </span>
              </span>

              <span className="suggestion-icon">↗</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;