import {
    Box,
    Card,
    CardContent,
    Container,
    Grid,
    Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import { WindPower, Opacity } from "@mui/icons-material";
import SaveIcon from "./SaveIcon";

const WeatherCardStyle = styled(Card)(({ theme }) => ({
    color: theme.palette.text.primary,
    borderRadius: "35px",
}));

export type WeatherCardProps = {
    city: string;
    date: string;
    temp: number;
    condition: string;
    windspeed: number;
    humidity: number;
    icon: string;
    lat: number;
    lng: number;
    showSaveIcon?: boolean;
};

const WeatherCard = (props: WeatherCardProps) => {
    return (
        <Container
            style={{
                padding: "15px",
            }}
        >
            <Grid container justifyContent="center" alignItems="center">
                <WeatherCardStyle>
                    <CardContent className="p-4">
                        <Box
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <Typography variant="h6" className="flex-grow-1">
                                {props.city}
                            </Typography>
                            <Typography variant="h6">
                                {props.date}
                                {props.showSaveIcon && (
                                    <SaveIcon
                                        isSaved={false}
                                        location={{
                                            city: props.city,
                                            lat: props.lat,
                                            lng: props.lng,
                                        }}
                                    />
                                )}
                            </Typography>
                        </Box>

                        <Box
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                flexDirection: "column",
                                marginTop: "35px",
                                marginBottom: "30px",
                                textAlign: "center",
                            }}
                        >
                            <Typography
                                variant="h6"
                                component="h1"
                                className="display-4 font-weight-bold mb-0"
                                sx={{ color: "#1C2331" }}
                            >
                                {props.temp}°C
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                className="small"
                                sx={{ color: "#868B94" }}
                            >
                                {props.condition}
                            </Typography>
                        </Box>

                        <Grid container alignItems="center">
                            <Grid item xs={8} sx={{ fontSize: "1rem" }}>
                                <Box
                                    style={{
                                        display: "flex",
                                        marginBottom: "10px",
                                    }}
                                >
                                    <WindPower />
                                    <Typography className="ms-1">
                                        {props.windspeed} km/h
                                    </Typography>
                                </Box>
                                <Box
                                    style={{
                                        display: "flex",
                                        marginBottom: "10px",
                                    }}
                                >
                                    <Opacity sx={{ color: "#868B94" }} />
                                    <Typography className="ms-1">
                                        {props.humidity}%
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={4} margin="0px">
                                <img
                                    src={props.icon}
                                    alt="weather"
                                    width="100px"
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                </WeatherCardStyle>
            </Grid>
        </Container>
    );
};

export default WeatherCard;
