import "../Styles/App.css";

import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useEffect, useState, useContext } from "react";
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
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Firebase";
import { LocalUserContext } from "./LocalUserContext";
import HandleDialog from "./HandleDialog";
import { PopulateFromFirestore } from "./Firestore";
import useGenreFilter from "../Hooks/useGenreFilter";

export default function Home() {
  let [animeRandom, setAnimeRandom] = useState([]); //randomized

  const [user, loading, error] = useAuthState(auth);

  const [localUser, setLocalUser] = useContext(LocalUserContext);

  const [selectedGenre, setSelectedGenre] = useGenreFilter();
  const genreQueryString = selectedGenre ? `&genre=${selectedGenre}` : "";

  let [refresh, setRefresh] = useState(false);

  let randomPage = [];
  let randomItem = [];

  function getViewHistory() {
    let data = {
      history: [],
      amount: 30,
    };
    if (localUser["likes"][0]) {
      for (let i = 0; i < localUser["likes"].length; i++) {
        data["history"][i] = {
          animeId: localUser["likes"][i],
          status: "COMPLETED",
        };
      }
    }
    if (localUser["dislikes"][0]) {
      for (let i = 0; i < localUser["dislikes"].length; i++) {
        data["history"].push({
          animeId: localUser["dislikes"][i],
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
    getRandomAnimeListing(randomPage, randomItem)
      .then((result) => setAnimeRandom(result))
      .catch((error) => console.log(error));
  }, [refresh]);

  useEffect(() => {
    PopulateFromFirestore(user, localUser, setLocalUser);
  }, [user]);

  // API call for personalized recommendations.
  const viewHistory = getViewHistory();
  const { data: recommendation, isLoading: loadingRecs } =
    useRecommendations(viewHistory);

  //API calls for generic shelf content
  const { data: animeHR } = useAnimeHR(genreQueryString);
  const { data: animeMC } = useAnimeMC(genreQueryString);
  const { data: animeMPTW } = useAnimeMPTW(genreQueryString);
  const { data: animeMH } = useAnimeMH(genreQueryString);

  const shelfTitleStyles = {
    marginTop: "1.6em",
    marginBottom: "0.5em",
  };

  return (
    <div>
      {/* Below ensure the following: localUser has been loaded, user is not 
      on a guest account, and they do NOT have a handle.*/}
      {localUser.uid && !user.isAnonymous && !localUser.handle && (
        <HandleDialog user={user} />
      )}
      <Container maxWidth="lg">
        <div className="gap" />
        {localUser.uid && localUser?.likes.length === 0 ? (
          <Typography
            variant="h2"
            style={{
              fontSize: "2.0rem",
              marginBlockStart: 0,
              marginBlockEnd: "0.5rem",
            }}
          >
            Like a show to receive{" "}
            <span className="rainbow_text_animated">personalized</span>{" "}
            recommendations!
          </Typography>
        ) : (
          <>
            <Typography
              variant="h2"
              style={{
                marginBlockStart: 0,
                marginBlockEnd: "0.5rem",
              }}
            >
              For You
            </Typography>
            <AnimeGrid items={recommendation} large />
          </>
        )}
        <div className="gap" />
      </Container>
      <ShelfTitle
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
        title={"Explore More"}
      />
      <Container maxWidth="lg">
        <Typography variant="h4" sx={shelfTitleStyles}>
          Highest Rated {selectedGenre}{" "}
        </Typography>
        <AnimeShelf items={animeHR} />

        <Typography variant="h4" sx={shelfTitleStyles}>
          Most Popular {selectedGenre}
        </Typography>
        <AnimeShelf items={animeMC} />
        {/* 
      <h4>All time Best</h4>
      <AnimeShelf items={animeMR} /> */}

        <Typography variant="h4" sx={shelfTitleStyles}>
          Most Buzzed About {selectedGenre}
        </Typography>
        <AnimeShelf items={animeMPTW} />

        <Typography variant="h4" sx={shelfTitleStyles}>
          Most Obscure
        </Typography>
        <AnimeShelf items={animeMH} />

        <Stack direction="row" spacing={3} sx={{ alignItems: "baseline" }}>
          <Typography variant="h4" sx={shelfTitleStyles}>
            Random
          </Typography>
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
