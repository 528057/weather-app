import Container from "@mui/material/Container";
import PlaceCard from "../components/PlaceCard";
import useSavedLocations from "../hooks/useSavedLocations";
import usePageTitle from "../hooks/usePageTitle";

const SavedLocations = () => {
    const { savedLocations } = useSavedLocations();
    usePageTitle("saved-locations.title");

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
