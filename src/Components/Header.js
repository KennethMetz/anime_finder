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
import logo from "../Styles/images/logo.svg";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logout } from "./Firebase";
import { signOut } from "firebase/auth";
import { useContext, useEffect } from "react";
import { LocalUserContext } from "./LocalUserContext";
import TitleAutocomplete from "./TitleAutocomplete";
import { UserCircle, List, Palette } from "phosphor-react";
import DropMenu from "./DropMenu";
import { useTheme } from "@mui/material/styles";

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
          spacing={3}
          sx={{
            alignItems: "center",
            paddingBottom: 2,
          }}
        >
          <Grid item xs={2.5}>
            <Link to="/home">
              <div className="logo">
                <img src={logo} alt="" />
                <div className="appName" style={{ padding: "10px" }}>
                  <span style={{ color: theme.palette.day.text }}>Edward</span>
                  <span style={{ color: theme.palette.day.primary }}>ML</span>
                </div>
              </div>
            </Link>
            <div></div>
          </Grid>
          <Grid item xs={7.5}>
            {TitleAutocomplete()}
          </Grid>
          <Grid
            item
            xs={2}
            textAlign="right"
            sx={{ display: "flex", justifyContent: "right" }}
          >
            <Link to="/profile">
              <UserCircle size={45} />
            </Link>
            {DropMenu()}
          </Grid>

          {/*
        <ul>
          <Link to="/">
            <li>HOME</li>
          </Link>

           {user ? (
            <Link to="Profile">
              <li>MY PROFILE</li>
            </Link>
          ) : null}

          {!user || !user.displayName ? null : <li>{user.displayName}</li>}
          {!user ? (
            <Link to="Login">
              <li>LOGIN</li>
            </Link>
          ) : (
            <Link to="/logout">
              <button
                onClick={(e) => {
                  logout();
                  setLocalUser([{ likes: [], dislikes: [] }]);
                }}
              >
                LOGOUT
              </button>
            </Link> 
          )}
        </ul>*/}
        </Grid>
      </Container>
    </div>
  );
}

export default Header;
