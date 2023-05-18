import {
    Autocomplete,
    AutocompleteChangeReason,
    AutocompleteInputChangeReason,
    CircularProgress,
    TextField,
} from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import React from "react";
import usePlacesAutocomplete, {
    getLatLng,
    getGeocode,
} from "use-places-autocomplete";

const SearchBar = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const {
        setValue,
        suggestions: { loading, data },
        clearSuggestions,
    } = usePlacesAutocomplete({
        debounce: 300,
    });

    const onSearchChange = (
        _event: React.SyntheticEvent<Element, Event>,
        value: string,
        reason: AutocompleteInputChangeReason
    ) => {
        if (reason === "input") {
            setValue(value);
        } else {
            clearSuggestions();
        }
    };

    const onValueSelect = (
        event: React.SyntheticEvent<Element, Event>,
        value: google.maps.places.AutocompletePrediction | null,
        reason: AutocompleteChangeReason
    ) => {
        if (reason === "selectOption") {
            getGeocode({ address: value?.description }).then((results) => {
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

                navigate({
                    to: "/weather/$lat/$lon/$city",
                    params: {
                        lat: `${lat}`,
                        lon: `${lng}`,
                        city: regionName ?? "",
                    },
                    replace: true,
                });
                clearSuggestions();
            });
        }
    };

    return (
        <Autocomplete
            sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: "60%",
                margin: "0 20px",
            }}
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            isOptionEqualToValue={(option, value) =>
                option.description === value.description
            }
            getOptionLabel={(option) => option.description}
            options={data}
            loading={loading}
            onChange={onValueSelect}
            onInputChange={onSearchChange}
            renderInput={(params) => (
                <>
                    <TextField
                        {...params}
                        label="Search input"
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <>
                                    {loading ? (
                                        <CircularProgress
                                            color="inherit"
                                            size={20}
                                        />
                                    ) : null}
                                    {params.InputProps.endAdornment}
                                </>
                            ),
                        }}
                    />
                </>
            )}
        />
    );
};

export default SearchBar;
