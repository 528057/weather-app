import { Box } from "@mui/material";
import Flag, { Props as FlagProps } from "react-flagkit";

import { Languages, useLanguage } from "../hooks/useTranslation";

export const CZFlag = (props: FlagProps) => <Flag {...props} country="CZ" />;
export const ENFlag = (props: FlagProps) => <Flag {...props} country="GB" />;

const LanguageSwitch = () => {
    const [language, setLanguage] = useLanguage();

    const onLanguageSwitch = (newLanguage: Languages) => () => {
        setLanguage(newLanguage);
    };

    return (
        <Box display="flex" flexDirection="row">
            <CZFlag
                onClick={onLanguageSwitch("cs")}
                style={{
                    cursor: "pointer",
                    marginRight: 10,
                    filter: language === "cs" ? "saturate(0.1)" : "",
                }}
            />
            <ENFlag
                onClick={onLanguageSwitch("en")}
                style={{
                    cursor: "pointer",
                    filter: language === "en" ? "saturate(0.1)" : "",
                }}
            />
        </Box>
    );
};

export default LanguageSwitch;
