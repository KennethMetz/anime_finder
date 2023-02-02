import "../Styles/App.css";

import {
  Autocomplete,
  TextField,
  Grid,
  Box,
  Container,
  TableContainer,
  Chip,
  ListItemButton,
  Button,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

import { Link, useNavigate } from "react-router-dom";
import * as React from "react";

import { useEffect, useState, useContext } from "react";
import { LocalUserContext } from "./LocalUserContext";
import Emoji from "./Emoji";
import { User } from "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Firebase";
import { FirebaseError } from "firebase/app";
import { flushSync } from "react-dom";
import TitleAutocomplete from "./TitleAutocomplete";
import { PopulateFromFirestore } from "./Firestore";
import AnimeGrid from "./AnimeGrid";
import GenreChips from "./GenreChips";
import ShelfTitle from "./ShelfTitle";
import { Stack } from "@mui/system";
import AnimeShelf from "./AnimeShelf";

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

  let [selectedGenreHR, setSelectedGenreHR] = useState([]);
  let [selectedGenreMR, setSelectedGenreMR] = useState([]);
  let [selectedGenreMC, setSelectedGenreMC] = useState([]);
  let [selectedGenreMPTW, setSelectedGenreMPTW] = useState([]);

  let [refresh, setRefresh] = useState(false);

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

  async function getRandomAnimeListing(
    url,
    animeRandom,
    setAnimeRandom,
    refresh
  ) {
    let tempItem = [];
    for (let k = 0; k < 6; k++) {
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
        amount: 10,
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
    for (let i = 0; i < 6; i++) {
      randomPage[i] = Math.floor(Math.random() * 250 + 1);
      randomItem[i] = Math.floor(Math.random() * 10);
    }
  }

  useEffect(() => {
    recommendContent();
  }, [user, localUser]);

  //Get generic recommendations
  useEffect(() => {
    getAnimeListing(
      `https://api-jet-lfoguxrv7q-uw.a.run.app/anime?sort=highest_rated&page_size=24${selectedGenreHR}`,
      setAnimeHR
    );
  }, [selectedGenreHR]);

  useEffect(() => {
    getAnimeListing(
      `https://api-jet-lfoguxrv7q-uw.a.run.app/anime?sort=most_completed&page_size=24${selectedGenreMC}`,
      setAnimeMC
    );
  }, [selectedGenreMC]);

  useEffect(() => {
    getAnimeListing(
      `https://api-jet-lfoguxrv7q-uw.a.run.app/anime?sort=most_rated&page_size=24${selectedGenreMR}`,
      setAnimeMR
    );
  }, [selectedGenreMR]);

  useEffect(() => {
    getAnimeListing(
      `https://api-jet-lfoguxrv7q-uw.a.run.app/anime?sort=most_planned_to_watch&page_size=24${selectedGenreMPTW}`,
      setAnimeMPTW
    );
  }, [selectedGenreMPTW]);

  useEffect(() => {
    getAnimeListing(
      `https://api-jet-lfoguxrv7q-uw.a.run.app/anime?sort=most_planned_to_watch&page_size=24&page=101`,
      setAnimeMH
    );
  }, []);

  useEffect(() => {
    getRandomNumbers();

    getRandomAnimeListing(
      `https://api-jet-lfoguxrv7q-uw.a.run.app/anime?`,
      animeRandom,
      setAnimeRandom,
      refresh
    );
  }, [refresh]);

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
    <Container maxWidth="lg">
      <div className="gap" />
      {localUser && localUser["likes"] ? (
        <Grid container style={{ alignItems: "center" }}>
          <Grid item xs={12}>
            <h2
              style={{
                fontSize: "2.5rem",
                fontFamily: "interExtraBold, Arial, Helvetica, sans-serif",
                textAlign: "left",
                marginBlockStart: 0,
                marginBlockEnd: "0.5rem",
              }}
            >
              For You
            </h2>
          </Grid>
        </Grid>
      ) : (
        <h4>Like a show below to receive personalized recommendations!</h4>
      )}
      {loadingRecs ? <div id="loading"></div> : ""}
      <AnimeGrid items={recommendation} large />
      <div className="gap" />
      {loadingGeneric ? <div id="loading"></div> : ""}
      <ShelfTitle
        selectedGenre={selectedGenreHR}
        setSelectedGenre={setSelectedGenreHR}
        title={"Highest Rated"}
      />
      <AnimeShelf items={animeHR} />
      <ShelfTitle
        selectedGenre={selectedGenreMC}
        setSelectedGenre={setSelectedGenreMC}
        title={"Most Popular"}
      />
      <AnimeShelf items={animeMC} />
      <ShelfTitle
        selectedGenre={selectedGenreMR}
        setSelectedGenre={setSelectedGenreMR}
        title={"Most Viewed"}
      />
      <AnimeShelf items={animeMR} />
      <ShelfTitle
        selectedGenre={selectedGenreMPTW}
        setSelectedGenre={setSelectedGenreMPTW}
        title={"Hype Beasts"}
      />
      <AnimeShelf items={animeMPTW} />
      <h4>Most Obscure</h4>
      <AnimeShelf items={animeMH} />
      <Stack direction="row" spacing={3} sx={{ alignItems: "center" }}>
        <h4>Random</h4>{" "}
        <Chip
          // Triggers a re-render of the random anime shelf
          variant="outlined"
          label="Surprise Me!"
          onClick={() => {
            refresh ? setRefresh(false) : setRefresh(true);
          }}
          icon={<RefreshIcon />}
        />
      </Stack>
      <AnimeGrid items={animeRandom} />
      <div className="gap" />
    </Container>
  );
}
