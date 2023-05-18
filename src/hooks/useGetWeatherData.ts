import { useCallback, useEffect, useState } from "react";
import { WeatherDetailsProps } from "../components/WeatherDetails";
import { Weather } from "../utils/types";

type UseGetWeatherDataProps = WeatherDetailsProps;
const API_KEY = "14ec80ae4e5248599bb00330231805";
const API_URL = "http://api.weatherapi.com/v1/";

const useGetWeatherData = ({ lat, lng }: UseGetWeatherDataProps) => {
    const [weatherData, setWeatherData] = useState<Weather>();

    const getWeatherDataByCoords = useCallback(async () => {
        const data: Weather = await fetch(
            `${API_URL}forecast.json?key=${API_KEY}&q=${lat},${lng}&days=7&aqi=no&alerts=no`
        ).then((res) => res.json());

        return data;
    }, [lat, lng]);

    useEffect(() => {
        getWeatherDataByCoords().then(setWeatherData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { data: weatherData };
};

export default useGetWeatherData;
