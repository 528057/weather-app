import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { useTranslation } from "../hooks/useTranslation";
import { useState } from "react";
import Copyright from "../components/Copyright";
import LogoTitle from "../components/LogoTitle";

export default function LoginPage() {
  const t = useTranslation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleRememberBeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({ ...formData, rememberMe: event.target.checked });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { email, password } = formData;

    if (!email) {
      setEmailError(t("login.required_field"));
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError(t("login.required_field"));
    } else {
      setPasswordError("");
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
          {t("login.sign_in")}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
          <FormControlLabel
            id="rememberMe"
            control={
              <Checkbox
                value={formData.rememberMe}
                color="primary"
                onChange={handleRememberBeChange}
              />
            }
            label={t("login.remember_me")}
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
              <Link href="#" variant="body2">
                {t("login.no_account")}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
