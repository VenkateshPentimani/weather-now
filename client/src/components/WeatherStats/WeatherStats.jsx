import "./WeatherStats.css";
import {
  celsiusToFahrenheit,
  kmhToMph,
  mmToInches,
} from "../../utils/unitConversion";

function WeatherStats({ current, units }) {
  const temperature =
    units.temperature === "F"
      ? celsiusToFahrenheit(current.feelsLike)
      : current.feelsLike;

  const wind =
    units.wind === "mph" ? kmhToMph(current.windSpeed) : current.windSpeed;

  const precipitation =
    units.precipitation === "in"
      ? mmToInches(current.precipitation)
      : current.precipitation;

  const stats = [
    {
      label: "Feels Like",
      value: `${Math.round(temperature)}°`,
    },
    {
      label: "Humidity",
      value: `${current.humidity}%`,
    },
    {
      label: "Wind",
      value: `${wind.toFixed(1)} ${units.wind === "mph" ? "mph" : "km/h"}`,
    },
    {
      label: "Precipitation",
      value: `${precipitation.toFixed(1)} ${
        units.precipitation === "in" ? "in" : "mm"
      }`,
    },
  ];

  return (
    <section className="weather-stats">
      {stats.map((stat) => (
        <div className="weather-stat" key={stat.label}>
          <p className="weather-stat__label">{stat.label}</p>

          <p className="weather-stat__value">{stat.value}</p>
        </div>
      ))}
    </section>
  );
}

export default WeatherStats;
