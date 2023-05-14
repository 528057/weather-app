import Container from "@mui/material/Container";

import { useTranslation } from "../hooks/useTranslation";
import { useParams } from "@tanstack/react-router";

const RegisterPage = () => {
    const t = useTranslation();
    const params = useParams({
        from: "/weather/$lat/$lon",
    });

    return <Container component="main" maxWidth="xs"></Container>;
};

export default RegisterPage;
