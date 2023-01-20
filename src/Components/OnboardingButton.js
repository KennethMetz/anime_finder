import { Button, Grid } from "@mui/material";
import { SaveToFirestore } from "./Firestore";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Firebase";
import { useTheme } from "@mui/material/styles";
import { useContext } from "react";
import { LocalUserContext } from "./LocalUserContext";
import { Link } from "react-router-dom";
import { Container } from "@mui/system";

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
            variant="contained"
            disabled={disabled}
            size="large"
            sx={{
              textTransform: "none",
              minWidth: "211px",
              minHeight: "48px",
              marginTop: "20px",
              fontFamily: "interExtraBold",
              fontSize: "1rem",
              borderRadius: "24px",
              backgroundColor: theme.palette.day.primary,
              color: "white",
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
