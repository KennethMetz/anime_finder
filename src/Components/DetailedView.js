import "../Styles/DetailedView.css";

import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
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
import { PopulateFromFirestore, SaveToFirestore } from "./Firestore";
import { LocalUserContext } from "./LocalUserContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Firebase";
import TitleAutocomplete from "./TitleAutocomplete";
import { flushSync } from "react-dom";
import LikeButtons from "./LikeButtons";
import { APIGetAnime } from "./APICalls";
import useAnime from "../Hooks/useAnime";

export default function DetailedView() {
  const navigate = useNavigate();
  const location = useLocation();

  const [localUser, setLocalUser] = useContext(LocalUserContext);
  const [user, loading, error] = useAuthState(auth);

  const params = useParams();
  const animeId = params.animeId;

  const [anime, animeLoading, animeError] = useAnime(animeId, location.state);

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");
    if (user) PopulateFromFirestore(user, localUser, setLocalUser);
  }, [user, loading]);

  // TODO Use a shared loading display component.
  if (loading || animeLoading) {
    return (
      <div className="jsxWrapper">
        <div className="gap" />
        <Container maxWidth="lg">
          <h4>Loading...</h4>
        </Container>
      </div>
    );
  }

  // TODO Use a shared error display component.
  if (error || animeError) {
    return (
      <div className="jsxWrapper">
        <div className="gap" />
        <Container maxWidth="lg">
          <h4>Uh oh! Something went wrong...</h4>
        </Container>
      </div>
    );
  }

  return (
    <div className="jsxWrapper" key={anime.id}>
      <div className="gap" />
      <Container maxWidth="lg">
        <br></br>
        <Grid container spacing={0} rowSpacing={0}>
          <Grid item xs={3} className="tileContainer">
            <div
              style={{
                backgroundImage: "url(" + anime.image_large + ")",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                height: "100%",
              }}
              component="div"
              className="tile"
              src={anime.image_large}
              alt=""
            >
              <Box
                component="img"
                src={heart}
                alt=""
                className="overlaidIcon"
                id="heartIcon"
                onClick={(e) => {
                  let temp = {
                    ...localUser,
                    likes: [...localUser["likes"], anime],
                  };
                  setLocalUser(temp);
                  console.log(localUser);
                  SaveToFirestore(user, temp);
                }}
                component="div"
                className="tile"
                src={location.state.image_large}
                alt=""
                className="overlaidIcon"
                id="frownIcon"
                onClick={(e) => {
                  let temp = {
                    ...localUser,
                    dislikes: [...localUser["dislikes"], anime],
                  };
                  setLocalUser(temp);
                  console.log(localUser);
                  SaveToFirestore(user, temp);
                }}
              />
              <div className="overlaidFill" id="gradientFill"></div>
            </div>
          </Grid>
          <Grid item xs={9}>
            {/* <ListItem
              sx={{
                paddingTop: 0,
                paddingBottom: 0,
                display: "flex",
                justifyContent: "flex-start",
              }}
            > */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  fontFamily: "interExtraBold",
                  fontSize: "1.5rem",
                  margin: "0px 16px",
                }}
              >
                {anime.display_name}
              </div>
              <LikeButtons anime={anime} />
            </Box>
            {/* </ListItem> */}
            <ListItem sx={{ paddingTop: 0, paddingBottom: 0 }}>
              <ListItemText
                primaryTypographyProps={{
                  fontFamily: "interMedium",
                  fontSize: "1rem",
                }}
                primary={anime.localized_titles.map((item, index) => {
                  if (item["language"] === "ja")
                    return anime.localized_titles[index]["title"];
                })}
              />
            </ListItem>
            <ListItem sx={{ paddingTop: 0 }}>
              {/* TERNARY BELOW SCREENS FOR WHETHER 'EPISODE' SHOULD PRINT AS PLURAL OR NOT */}
              {anime.episodes > 1 ? (
                <ListItemText
                  primary={`${anime.format} • ${anime.episodes} episodes`}
                  primaryTypographyProps={{
                    fontFamily: "interMedium",
                    fontSize: "1.0rem",
                    whiteSpace: "pre-line",
                  }}
                />
              ) : (
                <ListItemText
                  primary={`${anime.format} • ${anime.episodes} episode`}
                  primaryTypographyProps={{
                    fontFamily: "interMedium",
                    fontSize: "1.0rem",
                  }}
                />
              )}
            </ListItem>
            <ListItem>
              <ListItemText
                primary={anime.description}
                primaryTypographyProps={{
                  fontFamily: "interMedium",
                  fontSize: "1.0rem",
                  whiteSpace: "pre-line",
                }}
              />
            </ListItem>
            {/* BELOW CODE RENDERS STREAMING SERVICES */}
            {/* <div style={{ display: "flex" }}>
              <div>Streaming Services:</div>
              {anime.urls.map((item, index) => (
                <div key={index} style={{ textAlign: "left" }}>
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
            </div> */}
            </Grid>
          </Grid>
        </Grid>
        <h3 className="leftH3">Similar Titles</h3>
        <RecommendContent movies={anime}></RecommendContent>
      </Container>
    </div>
  );
}
