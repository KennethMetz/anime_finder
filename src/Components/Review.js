import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import Rating from "@mui/material/Rating";
import useTheme from "@mui/material/styles/useTheme";
import { useConfirm } from "material-ui-confirm";
import format from "date-fns/format";
import fromUnixTime from "date-fns/fromUnixTime";
import toDate from "date-fns/toDate";
import { HandsClapping, Star, Trash, X, Heart } from "phosphor-react";
import { useContext, useEffect, useMemo, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useLocation } from "react-router-dom";
import { useProfile } from "./APICalls";
import AvatarIcon from "./AvatarIcon";
import EmojiReactionChip from "./EmojiReactionChip";
import ExpandableText from "./ExpandableText";
import { auth } from "./Firebase";
import {
  DeleteNotification,
  DeleteReviewFromFirestore,
  SaveToFirestore,
  getReviewReactions,
} from "./Firestore";
import { LocalUserContext } from "./LocalUserContext";
import { getAvatarSrc } from "./Avatars";

export default function Review({
  review,
  index,
  docId,
  reviews,
  setReviews,
  setShowReviewForm,
  type,
  listOwnerId,
}) {
  const [localUser, setLocalUser] = useContext(LocalUserContext);
  const [user] = useAuthState(auth);
  const theme = useTheme();
  const confirm = useConfirm();

  const [item, setItem] = useState({});
  const { data: reviewerInfo } = useProfile(review.uid);

  const typeSingular = type === "comments" ? "comment" : "review";

  const avatarSrc = useMemo(
    () => getAvatarSrc(reviewerInfo?.avatar),
    [reviewerInfo?.avatar]
  );

  let uniqueEntityId =
    type === "reviews" ? docId.toString() : docId.toString() + review?.uid;

  useEffect(() => {
    getReviewReactions(user.uid, uniqueEntityId, setItem);
  }, [docId]);

  function deleteReview(index) {
    confirm({
      title: `Delete ${typeSingular}`,
      content: `Deleting a ${typeSingular} is permanent. There is no undo.`,
      titleProps: { sx: { fontWeight: 800 } },
      confirmationText: "Delete",
      cancellationButtonProps: { color: "inherit" },
      cancellationText: "Cancel",
    }).then(() => {
      let temp = [...reviews];
      temp.splice(index, 1);
      setReviews(temp);

      // Delete review from localUsers list
      let indexOfReview = localUser[type].indexOf(docId);
      localUser[type].splice(indexOfReview, 1);
      SaveToFirestore(user, localUser);

      // Delete review from Firestore documents listing
      let docIdString = docId.toString();
      DeleteReviewFromFirestore(user, docIdString, type);

      // Delete notification from firestore
      if (type === "comments") {
        const notiInfo = {
          interactorId: user.uid,
          docId: docId,
          action: "comment",
        };
        DeleteNotification(notiInfo, listOwnerId);
      }
    });
  }

  function openEditor() {
    setShowReviewForm(true);
  }

  return (
    <Paper
      elevation={0}
      tabIndex={user.uid === review.uid ? 0 : -1}
      aria-label={`Edit ${typeSingular}`}
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
        if (user.uid === review.uid) openEditor();
      }}
    >
      <Link to={`/profile/${review.uid}`}>
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
                fontWeight: 600,
              }}
            >
              {reviewerInfo?.name}
            </Typography>
            {reviewerInfo?.reviews ? (
              <Typography
                component="span"
                sx={{
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
            ...(user.uid === review.uid && { cursor: "pointer" }),
          }}
        >
          <Grid container>
            <Tooltip
              key={review.uid}
              followCursor
              title={user.uid === review.uid ? `Edit ${typeSingular}` : ""}
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
                <Typography component="span" sx={{ fontWeight: 900, mr: 2 }}>
                  {review.reviewTitle}
                </Typography>{" "}
                <ConvertDate review={review} />
              </Grid>
            </Tooltip>
            {user.uid === review.uid ? (
              <Grid item xs={2} sx={{ position: "relative" }}>
                <Tooltip followCursor title={`Delete ${typeSingular}`}>
                  <IconButton
                    sx={{
                      position: "absolute",
                      top: { xs: "-55px", sm: "-10px" },
                      right: "-10px",
                    }}
                    onClick={(e) => {
                      deleteReview(review, index);
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
            title={user.uid === review.uid ? `Edit ${typeSingular}` : ""}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Rating
                readOnly
                value={review.rating}
                color="primary"
                emptyIcon={<Star color={theme.palette.text.primary} />}
                icon={<Star color={theme.palette.text.primary} weight="fill" />}
                sx={{ mt: 1, mb: 1 }}
              ></Rating>

              <ExpandableText
                text={review.review}
                sx={{
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
          <EmojiReactionChip
            docId={docId}
            emoji={<HandsClapping size={24} />}
            reaction="applause"
            item={item}
            setItem={setItem}
            type={type}
            tooltip={`Applaud this ${typeSingular}`}
            rxnCount={reviews[index].applauseCount}
            IdToNotify={review.uid}
          />

          <EmojiReactionChip
            docId={docId}
            emoji={<Heart size={24} />}
            reaction="heart"
            item={item}
            setItem={setItem}
            type={type}
            tooltip={`Love this ${typeSingular}`}
            rxnCount={reviews[index].heartCount}
            IdToNotify={review.uid}
          />

          <EmojiReactionChip
            docId={docId}
            emoji={<Trash size={24} />}
            reaction="trash"
            item={item}
            setItem={setItem}
            type={type}
            tooltip={`Disagree with this ${typeSingular}`}
            rxnCount={reviews[index].trashCount}
            IdToNotify={review.uid}
          />
        </div>
      </Grid>
    </Paper>
  );
}

function ConvertDate({ review }) {
  if (!review) return;
  const time = format(fromUnixTime(review.time.seconds), "MMMM dd, yyyy");
  return (
    <Typography sx={{ color: "grey", fontSize: "0.9rem" }}>
      {review.edited ? "Edited on" : ""} {time.toString()}
    </Typography>
  );
}
