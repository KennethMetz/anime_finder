import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { alpha } from "@mui/system/colorManipulator";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import useTheme from "@mui/material/styles/useTheme";
import { Play } from "phosphor-react";
import { useContext, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useAnime from "../Hooks/useAnime";
import useAnimeAnalysis from "../Hooks/useAnimeAnalysis";
import useYoutubeModal from "../Hooks/useYoutubeModal";
import BreathingLogo from "./BreathingLogo";
import DetailedViewGhost from "./DetailedViewGhost";
import ExpandableText from "./ExpandableText";
import { auth } from "./Firebase";
import { PopulateFromFirestore } from "./Firestore";
import LikeButtons from "./LikeButtons";
import { LocalUserContext } from "./LocalUserContext";
import ScoreBars from "./ScoreBars";
import SimilarContent from "./SimilarContent";
import UrlButtons from "./UrlButtons";
import ReviewContainer from "./ReviewContainer";
import HandleDialog from "./HandleDialog";
import HtmlPageTitle from "./HtmlPageTitle";
import ScorePercentText from "./ScorePercentText";
import ExpandableTags from "./ExpandableTags";

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

  const [analysis, analysisLoading, analysisError, analysisFetching] =
    useAnimeAnalysis(animeId);

  const analysisIsLoading =
    analysisLoading ||
    analysisFetching ||
    analysis?.animeId !== anime.id ||
    (!user.isAnonymous && localUser.handle === ""); //Prevents flashing the anonymous user's score for registered users

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");
    if (user) PopulateFromFirestore(user, localUser, setLocalUser);
  }, [user, anime, loading]);

  // TODO Use a shared loading display component.
  if (loading || animeLoading) {
    return <DetailedViewGhost />;
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
    marginBottom: "24px",
  };

  const subheadStyle = {
    marginTop: "24px",
    marginBottom: "12px",
  };

  const bodyStyle = {
    lineHeight: "21px",
  };

  return (
    <Container maxWidth="lg" key={anime.id}>
      <HtmlPageTitle title={anime?.display_name} />
      {/* Below ensure the following: localUser has been loaded, user is not 
      on a guest account, and they do NOT have a handle.*/}
      {localUser.uid && !user.isAnonymous && !localUser.handle && (
        <HandleDialog user={user} />
      )}
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
                      borderRadius: "16px",
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
          <Typography variant="h3" sx={subheadStyle}>
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

          {/* Desktop-only Watch Links */}
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <Typography variant="h5" style={subheadStyle}>
              Watch
            </Typography>
            <Box sx={{ display: "block" }}>
              <UrlButtons anime={anime} />
            </Box>
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
                display: "flex",
                justifyContent: { xs: "center", md: "flex-end" },
                marginTop: { xs: 0.5, md: 0 },
                marginBottom: { xs: 2, md: 0 },
              }}
            >
              <LikeButtons anime={anime} variant="contained" selected={true} />
            </Grid>

            {/* Data from Edward */}
            <Grid item xs={12} md={6} sx={{ pr: { xs: 0, md: 1 } }}>
              <Typography variant="h3" style={subheadStyle}>
                Data From Edward
              </Typography>
              <Box
                sx={{
                  padding: { xs: 2, md: 3 },
                  mr: { xs: 0, md: 1.5 },
                  background: theme.palette.custom.gradientCardBg,
                  borderRadius: "16px",
                  position: "relative",
                  minHeight: "200px",
                }}
              >
                {analysisIsLoading ? (
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
                ) : (
                  <>
                    <ScorePercentText
                      scores={analysis?.scores ?? []}
                    ></ScorePercentText>
                    <ScoreBars scores={analysis?.scores ?? []} />
                  </>
                )}
              </Box>
            </Grid>

            {/* What Do People Say? */}
            <Grid item xs={12} md={6} sx={{ pl: { xs: 0, md: 1 } }}>
              <Typography variant="h3" style={subheadStyle}>
                What Do People Say?
              </Typography>
              <Box
                sx={{
                  padding: { xs: 2, md: 3 },
                  background: theme.palette.custom.subtleCardBg,
                  borderRadius: "16px",
                  position: "relative",
                  minHeight: "200px",
                }}
              >
                <Typography variant="body1" sx={bodyStyle}>
                  {analysis?.review_summaries[0]}
                </Typography>
              </Box>
            </Grid>

            {/* Reviewers Often Say */}
            {anime.review_qualities?.length > 0 && (
              <Grid item xs={12}>
                <Typography variant="h3" style={subheadStyle}>
                  Reviewers Often Say
                </Typography>
                <ExpandableTags
                  items={anime.review_qualities.map((q) => q.text)}
                />
              </Grid>
            )}

            {/* Summary */}
            <Grid item xs={12}>
              <Typography variant="h3" style={subheadStyle}>
                Summary
              </Typography>
              <ExpandableText
                text={anime.description}
                sx={{ ...bodyStyle, whiteSpace: "pre-line" }}
              />
            </Grid>

            {/* Mobile-only Watch Links */}
            <Grid item xs={12} sx={{ display: { xs: "block", md: "none" } }}>
              <Typography variant="h3" style={subheadStyle}>
                Watch
              </Typography>
              <Box sx={{ display: "block" }}>
                <UrlButtons anime={anime} />
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={12}>
          <Typography variant="h3" style={subheadStyle}>
            Similar Titles
          </Typography>
          <SimilarContent animeId={anime.id} amount={24} />
        </Grid>

        {/* Reviews */}
        <ReviewContainer user={user} docId={anime.id} type={"reviews"} />
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
