import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { useTranslation } from "../hooks/useTranslation";
import Copyright from "../components/Copyright";
import LogoTitle from "../components/LogoTitle";
import usePageTitle from "../hooks/usePageTitle";
import { signIn } from "../utils/firebase";
import FormInput from "../components/form/FormInput";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "@tanstack/react-router";
import useLoggedInUser from "../hooks/useLoggedInUser";

type LoginFormData = {
    email: string;
    password: string;
    rememberMe: boolean;
};

const LoginPage = () => {
    const t = useTranslation();
    const user = useLoggedInUser();
    const { control, handleSubmit } = useForm<LoginFormData>();
    const navigate = useNavigate();

    usePageTitle(t("login.sign_in"));

    const onSubmit = (data: LoginFormData) => {
        signIn(data.email, data.password, data.rememberMe).then((user) => {
            if (user) {
                navigate({
                    to: "/",
                    replace: true, // the user can't come back to the login page
                });
            }
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
                    {t("login.sign_in")}
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    sx={{ mt: 1 }}
                >
                    <FormInput
                        name="email"
                        control={control}
                        label="login.email"
                        rules={{ required: true, pattern: /^\S+@\S+$/i }}
                        type="email"
                    />

                    <FormInput
                        name="password"
                        control={control}
                        label="login.password"
                        rules={{ required: true, minLength: 6, maxLength: 20 }}
                        type="password"
                    />

                    <Controller
                        name="rememberMe"
                        control={control}
                        render={({ field: { name, onChange, value } }) => {
                            return (
                                <FormControlLabel
                                    id={name}
                                    name={name}
                                    control={
                                        <Checkbox
                                            value={value}
                                            color="primary"
                                            onChange={(event) =>
                                                onChange(!!event.target.checked)
                                            }
                                        />
                                    }
                                    label={t("login.remember_me")}
                                />
                            );
                        }}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        {t("login.sign_in")}
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                {t("login.forgot_password")}
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/register" variant="body2">
                                {t("login.no_account")}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    );
};

export default LoginPage;
