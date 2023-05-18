import {
    Typography,
    Card,
    CardContent,
    CardActions,
    IconButton,
    useTheme,
} from "@mui/material";
import ButtonLink from "./ButtonLink";
import {
    Location,
    addSavedLocation,
    deleteSavedLocation,
} from "../utils/firebase";
import { Save } from "@mui/icons-material";
import useLoggedInUser from "../hooks/useLoggedInUser";

type FavouritePlaceProps = {
    location: Location;
    isSaved?: boolean;
};

const PlaceCard = ({ location, isSaved = false }: FavouritePlaceProps) => {
    const theme = useTheme();
    const user = useLoggedInUser();
    const handleSaveClick = () => {
        if (user?.uid) {
            if (isSaved) {
                deleteSavedLocation(user.uid, location);
            } else {
                addSavedLocation(user?.uid, location);
            }
        }
    };

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
                    <IconButton
                        disabled={!user?.uid}
                        onClick={handleSaveClick}
                        color="primary"
                    >
                        <Save
                            style={{
                                color: isSaved
                                    ? theme.palette.primary.main
                                    : theme.palette.grey[500],
                            }}
                        />
                    </IconButton>
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
                    to="/weather/$lat/$lon/$city"
                    params={{
                        lat: `${location.lat}`,
                        lon: `${location.lng}`,
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
