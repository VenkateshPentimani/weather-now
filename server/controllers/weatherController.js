const {
  getCoordinates,
  getWeatherData,
} = require("../services/WeatherService");
const SearchHistory = require("../models/SearchHistory");

// Convert Open-Meteo weather code into readable condition

const getWeatherCondition = (weatherCode) => {
  if (weatherCode === 0) {
    return "Clear Sky";
  }

  if (weatherCode === 1 || weatherCode === 2) {
    return "Partly Cloudy";
  }

  if (weatherCode === 3) {
    return "Overcast";
  }

  if (weatherCode === 45 || weatherCode === 48) {
    return "Foggy";
  }

  if (weatherCode >= 51 && weatherCode <= 57) {
    return "Drizzle";
  }

  if (weatherCode >= 61 && weatherCode <= 67) {
    return "Rain";
  }

  if (weatherCode >= 71 && weatherCode <= 77) {
    return "Snow";
  }

  if (weatherCode >= 80 && weatherCode <= 82) {
    return "Rain Showers";
  }

  if (weatherCode >= 95 && weatherCode <= 99) {
    return "Thunderstorm";
  }

  return "Unknown";
};

const getWeatherIcon = (weatherCode) => {
  if (weatherCode === 0) {
    return "/assets/images/icon-sunny.webp";
  }

  if (weatherCode === 1 || weatherCode === 2) {
    return "/assets/images/icon-partly-cloudy.webp";
  }

  if (
    weatherCode === 61 ||
    weatherCode === 63 ||
    weatherCode === 65 ||
    weatherCode === 80 ||
    weatherCode === 81 ||
    weatherCode === 82
  ) {
    return "/assets/images/icon-rain.webp";
  }

  return "/assets/images/icon-partly-cloudy.webp";
};

// Main controller
const getWeather = async (req, res, next) => {
  try {
    const { city } = req.query;

    // Check whether city was provided
    if (!city || city.trim() === "") {
      return res.status(400).json({
        message: "City name is required",
      });
    }

    console.log("Weather requested for:", city);

    const location = await getCoordinates(city);

    const weatherData = await getWeatherData(
      location.latitude,
      location.longitude,
    );

    console.log("Open-Meteo response received");

    await SearchHistory.create({
      city: location.city,
      country: location.country,
    });

    return res.status(200).json({
      location: {
        city: location.city,
        country: location.country,
      },

      current: {
        temperature: weatherData.current.temperature_2m,

        feelsLike: weatherData.current.apparent_temperature,

        humidity: weatherData.current.relative_humidity_2m,

        windSpeed: weatherData.current.wind_speed_10m,

        precipitation: weatherData.daily?.precipitation_sum?.[0] ?? 0,
        condition: getWeatherCondition(weatherData.current.weather_code),

        icon: getWeatherIcon(weatherData.current.weather_code),
      },

      daily: weatherData.daily.time.map((date, index) => ({
        id: index + 1,

        day: new Date(date).toLocaleDateString("en-US", {
          weekday: "short",
        }),

        high: weatherData.daily.temperature_2m_max[index],

        low: weatherData.daily.temperature_2m_min[index],

        icon: getWeatherIcon(weatherData.daily.weather_code[index]),
      })),

      hourly: weatherData.hourly.time.reduce((hourlyByDay, time, index) => {
        const date = new Date(time);

        const day = date.toLocaleDateString("en-US", {
          weekday: "short",
        });

        if (!hourlyByDay[day]) {
          hourlyByDay[day] = [];
        }

        hourlyByDay[day].push({
          id: index + 1,

          time: time,

          temperature: weatherData.hourly.temperature_2m[index],

          icon: getWeatherIcon(weatherData.hourly.weather_code[index]),
        });

        return hourlyByDay;
      }, {}),
    });
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
};
const getSearchHistory = async (req, res, next) => {
  try {
    const history = await SearchHistory.find()
      .sort({ searchedAt: -1 })
      .limit(10);

    res.status(200).json(history);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getWeather,
  getSearchHistory,
};
