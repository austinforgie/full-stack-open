import { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState([]);
  const OPEN_WEATHER_API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY;
  const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${OPEN_WEATHER_API_KEY}`;

  const fetchWeatherData = () => {
    axios
      .get(WEATHER_API_URL)
      .then((response) => setWeather(response.data))
      .catch((error) =>
        console.error("Error when fetching weather data:", error)
      );
  };

  useEffect(() => fetchWeatherData(), [OPEN_WEATHER_API_KEY, capital]);

  return (
    <section>
      {weather.main && (
        <>
          <h2>Weather in {capital}</h2>
          <p>temperature {weather.main.temp} Celsius</p>
          <p>wind {weather.wind.speed} m/s</p>
        </>
      )}
    </section>
  );
};

export default Weather;
