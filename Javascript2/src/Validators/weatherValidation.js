export function validateWeatherdata(data) {
    if (!data) {
        throw new Error("Invalid weather data");
    }

    const current = data.current

    return {
        temperature: current.temperature_2m ?? null,
        windSpeed: current.wind_speed_10m ?? null,
        weatherCode: current.weather_code ?? null,
        time: current.time ?? "Unknown"
    }
}