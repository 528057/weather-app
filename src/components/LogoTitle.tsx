import { Box, SxProps } from "@mui/material";
import logo from "../assets/logo-title-transparent.png";

type LogoTitleProps = {
  width: string;
  height: string;
  sx?: SxProps;
};

export default function LogoTitle(props: LogoTitleProps) {
  const { width, height, sx } = props;

  return (
    <Box sx={sx}>
      <img src={logo} alt="Logo" width={width} height={height} />
    </Box>
  );
}

LogoTitle.defaultProps = {
  width: "80%",
  height: "100%",
};
