import { Box, Typography } from "@mui/material";

import usePageTitle from "../hooks/usePageTitle";
import { useTranslation } from "../hooks/useTranslation";

export default function WelcomePage() {
  const t = useTranslation();
  usePageTitle(t("error.not_found"));

  return (
    <>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h1">
          Welcome
        </Typography>
      </Box>
    </>
  );
}
