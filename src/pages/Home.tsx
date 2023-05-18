import { Box, Typography } from "@mui/material";

import usePageTitle from "../hooks/usePageTitle";
import { LocalizationKeys } from "../hooks/useTranslation";
import useUserLocation from "../hooks/useUserLocation";
import LocalizeMessage from "../components/LocalizeMessage";
import useGetPositionFromApi from "../hooks/useGetPositionFromApi";
import { useEffect, useRef, useState } from "react";
import WeatherDetails, {
    WeatherDetailsProps,
} from "../components/WeatherDetails";

type PositionStatusProps = {
    id: LocalizationKeys;
};

const PositionStatus = ({ id }: PositionStatusProps) => {
    return (
        <>
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography component="h1" variant="h2">
                    <LocalizeMessage id={id} />
                </Typography>
            </Box>
        </>
    );
};

const Home = () => {
    usePageTitle("app.title");
    const { postions, status } = useUserLocation();
    const [location, setLocation] = useState<WeatherDetailsProps>();
    const { onAddressSubmit } = useGetPositionFromApi();
    const isFetching = useRef(false);

    useEffect(() => {
        if (postions && !isFetching.current) {
            isFetching.current = true;
            onAddressSubmit({
                location: { lat: postions.latitude, lng: postions.longitude },
            }).then((data) => {
                setLocation({
                    city: data.city || "",
                    lat: data.lat,
                    lng: data.lng,
                });
            });
        }
    }, [onAddressSubmit, postions]);

    if (status?.POSITION_UNAVAILABLE || status?.PERMISSION_DENIED) {
        return <PositionStatus id="home.positionDenied" />;
    }

    if (!postions || !location) {
        return <PositionStatus id="common.loading" />;
    }

    return (
        <>
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <WeatherDetails {...location} />
            </Box>
        </>
    );
};

export default Home;
