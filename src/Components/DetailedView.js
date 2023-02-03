import "../Styles/DetailedView.css";

import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import {
  Chip,
  Grid,
  ListItem,
  ListItemText,
  Paper,
  useTheme,
} from "@mui/material";
import { GenericList } from "./GenericList";
import { RecommendedList } from "./RecommendedList";
import { Box, Container } from "@mui/system";
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
import SimilarContent from "./SimilarContent";
import UrlButtons from "./UrlButtons";

export default function DetailedView() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

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
        <Grid container spacing={0} rowSpacing={0} sx={{ mt: 2 }}>
          <Grid item xs={12} md={3}>
            <Paper
              elevation={3}
              sx={{
                width: "100%",
                maxWidth: "375px",
                aspectRatio: "0.7",
                marginX: "auto",
                marginBottom: 2,
                bgcolor: theme.palette.action.disabledBackground,
                backgroundImage: `url(${anime.image_large})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                borderRadius: "8px",
                overflow: "clip",
              }}
            />
          </Grid>
          <Grid item xs={12} md={9}>
            <ListItem sx={{ paddingTop: 0, paddingBottom: 0 }}>
              <h2
                style={{
                  fontFamily: "interExtraBold",
                  fontSize: "2.5rem",
                  textAlign: "left",
                  margin: 0,
                }}
              >
                {anime.display_name}
              </h2>
            </ListItem>
            <ListItem sx={{ paddingTop: 0, paddingBottom: 0 }}>
              <ListItemText
                primaryTypographyProps={{
                  fontFamily: "interSemiBold",
                  fontSize: "1rem",
                }}
                primary={anime.localized_titles.map((item, index) => {
                  if (item["language"] === "ja")
                    return anime.localized_titles[index]["title"];
                })}
              />
            </ListItem>
            <ListItem sx={{ paddingTop: 0, pb: 0 }}>
              <ListItemText
                primary={getFormatAndEpisodesText(anime)}
                primaryTypographyProps={{
                  fontFamily: "interSemiBold",
                  fontSize: "1.0rem",
                  whiteSpace: "pre-line",
                }}
              />
            </ListItem>
            <ListItem sx={{ paddingTop: 0, pb: 0, minHeight: "32px" }}>
              {anime.genres.map((genre) => (
                <Chip
                  variant="outlined"
                  label={genre}
                  sx={{ mr: 1 }}
                  size="small"
                />
              ))}
            </ListItem>
            <ListItem>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Box sx={{ flexShrink: 0 }}>
                  <LikeButtons anime={anime} />
                </Box>
                <Box sx={{ flexShrink: 0 }}>
                  <UrlButtons anime={anime} />
                </Box>
              </Box>
            </ListItem>
            <ListItem
              sx={{
                overflow: "hidden",
                alignItems: "start",
              }}
            >
              <ListItemText
                primary={anime.description}
                primaryTypographyProps={{
                  fontFamily: "interMedium",
                  fontSize: "1.0rem",
                  whiteSpace: "pre-line",
                }}
              />
            </ListItem>
          </Grid>
        </Grid>
        <h3 className="leftH3">Similar Titles</h3>
        <SimilarContent animeId={anime.id} amount={24} />
        <div className="gap" />
      </Container>
    </div>
  );
}

function getFormatAndEpisodesText(anime) {
  const items = [];

  if (anime.start_date) {
    const startYear = anime.start_date.split("-")[0];
    const endYear = anime.end_date?.split("-")[0];
    if (endYear && endYear !== startYear) {
      items.push(`${startYear}-${endYear}`);
    } else {
      items.push(startYear);
    }
  }

  if (anime.format) {
    items.push(anime.format);
  }

  if (anime.episodes === 1) {
    items.push(`${anime.episodes} episode`);
  } else if (anime.episodes > 1) {
    items.push(`${anime.episodes} episodes`);
  }

  if (anime.duration) {
    items.push(anime.duration);
  }

  return items.join(" • ");
}
