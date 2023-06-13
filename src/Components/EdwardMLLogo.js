import logo from "../Styles/images/logo.svg";
import useTheme from "@mui/material/styles/useTheme";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function EdwardMLLogo() {
  const theme = useTheme();

  return (
    <div className="logo" style={{ height: "68px" }}>
      <img
        src={logo}
        alt=""
        style={{ width: "35px", aspectRatio: "35/63.19" }}
      />
      <Box component="div" sx={{ display: { xs: "none", sm: "flex" } }}>
        <Typography
          variant="h6"
          className="appName"
          style={{
            color: theme.palette.text.primary,
            paddingLeft: "10px",
            fontSize: "1.25rem",
          }}
        >
          Edward
        </Typography>
        <Typography
          variant="h6"
          className="appName"
          style={{
            color: theme.palette.primary.main,
            fontSize: "1.25rem",
          }}
        >
          ML
        </Typography>
      </Box>
    </div>
  );
}
