import { useEffect, useState } from "react";
import "../styles/WeatherWidget.css";
/* Väderwidgetten hämtar data från apiet. nu är det hårdkodat till en plats i Sverige */
function WeatherWidget() {
  const latitude = 59.60840398913638;
  const longitude = 16.53267630028628;
  const [weather, setWeather] = useState(null);
  const [hourlyTemps, setHourlyTemps] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m&windspeed_unit=ms&temperature_unit=celsius`,
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
        /* Kollar om det finns väderdata i API:et, annars skrivs ett felmeddelande. */
        if (!current || !hourly) {
          throw new Error("No current weather in API response");
        }
        /* Sätter väderdata i state. */
        setWeather({
          temperature: current.temperature ?? current.temp,
          windspeed: current.windspeed ?? current.wind_speed,
          weathercode: current.weathercode ?? current.weather_code ?? 0,
        });
        const today = new Date().toISOString().split("T")[0];
        /* Skapar en array med timme och temperatur för varje timme idag. */
        const hourlyDataForToday = hourly.time
          .map((time, index) => ({
            time,
            temperature: hourly.temperature_2m[index],
          }))
          .filter((entry) => entry.time.startsWith(today));

        setHourlyTemps(hourlyDataForToday);
        /* Sätter error till en tom sträng om allt gick bra. */
      })
      .catch(() => {
        setWeather(null);
        setHourlyTemps([]);
        setError("Kunde inte hämta väderdata just nu.");
      });
    /* useEffect körs när komponenten mountas och när latitude eller longitude ändras. */
  }, [latitude, longitude]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!weather) {
    return <p>Loading weather...</p>;
  }
  /* Ändrar bakgrundsbilden beroende på väderkoden som returneras från APIet. */
  let background = "clear";

  if (weather.weathercode >= 1 && weather.weathercode < 3) {
    background = "clouds";
  } else if (weather.weathercode >= 60 && weather.weathercode < 69) {
    background = "rain";
  } else if (weather.weathercode >= 70 && weather.weathercode < 79) {
    background = "snow";
  } else if (weather.weathercode >= 95 && weather.weathercode < 99) {
    background = "thunder";
  }
  /* Skriver ut bakgrundsbilden och väderinformation */
  return (
    <div className={`weather-card ${background}`}>
      <div className="weather-overlay">
        <div className="weather-now">
          <h2>Här vill jag ha land som hämtas från API</h2>
          <p>Temperature: {weather.temperature} °C</p>
          <p>Wind speed: {weather.windspeed} m/s</p>
          <p>Condition: {background}</p>
        </div>

        {/* Loopar hourlyTemps och skriver ut varje timme och temperaturen. */}
        <div className="weather-hours">
          <h3>Today by hour</h3>
          <div className="hourly-list">
            {hourlyTemps.map((hour) => (
              <div key={hour.time} className="hour-item">
                <span>{hour.time.slice(11, 13)}</span>
                <span>{hour.temperature} °C</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherWidget;
