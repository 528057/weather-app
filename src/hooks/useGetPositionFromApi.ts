import { getGeocode, getLatLng } from "use-places-autocomplete";

const useGetPositionFromApi = () => {
    const onAddressSubmit = async (args: google.maps.GeocoderRequest) => {
        return getGeocode(args).then((results) => {
            const regionName = results[0].address_components.find(
                (component) => {
                    if (
                        component.types.includes("locality") ||
                        component.types.includes(
                            "administrative_area_level_1"
                        ) ||
                        component.types.includes("country")
                    ) {
                        return component.long_name;
                    }
                    return null;
                }
            )?.long_name;

            const { lat, lng } = getLatLng(results[0]);

            return { lat, lng, city: regionName };
        });
    };

    return { onAddressSubmit };
};

export default useGetPositionFromApi;
