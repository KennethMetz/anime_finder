import "../Styles/Register.css";

import React, { useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "./Firebase";
import { LocalUserContext } from "./LocalUserContext";

import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";
import TwitterIcon from "@mui/icons-material/Twitter";
import { User } from "phosphor-react";
import Box from "@mui/material/Box";
import google from "../Styles/images/google.svg";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import EdwardMLLogo from "./EdwardMLLogo";
import useAuthActions from "../Hooks/useAuthActions";
import HtmlPageTitle from "./HtmlPageTitle";
import BreathingLogo from "./BreathingLogo";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const authActions = useAuthActions();
  const navigate = useNavigate();
  const [localUser, setLocalUser] = useContext(LocalUserContext);
  const theme = useTheme();
  const [registerError, setRegisterError] = useState(null);
  //Keeps user on page until registration method is selected. Prevents automatic forwarding of guest users registering permanent accounts
  let [forwardToken, setForwardToken] = useState(false);
  const [regLoadingGoogle, setRegLoadingGoogle] = useState(false);
  const [regLoadingTwitter, setRegLoadingTwitter] = useState(false);
  const [regLoadingEmail, setRegLoadingEmail] = useState(false);
  const [regLoadingGuest, setRegLoadingGuest] = useState(false);

  let regButtonStyling = {
    color: theme.palette.text.primary,
    borderColor: theme.palette.text.primary,
    textTransform: "none",
    borderRadius: "24px",
    width: "350px",
    fontWeight: 800,
    fontSize: "1rem",
    marginBottom: "17px",
  };

  // Define Yup schema
  const validationSchema = Yup.object().shape({
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
    if (loading) return;
  }, [user, loading, forwardToken]);

  const handleRegister = async (provider) => {
    try {
      setRegisterError(null);
      if (provider === "google") {
        setRegLoadingGoogle(true);
        !user
          ? await authActions.registerWithGoogle()
          : await authActions.linkWithGoogle();
      } else if (provider === "twitter") {
        setRegLoadingTwitter(true);
        !user
          ? await authActions.registerWithTwitter()
          : await authActions.linkWithTwitter();
      } else if (provider === "email") {
        setRegLoadingEmail(true);
        !user
          ? await authActions.registerWithEmail(email, password)
          : await authActions.linkWithEmail(email, password);
      } else if (provider === "anonymous") {
        setRegLoadingGuest(true);
        await authActions.registerAnonymously();
      } else {
        throw new Error("Unknown registration provider");
      }
      navigate("/home");
    } catch (error) {
      console.error(error);
      // Alert user their email address is already used in an account.
      if (error["code"]?.search(/\bemail-already-in-use\b/) > -1) {
        setRegisterError("*Email address has already been taken.");
      } else {
        setRegisterError(
          "Ooops - there was an error registering.  Please try again!"
        );
      }
    } finally {
      setRegLoadingGoogle(false);
      setRegLoadingTwitter(false);
      setRegLoadingEmail(false);
      setRegLoadingGuest(false);
    }
  };

  return (
    <div className="register">
      <HtmlPageTitle title={"Register"} />
      <Container maxWidth="lg">
        <div className="welcomeBanner">
          <Link to="/">
            <EdwardMLLogo />
          </Link>
        </div>
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
        <Typography
          variant="h3"
          style={{ textAlign: "center", margin: 0, marginBottom: "18px" }}
        >
          Let's Get Registered!
        </Typography>
        <div
          className="register__container"
          style={{
            marginBottom: "50px",
            borderColor: theme.palette.divider,
          }}
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
            onClick={() => handleRegister("google")}
            startIcon={
              regLoadingGoogle ? null : (
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
            {regLoadingGoogle ? (
              <BreathingLogo type="smallButton" />
            ) : (
              "Register with Google"
            )}{" "}
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
            onClick={() => handleRegister("twitter")}
            startIcon={
              regLoadingTwitter ? null : (
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
            {regLoadingTwitter ? (
              <BreathingLogo type="smallButton" />
            ) : (
              "Register with Twitter"
            )}{" "}
          </Button>
          <Divider
            sx={{
              width: "87.5%",
              "&::before, &::after": {
                borderColor: theme.palette.text.primary,
              },
              margin: "18px 0px",
            }}
          >
            or
          </Divider>
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
                paddingTop: "12.5px",
                paddingBottom: "12.5px",
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
                paddingTop: "12.5px",
                paddingBottom: "12.5px",
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
          {/* *******************EdwardML - 'Let's Go!' Button************************** */}
          <Button
            variant="contained"
            size="large"
            sx={{
              width: "211px",
              padding: "0px",
            }}
            onClick={handleSubmit(() => handleRegister("email"))}
          >
            {regLoadingEmail ? (
              <BreathingLogo type={"smallButton"} />
            ) : (
              "Let's Go!"
            )}
          </Button>
          {(errors.username || errors.email || errors.password) && (
            <Typography
              sx={{
                color: "error.main",
                marginTop: "10px",
                fontWeight: 800,
              }}
            >
              *Please resolve errors shown above.
            </Typography>
          )}
          {registerError && (
            <Typography sx={{ color: "error.main", fontWeight: 800 }}>
              {registerError}
            </Typography>
          )}
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
            Already registered?{" "}
            <Typography component="span" sx={{ fontWeight: 800 }}>
              <Link to="/login">Login here!</Link>
            </Typography>
          </div>
        </div>
      </Container>
    </div>
  );
}
