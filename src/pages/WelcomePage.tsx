import { Box, Container, CssBaseline, Typography} from "@mui/material";

import usePageTitle from "../hooks/usePageTitle";
import { useTranslation } from "../hooks/useTranslation";
import WeatherToolbar from "../components/WeatherToolbar";

export default function WelcomePage() {
  const t = useTranslation();
  usePageTitle(t("error.not_found"));

  return (
    <>
      <WeatherToolbar />
      <CssBaseline />
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
            <Typography component="h1" variant="h1">Welcome</Typography>
        </Box>
      </Container>
      </>
  );
}
