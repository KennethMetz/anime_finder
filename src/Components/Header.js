import "../Styles/Header.css";

import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Grid,
  Icon,
  ListItemSecondaryAction,
  Typography,
} from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logout } from "./Firebase";
import { signOut } from "firebase/auth";
import { useContext, useEffect } from "react";
import { LocalUserContext } from "./LocalUserContext";
import TitleAutocomplete from "./TitleAutocomplete";
import { UserCircle, List, Palette } from "phosphor-react";
import DropMenu from "./DropMenu";
import { useTheme } from "@mui/material/styles";
import EdwardMLLogo from "./EdwardMLLogo";

function Header() {
  const [localUser, setLocalUser] = useContext(LocalUserContext);

  const [user] = useAuthState(auth);

  const theme = useTheme();

  useEffect(() => {}, [user]);

  return (
    <div className="header">
      <Container maxWidth="lg">
        <Grid
          container
          spacing={0}
          sx={{
            alignItems: "center",
            paddingBottom: 0,
          }}
        >
          <Grid item lg={2.5} md={2.5} sm={4.25} xs={9}>
            <Link to="/home">
              <EdwardMLLogo />
            </Link>
            <div></div>
          </Grid>
          <Grid
            item
            lg={8.5}
            md={8.5}
            sm={5.5}
            xs={12}
            order={{ xs: 3, sm: 2 }}
            sx={{ marginY: 0.75 }}
          >
            {TitleAutocomplete()}
          </Grid>
          <Grid
            item
            sm={2}
            md={1}
            xs={3}
            order={{ xs: 2, sm: 3 }}
            textAlign="right"
            sx={{ display: "flex", justifyContent: "right" }}
          >
            {/* <Link
              to="/profile"
              style={{ display: "flex", alignItems: "center" }}
            >
            </Link> */}
            {DropMenu()}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Header;
