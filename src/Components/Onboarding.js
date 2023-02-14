import "../Styles/App.css";
import "../Styles/Onboarding.css";

import { Link, useNavigate } from "react-router-dom";
import * as React from "react";

import { useEffect, useState, useContext } from "react";
import { LocalUserContext } from "./LocalUserContext";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Firebase";
import { Button, Container, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { SaveToFirestore } from "./Firestore";
import OnboardingButton from "./OnboardingButton";
import OnboardingAnimeGrid from "./OnboardingAnimeGrid";
import OnboardingHeader from "./OnboardingHeader";
import BreathingLogo from "./BreathingLogo";

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
      <OnboardingHeader />
      <Container maxWidth="lg">
        <Typography
          className="leftH4"
          sx={{
            fontFamily: "montserratExtraBold",
            fontSize: "2rem",
            marginTop: "30px",
            marginBottom: "23px",
          }}
        >
          Let's Get Started
        </Typography>
        <span
          style={{
            fontFamily: "interSemiBold",
            fontSize: "1.5rem",
          }}
        >
          Pick at least one item you like
        </span>
        <br />

        <br />
        {loading ? <BreathingLogo /> : ""}
        <OnboardingAnimeGrid items={animeMR ?? []} large onboarding />
        <br />
        {localUser["likes"] && localUser["likes"].length < 1 ? (
          <OnboardingButton disabled={true} />
        ) : (
          <OnboardingButton />
        )}
        <div style={{ marginTop: "20px" }} />
      </Container>
    </div>
  );
}
