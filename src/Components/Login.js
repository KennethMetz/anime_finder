import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../Styles/Login.css";

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
import useAuthActions from "../Hooks/useAuthActions";
import HtmlPageTitle from "./HtmlPageTitle";
import { useHeartbeat } from "./APICalls";
import BreathingLogo from "./BreathingLogo";

export default function Login() {
  const authActions = useAuthActions();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const theme = useTheme();

  let [loginError, setLoginError] = useState(undefined);

  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [loadingTwitter, setLoadingTwitter] = useState(false);
  const [loadingEmail, setLoadingEmail] = useState(false);

  // Pre-warm API by sending a request now.
  useHeartbeat();

  let regButtonStyling = {
    color: theme.palette.text.primary,
    borderColor: theme.palette.text.primary,
    textTransform: "none",
    borderRadius: "24px",
    width: "350px",
    fontWeight: 800,
    marginBottom: "17px",
  };

  const login = async (provider) => {
    try {
      setLoginError(null);
      if (provider === "google") {
        setLoadingGoogle(true);
        await authActions.loginWithGoogle();
      } else if (provider === "twitter") {
        setLoadingTwitter(true);
        await authActions.loginWithTwitter();
      } else if (provider === "email") {
        setLoadingEmail(true);
        await authActions.loginWithEmail(email, password);
      } else {
        throw new Error("Unknown login provider");
      }
      navigate("/home");
    } catch (error) {
      console.error(error);
      if (error["code"]?.search(/\buser-not-found\b/) > -1) {
        setLoginError("*Email not found");
      } else if (error["code"]?.search(/\bwrong-password\b/) > -1) {
        setLoginError("*Incorrect password");
      } else if (error["code"]?.search(/\btoo-many-requests\b/) > -1) {
        setLoginError(
          "*Your account has been locked due to too many login attempts. " +
            "Please reset your password to unlock your account."
        );
      } else {
        setLoginError(
          "Ooops - there was an error logging in. Please try again!"
        );
      }
    } finally {
      setLoadingGoogle(false);
      setLoadingTwitter(false);
      setLoadingEmail(false);
    }
  };

  return (
    <div className="login">
      <HtmlPageTitle title={"Login"} />
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
            onClick={() => login("google")}
            startIcon={
              loadingGoogle ? null : (
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
              )
            }
          >
            {loadingGoogle ? (
              <BreathingLogo type="smallButton" />
            ) : (
              "Login with Google"
            )}
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
            onClick={() => login("twitter")}
            startIcon={
              loadingTwitter ? null : (
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
              )
            }
          >
            {loadingTwitter ? (
              <BreathingLogo type="smallButton" />
            ) : (
              "Login with Twitter"
            )}
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
              padding: "0px",
            }}
            onClick={() => login("email")}
          >
            {loadingEmail ? <BreathingLogo type={"smallButton"} /> : "Login"}
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
