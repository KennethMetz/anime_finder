import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";

export default function OnboardingButton({ disabled }) {
  let linkLocation;

  disabled ? (linkLocation = null) : (linkLocation = "/home");

  return (
    <Container maxWidth="lg">
      <Grid
        container
        direction="row"
        sx={{
          justifyContent: {
            lg: "flex-end",
            xs: "center",
          },
        }}
      >
        <Link to={linkLocation}>
          <Button
            color="primary"
            variant="contained"
            disabled={disabled}
            size="large"
            sx={{
              minWidth: "211px",
            }}
          >
            Let's Go!
          </Button>
        </Link>
      </Grid>
    </Container>
  );
}
