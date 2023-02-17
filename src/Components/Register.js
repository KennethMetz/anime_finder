import "../Styles/Register.css";

import React, { useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  auth,
  linkWithEmailAndPassword,
  linkWithGoogle,
  linkWithTwitter,
  logInAnon,
  registerWithEmailAndPassword,
  signInWithGoogle,
  signInWithTwitter,
} from "./Firebase";
import { SaveToFirestore } from "./Firestore";
import { LocalUserContext } from "./LocalUserContext";
import logo from "../Styles/images/logo.svg";
import { useTheme } from "@mui/material/styles";
import {
  Button,
  Container,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import { User } from "phosphor-react";
import { Box } from "@mui/system";
import google from "../Styles/images/google.svg";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import LoadingFourdots from "./LoadingFourDots.json";
import Lottie from "lottie-react";
import BreathingLogo from "./BreathingLogo";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const location = useLocation();
  const [localUser, setLocalUser] = useContext(LocalUserContext);
  const theme = useTheme();
  const [emailError, setEmailError] = useState(null);
  //Keeps user on page until registration method is selected. Prevents automatic forwarding of guest users registering permanent accounts
  let [forwardToken, setForwardToken] = useState(false);
  const [regLoadingEmail, setRegLoadingEmail] = useState(false);
  const [regLoadingGuest, setRegLoadingGuest] = useState(false);

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

  // Define Yup schema
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("*Username is required"),
    email: Yup.string()
      .required("*Email is required")
      .email("*Invalid email, must match pattern: spike@bebop.com")
      .matches(
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
        "*Invalid email, must match pattern: spike@bebop.com"
      ),
    password: Yup.string()
      .required("*Password is required")
      .min(6, "*Password must be at least 6 characters long"),
    // .matches(/[a-z]+/, "Must include one lowercase character")
    // .matches(/[A-Z]+/, "Must include one uppercase character"),
  });

  //Use ReactHookForm hooks to validate Yup schema
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    criteriaMode: "all",
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    console.log(regLoadingGuest);
  }, [regLoadingGuest]);

  useEffect(() => {
    if (loading) return;
    //Registering users without any likes causes /home rendering to error out --> this prevents that.
    if (localUser["likes"]?.length === 0) navigate("/");
    if (user && forwardToken) {
      SaveToFirestore(user, localUser).then(() => {
        navigate("/home");
      });
    }
  }, [user, loading, forwardToken]);

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
            onClick={() => {
              if (!user) {
                signInWithGoogle();
                setForwardToken(true);
              } else {
                linkWithGoogle(setForwardToken);
              }
            }}
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
            onClick={() => {
              if (!user) {
                signInWithTwitter();
                setForwardToken(true);
              } else {
                linkWithTwitter(setForwardToken);
              }
            }}
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
            onClick={() => {
              setRegLoadingGuest(true);
              logInAnon();
              setForwardToken(true);
            }}
            startIcon={
              regLoadingGuest ? (
                ""
              ) : (
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
              )
            }
          >
            {regLoadingGuest ? (
              <BreathingLogo type={"largeButton"} />
            ) : (
              "Visit as a Guest"
            )}
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
            {...register("username")}
            className="register__textBox"
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Username"
            required
            error={errors.username ? true : false}
            helperText={errors.username?.message}
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
            {...register("email")}
            className="register__textBox"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            required
            error={errors.email ? true : false}
            helperText={errors.email?.message}
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
            {...register("password")}
            className="register__textBox"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            required
            error={errors.password ? true : false}
            helperText={errors.password?.message}
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
              width: "211px",
              marginTop: "20px",
            }}
            onClick={handleSubmit(() => {
              setRegLoadingEmail(true);
              if (!user) {
                registerWithEmailAndPassword(
                  name,
                  email,
                  password,
                  setEmailError,
                  setRegLoadingEmail
                );
                setForwardToken(true);
              } else {
                linkWithEmailAndPassword(
                  setForwardToken,
                  email,
                  password,
                  name,
                  setRegLoadingEmail
                );
              }
            })}
          >
            {regLoadingEmail ? (
              <BreathingLogo type={"smallButton"} />
            ) : (
              "Let's Go!"
            )}
          </Button>
          <Typography
            sx={{
              color: "error.main",
              marginTop: "10px",
              fontFamily: "interExtraBold",
            }}
          >
            {errors.username || errors.email || errors.password
              ? "*Please resolve errors shown above."
              : ""}
          </Typography>
          <Typography
            sx={{ color: "error.main", fontFamily: "interExtraBold" }}
          >
            {emailError ? emailError : ""}
          </Typography>
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
