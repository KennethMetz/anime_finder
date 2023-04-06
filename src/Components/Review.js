import {
  Avatar,
  Box,
  Chip,
  Divider,
  Grid,
  IconButton,
  Paper,
  Rating,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { useConfirm } from "material-ui-confirm";
import format from "date-fns/format";
import fromUnixTime from "date-fns/fromUnixTime";
import toDate from "date-fns/toDate";
import { HandsClapping, Heart, Trash, X } from "phosphor-react";
import { useContext, useEffect, useMemo } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useLocation } from "react-router-dom";
import { useProfile } from "./APICalls";
import AvatarIcon from "./AvatarIcon";
import EmojiReactionChip from "./EmojiReactionChip";
import ExpandableText from "./ExpandableText";
import { auth } from "./Firebase";
import {
  DeleteReviewFromFirestore,
  PopulateReviewsFromFirestore,
  SaveReviewToFirestore,
} from "./Firestore";
import { LocalUserContext } from "./LocalUserContext";
import { getAvatarSrc } from "./Avatars";

export default function Review({
  item,
  index,
  anime,
  animeReviews,
  setAnimeReviews,
  setShowReviewForm,
}) {
  const [localUser, setLocalUser] = useContext(LocalUserContext);
  const [user] = useAuthState(auth);
  const theme = useTheme();
  const confirm = useConfirm();
  let reviewerAvatar = undefined;

  const { data: reviewerInfo } = useProfile(item.uid);

  const avatarSrc = useMemo(
    () => getAvatarSrc(reviewerInfo?.avatar),
    [reviewerInfo?.avatar]
  );

  function deleteReview(item, index) {
    confirm({
      title: "Delete Review?",
      content: "Deleting a review is permanent. There is no undo.",
      titleProps: { sx: { fontFamily: "interExtraBold" } },
      contentProps: { sx: { fontFamily: "interMedium" } },
    }).then(() => {
      let temp = [...animeReviews];
      temp.splice(index, 1);
      setAnimeReviews(temp);
      let indexOfReview = localUser.reviews.indexOf(item.id);
      localUser.reviews.splice(indexOfReview, 1);

      let animeID = anime.id.toString();
      SaveReviewToFirestore(user, localUser, animeID);
      DeleteReviewFromFirestore(user, animeID);
    });
  }

  function openEditor() {
    setShowReviewForm(true);
  }

  return (
    <Paper
      elevation={0}
      tabIndex={user.uid === item.uid ? 0 : -1}
      aria-label="Edit review"
      sx={{
        backgroundColor: "custom.subtleCardBg",
        borderRadius: "8px",
        display: {
          xs: "column",
          sm: "flex",
        },
        position: "relative",
        pt: { xs: 1, sm: 2 },
        pr: { xs: 1, sm: 2 },
        pb: { xs: 1, sm: 2 },
        pl: { xs: 1, sm: 0 },
        mb: 3,
      }}
      onClick={(e) => {
        if (user.uid === item.uid) openEditor();
      }}
    >
      <Link to={`/profile/${item.uid}`}>
        <Grid
          item
          component="div"
          sx={{
            width: { xs: "100%", sm: "150px" },
            display: "flex",
            flexDirection: { xs: "flex-row", sm: "column" },
            alignItems: "center",
            "&:hover": { color: "primary.main" },
            textAlign: { xs: "none", sm: "center" },
          }}
        >
          <Avatar
            sx={{
              width: { xs: "40px", sm: "80px" },
              height: { xs: "40px", sm: "80px" },
              marginRight: { xs: "16px", sm: "0px" },
            }}
            src={avatarSrc}
          ></Avatar>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "flex-row" },
            }}
          >
            <Typography
              component="span"
              sx={{
                fontFamily: "interSemiBold",
                fontSize: "1rem",
              }}
            >
              {reviewerInfo?.name}
            </Typography>
            {reviewerInfo?.reviews ? (
              <Typography
                component="span"
                sx={{
                  fontFamily: "interMedium",
                  fontSize: "0.9rem",
                  color: { xs: "grey", sm: "inherit" },
                }}
              >
                ({reviewerInfo?.reviews?.length}
                {reviewerInfo?.reviews?.length === 1 ? " review" : " reviews"})
              </Typography>
            ) : (
              ""
            )}
          </Box>
        </Grid>
      </Link>
      <Grid
        width="100%"
        component="div"
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: { xs: "unset", sm: 1 },
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            ...(user.uid === item.uid && { cursor: "pointer" }),
          }}
        >
          <Grid container>
            <Tooltip
              key={item.uid}
              followCursor
              title={user.uid === item.uid ? "Edit review" : ""}
            >
              <Grid
                item
                xs={10}
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  alignItems: "baseline",
                  mt: 1,
                }}
              >
                <Typography
                  component="span"
                  sx={{ fontFamily: "interBlack", fontSize: "1rem", mr: 2 }}
                >
                  {item.reviewTitle}
                </Typography>{" "}
                <ConvertDate item={item} />
              </Grid>
            </Tooltip>
            {user.uid === item.uid ? (
              <Grid item xs={2} sx={{ position: "relative" }}>
                <Tooltip followCursor title="Delete review">
                  <IconButton
                    sx={{
                      position: "absolute",
                      top: { xs: "-55px", sm: "-10px" },
                      right: "-10px",
                    }}
                    onClick={(e) => {
                      deleteReview(item, index);
                      e.stopPropagation();
                    }}
                  >
                    <X size={30} />
                  </IconButton>
                </Tooltip>
              </Grid>
            ) : (
              <Grid item xs={0} />
            )}
          </Grid>
          <Tooltip
            followCursor
            title={user.uid === item.uid ? "Edit review" : ""}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Rating
                readOnly
                value={item.rating}
                color="primary"
                emptyIcon={<Heart color={theme.palette.text.primary} />}
                icon={
                  <Heart color={theme.palette.text.primary} weight="fill" />
                }
                sx={{ mt: 1, mb: 1 }}
              ></Rating>

              <ExpandableText
                text={item.review}
                sx={{
                  fontFamily: "interMedium",
                  fontSize: "16px",
                  lineHeight: "21px",
                  whiteSpace: "pre-line",
                }}
              />
            </div>
          </Tooltip>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "10px",
          }}
        >
          <Tooltip title="Applaude this review" followCursor>
            <div>
              <EmojiReactionChip
                anime={anime}
                emoji={<HandsClapping size={24} />}
                reaction="applause"
                item={item}
                index={index}
                animeReviews={animeReviews}
                setAnimeReviews={setAnimeReviews}
              />
            </div>
          </Tooltip>

          <Tooltip title="Love this review" followCursor>
            <div>
              <EmojiReactionChip
                anime={anime}
                emoji={<Heart size={24} />}
                reaction="heart"
                item={item}
                index={index}
                animeReviews={animeReviews}
                setAnimeReviews={setAnimeReviews}
              />
            </div>
          </Tooltip>

          <Tooltip title="Disagree with this review" followCursor>
            <div>
              <EmojiReactionChip
                anime={anime}
                emoji={<Trash size={24} />}
                reaction="trash"
                item={item}
                index={index}
                animeReviews={animeReviews}
                setAnimeReviews={setAnimeReviews}
              />
            </div>
          </Tooltip>
        </div>
      </Grid>
    </Paper>
  );
}

function ConvertDate({ item }) {
  const time = format(fromUnixTime(item.time.seconds), "MMMM dd, yyyy");
  return (
    <Typography
      sx={{ fontFamily: "interMedium", color: "grey", fontSize: "0.9rem" }}
    >
      {item?.edited ? "Edited on" : ""} {time.toString()}
    </Typography>
  );
}
