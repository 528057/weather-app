import { Box, Container, CssBaseline, Typography } from "@mui/material";

import usePageTitle from "../hooks/usePageTitle";
import LogoTitle from "../components/LogoTitle";
import LocalizeMessage from "../components/LocalizeMessage";

const NotFound = () => {
    usePageTitle("error.not_found");

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
                <Typography variant="h2">
                    <LocalizeMessage id="error.not_found" />
                </Typography>
                <Typography>
                    <LocalizeMessage id="error.not_exist_msg" />
                </Typography>
            </Box>
        </Container>
    );
};

export default NotFound;
