import { validateWeatherData } from "../Validators/weatherValidation.js";

const BASE_URL = "https://api.open-meteo.com/v1/forecast"

export async function getWeather(lat, lon) {
    const response = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,weathercode&daily=temperature_2m_max,temperature_2m_min,weathercode&windspeed_unit=ms&temperature_unit=celsius`);

    if (!response.ok) {
        throw new Error("Failed to fetch weather data");
    }

    const data = await response.json();

    const currentWeather = validateWeatherData(data);

    return {
        ...currentWeather,
        hourly: data.hourly,
        daily: data.daily
    };
}