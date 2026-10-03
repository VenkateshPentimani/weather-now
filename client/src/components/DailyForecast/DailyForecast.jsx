import { celsiusToFahrenheit } from "../../utils/unitConversion";
import "./DailyForecast.css";

function DailyForecast({
  daily,
  selectedDay,
  onDaySelect,
  units,
}) {
  return (
    <section className="daily-forecast">

      <h2 className="daily-forecast__title">
        Daily Forecast
      </h2>

      <div className="daily-forecast__list">

        {daily.map((forecast) => {
          const highTemperature =
            units.temperature === "F"
              ? celsiusToFahrenheit(forecast.high)
              : forecast.high;

          const lowTemperature =
            units.temperature === "F"
              ? celsiusToFahrenheit(forecast.low)
              : forecast.low;

          return (
            <button
              className={`forecast-card ${
                selectedDay === forecast.day
                  ? "forecast-card--selected"
                  : ""
              }`}
              key={forecast.id}
              onClick={() => onDaySelect(forecast.day)}
              type="button"
            >

              <span className="forecast-card__day">
                {forecast.day}
              </span>

              <img
                src={forecast.icon}
                alt=""
                className="forecast-card__icon"
              />

              <span className="forecast-card__temperatures">
                <span>{Math.round(highTemperature)}°</span>

                <span>
                  {Math.round(lowTemperature)}°
                </span>
              </span>

            </button>
          );
        })}

      </div>

    </section>
  );
}

export default DailyForecast;