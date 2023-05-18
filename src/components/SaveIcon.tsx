import { Favorite } from "@mui/icons-material";
import { IconButton, useTheme } from "@mui/material";
import useLoggedInUser from "../hooks/useLoggedInUser";
import {
    deleteSavedLocation,
    addSavedLocation,
    Location,
} from "../utils/firebase";

type SaveIconProps = {
    isSaved?: boolean;
    location: Omit<Location, "createdAt">;
};

const SaveIcon = ({ isSaved = false, location }: SaveIconProps) => {
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
        <IconButton disabled={!user?.uid} onClick={handleSaveClick}>
            <Favorite
                style={{
                    color: isSaved
                        ? theme.palette.primary.main
                        : theme.palette.grey[500],
                }}
            />
        </IconButton>
    );
};

export default SaveIcon;
