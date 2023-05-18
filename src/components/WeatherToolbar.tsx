import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import LogoTitle from "./LogoTitle";
import SearchBar from "./SearchBar";
import ButtonLink from "./ButtonLink";
import { Link } from "@tanstack/react-router";
import useLoggedInUser from "../hooks/useLoggedInUser";
import LanguageSwitch from "./LanguageSwitch";
import LocalizeMessage from "./LocalizeMessage";
import { Button } from "@mui/material";
import { signOut } from "../utils/firebase";

const AuthNav: React.FC = () => (
    <>
        <ButtonLink
            to={"/login"}
            key={"Login"}
            sx={{
                my: 2,
                color: "black",
                display: "block",
            }}
        >
            <LocalizeMessage id="login.sign_in" />
        </ButtonLink>
        <ButtonLink
            to={"/register"}
            key={"Register"}
            sx={{
                my: 2,
                color: "black",
                display: "block",
            }}
        >
            <LocalizeMessage id="login.sign_up" />
        </ButtonLink>
    </>
);

const OtherNav: React.FC = () => (
    <>
        <ButtonLink
            sx={{
                my: 2,
                color: "black",
                display: "block",
            }}
            to="/saved-locations"
        >
            <Typography textAlign="center">
                <LocalizeMessage id="saved-locations.title" />
            </Typography>
        </ButtonLink>
        <Button
            sx={{
                my: 2,
                color: "black",
                display: "block",
            }}
            onClick={signOut}
        >
            <Typography textAlign="center">
                <LocalizeMessage id="login.sign_out" />
            </Typography>
        </Button>
    </>
);

const WeatherToolbar = () => {
    const user = useLoggedInUser();

    return (
        <AppBar position="fixed" color="transparent" style={{ top: 0, width: "100%" }}>
            <Container>
                <Toolbar disableGutters>
                    <Link to="/">
                        <LogoTitle
                            width="150px"
                            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
                        />
                    </Link>
                    <SearchBar />

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", md: "flex" },
                        }}
                    >
                        {user ? <OtherNav /> : <AuthNav />}
                    </Box>

                    <Box sx={{ ml: 2 }}>
                        <LanguageSwitch />
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default WeatherToolbar;
