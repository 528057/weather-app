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
import usePlacesAutocomplete from "use-places-autocomplete";
import useGetPositionFromApi from "../hooks/useGetPositionFromApi";

const SearchBar = () => {
    const navigate = useNavigate();
    const { onAddressSubmit } = useGetPositionFromApi();
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

    const onValueSelect = async (
        _event: React.SyntheticEvent<Element, Event>,
        value: google.maps.places.AutocompletePrediction | null,
        reason: AutocompleteChangeReason
    ) => {
        if (reason === "selectOption") {
            if (value?.description) {
                const { city, lat, lng } = await onAddressSubmit({
                    address: value.description,
                });
                navigate({
                    to: "/weather/$lat/$lng/$city",
                    params: { lat: `${lat}`, lng: `${lng}`, city: `${city}` },
                    replace: true,
                });
            }
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
