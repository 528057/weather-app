import logo from "../assets/logo-title-transparent.png";

type LogoTitleProps = {
  width: string;
  height: string;
};

export default function LogoTitle(props: LogoTitleProps) {
  const { width, height } = props;

  return (
    <div>
      <img src={logo} alt="Logo" width={width} height={height} />
    </div>
  );
}

LogoTitle.defaultProps = {
  width: "80%",
  height: "100%",
};
