import "../Styles/Register.css";

import React, { useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  logInAnon,
  registerWithEmailAndPassword,
  signInWithGoogle,
  signInWithTwitter,
} from "./Firebase";
import { SaveToFirestore } from "./Firestore";
import { LocalUserContext } from "./LocalUserContext";
import logo from "../Styles/images/logo.svg";
import { useTheme } from "@mui/material/styles";
import { Button, Container, Divider, TextField } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import { User } from "phosphor-react";
import { Box } from "@mui/system";
import google from "../Styles/images/google.svg";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const [localUser, setLocalUser] = useContext(LocalUserContext);
  const theme = useTheme();

  let regButtonStyling = {
    color: "black",
    borderColor: "black",
    textTransform: "none",
    borderRadius: "24px",
    width: "350px",
    fontFamily: "interExtraBold",
    fontSize: "1rem",
    marginBottom: "17px",
  };

  const register = () => {
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password);
  };
  useEffect(() => {
    if (loading) return;
    if (user) {
      SaveToFirestore(user, localUser).then(() => {
        navigate("/home");
      });
    }
  }, [user, loading]);

  return (
    <div className="register">
      <Container maxWidth="lg">
        <div className="welcomeBanner">
          <Link to="/home">
            <img src={logo} alt="" className="welcomeLogo" />
          </Link>
          <Link to="/home">
            <div className="welcomeTextBlock">
              <h1
                className="welcomeTitle"
                style={{ color: theme.palette.day.text, paddingLeft: "10px" }}
              >
                Edward
              </h1>
              <h1
                className="welcomeTitle"
                style={{ color: theme.palette.day.primary }}
              >
                ML
              </h1>
            </div>
          </Link>
        </div>

        <h4 className="H4" style={{ textAlign: "center" }}>
          Let's Get Registered!
        </h4>
      </Container>
      {/* *******************Start of Registration Block************************** */}
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div className="register__container" style={{ marginBottom: "50px" }}>
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
            Register with Google
          </Button>
          {/* *******************Twitter Button************************** */}
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
            Register with Twitter
          </Button>
          {/* *******************Guest Button************************** */}
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
            onClick={logInAnon}
            startIcon={
              <User
                size={42}
                color="black"
                weight="light"
                style={{
                  paddingRight: "20px",
                  width: {
                    fourHundred: "42px",
                    xs: "31px",
                  },
                  height: { fourHundred: "42px", xs: "31px" },
                }}
              />
            }
          >
            Visit as a Guest
          </Button>
          <Divider
            sx={{
              width: "87.5%",
              "&::before, &::after": {
                borderColor: "black",
              },
              fontFamily: "interMedium",
              margin: "37.5px 0px",
            }}
          >
            or
          </Divider>
          {/* *******************EdwardML - Username Field************************** */}
          <TextField
            type="text"
            className="register__textBox"
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Username"
            required
            inputProps={{
              style: {
                fontSize: "1.0rem",
                fontFamily: "interMedium",
                paddingTop: "12.5px",
                paddingBottom: "12.5px",
              },
            }}
            InputLabelProps={{
              style: {
                fontSize: "1.0rem",
                fontFamily: "interMedium",
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
              fontFamily: "interMedium",
              fontSize: "1rem",
            }}
          />
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
                fontSize: "1.0rem",
                fontFamily: "interMedium",
                paddingTop: "12.5px",
                paddingBottom: "12.5px",
              },
            }}
            InputLabelProps={{
              style: {
                fontSize: "1.0rem",
                fontFamily: "interMedium",
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
            required
            inputProps={{
              style: {
                fontSize: "1.0rem",
                fontFamily: "interMedium",
                paddingTop: "12.5px",
                paddingBottom: "12.5px",
              },
            }}
            InputLabelProps={{
              style: {
                fontSize: "1.0rem",
                fontFamily: "interMedium",
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
              fontFamily: "interMedium",
              fontSize: "1rem",
            }}
          />
          {/* *******************EdwardML - 'Let's Go!' Button************************** */}
          <Button
            variant="contained"
            size="large"
            sx={{
              textTransform: "none",
              width: "211px",
              minHeight: "48px",
              marginTop: "20px",
              fontFamily: "interExtraBold",
              fontSize: "1rem",
              borderRadius: "24px",
              backgroundColor: theme.palette.day.primary,
            }}
            onClick={register}
          >
            Let's Go!
          </Button>
          <Divider
            sx={{
              width: "100%",
              borderColor: "black",
              marginTop: "32px",
              marginBottom: "27px",
            }}
          />
          {/* *******************Already Registered Section************************** */}
          <div style={{ fontFamily: "interMedium" }}>
            Already registered?{" "}
            <Link to="/login">
              <span
                style={{ fontFamily: "interExtraBold", fontWeight: "bold" }}
              >
                Login here!
              </span>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
