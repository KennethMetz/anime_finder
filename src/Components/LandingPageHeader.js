import { useTheme } from "@emotion/react";
import { Box, Button, Container, Grid } from "@mui/material";
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
                    color: theme.palette.day.text,
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
                    color: theme.palette.day.primary,
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
          <Link to="/onboarding">
            <Button
              variant="contained"
              size="large"
              sx={{
                textTransform: "none",
                minWidth: "93px",
                minHeight: "48px",
                fontFamily: "interSemiBold",
                fontSize: ".875rem",
                borderRadius: "24px",
                color: "white",
                marginRight: "18px",
              }}
            >
              Try it
            </Button>
          </Link>
          <Link to="/login">
            <Button
              variant="outlined"
              size="large"
              sx={{
                textTransform: "none",
                minWidth: "93px",
                minHeight: "48px",
                fontFamily: "interSemiBold",
                fontSize: ".875rem",
                borderRadius: "24px",
                borderColor: "#474747",
                border: 2,
                color: "black",
                backgroundColor: "white",

                "&:hover, &:focus": {
                  color: "#fff",
                  backgroundColor: "#474747",
                  borderColor: "#474747",
                },
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
