import "./App.css";
import { LanguageProvider } from "./hooks/useTranslation";
import LoginPage from "./pages/LoginPage";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";

const App = () => (
  <ThemeProvider theme={theme}>
    <LanguageProvider>
      <LoginPage />
    </LanguageProvider>
  </ThemeProvider>
);

export default App;
