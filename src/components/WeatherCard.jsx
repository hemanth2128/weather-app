const WeatherCard = ({ weather }) => {
  if (!weather) return null;

  const iconCode = weather.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

  const getCountryName = (countryCode) => {
    if (!countryCode) return "";
    const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
    return regionNames.of(countryCode);
  };

  return (
    <section className="weather-card">
      <h2>
        {weather.name}, {getCountryName(weather.sys.country)}
      </h2>

      <img src={iconUrl} alt={weather.weather[0].description} />

      <h3>{Math.round(weather.main.temp)}°C</h3>

      <p className="condition">{weather.weather[0].main}</p>
      <p className="description">{weather.weather[0].description}</p>

      <div className="weather-details">
        <div>
          <span>Humidity</span>
          <strong>{weather.main.humidity}%</strong>
        </div>

        <div>
          <span>Wind</span>
          <strong>{weather.wind.speed} m/s</strong>
        </div>

        <div>
          <span>Feels Like</span>
          <strong>{Math.round(weather.main.feels_like)}°C</strong>
        </div>
      </div>
    </section>
  );
};

export default WeatherCard;