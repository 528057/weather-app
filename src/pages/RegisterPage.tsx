import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { useTranslation } from "../hooks/useTranslation";
import Copyright from "../components/Copyright";
import LogoTitle from "../components/LogoTitle";
import usePageTitle from "../hooks/usePageTitle";
import { SubmitHandler, useForm } from "react-hook-form";
import FormInput from "../components/form/FormInput";
import { signUp, updateProfile } from "../utils/firebase";
import { UserCredential } from "firebase/auth";
import useLoggedInUser from "../hooks/useLoggedInUser";
import { useNavigate } from "@tanstack/react-router";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { useState } from "react";

type RegisterFormData = {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
};

export default function RegisterPage() {
    const t = useTranslation();
    const { handleSubmit, control, getValues } = useForm<RegisterFormData>();
    const navigate = useNavigate();
    const user = useLoggedInUser();
    const [alert, setAlert] = useState<{
        type: "error" | "success";
        message: string;
    } | null>(null);

    usePageTitle(t("login.sign_up"));

    const onSubmit: SubmitHandler<RegisterFormData> = (data) => {
        signUp(data.email, data.password)
            .then((user: UserCredential) => {
                if (user) {
                    updateProfile(data.name);
                    navigate({
                        to: "/",
                        replace: true, // the user can't come back to the login page
                    });
                }
            })
            .catch((error) => {
                setAlert({ type: "error", message: error.message });
            });
    };

    if (user) {
        navigate({
            to: "/",
            replace: true, // the user can't come back to the login page
        });
        return null;
    }

    return (
        <>
            {alert && (
                <Alert severity={alert.type} sx={{ mt: 2 }}>
                    <AlertTitle>
                        {alert.type === "error" ? "Error" : "Success"}
                    </AlertTitle>
                    {alert.message}
                </Alert>
            )}
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <LogoTitle />
                    <Typography component="h1" variant="h5">
                        {t("login.sign_up")}
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit(onSubmit)}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        <FormInput
                            control={control}
                            rules={{ required: true }}
                            name="name"
                            label="login.name"
                        />

                        <FormInput
                            control={control}
                            rules={{ required: true, pattern: /^\S+@\S+$/i }}
                            name="email"
                            type="email"
                            label="login.email"
                        />

                        <FormInput
                            control={control}
                            rules={{
                                required: true,
                                minLength: 6,
                                maxLength: 20,
                            }}
                            name="password"
                            type="password"
                            label="login.password"
                        />

                        <FormInput
                            control={control}
                            name="passwordConfirmation"
                            type="password"
                            label="login.password_confirm"
                            rules={{
                                required: true,
                                validate: (value) => {
                                    if (value === getValues("password")) {
                                        return true;
                                    } else {
                                        return "Passwords do not match";
                                    }
                                },
                            }}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {t("login.sign_up")}
                        </Button>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </>
    );
}
