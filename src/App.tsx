import "./App.css";
import { LanguageProvider } from "./hooks/useTranslation";
import LoginPage from "./pages/LoginPage";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import {
    Outlet,
    RootRoute,
    Route,
    Router,
    RouterProvider,
} from "@tanstack/react-router";
import RegisterPage from "./pages/RegisterPage";
import NotFound from "./pages/NotFound";
import WelcomePage from "./pages/WelcomePage";
import { Container, CssBaseline } from "@mui/material";
import WeatherToolbar from "./components/WeatherToolbar";
import { AuthContextProvider } from "./hooks/useLoggedInUser";
import Weather from "./pages/Weather";
import SavedLocations from "./pages/SavedLocations";

const rootRoute = new RootRoute({
    component: () => {
        return (
            <>
                <WeatherToolbar />
                <Container component="main" maxWidth="md">
                    <Outlet />
                </Container>
            </>
        );
    },
});

const indexRoute = new Route({
    getParentRoute: () => rootRoute,
    path: "/",
    component: WelcomePage,
});

const loginRoute = new Route({
    getParentRoute: () => rootRoute,
    path: "/login",
    component: LoginPage,
});

const registerRoute = new Route({
    getParentRoute: () => rootRoute,
    path: "/register",
    component: RegisterPage,
});

const savedLocationsRoute = new Route({
    getParentRoute: () => rootRoute,
    path: "/saved-locations",
    component: SavedLocations,
});

const locationWeatherRoute = new Route({
    getParentRoute: () => rootRoute,
    path: "/weather/$lat/$lon/$city",
    component: Weather,
});

const notFoundRoute = new Route({
    getParentRoute: () => rootRoute,
    path: "*",
    component: NotFound,
});

const routeTree = rootRoute.addChildren([
    indexRoute,
    loginRoute,
    registerRoute,
    savedLocationsRoute,
    locationWeatherRoute,
    notFoundRoute,
]);

const router = new Router({ routeTree });

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}

const App = () => (
    <AuthContextProvider>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <LanguageProvider>
                <RouterProvider router={router} />
            </LanguageProvider>
        </ThemeProvider>
    </AuthContextProvider>
);

export default App;
