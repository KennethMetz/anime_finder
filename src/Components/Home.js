import "../Styles/App.css";

import { Autocomplete, TextField, Grid } from "@mui/material";

import { Link } from "react-router-dom";
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

export default function Home() {
  let [animeHR, setAnimeHR] = useState([]); //highest rated
  let [animeMR, setAnimeMR] = useState([]); //most rated
  let [animeMC, setAnimeMC] = useState([]); //most completed
  let [animeMPTW, setAnimeMPTW] = useState([]); //most planned to watch
  let [animeMH, setAnimeMH] = useState([]); //lowest rated

  let [loading, setLoading] = useState(true);
  let [loadingRecs, setLoadingRecs] = useState(true);
  let [search, setSearch] = useState("");
  let [searchResults, setSearchResults] = useState(false);
  let [basis, setBasis] = useState("");
  let [value, setValue] = useState([]);
  let [inputValue, setInputValue] = useState("");
  let [options, setOptions] = useState([]);
  let [optionsInfo, setOptionsInfo] = useState([]);

  let [recommendation, setRecommendation] = useState([]);
  const [localUser, setLocalUser] = useContext(LocalUserContext);

  const [user] = useAuthState(auth);

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
      console.log(data);
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

  //   function addAcChoice(value) {
  //     console.log(OptionsInfo);
  //     console.log(value);
  //     console.log(localUser);
  //     for (let i = 0; i < OptionsInfo.length; i++) {
  //       if (value[value.length - 1] === OptionsInfo[i].name) {
  //         setLocalUser({
  //           likes: [...localUser["likes"], OptionsInfo[i]],
  //         });
  //         console.log("at least it went through i guess");
  //         console.log(i);
  //       }
  //     }
  //   }

  useEffect(() => {
    recommendContent();

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
  }, []);

  return (
    <div className="App">
      <h1 className="appTitle">EdwardML</h1>
      <div className="gap" />
      <div className="rowCenter">
        {TitleAutocomplete()}
        {/* <Autocomplete
          multiple
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
            // console.log(value);
            // addAcChoice(value);
            // console.log(localUser);
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          forcePopupIcon={false}
          filterSelectedOptions
          disablePortal
          options={options}
          noOptionsText="Type a show/movie name for suggestions!"
          loadingText="Loading..."
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Your Favorite Anime" />
          )}
        /> */}
      </div>
      <h4>RECOMMENDED FOR YOU</h4>
      {loadingRecs ? <div id="loading"></div> : ""}
      <RecommendedList movies={recommendation} />

      <div className="gap" />
      {loading ? <div id="loading"></div> : ""}
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
    </div>
  );
}
