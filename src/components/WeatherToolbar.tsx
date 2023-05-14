import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import LogoTitle from "./LogoTitle";
import SearchBar from "./SearchBar";
import ButtonLink from "./ButtonLink";
import { Link } from "@tanstack/react-router";
import useLoggedInUser from "../hooks/useLoggedInUser";
import LanguageSwitch from "./LanguageSwitch";
import LocalizeMessage from "./LocalizeMessage";
import { Button } from "@mui/material";
import { signOut } from "../utils/firebase";
import { useState } from "react";

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

const UserNav: React.FC = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Tooltip title="Open settings" onClick={handleClick}>
                <IconButton sx={{ p: 0 }}>
                    <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/2.jpg"
                    />
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: "45px" }}
                anchorEl={anchorEl}
                onClose={handleClose}
                onClick={handleClose}
                open={open}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
            >
                <MenuItem>
                    <Button onClick={signOut}>
                        <Typography textAlign="center">
                            <LocalizeMessage id="login.sign_out" />
                        </Typography>
                    </Button>
                </MenuItem>
            </Menu>
        </>
    );
};

const OtherNav: React.FC = () => (
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
    </>
);

const WeatherToolbar = () => {
    const user = useLoggedInUser();

    return (
        <AppBar
            position="fixed"
            color="transparent"
            style={{ top: 0, width: "100%" }}
        >
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

                    {user && (
                        <Box sx={{ flexGrow: 0 }}>
                            <UserNav />
                        </Box>
                    )}
                    <Box sx={{ ml: 2 }}>
                        <LanguageSwitch />
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default WeatherToolbar;
