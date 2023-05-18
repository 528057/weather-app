import { useEffect, useState } from "react";

const useUserLocation = () => {
    const [postions, setPositions] = useState<GeolocationCoordinates>();
    const [status, setStatus] = useState<GeolocationPositionError>();

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setPositions(position.coords);
                },
                (error) => {
                    setStatus(error);
                }
            );
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }, []);

    return { postions, status };
};

export default useUserLocation;
