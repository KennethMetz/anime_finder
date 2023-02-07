import "../Styles/App.css";
import "../Styles/Onboarding.css";

import { Link, useNavigate } from "react-router-dom";
import * as React from "react";

import { useEffect, useState, useContext } from "react";
import { LocalUserContext } from "./LocalUserContext";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Firebase";
import { Button, Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import logo from "../Styles/images/logo.svg";

import { SaveToFirestore } from "./Firestore";
import OnboardingButton from "./OnboardingButton";
import OnboardingAnimeGrid from "./OnboardingAnimeGrid";
import SkipOnboardDialog from "./SkipOnboardDialog";

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
  }, [user, loading, localUser]);

  return (
    <div className="App">
      <SkipOnboardDialog></SkipOnboardDialog>
      <Container maxWidth="lg">
        {/* <Link to="/home"> */}
        <div className="welcomeBanner">
          <img src={logo} alt="" className="welcomeLogo" />
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
        <OnboardingAnimeGrid items={animeMR ?? []} large onboarding />
        <br />
        {localUser["likes"] && localUser["likes"].length < 1 ? (
          <OnboardingButton disabled={true} />
        ) : (
          <OnboardingButton />
        )}
        <div style={{ marginTop: "30px" }} />
      </Container>
    </div>
  );
}
