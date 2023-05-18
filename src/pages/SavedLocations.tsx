import Container from "@mui/material/Container";
import PlaceCard from "../components/PlaceCard";
import useSavedLocations from "../hooks/useSavedLocations";

const SavedLocations = () => {
    const { savedLocations } = useSavedLocations();

    return (
        <Container component="main" maxWidth="xs">
            {savedLocations.map((location) => (
                <PlaceCard
                    key={location.createdAt.nanoseconds}
                    location={location}
                    isSaved
                />
            ))}
        </Container>
    );
};

export default SavedLocations;
