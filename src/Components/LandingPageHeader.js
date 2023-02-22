import { Box, Button, Container, Grid, useTheme } from "@mui/material";
import { Link } from "react-router-dom";

import logo from "../Styles/images/logo.svg";

export default function LandingPageHeader() {
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
        <Grid item md={9} sm={9} xs={9}>
          <div className="logo" style={{ height: "68px" }}>
            <Link to="/" style={{ display: "flex" }}>
              <img src={logo} alt="" style={{ width: "35px" }} />
              <Box
                component="div"
                sx={{ display: { xs: "none", fiveHundred: "flex" } }}
              >
                <h2
                  className="appName"
                  style={{
                    color: theme.palette.text.primary,
                    paddingLeft: "10px",
                    fontFamily: "montserratBold",
                    fontSize: "1.25rem",
                    display: {
                      xs: "none",
                      fiveHundred: "block",
                    },
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
          <Link to="/onboarding" tabIndex="-1">
            <Button
              variant="contained"
              size="large"
              disableElevation
              sx={{
                fontSize: "0.875rem",
                minWidth: "93px",
                marginRight: "18px",
              }}
            >
              Try it
            </Button>
          </Link>
          <Link to="/login" tabIndex="-1">
            <Button
              color="inherit"
              variant="outlined"
              size="large"
              sx={{
                fontSize: "0.875rem",
                minWidth: "93px",
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
