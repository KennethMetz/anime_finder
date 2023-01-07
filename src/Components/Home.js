import "../Styles/App.css";

import {
  Autocomplete,
  TextField,
  Grid,
  Box,
  Container,
  TableContainer,
} from "@mui/material";

import { Link, useNavigate } from "react-router-dom";
import * as React from "react";

import { useEffect, useState, useContext } from "react";
import { LocalUserContext } from "./LocalUserContext";
import { GenericList } from "./GenericList";
import Emoji from "./Emoji";
import { User } from "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Firebase";
import { FirebaseError } from "firebase/app";
import { flushSync } from "react-dom";
import { RecommendedList } from "./RecommendedList";
import TitleAutocomplete from "./TitleAutocomplete";
import { PopulateFromFirestore } from "./Firestore";

export default function Home() {
  let [animeHR, setAnimeHR] = useState([]); //highest rated
  let [animeMR, setAnimeMR] = useState([]); //most rated
  let [animeMC, setAnimeMC] = useState([]); //most completed
  let [animeMPTW, setAnimeMPTW] = useState([]); //most planned to watch
  let [animeMH, setAnimeMH] = useState([]); //lowest rated
  let [animeRandom, setAnimeRandom] = useState([]); //randomized

  let [loadingGeneric, setLoadingGeneric] = useState(true);
  let [loadingRecs, setLoadingRecs] = useState(true);

  let [recommendation, setRecommendation] = useState([]);
  const [localUser, setLocalUser] = useContext(LocalUserContext);

  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  let randomPage = [];
  let randomItem = [];

  async function getAnimeListing(url, setState) {
    try {
      let response = await fetch(url, { mode: "cors" });
      let responseJson = await response.json();
      setState(responseJson.items);
      setLoadingGeneric(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function getRandomAnimeListing(url, animeRandom, setAnimeRandom) {
    let tempItem = [];
    // let k = 0;
    for (let k = 0; k < 5; k++) {
      try {
        let response = await fetch(`${url}page=${randomPage[k]}`, {
          mode: "cors",
        });
        let responseJson = await response.json();
        console.assert(
          responseJson.items.length === 10,
          "LIST IS LESS THAN 10"
        );
        tempItem = [...tempItem, responseJson.items[randomItem[k]]];

        setLoadingGeneric(false);
      } catch (error) {
        console.log(error);
      }
    }
    setAnimeRandom(tempItem);
  }

  async function recommendContent() {
    try {
      let data = {
        history: [],
        amount: 8,
      };
      if (localUser["likes"].length > 0) {
        for (let i = 0; i < localUser["likes"].length; i++) {
          data["history"][i] = {
            animeId: localUser["likes"][i].id,
            status: "COMPLETED",
          };
        }
      }
      if (localUser["dislikes"].length > 0) {
        for (let i = 0; i < localUser["dislikes"].length; i++) {
          data["history"].push({
            animeId: localUser["dislikes"][i].id,
            status: "DROPPED",
          });
        }
      }
      // console.log(data);
      // console.log(localUser);

      let response = await fetch(
        `https://api-jet-lfoguxrv7q-uw.a.run.app/recommend`,
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      let responseJson = await response.json();
      let temp = [];
      responseJson.items.map((item, index) => temp.push(item.anime));
      setRecommendation(temp);
      setLoadingRecs(false);
    } catch (error) {
      console.log(error);
    }
  }

  function getRandomNumbers() {
    for (let i = 0; i < 5; i++) {
      randomPage[i] = Math.floor(Math.random() * 250 + 1);
      randomItem[i] = Math.floor(Math.random() * 10);
    }
  }

  useEffect(() => {
    recommendContent();
  }, [user, localUser]);

  useEffect(() => {
    //Get generic recommendations
    getAnimeListing(
      "https://api-jet-lfoguxrv7q-uw.a.run.app/anime?sort=highest_rated&page_size=5",
      setAnimeHR
    );
    getAnimeListing(
      "https://api-jet-lfoguxrv7q-uw.a.run.app/anime?sort=most_completed&page_size=5",
      setAnimeMC
    );
    getAnimeListing(
      "https://api-jet-lfoguxrv7q-uw.a.run.app/anime?sort=most_rated&page_size=5",
      setAnimeMR
    );
    getAnimeListing(
      "https://api-jet-lfoguxrv7q-uw.a.run.app/anime?sort=most_planned_to_watch&page_size=5",
      setAnimeMPTW
    );
    getAnimeListing(
      "https://api-jet-lfoguxrv7q-uw.a.run.app/anime?sort=most_planned_to_watch&page_size=5&page=504",
      setAnimeMH
    );

    getRandomNumbers();

    getRandomAnimeListing(
      `https://api-jet-lfoguxrv7q-uw.a.run.app/anime?`,
      animeRandom,
      setAnimeRandom
    );
  }, []);

  useEffect(() => {
    if (loading) {
      // trigger a loading screen?
      return;
    }
    if (user) {
      PopulateFromFirestore(user, localUser, setLocalUser);

      console.log(localUser);
      navigate("/home");
    }
  }, [user, loading]);

  return (
    <div className="App">
      <Container maxwidth="sm">
        <div className="gap" />

        {localUser && localUser["likes"] ? (
          <h4>RECOMMENDED FOR YOU</h4>
        ) : (
          <h4>Like a show below to receive personalized recommendations!</h4>
        )}
        {loadingRecs ? <div id="loading"></div> : ""}
        <RecommendedList movies={recommendation} />

        <div className="gap" />
        {loadingGeneric ? <div id="loading"></div> : ""}
        <h4>HIGHEST RATED</h4>
        <GenericList movies={animeHR} />
        <h4>MOST VIEWED</h4>
        <GenericList movies={animeMC} />
        <h4>MOST POPULAR</h4>
        <GenericList movies={animeMR} />
        <h4>HYPE BEASTS</h4>
        <GenericList movies={animeMPTW} />
        <h4>MOST OBSCURE</h4>
        <GenericList movies={animeMH} />
        <h4>RANDOM TITLES</h4>
        <GenericList movies={animeRandom} />
      </Container>
    </div>
  );
}
