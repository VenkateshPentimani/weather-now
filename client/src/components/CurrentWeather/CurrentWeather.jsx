import { celsiusToFahrenheit } from "../../utils/unitConversion";
import "./CurrentWeather.css";

function CurrentWeather({ weather, units }) {
  const temperature =
    units.temperature === "F"
      ? celsiusToFahrenheit(weather.current.temperature)
      : weather.current.temperature;
  return (
    <section className="current-weather">
      <div className="current-weather__location">
        <h2>
          {weather.location.city}, {weather.location.country}
        </h2>

        <p>{weather.current.condition}</p>
      </div>

      <div className="current-weather__main">
        <img
          src={weather.current.icon}
          alt={weather.current.condition}
          className="current-weather__icon"
        />

        <div className="current-weather__temperature">
          {Math.round(temperature)}°
        </div>
      </div>
    </section>
  );
}

export default CurrentWeather;
