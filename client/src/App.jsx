import { useEffect, useRef, useState } from "react";

import Header from "./components/Header/Header";
import SearchBar from "./components/SearchBar/SearchBar";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather";
import WeatherStats from "./components/WeatherStats/WeatherStats";
import DailyForecast from "./components/DailyForecast/DailyForecast";
import HourlyForecast from "./components/HourlyForecast/HourlyForecast";

import { getWeather } from "./services/weatherService";

import "./App.css";

function App() {
  const [units, setUnits] = useState({
    temperature: "C",
    wind: "km/h",
    precipitation: "mm",
  });

  const [weather, setWeather] = useState(null);
  const [selectedDay, setSelectedDay] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const weatherMainRef = useRef(null);

  const handleUnitChange = (type, value) => {
    setUnits((previous) => ({
      ...previous,
      [type]: value,
    }));
  };

  const handleSearch = async (city) => {
    try {
      setLoading(true);
      setError("");

      const data = await getWeather(city);

      console.log("Weather data received:", data);

      setWeather(data);

      if (data.daily && data.daily.length > 0) {
        setSelectedDay(data.daily[0].day);
      } else {
        setSelectedDay("");
      }
    } catch (err) {
      console.error("Weather request failed:", err);

      setError(
        err.message || "Unable to get weather data. Please try again."
      );

      setWeather(null);
      setSelectedDay("");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const updateHourlyHeight = () => {
      if (!weatherMainRef.current) {
        return;
      }

      const mainHeight = weatherMainRef.current.offsetHeight;

      const hourlyElement =
        document.querySelector(".weather-hourly");

      if (hourlyElement) {
        hourlyElement.style.height = `${mainHeight}px`;
      }
    };

    updateHourlyHeight();

    const observer = new ResizeObserver(() => {
      updateHourlyHeight();
    });

    if (weatherMainRef.current) {
      observer.observe(weatherMainRef.current);
    }

    window.addEventListener("resize", updateHourlyHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateHourlyHeight);
    };
  }, [weather]);

  return (
    <div className="app">

      <Header
        units={units}
        onUnitChange={handleUnitChange}
      />

      <SearchBar
        onSearch={handleSearch}
        loading={loading}
      />

      {loading && (
        <div className="weather-loading">
          <div className="weather-loading__spinner"></div>

          <p>Loading weather...</p>
        </div>
      )}

      {!loading && error && (
        <div
          className="weather-message weather-message--error"
          role="alert"
        >
          {error}
        </div>
      )}

      {!loading && !error && weather && (
        <main className="weather-dashboard">

          <div
            className="weather-main"
            ref={weatherMainRef}
          >
            <CurrentWeather
              weather={weather}
              units={units}
            />

            <WeatherStats
              current={weather.current}
              units={units}
            />

            <DailyForecast
              daily={weather.daily}
              selectedDay={selectedDay}
              onDaySelect={setSelectedDay}
              units={units}
            />
          </div>

          <div className="weather-hourly">
            <HourlyForecast
              hourly={weather.hourly}
              selectedDay={selectedDay}
              onDaySelect={setSelectedDay}
              units={units}
            />
          </div>

        </main>
      )}
    </div>
  );
}

export default App;