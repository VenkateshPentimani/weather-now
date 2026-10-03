import { celsiusToFahrenheit } from "../../utils/unitConversion";
import "./HourlyForecast.css";

const formatTime = (time) => {
  const date = new Date(time);

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    hour12: true,
  });
};

const getFullDayName = (day) => {
  const dayNames = {
    Sun: "Sunday",
    Mon: "Monday",
    Tue: "Tuesday",
    Wed: "Wednesday",
    Thu: "Thursday",
    Fri: "Friday",
    Sat: "Saturday",
  };

  return dayNames[day] || day;
};

function HourlyForecast({
  hourly,
  selectedDay,
  onDaySelect,
  units,
}) {
  const availableDays = Object.keys(hourly || {});

  const activeDay =
    selectedDay && hourly?.[selectedDay]
      ? selectedDay
      : availableDays[0] || "";

  const currentHourlyData = hourly?.[activeDay] || [];

  return (
    <section className="hourly-forecast">

      {/* Header */}
      <div className="hourly-forecast__header">

        <h2>Hourly forecast</h2>

        <select
          value={activeDay}
          onChange={(event) => {
            onDaySelect(event.target.value);
          }}
          aria-label="Select forecast day"
        >
          {availableDays.map((day) => (
            <option
              key={day}
              value={day}
            >
              {getFullDayName(day)}
            </option>
          ))}
        </select>

      </div>

      {/* Hourly list */}
      <div className="hourly-forecast__list">

        {currentHourlyData.map((forecast, index) => {

          const temperature =
            units.temperature === "F"
              ? celsiusToFahrenheit(forecast.temperature)
              : forecast.temperature;

          return (
            <article
              className="hourly-card"
              key={forecast.id || `${forecast.time}-${index}`}
            >

              <img
                src={forecast.icon}
                alt=""
                className="hourly-card__icon"
              />

              <p className="hourly-card__time">
                {formatTime(forecast.time)}
              </p>

              <p className="hourly-card__temperature">
                {Math.round(temperature)}°
              </p>

            </article>
          );
        })}

      </div>

    </section>
  );
}

export default HourlyForecast;