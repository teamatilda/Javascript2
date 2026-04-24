import { useEffect, useState } from 'react';
import '../styles/WeatherWidget.css';

function getWeatherType(code) {
  if (code >= 1 && code < 3) {
    return "clouds";
  }
  if (code >= 60 && code < 69) {
    return "rain";
  }
  if (code >= 70 && code < 79) {
    return "snow";
  }
  if (code >= 95 && code < 99) {
    return "thunder";
  }
  return "clear";
}

/* The weather widget fetches data from the API. It is currently hardcoded to a location in Sweden */
function WeatherWidget() {
  const latitude = 70.167984;
  const longitude = 90.907227;
  const [weather, setWeather] = useState(null);
  const [hourlyTemps, setHourlyTemps] = useState([]);
  const [dailyForecast, setDailyForecast] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,weathercode&windspeed_unit=ms&temperature_unit=celsius&daily=temperature_2m_max,temperature_2m_min,weathercode`,
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Weather API request failed");
        }
        return response.json();
      })
      .then((data) => {
        const current = data.current_weather ?? data.current;
        const hourly = data.hourly;
        /* Checks if there is weather data in the API, otherwise an error message is written. */
        if (!current || !hourly) {
          throw new Error("No current weather in API response");
        }
        /* Sets weather data in state. */
        setWeather({
          temperature: current.temperature ?? current.temp,
          windspeed: current.windspeed ?? current.wind_speed,
          weathercode: current.weathercode ?? current.weather_code ?? 0,
        });
        const today = new Date().toISOString().split('T')[0];
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
        const daily = data.daily;
        if (
          !daily ||
          !daily.time ||
          !daily.temperature_2m_max ||
          !daily.temperature_2m_min ||
          !daily.weathercode
        ) {
          throw new Error("No daily weather in API response");
        }
        const fiveDays = daily.time.slice(0, 5).map((day, index) => ({
          date: day,
          max: daily.temperature_2m_max[index],
          min: daily.temperature_2m_min[index],
          code: daily.weathercode[index],
        }));
        setDailyForecast(fiveDays);
        setError('');
        /* Sets error to an empty string if everything went well. */
      })
      .catch(() => {
        setWeather(null);
        setHourlyTemps([]);
        setDailyForecast([]);
        setError("Could not fetch weather data right now.");
      });
    /* useEffect runs when the component mounts and when latitude or longitude changes. */
  }, [latitude, longitude]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!weather) {
    return <p>Loading weather...</p>;
  }
  /* Changes the background image based on the weather code returned from the API. */
  let background = 'clear';

  if (weather.weathercode >= 1 && weather.weathercode < 3) {
    background = "clouds";
  } else if (weather.weathercode >= 60 && weather.weathercode < 69) {
    background = "rain";
  } else if (weather.weathercode >= 70 && weather.weathercode < 79) {
    background = "snow";
  } else if (weather.weathercode >= 95 && weather.weathercode < 99) {
    background = "thunder";
  }
  const weatherIcons = {
    clear: "☀️",
    clouds: "☁️",
    rain: "🌧️",
    snow: "❄️",
    thunder: "⛈️"
  };

  /* Outputs the background image and weather information */
  return (
    <div className={`weather-card ${background}`}>
      <div className="weather-overlay">
        <div className="weather-now">
          <h1 className="weather-icon">{weatherIcons[background]}</h1>
          <h2></h2>
          <p>Temperature: {weather.temperature} °C</p>
          <p>Wind speed: {weather.windspeed} m/s</p>
          <p>Condition: {background}</p>
        </div>

        {/* Loops through hourlyTemps and outputs each hour and the temperature */}
        <div className="weather-hours">
          <h3>Today by hour</h3>
          <div className="hourly-list">
            {hourlyTemps.map((hour) => (
              <div key={hour.time} className="hour-item">
                <span>{hour.time.slice(11, 13)}</span>
                <span>{weatherIcons[getWeatherType(hour.code)]}</span>
                <span>{hour.temperature} °C</span>
              </div>
            ))}
          </div>
          {/* Loops through dailyForecast and outputs min and max temperature for 5 days forward */}
          <div className="weather-days">
            <h3>Next 5 days</h3>
            <div className="daily-list">
              {dailyForecast.map((day) => (
                <div key={day.date} className="day-item">
                  <span>
                    {new Date(day.date).toLocaleDateString("en-US", {
                      weekday: "short",
                    })}
                  </span>
                  <span>{weatherIcons[getWeatherType(day.code)]}</span>
                  <span>
                    {day.max}° / {day.min}°
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherWidget;
