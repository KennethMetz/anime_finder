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
import LikeButtons from "./LikeButtons";

export default function DetailedView() {
  const navigate = useNavigate();
  const location = useLocation();

  const [localUser, setLocalUser] = useContext(LocalUserContext);
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");
    if (user) PopulateFromFirestore(user, localUser, setLocalUser);
  }, [user, loading]);

  return (
    <div className="jsxWrapper">
      <div className="gap" />
      {/* Only renders a blank screen until localUser is loaded - to prevent flashing during page load */}
      {localUser["uid"] ? (
        <Container maxWidth="lg">
          <br></br>
          <Grid container spacing={0} rowSpacing={0}>
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
                  {location.state.display_name}
                </div>
                <LikeButtons anime={location.state} />
              </Box>
              {/* </ListItem> */}
              <ListItem sx={{ paddingTop: 0, paddingBottom: 0 }}>
                <ListItemText
                  primaryTypographyProps={{
                    fontFamily: "interMedium",
                    fontSize: "1rem",
                  }}
                  primary={location.state.localized_titles.map(
                    (item, index) => {
                      if (item["language"] === "ja")
                        return location.state.localized_titles[index]["title"];
                    }
                  )}
                />
              </ListItem>
              <ListItem sx={{ paddingTop: 0 }}>
                {/* TERNARY BELOW SCREENS FOR WHETHER 'EPISODE' SHOULD PRINT AS PLURAL OR NOT */}
                {location.state.episodes > 1 ? (
                  <ListItemText
                    primary={`${location.state.format} • ${location.state.episodes} episodes`}
                    primaryTypographyProps={{
                      fontFamily: "interMedium",
                      fontSize: "1.0rem",
                    }}
                  />
                ) : (
                  <ListItemText
                    primary={`${location.state.format} • ${location.state.episodes} episode`}
                    primaryTypographyProps={{
                      fontFamily: "interMedium",
                      fontSize: "1.0rem",
                    }}
                  />
                )}
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={location.state.description}
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
            </div> */}
            </Grid>
          </Grid>
          <h3 className="leftH3">Similar Titles</h3>
          <RecommendContent movies={location.state}></RecommendContent>
        </Container>
      ) : (
        <div></div>
      )}
    </div>
  );
}
