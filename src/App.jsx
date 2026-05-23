import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import Loader from "./components/Loader";
import useWeather from "./hooks/useWeather";
import "./App.css";

const App = () => {
  const {
    weather,
    city,
    setCity,
    suggestions,
    suggestionLoading,
    loading,
    error,
    fetchWeather,
    fetchWeatherByCoords,
  } = useWeather();

  return (
    <main className="app">
      <div className="app-container">
        <Header />

        <SearchBar
          city={city}
          setCity={setCity}
          fetchWeather={fetchWeather}
          suggestions={suggestions}
          suggestionLoading={suggestionLoading}
          fetchWeatherByCoords={fetchWeatherByCoords}
        />

        {loading && <Loader />}

        {error && <p className="error-message">{error}</p>}

        <WeatherCard weather={weather} />

        {!weather && !loading && !error && (
          <section className="empty-state">
            <h2>Welcome to WeatherNow</h2>
            <p>Search for any city to view live weather information.</p>
          </section>
        )}
      </div>
    </main>
  );
};

export default App;