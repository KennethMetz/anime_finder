import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import useTheme from "@mui/material/styles/useTheme";
import { Link } from "react-router-dom";

import logo from "../Styles/images/logo.svg";
import EdwardMLLogo from "./EdwardMLLogo";

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
          <Link to="/" style={{ display: "flex" }}>
            <EdwardMLLogo />
          </Link>
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
