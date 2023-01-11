import "../Styles/App.css";
import "../Styles/Onboarding.css";

import { Link, useNavigate } from "react-router-dom";
import * as React from "react";

import { useEffect, useState, useContext } from "react";
import { LocalUserContext } from "./LocalUserContext";
import { OnboardingList } from "./OnboardingList";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Firebase";
import { Button, Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import logo from "../Styles/images/logo.svg";

import { SaveToFirestore } from "./Firestore";

export default function Onboarding() {
  const [localUser, setLocalUser] = useContext(LocalUserContext);
  let [animeMR, setAnimeMR] = useState([]); //most rated
  let [loading, setLoading] = useState(true);

  const [user] = useAuthState(auth);

  const theme = useTheme();

  const navigate = useNavigate();

  async function getAnimeListing(url, setState) {
    try {
      let response = await fetch(url, { mode: "cors" });
      let responseJson = await response.json();
      setState(responseJson.items);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    //Check for existing user auth
    if (user) return navigate("/home");

    //Get generic recommendations
    getAnimeListing(
      "https://api-jet-lfoguxrv7q-uw.a.run.app/anime?page_size=10",
      setAnimeMR
    );
    console.log(localUser);
  }, [user, loading, localUser]);

  return (
    <div className="App">
      <Container maxWidth="lg">
        {/* <Link to="/home"> */}
        <div className="welcomeBanner">
          <img src={logo} alt="" className="welcomeLogo" />
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
        {/* </Link> */}
        <h4 className="leftH4">Let's Get Started!!</h4>
        <span style={{ fontFamily: "interMedium", fontSize: "1.0rem" }}>
          EdwardML uses its giant computer brain to help you decide which anime
          to watch next, based on your interests.
          <br /> <br />
          To begin, choose the shows below that you enjoy or are interested in.
          You can also mark those you are not interested in. Don’t worry, you
          can always change this later!
        </span>
        <br />
        <br />
        <br />
        {loading ? <div id="loading"></div> : ""}

        <OnboardingList movies={animeMR} />
        <br />
        {localUser["likes"] && localUser["likes"].length < 1 ? (
          <div style={{ display: "flex", justifyContent: "right" }}>
            <Button
              variant="contained"
              disabled
              size="large"
              sx={{
                minWidth: "211px",
                minHeight: "48px",
                marginTop: "20px",
                fontSize: "1rem",
                borderRadius: "24px",
                color: "white",
              }}
            >
              LET'S GO!
            </Button>
          </div>
        ) : (
          <Link to="/home" style={{ display: "flex", justifyContent: "right" }}>
            <Button
              variant="contained"
              size="large"
              sx={{
                minWidth: "211px",
                minHeight: "48px",
                marginTop: "20px",
                fontSize: "1rem",
                borderRadius: "24px",
                backgroundColor: theme.palette.day.primary,
              }}
              onClick={(e) => {
                SaveToFirestore(user, localUser);
              }}
            >
              LET'S GO!
            </Button>
          </Link>
        )}
        <br />
        <br />
      </Container>
    </div>
  );
}
