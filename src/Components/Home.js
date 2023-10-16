import "../Styles/App.css";

import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import RefreshIcon from "@mui/icons-material/Refresh";
import Box from "@mui/material/Box";
import { useEffect, useState, useContext, useMemo } from "react";
import AnimeGrid from "./AnimeGrid";
import ShelfTitle from "./ShelfTitle";
import Stack from "@mui/material/Stack";
import AnimeShelf from "./AnimeShelf";
import {
  useAnimeHR,
  useAnimeMC,
  useAnimeMH,
  useAnimeMPTW,
  useAnimeRND,
  useAnimeTN,
  useRecommendations,
} from "./APICalls";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Firebase";
import { LocalUserContext } from "./LocalUserContext";
import HandleDialog from "./HandleDialog";
import { PopulateFromFirestore, useCommunityList } from "./Firestore";
import useGenreFilter from "../Hooks/useGenreFilter";
import HtmlPageTitle from "./HtmlPageTitle";
import useAnimeList from "../Hooks/useAnimeList";
import CommunityListShelf from "./CommunityListShelf";
import GreetingExplainer from "./GreetingExplainer";
import { LinearProgress } from "@mui/material";
import DelayedLinearProgress from "./DelayedLinearProgress";

export default function Home() {
  const [user, loading, error] = useAuthState(auth);

  const [localUser, setLocalUser] = useContext(LocalUserContext);

  const [selectedGenre, setSelectedGenre] = useGenreFilter();
  const genreQueryString = selectedGenre ? `&genre=${selectedGenre}` : "";

  let [refresh, setRefresh] = useState(false);
  let [refreshCL, setRefreshCL] = useState(false);

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

  // API call for personalized recommendations.
  const viewHistory = getViewHistory();
  const { data: recommendation, isRefetching: isRefetchingRecs } =
    useRecommendations(viewHistory);

  //API calls for generic shelf content
  const { data: animeTN } = useAnimeTN(genreQueryString);
  const { data: animeHR } = useAnimeHR(genreQueryString);
  const { data: animeMC } = useAnimeMC(genreQueryString);
  const { data: animeMPTW } = useAnimeMPTW(genreQueryString);
  const { data: animeMH } = useAnimeMH(genreQueryString);

  const {
    data: communityListData,
    refetch: refetchCLData,
    remove: removeCLData,
  } = useCommunityList();

  const {
    data: animeRND,
    refetch: refetchRND,
    remove: removeRND,
  } = useAnimeRND();

  useEffect(() => {
    PopulateFromFirestore(user, localUser, setLocalUser);
  }, [user]);

  let { data: communityList } = useAnimeList(communityListData?.anime);

  const shelfTitleStyles = {
    marginTop: "1.6em",
    marginBottom: "0.5em",
  };

  return (
    <div>
      <HtmlPageTitle title={"Home"} />
      {/* Below ensure the following: localUser has been loaded, user is not 
      on a guest account, and they do NOT have a handle.*/}
      {localUser.uid && !user.isAnonymous && !localUser.handle && (
        <HandleDialog user={user} />
      )}
      <Container maxWidth="lg">
        <div className="gap" />
        {user.isAnonymous && <GreetingExplainer />}
        <Typography
          variant="h2"
          style={{
            marginBlockStart: 0,
            marginBlockEnd: "0.5rem",
          }}
        >
          For You
        </Typography>
        <DelayedLinearProgress isRefetching={isRefetchingRecs} />
        {localUser.uid && localUser?.likes.length === 0 ? (
          <div style={{ position: "relative", textAlign: "center" }}>
            <AnimeShelf />
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  position: "relative",
                  top: "40%",
                  fontSize: { xs: "1.6rem", fourHundred: "2.0rem" },
                  marginBlockStart: 0,
                  marginBlockEnd: "0.5rem",
                }}
              >
                Like a show to receive{" "}
                <span className="rainbow_text_animated">personalized</span>{" "}
                recommendations!
              </Typography>
            </div>
          </div>
        ) : (
          <AnimeGrid items={recommendation} large />
        )}
        <div className="gap" />
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h3">Fan Lists</Typography>{" "}
          <Button
            color="inherit"
            variant="outlined"
            size="small"
            startIcon={<RefreshIcon />}
            onClick={() => {
              removeCLData();
              refetchCLData();
            }}
            sx={{ ml: 3 }}
          >
            Surprise Me!
          </Button>
        </Box>
        <CommunityListShelf
          data={communityListData}
          anime={communityList}
          refresh={refreshCL}
          setRefresh={setRefreshCL}
          titleStyle={shelfTitleStyles}
        />
      </Container>
      <div className="gap" />

      <ShelfTitle
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
        title={"Explore More"}
      />
      <Container maxWidth="lg">
        <Typography variant="h4" sx={shelfTitleStyles}>
          {selectedGenre} Trending Now
        </Typography>
        <AnimeShelf items={animeTN} />

        <Typography variant="h4" sx={shelfTitleStyles}>
          Highest Rated {selectedGenre}{" "}
        </Typography>
        <AnimeShelf items={animeHR} />

        <Typography variant="h4" sx={shelfTitleStyles}>
          Most Popular {selectedGenre}
        </Typography>
        <AnimeShelf items={animeMC} />

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
              removeRND();
              refetchRND();
            }}
          >
            Surprise Me!
          </Button>
        </Stack>

        <AnimeShelf items={animeRND} />

        <div className="gap" />
      </Container>
    </div>
  );
}
