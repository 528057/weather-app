import Container from "@mui/material/Container";

import { useTranslation } from "../hooks/useTranslation";
import { useParams } from "@tanstack/react-router";
import usePageTitle from "../hooks/usePageTitle";

const Weather = () => {
    const t = useTranslation();
    usePageTitle(t("weather.title"));
    const params = useParams({
        from: "/weather/$lat/$lon/$city",
    });

    return (
        <Container component="main" maxWidth="xs">
            <h1>{t("weather.title")}</h1>
        </Container>
    );
};

export default Weather;
