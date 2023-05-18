import { TextField } from "@mui/material";
import {
    Control,
    Controller,
    FieldValues,
    RegisterOptions,
} from "react-hook-form";
import { LocalizationKeys, useTranslation } from "../../hooks/useTranslation";

type FormInputProps<TValue extends FieldValues> = {
    name: string;
    label: LocalizationKeys;
    type?: React.HTMLInputTypeAttribute;
    control: Control<TValue>;
    rules?: Omit<
        RegisterOptions<FieldValues, string>,
        "valueAsNumber" | "valueAsDate" | "setValueAs"
    >;
};

const FormInput = <TValue extends FieldValues = FieldValues>({
    name,
    control,
    label,
    type = "text",
    rules,
}: FormInputProps<TValue>) => {
    const t = useTranslation();

    return (
        <Controller
            name={name}
            control={control as Control<FieldValues>}
            rules={rules}
            render={({
                field: { name, onChange, onBlur, ref, value },
                fieldState: { error, invalid },
            }) => (
                <TextField
                    required={!!rules?.required}
                    value={value}
                    inputRef={ref}
                    margin="normal"
                    type={type}
                    fullWidth
                    id={name}
                    label={t(label)}
                    onBlur={onBlur}
                    onChange={(event) => onChange(event.target.value)}
                    name={name}
                    error={invalid}
                    helperText={error?.message}
                />
            )}
        />
    );
};

export default FormInput;
