import "../Styles/Header.css";

import { Link } from "react-router-dom";
import { Container, Grid, Icon, Typography } from "@mui/material";
import logo from "../Styles/images/logo.svg";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logout } from "./Firebase";
import { signOut } from "firebase/auth";
import { useContext, useEffect } from "react";
import { LocalUserContext } from "./LocalUserContext";
import TitleAutocomplete from "./TitleAutocomplete";
import { UserCircle, List } from "phosphor-react";
import DropMenu from "./DropMenu";

function Header() {
  const [localUser, setLocalUser] = useContext(LocalUserContext);

  const [user] = useAuthState(auth);

  useEffect(() => {}, [user]);

  return (
    <div className="header">
      <Container maxwidth="sm">
        <Grid
          container
          spacing={3}
          sx={{
            alignItems: "center",
            paddingBottom: 2,
          }}
        >
          <Grid item xs={2}>
            <Link to="/home">
              <div className="logo">
                <img src={logo} alt="" />
                <div className="appName" style={{ padding: "10px" }}>
                  <span className="blackAppName">Edward</span>
                  <span className="redAppName">ML</span>
                </div>
              </div>
            </Link>
          </Grid>
          <Grid item xs={8}>
            {TitleAutocomplete()}
          </Grid>
          <Grid
            item
            xs={2}
            textAlign="right"
            sx={{ display: "flex", justifyContent: "right" }}
          >
            <Link to="/profile">
              <UserCircle size={32} />
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
