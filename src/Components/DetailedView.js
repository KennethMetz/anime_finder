import { useNavigate, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { Grid, ListItem, ListItemText } from "@mui/material";
import { GenericList } from "./GenericList";
import { RecommendedList } from "./RecommendedList";
import RecommendContent from "./RecommendContent";
import { Box, Container } from "@mui/system";
import crunchyroll from "../Styles/images/crunchyroll.webp";
import funimation from "../Styles/images/funimation.svg";
import netflix from "../Styles/images/Netflix.png";
import heart from "../Styles/images/favorite_border_black_24dp.svg";
import frown from "../Styles/images/sentiment_dissatisfied_black_24dp.svg";
import { SaveToFirestore } from "./Firestore";
import { LocalUserContext } from "./LocalUserContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Firebase";
import "../Styles/App.css";

export default function DetailedView() {
  const navigate = useNavigate();
  const location = useLocation();

  let [search, setSearch] = useState();
  let [searchResults, setSearchResults] = useState(false);

  const [localUser, setLocalUser] = useContext(LocalUserContext);
  const [user] = useAuthState(auth);

  async function searchContent() {
    try {
      let response = await fetch(
        `https://api-jet-lfoguxrv7q-uw.a.run.app/anime/search?query=${search}`,
        { mode: "cors" }
      );
      let responseJson = await response.json();
      setSearchResults(responseJson.items);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="jsxWrapper">
      <Container maxwidth="sm">
        <h1 className="appTitle">EdwardML</h1>
        <Grid>
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              console.log(search);
            }}
          ></input>
        </Grid>
        <br></br>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Box component="img" src={location.state.image_large} alt=""></Box>
            <Box
              src={heart}
              alt=""
              className="overlaidIcon"
              id="heartIcon"
              onClick={(e) => {
                setLocalUser({
                  ...localUser,
                  likes: [...localUser["likes"], location.state],
                });
                console.log(localUser);
                SaveToFirestore(user, localUser);
              }}
            />
            <Box
              src={frown}
              alt=""
              className="overlaidIcon"
              id="frownIcon"
              onClick={(e) => {
                setLocalUser({
                  ...localUser,
                  dislikes: [...localUser["dislikes"], location.state],
                });
                console.log(localUser);
                SaveToFirestore(user, localUser);
              }}
            />
            <div className="overlaidFill" id="gradientFill"></div>
          </Grid>
          <Grid item xs={9}>
            <ListItem>
              <ListItemText primary={location.state.name} />
            </ListItem>
            <ListItem>
              <ListItemText primary="IN PROCESS - TV SERIES/MOVIE" />
            </ListItem>
            <ListItem>
              <ListItemText primary="IN PROCESS - X EPISODES" />
            </ListItem>
            <div style={{ display: "flex" }}>
              {location.state.urls.map((item, index) => (
                <div style={{ textAlign: "left" }}>
                  {item.match(/crunchyroll/g) ? (
                    <Box component="a" href={item}>
                      <Box
                        component="img"
                        src={crunchyroll}
                        alt="crunchyroll"
                        sx={{ height: 25 }}
                      />
                    </Box>
                  ) : (
                    <div></div>
                  )}
                  {item.match(/funimation/g) ? (
                    <Box component="a" href={item}>
                      <Box
                        component="img"
                        src={funimation}
                        alt="funimation"
                        sx={{ height: 25 }}
                      />
                    </Box>
                  ) : (
                    <div></div>
                  )}
                  {item.match(/netflix/g) ? (
                    <Box component="a" href={item}>
                      <Box
                        component="img"
                        src={netflix}
                        alt="netflix"
                        sx={{ height: 25 }}
                      />
                    </Box>
                  ) : (
                    <div></div>
                  )}
                </div>
              ))}
            </div>
          </Grid>
        </Grid>
      </Container>
      <h3>SIMILAR TITLES</h3>
      <RecommendContent movies={location.state}></RecommendContent>
    </div>
  );
}
