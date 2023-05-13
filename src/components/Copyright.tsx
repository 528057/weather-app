import { Typography } from "@mui/material";
import { useTranslation } from "../hooks/useTranslation";

export default function Copyright(props: any) {
    const t = useTranslation();
  
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        {t("app.title")} {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }