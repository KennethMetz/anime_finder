import {
  Box,
  Chip,
  Container,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import { useContext, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useAnime from "../Hooks/useAnime";
import useAnimeAnalysis from "../Hooks/useAnimeAnalysis";
import ExpandableText from "./ExpandableText";
import { auth } from "./Firebase";
import { PopulateFromFirestore } from "./Firestore";
import LikeButtons from "./LikeButtons";
import { LocalUserContext } from "./LocalUserContext";
import ScoreBars from "./ScoreBars";
import SimilarContent from "./SimilarContent";
import UrlButtons from "./UrlButtons";

export default function AnimePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  const [localUser, setLocalUser] = useContext(LocalUserContext);
  const [user, loading, error] = useAuthState(auth);

  const params = useParams();
  const animeId = params.animeId;

  const [anime, animeLoading, animeError] = useAnime(animeId, location.state);

  const [analysis, analysisLoading, analysisError] = useAnimeAnalysis(animeId);

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");
    if (user) PopulateFromFirestore(user, localUser, setLocalUser);
  }, [user, loading]);

  // TODO Use a shared loading display component.
  if (loading || animeLoading || analysisLoading) {
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
  if (error || animeError || analysisError) {
    return (
      <div className="jsxWrapper">
        <div className="gap" />
        <Container maxWidth="lg">
          <h4>Uh oh! Something went wrong...</h4>
        </Container>
      </div>
    );
  }

  const headStyle = {
    fontFamily: "interBlack",
    fontSize: "40px",
    lineHeight: "48px",
    marginBottom: "24px",
  };

  const subheadStyle = {
    fontFamily: "interBlack",
    fontSize: "22px",
    lineHeight: "27px",
    marginTop: "24px",
    marginBottom: "12px",
  };

  const bodyStyle = {
    fontFamily: "interMedium",
    fontSize: "16px",
    lineHeight: "21px",
  };

  return (
    <Container maxWidth="lg" key={anime.id}>
      <Grid container sx={{ paddingTop: { xs: "25px", md: "50px" } }}>
        <Grid
          item
          xs={12}
          md={3}
          sx={{ textAlign: { xs: "center", md: "start" } }}
        >
          {/*Cover*/}
          <Box sx={{ position: "relative" }}>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                maxWidth: "250px",
                aspectRatio: "0.7",
                marginX: "auto",
                marginBottom: 3.5,
                bgcolor: theme.palette.action.disabledBackground,
                backgroundImage: `url(${anime.image_large})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                borderRadius: "16px",
                overflow: "clip",
                zIndex: 1,
              }}
            />
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: { xs: "calc((100% - 295px) / 2)", md: 0 },
                width: { xs: "295px", md: "100%" },
                maxWidth: "100%",
                height: "calc(250px / 0.7)",
                backgroundImage: `url(${anime.image_large})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                borderRadius: "16px",
                overflow: "visible",
                opacity: 0.25,
                filter: "blur(11px)",
                zIndex: 0,
              }}
            />
          </Box>

          {/*Basic Info*/}
          <Typography variant="h5" sx={subheadStyle}>
            {anime.display_name}
          </Typography>
          <Typography variant="body1" sx={bodyStyle}>
            {anime.localized_titles.map((item, index) => {
              if (item["language"] === "ja")
                return anime.localized_titles[index]["title"];
              return "";
            })}
          </Typography>
          <Typography variant="body1" sx={bodyStyle}>
            {getFormatAndEpisodesText(anime)}
          </Typography>

          {/*Genre Chips */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              marginY: 1.5,
              justifyContent: { xs: "center", md: "start" },
            }}
          >
            {anime.genres.map((genre) => (
              <Chip
                key={genre}
                variant="outlined"
                label={genre}
                sx={{
                  mr: 1,
                  my: 0.5,
                  fontSize: "16px",
                  border: "2px solid",
                  borderRadius: "4px",
                }}
                size="small"
              />
            ))}
          </Box>
        </Grid>
        <Grid item xs={12} md={9}>
          <Grid container sx={{ paddingLeft: { xs: 0, md: "46px" } }}>
            {/*Desktop-only big title*/}
            <Grid
              item
              xs={12}
              md={9}
              sx={{ display: { xs: "none", md: "block" } }}
            >
              <Typography variant="h2" sx={headStyle}>
                {anime.display_name}
              </Typography>
            </Grid>
            {/* LikeButtons */}
            <Grid
              item
              xs={12}
              md={3}
              sx={{
                textAlign: { xs: "center", md: "end" },
                marginTop: { xs: 0.5, md: 0 },
                marginBottom: { xs: 2, md: 0 },
              }}
            >
              <LikeButtons anime={anime} variant="contained" />
            </Grid>

            {/* Data from Edward */}
            <Grid
              item
              xs={12}
              sx={{
                padding: "32px 32px",
                background: theme.palette.custom.gradientCardBg,
                borderRadius: "16px",
              }}
            >
              <Grid container columnSpacing={3}>
                <Grid item xs={12} md={6} sx={bodyStyle}>
                  <Typography
                    variant="h5"
                    style={{ ...subheadStyle, margin: "0 0 12px 0" }}
                  >
                    Data From Edward
                  </Typography>
                  <ScoreBars scores={analysis.scores} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: "interExtraBold",
                      fontSize: "16px",
                      lineHeight: "19px",
                      marginTop: { xs: "24px", md: "7px" },
                      marginBottom: "12px",
                    }}
                  >
                    What Do People Say?
                  </Typography>
                  <Typography variant="body1" sx={bodyStyle}>
                    {analysis.review_summaries[0]}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            {/* Summary */}
            <Grid item xs={12}>
              <Typography variant="h5" style={subheadStyle}>
                Summary
              </Typography>
              <ExpandableText
                text={anime.description}
                sx={{ ...bodyStyle, whiteSpace: "pre-line" }}
              />
            </Grid>

            {/* Watch Links */}
            <Grid item xs={12}>
              <Typography variant="h5" style={subheadStyle}>
                Watch
              </Typography>
              <Box sx={{ display: "block" }}>
                <UrlButtons anime={anime} />
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={12}>
          <Typography variant="h5" style={subheadStyle}>
            Similar Titles
          </Typography>
          <SimilarContent animeId={anime.id} amount={24} />
        </Grid>
      </Grid>
      <div className="gap" />
    </Container>
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
