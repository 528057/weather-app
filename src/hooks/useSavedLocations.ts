import { useEffect, useState } from "react";
import { Location, userSavedLocations } from "../utils/firebase";
import { onSnapshot } from "firebase/firestore";
import useLoggedInUser from "./useLoggedInUser";

const useSavedLocations = () => {
    const [savedLocations, setSavedLocations] = useState<Location[]>([]);
    const user = useLoggedInUser();

    useEffect(() => {
        if (user?.uid) {
            onSnapshot(userSavedLocations(user.uid), (snapshot) => {
                setSavedLocations(snapshot.docs.map((doc) => doc.data()));
            });
        }
    }, [user?.uid]);

    return { savedLocations };
};

export default useSavedLocations;
