const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/weather";

export const getWeather = async (city) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}?city=${encodeURIComponent(city)}`,
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch weather data");
    }

    return data;
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error("Unable to connect to the weather server.", {
        cause: error,
      });
    }

    throw error;
  }
};
