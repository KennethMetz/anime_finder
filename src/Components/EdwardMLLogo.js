import logo from "../Styles/images/logo.svg";
import { useTheme } from "@mui/material/styles";

export default function EdwardMLLogo() {
  const theme = useTheme();

  return (
    <div className="logo">
      <img src={logo} alt="" />
      <h2
        className="appName"
        style={{ color: theme.palette.day.text, paddingLeft: "10px" }}
      >
        Edward
      </h2>
      <h2 className="appName" style={{ color: theme.palette.day.primary }}>
        ML
      </h2>
    </div>
  );
}
