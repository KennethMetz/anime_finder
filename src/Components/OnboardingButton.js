import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import useTheme from "@mui/material/styles/useTheme";
import { SaveToFirestore } from "./Firestore";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Firebase";
import { useContext } from "react";
import { LocalUserContext } from "./LocalUserContext";
import { Link } from "react-router-dom";

export default function OnboardingButton({ disabled }) {
  const [user] = useAuthState(auth);
  const [localUser, setLocalUser] = useContext(LocalUserContext);

  const theme = useTheme();

  let linkLocation;

  disabled ? (linkLocation = null) : (linkLocation = "/register");

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
            onClick={(e) => {
              SaveToFirestore(user, localUser);
            }}
          >
            Let's Go!
          </Button>
        </Link>
      </Grid>
    </Container>
  );
}
