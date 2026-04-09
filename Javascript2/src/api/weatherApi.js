import { validateWeatherData } from "../Validators/weatherValidation.js";

const BASE_URL = "https://api.open-meteo.com/v1/forecast"

export async function getWeather(lat, lon) {
    const response = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lon}&current_weather=true`);

    if (!response.ok) {
        throw new Error("Failed to fetch weather data");
    }

    const data = await response.json();

    return data;
}