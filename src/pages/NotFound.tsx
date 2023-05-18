import { Box, Container, CssBaseline, Typography } from "@mui/material";

import usePageTitle from "../hooks/usePageTitle";
import { useTranslation } from "../hooks/useTranslation";
import LogoTitle from "../components/LogoTitle";

const NotFound = () => {
  const t = useTranslation();
  usePageTitle(t("error.not_found"));

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
        <Typography variant="h2">{t("error.not_found")}</Typography>
        <Typography>{t("error.not_exist_msg")}</Typography>
      </Box>
    </Container>
  );
};

export default NotFound;
