import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import useTheme from "@mui/material/styles/useTheme";
import { Link } from "react-router-dom";
import logo from "../Styles/images/logo.svg";

export default function OnboardingHeader() {
  const theme = useTheme();

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Grid
        container
        spacing={1}
        sx={{
          alignItems: "center",
          paddingBottom: 0,
        }}
      >
        <Grid item xs={9}>
          <div className="logo" style={{ height: "68px" }}>
            <Link to="/" style={{ display: "flex" }}>
              <img src={logo} alt="" style={{ width: "35px" }} />
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
            </Link>
          </div>

          <div></div>
        </Grid>
        <Grid
          item
          xs={3}
          textAlign="right"
          sx={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Link to="/login">
            <Button
              variant="outlined"
              size="large"
              color="inherit"
              sx={{
                minWidth: "93px",
                fontSize: ".875rem",
              }}
            >
              Login
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
}
