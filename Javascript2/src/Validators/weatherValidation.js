function getWeatherDescription(code) {
    if (code === 0) return "Clear Sky";
    if (code === 1) return "Mainly clear";
    if (code === 2) return "Partly cloudy";
    if (code === 3) return "Overcast";

    if (code === 45 || code === 48) return "Fog";

    if (code === 51 || code === 53 || code === 55) return "Drizzle";
    if (code === 56 || code === 57) return "Freezing drizzle";

    if (code === 61 || code === 63 || code === 65) return "Rain";
    if (code === 66 || code === 67) return "Freezing rain";

    if (code === 71 ||code === 73 ||code === 75) return "Snow";
    if (code === 77) return "Snow grains";

    if (code === 80 || code === 81 || code === 82) return "Rain showers";
    if (code === 85 || code === 86) return "Snow showers";

    if (code === 95) return "Thunderstorm";
    if (code === 96 || code === 99) return "Thunderstorm with hail";

    return "Unknown weather";
}


export function validateWeatherData(data) {
    if (!data) {
        throw new Error("Invalid weather data");
    }

    const current = data.current_weather

    return {
        temperature: current.temperature ?? null,
        windSpeed: current.windspeed ?? null,
        weatherCode: current.weathercode ?? null,
        condition: getWeatherDescription(current.weathercode),
        time: current.time ?? "Unknown",
    };
}