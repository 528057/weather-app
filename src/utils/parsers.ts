import { WeatherCardProps } from "../components/WeatherCard";
import { CurrentWeather, Forecastday, Location } from "./types";

export const parseCurrentToCard = (
    current: CurrentWeather,
    location: Location
): WeatherCardProps => ({
    temp: current.temp_c,
    city: location.name,
    condition: current.condition.text,
    date: current.last_updated,
    icon: current.condition.icon,
    humidity: current.humidity,
    windspeed: current.wind_kph,
    lat: location.lat,
    lng: location.lon,
});

export const parseForecastToCard = (
    forecast: Forecastday[],
    location: Location
): WeatherCardProps[] => {
    return forecast.map((day) => ({
        temp: day.day.avgtemp_c,
        city: location.name,
        condition: day.day.condition.text,
        date:
            typeof day.date === "string"
                ? day.date
                : day.date.toLocaleDateString(),
        icon: day.day.condition.icon,
        humidity: day.day.avghumidity,
        windspeed: day.day.maxwind_kph,
        lat: location.lat,
        lng: location.lon,
    }));
};
