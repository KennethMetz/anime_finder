import "../Styles/App.css";

import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useEffect, useState, useContext } from "react";
import { LocalUserContext } from "./LocalUserContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Firebase";
import { PopulateFromFirestore } from "./Firestore";
import AnimeGrid from "./AnimeGrid";
import ShelfTitle from "./ShelfTitle";
import Stack from "@mui/material/Stack";
import AnimeShelf from "./AnimeShelf";
import {
  getRandomAnimeListing,
  useAnimeHR,
  useAnimeMC,
  useAnimeMH,
  useAnimeMPTW,
  useRecommendations,
} from "./APICalls";

export default function Home() {
  let [animeRandom, setAnimeRandom] = useState([]); //randomized

  const [localUser, setLocalUser] = useContext(LocalUserContext);

  const [user, loading] = useAuthState(auth);

  let [selectedGenre, setSelectedGenre] = useState([]);

  let [refresh, setRefresh] = useState(false);

  let randomPage = [];
  let randomItem = [];

  function getViewHistory() {
    let data = {
      history: [],
      amount: 30,
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
    return data;
  }

  function getRandomNumbers() {
    for (let i = 0; i < 6; i++) {
      randomPage[i] = Math.floor(Math.random() * 250 + 1);
      randomItem[i] = Math.floor(Math.random() * 10);
    }
  }

  useEffect(() => {
    getRandomNumbers();
    getRandomAnimeListing(randomPage, randomItem).then((result) =>
      setAnimeRandom(result).catch((error) => console.log(error))
    );
  }, [refresh]);

  // API call for personalized recommendations.
  const viewHistory = getViewHistory();
  const { data: recommendation, isLoading: loadingRecs } =
    useRecommendations(viewHistory);

  //API calls for generic shelf content
  const { data: animeHR } = useAnimeHR(selectedGenre);
  const { data: animeMC } = useAnimeMC(selectedGenre);
  const { data: animeMPTW } = useAnimeMPTW(selectedGenre);
  const { data: animeMH } = useAnimeMH(selectedGenre);

  useEffect(() => {
    if (loading) {
      // trigger a loading screen?
      return;
    }
    if (user) {
      PopulateFromFirestore(user, localUser, setLocalUser);
    }
  }, [user, loading]);

  return (
    <div>
      <Container maxWidth="lg">
        <div className="gap" />
        {localUser && localUser?.likes.length > 0 ? (
          <>
            <h2
              style={{
                fontSize: "2.5rem",
                fontFamily: "interBlack, Arial, Helvetica, sans-serif",
                textAlign: "left",
                marginBlockStart: 0,
                marginBlockEnd: "0.5rem",
              }}
            >
              For You
            </h2>
            <AnimeGrid items={recommendation} large />
          </>
        ) : (
          ""
        )}
        {localUser.uid && localUser?.likes.length === 0 ? (
          <h2
            style={{
              fontSize: "2.0rem",
              fontFamily: "interBlack, Arial, Helvetica, sans-serif",
              textAlign: "left",
              marginBlockStart: 0,
              marginBlockEnd: "0.5rem",
            }}
          >
            Like a show to receive{" "}
            <span className="rainbow_text_animated">personalized</span>{" "}
            recommendations!
          </h2>
        ) : (
          ""
        )}
        <div className="gap" />
      </Container>

      <ShelfTitle
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
        title={"Explore More"}
      />

      <Container maxWidth="lg">
        <h4 className="shelfTitle"> Highest Rated {selectedGenre.slice(7)} </h4>
        <AnimeShelf items={animeHR} />

        <h4 className="shelfTitle">Most Popular {selectedGenre.slice(7)}</h4>
        <AnimeShelf items={animeMC} />
        {/* 
      <h4>All time Best</h4>
      <AnimeShelf items={animeMR} /> */}

        <h4 className="shelfTitle">
          Most Buzzed About {selectedGenre.slice(7)}
        </h4>
        <AnimeShelf items={animeMPTW} />

        <h4 className="shelfTitle">Most Obscure</h4>
        <AnimeShelf items={animeMH} />

        <Stack direction="row" spacing={3} sx={{ alignItems: "baseline" }}>
          <h4 className="shelfTitle">Random</h4>
          <Button
            color="inherit"
            variant="outlined"
            size="small"
            startIcon={<RefreshIcon />}
            onClick={() => {
              setAnimeRandom([]);
              refresh ? setRefresh(false) : setRefresh(true);
            }}
          >
            Surprise Me!
          </Button>
        </Stack>

        <AnimeShelf items={animeRandom} />

        <div className="gap" />
      </Container>
    </div>
  );
}
