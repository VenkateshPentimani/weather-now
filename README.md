# Weather Now 🌤️

A responsive full-stack weather application built with React, Node.js, Express, MongoDB, and the Open-Meteo API.

The project was originally based on the Frontend Mentor Weather App challenge and was extended with a custom backend, MongoDB search-history persistence, unit conversion, error handling, and a responsive weather dashboard.

---

## 📸 Preview

![Weather Now Preview](./preview.jpg)

---

## ✨ Features

### Weather Search
- Search for weather information by city name.
- Displays the selected city and country.
- Handles invalid city searches.
- Validates empty search input.

### Current Weather
- Current temperature
- Feels-like temperature
- Weather condition
- Weather icon
- Humidity
- Wind speed
- Precipitation

### Daily Forecast
- 7-day weather forecast
- Daily weather icons
- High and low temperatures
- Selectable forecast days

### Hourly Forecast
- Hourly temperature forecast
- Weather icons
- Time display
- Day selection
- Scrollable hourly forecast panel

### Unit Conversion
The application supports:

- Celsius (°C)
- Fahrenheit (°F)
- Kilometres per hour (km/h)
- Miles per hour (mph)
- Millimetres (mm)
- Inches (in)

### Backend & Database
- Node.js and Express backend
- Open-Meteo API integration
- MongoDB database
- Mongoose
- Search history persistence
- Centralized error handling

### User Experience
- Loading state while weather data is requested
- Error state for failed requests
- Empty search validation
- Responsive layout
- Keyboard focus styles
- Accessible form controls

---

## 🛠️ Built With

### Frontend

- React
- Vite
- JavaScript
- HTML
- CSS

### Backend

- Node.js
- Express
- Mongoose
- MongoDB
- CORS
- dotenv

### Weather API

- Open-Meteo

### Development Tools

- Visual Studio Code
- Git
- GitHub
- MongoDB
- MongoDB Shell

---

## 📁 Project Structure

```text
weather-now/
│
├── client/
│   ├── assets/
│   │
│   ├── public/
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── CurrentWeather/
│   │   │   ├── DailyForecast/
│   │   │   ├── Header/
│   │   │   ├── HourlyForecast/
│   │   │   ├── SearchBar/
│   │   │   ├── UnitSelector/
│   │   │   └── WeatherStats/
│   │   │
│   │   ├── services/
│   │   │   └── weatherService.js
│   │   │
│   │   ├── utils/
│   │   │   └── unitConversion.js
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── .env.example
│   ├── eslint.config.js
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── server/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   └── weatherController.js
│   │
│   ├── middleware/
│   │   └── errorMiddleware.js
│   │
│   ├── models/
│   │   └── SearchHistory.js
│   │
│   ├── routes/
│   │   └── weatherRoutes.js
│   │
│   ├── services/
│   │   └── WeatherService.js
│   │
│   ├── .env.example
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── .gitignore
├── preview.jpg
└── README.md