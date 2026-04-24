import { useEffect, useState } from "react";
import { getWeather } from "../api/weatherApi";
import "../styles/WeatherWidget.css";

function getWeatherType(code) {
  if (code >= 1 && code <= 3) {
    return "clouds";
  }
  if (code >= 60 && code <= 67) {
    return "rain";
  }
  if (code >= 71 && code <= 77) {
    return "snow";
  }
  if (code >= 95 && code <= 99) {
    return "thunder";
  }
  return "clear";
}

/* The weather widget fetches data from the API. It is currently hardcoded to a location in Sweden */
function WeatherWidget({ lat, lon }) {
  

  const [weather, setWeather] = useState(null);
  const [hourlyTemps, setHourlyTemps] = useState([]);
  const [dailyForecast, setDailyForecast] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getWeather(lat, lon)
      .then((data) => {
        setWeather(data);

        const hourly = data.hourly;
        const daily = data.daily;

        const today = new Date().toISOString().split("T")[0];

        /* Creates an array with time and temperature for each hour today. */
        const hourlyDataForToday = hourly.time
          .map((time, index) => ({
            time,
            temperature: hourly.temperature_2m[index],
            code: hourly.weathercode[index],
          }))
          .filter((entry) => entry.time.startsWith(today));

        setHourlyTemps(hourlyDataForToday);

        /* Creates an array with 5 days forward with max and min temperature */
        const fiveDays = daily.time.slice(0, 5).map((day, index) => ({
          date: day,
          max: daily.temperature_2m_max[index],
          min: daily.temperature_2m_min[index],
          code: daily.weathercode[index],
        }));

        setDailyForecast(fiveDays);
        /* Sets error to an empty string if everything went well. */
        setError("");
      })
      .catch(() => {
        setWeather(null);
        setHourlyTemps([]);
        setDailyForecast([]);
        setError("Couldnt fetch weather data");
      });
    /* useEffect runs when the component mounts and when latitude or longitude changes. */
  }, [lat, lon]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!weather) {
    return <p>Loading weather...</p>;
  }

  /* Changes the background image based on the weather code returned from the API. */
  let background = "clear";

  if (weather.weatherCode >= 1 && weather.weatherCode <= 3) {
    background = "clouds";
  } else if (weather.weatherCode >= 60 && weather.weatherCode <= 67) {
    background = "rain";
  } else if (weather.weatherCode >= 71 && weather.weatherCode <= 77) {
    background = "snow";
  } else if (weather.weatherCode >= 95 && weather.weatherCode <= 99) {
    background = "thunder";
  }

  const weatherIcons = {
    clear: "☀️",
    clouds: "☁️",
    rain: "🌧️",
    snow: "❄️",
    thunder: "⛈️",
  };

  /* Outputs the background image and weather information */
  return (
    <div className={`weather-card ${background}`}>
      <div className="weather-overlay">
        <div className="weather-now">
          <h1 className="weather-icon">{weatherIcons[background]}</h1>
          <h2>{weather.condition}</h2>
          <p>Temperature: {weather.temperature} °C</p>
          <p>Wind speed: {weather.windSpeed} m/s</p>
        </div>

        <div className="weather-hours">
          <h3>Today by hour</h3>
          <div className="hourly-list">
            {/* Loops through hourlyTemps and outputs each hour and the temperature */}
            {hourlyTemps.map((hour) => (
              <div key={hour.time} className="hour-item">
                <span>{hour.time.slice(11, 13)}</span>
                <span>{weatherIcons[getWeatherType(hour.code)]}</span>
                <span>{hour.temperature} °C</span>
              </div>
            ))}
          </div>
        </div>

        <div className="weather-days">
          <h3>Next 5 days</h3>
          <div className="daily-list">
            {/* Loops through dailyForecast and outputs min and max temperature for 5 days forward */}
            {dailyForecast.map((day) => (
              <div key={day.date} className="day-item">
                <span>
                  {new Date(day.date).toLocaleDateString("en-US", {
                    weekday: "short",
                  })}
                </span>
                <span>{weatherIcons[getWeatherType(day.code)]}</span>
                <span>{day.max}° / {day.min}°</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherWidget;