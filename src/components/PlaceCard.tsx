import { Typography, Card, CardContent, CardActions } from "@mui/material";
import ButtonLink from "./ButtonLink";
import { Location } from "../utils/firebase";
import SaveIcon from "./SaveIcon";

type FavouritePlaceProps = {
    location: Location;
    isSaved?: boolean;
};

const PlaceCard = ({ location, isSaved = false }: FavouritePlaceProps) => {
    return (
        <Card
            style={{
                maxWidth: 300,
                margin: "0 auto",
                backgroundColor: "#f5f5f5",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                borderRadius: 8,
                textAlign: "left",
            }}
        >
            <CardContent>
                <div>
                    <Typography variant="h6">{location.city}</Typography>
                    <SaveIcon isSaved={isSaved} location={location} />
                </div>
                <Typography variant="body1">
                    Latitude: {location.lat}
                </Typography>
                <Typography variant="body1">
                    Longitude: {location.lng}
                </Typography>
            </CardContent>
            <CardActions>
                <ButtonLink
                    to="/weather/$lat/$lng/$city"
                    params={{
                        lat: `${location.lat}`,
                        lng: `${location.lng}`,
                        city: `${location.city}`,
                    }}
                    size="small"
                    color="primary"
                >
                    Check Weather
                </ButtonLink>
            </CardActions>
        </Card>
    );
};

export default PlaceCard;
