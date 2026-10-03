const getCoordinates = async (city) => {
  const url =
    `https://geocoding-api.open-meteo.com/v1/search` +
    `?name=${encodeURIComponent(city)}` +
    `&count=1` +
    `&language=en` +
    `&format=json`;

  const response = await fetch(url);
  if (!response.ok) {
    const error = new Error("Unable to find city");
    error.statusCode = 404;
    throw error;
  }
  const data = await response.json();

  if (!data.results || data.results.length === 0) {
    const error = new Error("City not found");
    error.statusCode = 404;
    throw error;
  }

  const location = data.results[0];

  return {
    city: location.name,
    country: location.country,
    latitude: location.latitude,
    longitude: location.longitude,
  };
};

const getWeatherData = async (latitude, longitude) => {
  const url =
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${latitude}` +
    `&longitude=${longitude}` +
    `&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m` +
    `&hourly=temperature_2m,weather_code` +
    `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum` +
    `&timezone=auto` +
    `&forecast_days=7`;

  const response = await fetch(url);
  if (!response.ok) {
    const error = new Error("Unable to fetch weather data from Open-Meteo");

    error.statusCode = 502;

    throw error;
  }
  return await response.json();
};

module.exports = {
  getCoordinates,
  getWeatherData,
};
