import "../Styles/App.css";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

import * as React from "react";

import { useEffect, useState, useContext } from "react";
import { LocalUserContext } from "./LocalUserContext";

import Emoji from "./Emoji";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Firebase";

import { GenericList } from "./GenericList";

function App() {
  let [animeHR, setAnimeHR] = useState([]); //highest rated
  let [animeMR, setAnimeMR] = useState([]); //most rated
  let [animeMC, setAnimeMC] = useState([]); //most completed
  let [animeMPTW, setAnimeMPTW] = useState([]); //most planned to watch
  let [animeMH, setAnimeMH] = useState([]); //lowest rated

  let [loading, setLoading] = useState(true);
  let [search, setSearch] = useState("");
  let [searchResults, setSearchResults] = useState(false);
  let [basis, setBasis] = useState("");
  let [value, setValue] = useState([]);
  let [inputValue, setInputValue] = useState("");
  let [autocompleteOptions, setAutocompleteOptions] = useState([]);
  let [autocompleteOptionsInfo, setAutocompleteOptionsInfo] = useState([]);

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

  async function searchContent() {
    try {
      console.log(inputValue);
      console.log(value);
      let response = await fetch(
        `https://api-jet-lfoguxrv7q-uw.a.run.app/anime/search?query=${inputValue}`,
        { mode: "cors" }
      );
      let responseJson = await response.json();
      console.log(response);
      setSearchResults(responseJson.items);
      let temp = [];
      let fullTempInfo = [];
      responseJson.items.map((item, index) => temp.push(item.name));
      responseJson.items.map((item, index) => fullTempInfo.push(item));
      setAutocompleteOptions(temp);
      setAutocompleteOptionsInfo(fullTempInfo);
    } catch (error) {
      console.log(error);
    }
  }

  async function recommendContent(viewHistory) {
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
      // if (localUser["dislikes"].length > 0) {
      //   for (let i = 0; i < localUser["dislikes"].length; i++) {
      //     data["history"].push({
      //       animeId: localUser["dislikes"][i].id,
      //       status: "DROPPED",
      //     });
      //   }
      // }

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
      return responseJson;
    } catch (error) {
      console.log(error);
    }
  }

  function addAcChoice(value) {
    console.log(autocompleteOptionsInfo);
    console.log(value);
    console.log(localUser);
    for (let i = 0; i < autocompleteOptionsInfo.length; i++) {
      if (value[value.length - 1] === autocompleteOptionsInfo[i].name) {
        setLocalUser({
          likes: [...localUser["likes"], autocompleteOptionsInfo[i]],
        });
        console.log("at least it went through i guess");
        console.log(i);
      }
    }
  }

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
      "https://api-jet-lfoguxrv7q-uw.a.run.app/anime?sort=most_planned_to_watch&page_size=5&page=253",
      setAnimeMH
    );
  }, []);

  useEffect(() => {
    console.log("inputValue: ", inputValue);
    searchContent();
  }, [inputValue]);

  return (
    <div className="App">
      {/* <header className="App-header">
        <p>YOU ARE A STRANGER HERE</p>

        <Link to="login">
          <button>LOG IN</button>
        </Link>
      </header> */}
      <div className="gap" />
      <h3>WHAT ANIME DO YOU LIKE?</h3>
      <div className="rowCenter">
        <Autocomplete
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
          options={autocompleteOptions}
          noOptionsText="Type a show/movie name for suggestions!"
          loadingText="Loading..."
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Your Favorite Anime" />
          )}
        />
      </div>
      <input
        type="button"
        onClick={recommendContent}
        value="RECOMMEND SOME SHIT"
      />
      {recommendation ? (
        <div className="column">
          <div>ANIME YOU MAY LIKE</div>
          <GenericList movies={recommendation} />
        </div>
      ) : (
        ""
      )}
      <div className="gap" />
      {loading ? <div id="loading"></div> : ""}
      <hr></hr> <h3>OTHER FAN FAVORITES TO CONSIDER</h3>
      <hr></hr> <h4>HIGHEST RATED OF ALL TIME</h4>
      <GenericList movies={animeHR} />
      <h4>MOST VIEWED</h4>
      <GenericList movies={animeMC} />
      <h4>MOST POPULAR</h4>
      <GenericList movies={animeMR} />
      <h4>HYPE BEASTS</h4>
      <GenericList movies={animeMPTW} />
      <hr></hr>{" "}
      <h4>
        <Emoji symbol="🔥" />
        MOST HATED
        <Emoji symbol="🔥" />
      </h4>
      <GenericList movies={animeMH} />
    </div>
  );
}

export default App;
