import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import logo from "../assets/logo-title-transparent.png";
import { useTranslation } from "../hooks/useTranslation";
import { useState } from "react";
import Copyright from "../components/Copyright";
import LogoTitle from "../components/LogoTitle";
import { isValidEmail } from "../utils/Validators";

export default function RegisterPage() {
  const t = useTranslation();

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { firstName, lastName, email, password, passwordConfirmation } =
      formData;

    const hasError =
      firstNameError ||
      lastNameError ||
      emailError ||
      passwordError ||
      passwordConfirmError;

    if (!firstName) {
      setFirstNameError(t("login.required_field"));
    } else {
      setFirstNameError("");
    }
    if (!lastName) {
      setLastNameError(t("login.required_field"));
    } else {
      setLastNameError("");
    }
    if (!email) {
      setEmailError(t("login.required_field"));
    } else if (!isValidEmail(email)) {
      setEmailError(t("login.email_wrong_format"));
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError(t("login.required_field"));
    } else {
      setPasswordError("");
    }
    if (!passwordConfirmation) {
      setPasswordConfirmError(t("login.required_field"));
    } else {
      setPasswordConfirmError("");
    }

    if (password && passwordConfirmation && password !== passwordConfirmation) {
      setPasswordConfirmError(t("login.confirmation_failed"));
    }

    if (hasError) {
      console.log("error in registration");
      console.log(formData);
      return;
    }

    console.log(formData);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

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
          {t("login.sign_up")}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="firstName"
            label={t("login.first_name")}
            name="firstName"
            autoComplete="text"
            autoFocus
            onChange={handleChange}
            error={!!firstNameError}
            helperText={firstNameError}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="lastName"
            label={t("login.last_name")}
            name="lastName"
            autoComplete="text"
            autoFocus
            onChange={handleChange}
            error={!!lastNameError}
            helperText={lastNameError}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label={t("login.email")}
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChange}
            error={!!emailError}
            helperText={emailError}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label={t("login.password")}
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
            error={!!passwordError}
            helperText={passwordError}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="passwordConfirmation"
            label={t("login.password_confirm")}
            type="password"
            id="password_confirm"
            autoComplete="password-confirm"
            onChange={handleChange}
            error={!!passwordConfirmError}
            helperText={passwordConfirmError}
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
  );
}
