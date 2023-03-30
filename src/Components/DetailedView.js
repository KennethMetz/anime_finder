import {
  alpha,
  Box,
  Button,
  Chip,
  Container,
  Grid,
  IconButton,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { Minus, Play, Plus } from "phosphor-react";
import { useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useAnime from "../Hooks/useAnime";
import useAnimeAnalysis from "../Hooks/useAnimeAnalysis";
import useYoutubeModal from "../Hooks/useYoutubeModal";
import BreathingLogo from "./BreathingLogo";
import ExpandableText from "./ExpandableText";
import { auth } from "./Firebase";
import {
  PopulateFromFirestore,
  PopulateReviewsFromFirestore,
} from "./Firestore";
import LikeButtons from "./LikeButtons";
import { LocalUserContext } from "./LocalUserContext";
import Review from "./Review";
import ReviewForm from "./ReviewForm";
import ScoreBars from "./ScoreBars";
import SimilarContent from "./SimilarContent";
import UrlButtons from "./UrlButtons";

export default function DetailedView() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  const [localUser, setLocalUser] = useContext(LocalUserContext);
  const [user, loading, error] = useAuthState(auth);

  const [openModal] = useYoutubeModal();

  const params = useParams();
  const animeId = params.animeId;

  const [anime, animeLoading, animeError] = useAnime(animeId, location.state);
  const [animeReviews, setAnimeReviews] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);

  const [analysis, analysisLoading, analysisError, analysisFetching] =
    useAnimeAnalysis(animeId);

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");
    if (user) PopulateFromFirestore(user, localUser, setLocalUser);
  }, [user, anime, loading]);

  useEffect(() => {
    PopulateReviewsFromFirestore(anime, setAnimeReviews);
  }, [location.pathname, anime]);

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
                boxShadow: "rgba(0, 0, 0, 0.04) 0px 3px 5px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {anime.promotional_video && (
                <Tooltip title="Watch Trailer">
                  <Button
                    size="large"
                    color="inherit"
                    onClick={() => openModal(anime.promotional_video)}
                    sx={{
                      width: "100%",
                      height: "100%",
                      "&:hover": {
                        background: alpha(theme.palette.common.black, 0.25),
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: "52px",
                        height: "52px",
                        background: alpha(theme.palette.common.black, 0.5),
                        border: `2px solid ${theme.palette.common.white}`,
                        borderRadius: "50%",
                        padding: 1,
                        color: theme.palette.common.white,
                      }}
                    >
                      <Play size="32" />
                    </Box>
                  </Button>
                </Tooltip>
              )}
            </Box>
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
              md={8.5}
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
              md={3.5}
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
              <Grid container columnSpacing={3} sx={{ position: "relative" }}>
                {analysisFetching && analysis?.animeId !== anime.id && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      zIndex: 1,
                    }}
                  >
                    <Box
                      sx={{
                        width: "60px",
                        height: "60px",
                      }}
                    >
                      <BreathingLogo />
                    </Box>
                  </Box>
                )}
                <Grid item xs={12} md={6} sx={bodyStyle}>
                  <Typography
                    variant="h5"
                    style={{ ...subheadStyle, margin: "0 0 12px 0" }}
                  >
                    Data From Edward
                  </Typography>
                  <ScoreBars scores={analysis?.scores ?? []} />
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
                    {analysis?.review_summaries[0]}
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

        {/* Reviews */}
        <Grid item xs={12}>
          <Typography
            component="div"
            variant="h5"
            style={{ ...subheadStyle, display: "flex", alignItems: "center" }}
          >
            Reviews{" "}
            {!showReviewForm ? (
              <Tooltip title="Add a review">
                <div style={{ marginLeft: "15px" }}>
                  <IconButton
                    variant="contained"
                    disabled={user.isAnonymous ? true : false}
                    sx={{ color: "inherit" }}
                    onClick={(e) => {
                      if (!user.isAnonymous) setShowReviewForm(true);
                    }}
                  >
                    <Plus />
                  </IconButton>
                </div>
              </Tooltip>
            ) : (
              <Tooltip title="Close review">
                <div style={{ marginLeft: "15px" }}>
                  {" "}
                  <IconButton
                    variant="contained"
                    sx={{ color: "inherit" }}
                    onClick={(e) => {
                      setShowReviewForm(false);
                    }}
                  >
                    <Minus />
                  </IconButton>
                </div>
              </Tooltip>
            )}
          </Typography>
          {showReviewForm ? (
            <ReviewForm
              anime={anime}
              animeReviews={animeReviews}
              setAnimeReviews={setAnimeReviews}
              setShowReviewForm={setShowReviewForm}
            />
          ) : (
            ""
          )}
          {animeReviews?.map((item, index) => {
            return (
              <Review
                item={item}
                index={index}
                anime={anime}
                animeReviews={animeReviews}
                setAnimeReviews={setAnimeReviews}
                setShowReviewForm={setShowReviewForm}
              />
            );
          })}
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
