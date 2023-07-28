import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import useTheme from "@mui/material/styles/useTheme";
import { Link } from "react-router-dom";
import logo from "../Styles/images/logo.svg";
import EdwardMLLogo from "./EdwardMLLogo";

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
          <div style={{ display: "flex" }}>
            <Link to="/" style={{ flexShrink: 1 }}>
              <EdwardMLLogo />
            </Link>
          </div>
        </Grid>
        <Grid
          item
          xs={3}
          textAlign="right"
          sx={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Link to="/login" tabIndex="-1">
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
