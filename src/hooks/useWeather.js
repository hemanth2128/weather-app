import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const useWeather = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [suggestionLoading, setSuggestionLoading] = useState(false);
  const [error, setError] = useState("");

  const getCountryName = (countryCode) => {
    if (!countryCode) return "";
    const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
    return regionNames.of(countryCode);
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (city.trim().length < 2) {
        setSuggestions([]);
        return;
      }

      if (!API_KEY) {
        return;
      }

      try {
        setSuggestionLoading(true);

        const response = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`
        );

        const data = await response.json();

        if (Array.isArray(data)) {
          const formattedSuggestions = data.map((item) => ({
            name: item.name,
            state: item.state,
            country: item.country,
            countryName: getCountryName(item.country),
            lat: item.lat,
            lon: item.lon,
          }));

          setSuggestions(formattedSuggestions);
        }
      } catch (err) {
        setSuggestions([]);
      } finally {
        setSuggestionLoading(false);
      }
    };

    const timer = setTimeout(fetchSuggestions, 500);

    return () => clearTimeout(timer);
  }, [city]);

  const fetchWeather = async (cityName) => {
    if (!cityName.trim()) {
      setError("Please enter a city name.");
      setWeather(null);
      return;
    }

    if (!API_KEY) {
      setError("API key is missing. Please add it in your .env file.");
      setWeather(null);
      return;
    }

    try {
      setLoading(true);
      setError("");
      setWeather(null);
      setSuggestions([]);

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to fetch weather data.");
      }

      setWeather(data);
      setCity("");
    } catch (err) {
      setError("City not found. Please choose a valid city from suggestions.");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByCoords = async (selectedCity) => {
    if (!API_KEY) {
      setError("API key is missing. Please add it in your .env file.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setWeather(null);
      setSuggestions([]);

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${selectedCity.lat}&lon=${selectedCity.lon}&appid=${API_KEY}&units=metric`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to fetch weather data.");
      }

      setWeather(data);
      setCity("");
    } catch (err) {
      setError("Unable to fetch weather for selected city.");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return {
    weather,
    city,
    setCity,
    suggestions,
    suggestionLoading,
    loading,
    error,
    fetchWeather,
    fetchWeatherByCoords,
  };
};

export default useWeather;