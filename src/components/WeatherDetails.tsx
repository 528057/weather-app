import { memo, useMemo } from "react";
import useGetWeatherData from "../hooks/useGetWeatherData";
import WeatherCard from "./WeatherCard";
import { Container, Grid, Typography } from "@mui/material";
import { parseForecastToCard, parseCurrentToCard } from "../utils/parsers";
import LocalizeMessage from "./LocalizeMessage";
import SaveIcon from "./SaveIcon";
import useLoggedInUser from "../hooks/useLoggedInUser";

export type WeatherDetailsProps = {
    lat: number;
    lng: number;
    city: string;
};

// eslint-disable-next-line react-refresh/only-export-components
const WeatherDetails = (props: WeatherDetailsProps) => {
    const { data } = useGetWeatherData(props);
    const user = useLoggedInUser();

    const forcast = useMemo(() => {
        if (!data?.forecast.forecastday) {
            return [];
        }
        return parseForecastToCard(data?.forecast.forecastday, data?.location);
    }, [data?.forecast.forecastday, data?.location]);

    if (!data) {
        return null;
    }

    return (
        <Container>
            <Grid container justifyContent="center" alignItems="center">
                <Grid item md={8} lg={6} xl={4}>
                    <Typography variant="h2" className="flex-grow-1">
                        {data.location.name}
                    </Typography>
                    {user && (
                        <SaveIcon
                            isSaved={false}
                            location={{
                                city: props.city,
                                lat: props.lat,
                                lng: props.lng,
                            }}
                        />
                    )}
                    <WeatherCard
                        {...parseCurrentToCard(data.current, data.location)}
                        today
                    />
                </Grid>
            </Grid>

            <Typography variant="h6" className="flex-grow-1">
                <LocalizeMessage id="weather-details.forecast" />
            </Typography>
            <Grid container justifyContent="center" alignItems="center">
                {forcast.map((day, index) => (
                    <Grid item md={8} lg={6} xl={4} key={index}>
                        <WeatherCard {...day} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

const memoizedWeatherDetails = memo(WeatherDetails, (prev, next) => {
    return prev.lat === next.lat && prev.lng === next.lng;
});

export default memoizedWeatherDetails;
