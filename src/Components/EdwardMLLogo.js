import logo from "../Styles/images/logo.svg";
import useTheme from "@mui/material/styles/useTheme";
import Box from "@mui/material/Box";

export default function EdwardMLLogo() {
  const theme = useTheme();

  return (
    <div className="logo" style={{ height: "68px" }}>
      <img src={logo} alt="" style={{ width: "35px" }} />
      <Box component="div" sx={{ display: { xs: "none", sm: "flex" } }}>
        <h2
          className="appName"
          style={{
            color: theme.palette.text.primary,
            paddingLeft: "10px",
            fontFamily: "montserratBold",
            fontSize: "1.25rem",
          }}
        >
          Edward
        </h2>
        <h2
          className="appName"
          style={{
            color: theme.palette.primary.main,
            fontFamily: "montserratBold",
            fontSize: "1.25rem",
          }}
        >
          ML
        </h2>
      </Box>
    </div>
  );
}
