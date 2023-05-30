import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  logInWithEmailAndPassword,
  signInWithGoogle,
  signInWithTwitter,
} from "./Firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import "../Styles/Login.css";
import { PopulateFromFirestore } from "./Firestore";

import { LocalUserContext } from "./LocalUserContext";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";

import TwitterIcon from "@mui/icons-material/Twitter";
import google from "../Styles/images/google.svg";
import EdwardMLLogo from "./EdwardMLLogo";

export default function Login() {
  const [localUser, setLocalUser] = useContext(LocalUserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const theme = useTheme();

  let [loginError, setLoginError] = useState(undefined);

  let regButtonStyling = {
    color: theme.palette.text.primary,
    borderColor: theme.palette.text.primary,
    textTransform: "none",
    borderRadius: "24px",
    width: "350px",
    fontWeight: 800,
    marginBottom: "17px",
  };

  useEffect(() => {
    if (loading) {
      // trigger a loading screen?
      return;
    }
    if (user) {
      PopulateFromFirestore(user, localUser, setLocalUser);
      navigate("/home");
    }
  }, [user, loading]);
  return (
    <div className="login">
      <Container maxWidth="lg">
        <div className="welcomeBanner">
          <Link to="/">
            <EdwardMLLogo />
          </Link>
        </div>
      </Container>
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h3"
          style={{ textAlign: "center", margin: 0, marginBottom: "18px" }}
        >
          Let's Get Logged In!
        </Typography>
        <div
          className="register__container"
          style={{ borderColor: theme.palette.divider }}
        >
          {/* *******************Google Button************************** */}
          <Button
            variant="outlined"
            className="register__btn"
            sx={{
              ...regButtonStyling,
              fontSize: {
                xs: "0.9rem",
                fourHundred: "1rem",
              },
              width: {
                sm: "350px",
                fourHundred: "280px",
                xs: "250px",
              },
              "&:hover": {
                border: "3px #EF2727 solid",
              },
            }}
            onClick={signInWithGoogle}
            startIcon={
              <Box
                component="img"
                src={google}
                sx={{
                  width: "42px",
                  height: "42px",
                  paddingRight: {
                    xs: "10px",
                    fourHundred: "20px",
                  },
                }}
                alt=""
              />
            }
          >
            Login with Google
          </Button>
          {/* *******************Twitter Button************************** */}
          <Button
            variant="outlined"
            className="register__btn"
            sx={{
              ...regButtonStyling,
              marginBottom: "0px",
              fontSize: {
                xs: "0.9rem",
                fourHundred: "1rem",
              },
              width: {
                sm: "350px",
                fourHundred: "280px",
                xs: "250px",
              },
              "&:hover": {
                border: "3px #EF2727 solid",
              },
            }}
            onClick={signInWithTwitter}
            startIcon={
              <TwitterIcon
                sx={{
                  width: "42px",
                  height: "42px",
                  paddingRight: {
                    xs: "10px",
                    fourHundred: "20px",
                  },
                  color: "#1D9BF0",
                }}
              />
            }
          >
            Login with Twitter
          </Button>
          <Divider
            sx={{
              width: "87.5%",
              "&::before, &::after": {
                borderColor: theme.palette.text.primary,
              },
              margin: "16px 0px",
            }}
          >
            or
          </Divider>
          {/* *******************EdwardML - Email Field************************** */}
          <TextField
            type="text"
            className="register__textBox"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            required
            inputProps={{
              style: {
                paddingTop: "12.5px",
                paddingBottom: "12.5px",
              },
            }}
            InputLabelProps={{
              style: {
                marginBottom: "88.5px",
              },
            }}
            sx={{
              width: {
                xs: "250px",
                fourHundred: "280px",
                sm: "350px",
              },
              borderRadius: "9px",
              marginBottom: "20px",
            }}
          />
          {/* *******************EdwardML - Password Field************************** */}
          <TextField
            type="password"
            className="register__textBox"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            helperText="Forgot Password?"
            required
            inputProps={{
              style: {
                paddingTop: "12.5px",
                paddingBottom: "12.5px",
              },
            }}
            FormHelperTextProps={{
              style: {
                color: theme.palette.text.primary,
                textAlign: "right",
                fontWeight: "600",
                cursor: "pointer",
              },
              onClick: () => navigate("/reset"),
            }}
            sx={{
              width: {
                xs: "250px",
                fourHundred: "280px",
                sm: "350px",
              },
              borderRadius: "9px",
              marginBottom: "20px",
            }}
          />
          {loginError && (
            <Typography
              sx={{
                color: "error.main",
                fontWeight: 600,
                marginY: "10px",
              }}
            >
              {loginError}
            </Typography>
          )}
          {/* *******************EdwardML - 'Login' Button************************** */}
          <Button
            variant="contained"
            size="large"
            sx={{
              width: "211px",
            }}
            onClick={() => {
              logInWithEmailAndPassword(email, password, setLoginError);
            }}
          >
            Login
          </Button>

          <Divider
            sx={{
              width: "100%",
              borderColor: theme.palette.text.primary,
              marginTop: "30px",
              marginBottom: "30px",
            }}
          />
          {/* *******************Already Registered Section************************** */}
          <div>
            Need an account?{" "}
            <Typography component="span" sx={{ fontWeight: 800 }}>
              <Link to="/register"> Register here!</Link>
            </Typography>
          </div>
        </div>
      </Container>
    </div>
  );
}
