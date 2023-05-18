import Container from "@mui/material/Container";

import { useTranslation } from "../hooks/useTranslation";
import { useParams } from "@tanstack/react-router";
import usePageTitle from "../hooks/usePageTitle";
import WeatherDetails from "../components/WeatherDetails";

const Weather = () => {
    const t = useTranslation();
    usePageTitle(t("weather.title"));
    const params = useParams({
        from: "/weather/$lat/$lng/$city",
        track: (params) => ({
            lat: Number(params.lat),
            lng: Number(params.lng),
            city: params.city,
        }),
    });

    return (
        <Container component="main">
            <h1>{t("weather.title")}</h1>
            <WeatherDetails {...params} />
        </Container>
    );
};

export default Weather;
