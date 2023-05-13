import "./App.css";
import { LanguageProvider } from "./hooks/useTranslation";
import LoginPage from "./pages/LoginPage";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { RootRoute, Route, Router, RouterProvider } from "@tanstack/router";
import RegisterPage from "./pages/RegisterPage";
import NotFound from "./pages/NotFound";
import WelcomePage from "./pages/WelcomePage";

const rootRoute = new RootRoute();

const indexRoute = new Route({
	getParentRoute: () => rootRoute,
	path: '/',
	component: WelcomePage
});

const loginRoute = new Route({
	getParentRoute: () => rootRoute,
	path: '/login',
	component: LoginPage
});

const registerRoute = new Route({
	getParentRoute: () => rootRoute,
	path: '/register',
	component: RegisterPage
});

const notFoundRoute = new Route({
	getParentRoute: () => rootRoute,
	path: '*',
	component: NotFound
});

const routeTree = rootRoute.addChildren([
	indexRoute,
  loginRoute,
  registerRoute,
	notFoundRoute
]);

const router = new Router({ routeTree });

declare module '@tanstack/react-router' {
	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
	interface Register {
		router: typeof router;
	}
}

const App = () => (
  <ThemeProvider theme={theme}>
    <LanguageProvider>
      <RouterProvider router={router} />
    </LanguageProvider>
  </ThemeProvider>
);

export default App;
