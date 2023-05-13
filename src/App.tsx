import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { LanguageProvider } from "./hooks/useTranslation";
import LoginPage from "./pages/LoginPage";

const App = () => (
  <LanguageProvider>
    <LoginPage/>
  </LanguageProvider>
);

export default App;
