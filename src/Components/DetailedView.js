import "../Styles/DetailedView.css";

import { useNavigate, useLocation } from "react-router-dom";
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

export default function DetailedView() {
  const navigate = useNavigate();
  const location = useLocation();

  const [localUser, setLocalUser] = useContext(LocalUserContext);
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");
  }, [user, loading]);

  return (
    <div className="jsxWrapper">
      <Container maxwidth="sm">
        <h1 className="appTitle">EdwardML</h1>
        {TitleAutocomplete()}

        <br></br>
        <Grid container spacing={3}>
          <Grid item xs={3} className="tileContainer">
            <div
              style={{
                backgroundImage: "url(" + location.state.image_large + ")",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                height: "100%",
              }}
              component="div"
              className="tile"
              src={location.state.image_large}
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
                    likes: [...localUser["likes"], location.state],
                  };
                  setLocalUser(temp);
                  console.log(localUser);
                  SaveToFirestore(user, temp);
                }}
              />
              <Box
                component="img"
                src={frown}
                alt=""
                className="overlaidIcon"
                id="frownIcon"
                onClick={(e) => {
                  let temp = {
                    ...localUser,
                    dislikes: [...localUser["dislikes"], location.state],
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
            <ListItem>
              <ListItemText
                primary={location.state.display_name}
                secondary="Title"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={location.state.format}
                secondary="Format"
              />
            </ListItem>
            {location.state.episodes > 1 ? (
              <ListItem>
                <ListItemText
                  primary={location.state.episodes}
                  secondary="Length"
                />
              </ListItem>
            ) : (
              ""
            )}

            <div style={{ display: "flex" }}>
              <div>Streaming Services:</div>
              {location.state.urls.map((item, index) => (
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
            </div>
          </Grid>
        </Grid>
      </Container>
      <h3>SIMILAR TITLES</h3>
      <RecommendContent movies={location.state}></RecommendContent>
    </div>
  );
}
