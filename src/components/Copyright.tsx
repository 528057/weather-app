import { Typography, TypographyTypeMap } from "@mui/material";
import { DefaultComponentProps } from "@mui/types";
import LocalizeMessage from "./LocalizeMessage";

type CopyrightProps = DefaultComponentProps<
    TypographyTypeMap<Record<string, unknown>, "span">
>;

const Copyright = (props: CopyrightProps) => {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            <LocalizeMessage id="common.copyright" />
            <LocalizeMessage id="app.title" /> {new Date().getFullYear()}
        </Typography>
    );
};

export default Copyright;
