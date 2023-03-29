import {
  Avatar,
  Box,
  IconButton,
  Paper,
  Rating,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import format from "date-fns/format";
import fromUnixTime from "date-fns/fromUnixTime";
import toDate from "date-fns/toDate";
import { Heart, X } from "phosphor-react";
import { useContext, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useLocation } from "react-router-dom";
import AvatarIcon from "./AvatarIcon";
import { auth } from "./Firebase";
import {
  DeleteReviewFromFirestore,
  PopulateReviewsFromFirestore,
  SaveReviewToFirestore,
} from "./Firestore";
import { LocalUserContext } from "./LocalUserContext";

export default function Reviews({
  anime,
  animeReviews,
  setAnimeReviews,
  setShowReviewForm,
}) {
  const [localUser, setLocalUser] = useContext(LocalUserContext);
  const [user] = useAuthState(auth);
  const theme = useTheme();

  function deleteReview(item, index) {
    let temp = [...animeReviews];
    temp.splice(index, 1);
    setAnimeReviews(temp);
    let indexOfReview = localUser.reviews.indexOf(item.id);
    localUser.reviews.splice(indexOfReview, 1);

    let animeID = anime.id.toString();
    SaveReviewToFirestore(user, localUser, animeID);
    DeleteReviewFromFirestore(user, animeID);
  }

  function openEditor() {
    setShowReviewForm(true);
  }

  // useEffect(() => {
  //   console.log(location);
  //   console.log(user);
  //   console.log(animeReviews);

  //   PopulateReviewsFromFirestore(anime, setAnimeReviews);
  //   console.log(animeReviews);
  // }, []);

  return (
    <>
      {animeReviews?.map((item, index) => {
        return (
          <Tooltip
            key={item.uid}
            followCursor
            title={user.uid === item.uid ? "Edit review" : ""}
          >
            <Paper
              elevation={0}
              sx={{
                backgroundColor: "custom.subtleCardBg",
                borderRadius: "8px",
                display: "flex",
                position: "relative",
                pt: 2,
                pb: 2,
                mb: 3,
                ...(user.uid === item.uid && { cursor: "pointer" }),
              }}
              onClick={(e) => {
                if (user.uid === item.uid) openEditor();
              }}
            >
              {user.uid === item.uid ? (
                <Tooltip followCursor title="Delete review">
                  <IconButton
                    sx={{ position: "absolute", top: "10px", right: "10px" }}
                    onClick={(e) => {
                      deleteReview(item, index);
                      e.stopPropagation();
                    }}
                  >
                    <X size={30} />
                  </IconButton>
                </Tooltip>
              ) : (
                ""
              )}
              <Box
                component="div"
                sx={{
                  minWidth: "150px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar
                  sx={{ width: "80px", height: "80px" }}
                  src={item.avatar}
                ></Avatar>
                <Typography
                  component="span"
                  sx={{ fontFamily: "interSemiBold", fontSize: "1rem" }}
                >
                  {item.name}
                </Typography>
                <Typography
                  component="span"
                  sx={{
                    fontFamily: "interMedium",
                    fontSize: "0.9rem",
                    color: "",
                  }}
                >
                  ({item.reviews?.length}
                  {item.reviews?.length === 1 ? " review" : " reviews"})
                </Typography>
              </Box>
              <Box
                component="div"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ display: "flex" }}>
                  <Typography
                    component="span"
                    sx={{ fontFamily: "interBlack", fontSize: "1rem" }}
                  >
                    {item.reviewTitle}
                  </Typography>{" "}
                  <ConvertDate item={item} />
                </div>
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
                <Typography
                  component="span"
                  sx={{
                    fontFamily: "interMedium",
                    fontSize: "1rem",
                    color: "",
                  }}
                >
                  {item.review}
                </Typography>
              </Box>
            </Paper>
          </Tooltip>
        );
      })}
    </>
  );
}

function ConvertDate({ item }) {
  const time = format(fromUnixTime(item.time.seconds), "MMMM dd, yyyy");
  return (
    <Typography sx={{ ml: 2, fontFamily: "interMedium", color: "grey" }}>
      {time.toString()}
    </Typography>
  );
}