import "../Styles/App.css";

import { Link, useNavigate } from "react-router-dom";
import * as React from "react";

import { useEffect, useState, useContext } from "react";
import { LocalUserContext } from "./LocalUserContext";
import { OnboardingList } from "./OnboardingList";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Firebase";
import { Container } from "@mui/material";

import { SaveToFirestore } from "./Firestore";

export default function Onboarding() {
  const [localUser, setLocalUser] = useContext(LocalUserContext);
  let [animeMR, setAnimeMR] = useState([]); //most rated
  let [loading, setLoading] = useState(true);

  const [user] = useAuthState(auth);

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
      "https://api-jet-lfoguxrv7q-uw.a.run.app/anime?page_size=16",
      setAnimeMR
    );
    console.log(localUser);
    console.log(localUser["likes"].length);
  }, [user, loading, localUser]);

  return (
    <div className="App">
      <Container maxwidth="sm">
        <h1 className="appTitle">EdwardML</h1>
        <div className="gap" />
        <h3 className="greeting">Let's Get Started!!</h3>
        <h4 className="intro">
          Begin by selecting at least three programs you enjoy or are interested
          in (don't worry, you can change these later!)
        </h4>
        {loading ? <div id="loading"></div> : ""}

        <OnboardingList movies={animeMR} />
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <li>
          {" "}
          {localUser["likes"] && localUser["likes"].length < 3 ? (
            <h3>Please Select (3) Titles From Above</h3>
          ) : (
            <Link to="/home">
              <button
                onClick={(e) => {
                  SaveToFirestore(user, localUser);
                }}
              >
                LET'S GO!
              </button>
            </Link>
          )}
        </li>
      </Container>
    </div>
  );
}
