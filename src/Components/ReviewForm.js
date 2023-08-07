import useTheme from "@mui/material/styles/useTheme";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Firebase";
import { LocalUserContext } from "./LocalUserContext";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Star } from "phosphor-react";
import {
  GetPaginatedReviewsFromFirestore,
  PopulateReviewsFromFirestore,
  SaveNotification,
  SaveReviewToFirestore,
  SaveToFirestore,
  getReviewCount,
  getReviewReactions,
  setLastVisible,
  setSeeMore,
} from "./Firestore";
import { getAvatarSrc } from "./Avatars";

export default function ReviewForm({
  docId,
  reviews,
  setReviews,
  setShowReviewForm,
  setLastVisible,
  setSeeMore,
  type,
  reviewCount,
  listOwnerId,
  listId,
  setDropSelection,
}) {
  const [localUser, setLocalUser] = useContext(LocalUserContext);
  const [user] = useAuthState(auth);
  const theme = useTheme();

  let [reviewTitle, setReviewTitle] = useState("");
  let [review, setReview] = useState("");
  let [rating, setRating] = useState(null);
  let [emojis, setEmojis] = useState([0, 0, 0]);

  let [existingReview, setExistingReview] = useState(false);

  let [edited, setEdited] = useState(false);

  const typeSingular = type === "comments" ? "comment" : "review";

  // Define Yup schema
  const validationSchema = Yup.object().shape({
    reviewTitle: Yup.string().required("*A title is required"),
    // .min(1, "*A title is required"),
    review: Yup.string()
      .required(`*A ${typeSingular} is required`)
      .min(3, `*A ${typeSingular} must be at least 3 characters long`),
  });

  //Use ReactHookForm hooks to validate Yup schema
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: "all",
    criteriaMode: "all",
    reValidateMode: "onChange",
    resolver: yupResolver(validationSchema),
  });

  function populateForm() {
    if (localUser[type].includes(docId)) {
      for (let i = 0; i < reviews.length; i++) {
        if (reviews[i].uid === user.uid) {
          setExistingReview(true);
          setReviewTitle(reviews[i].reviewTitle);
          setReview(reviews[i].review);
          setRating(reviews[i].rating);
          setEmojis([
            reviews[i].applauseCount,
            reviews[i].heartCount,
            reviews[i].trashCount,
          ]);
        }
      }
    }
  }

  const cancelReview = () => {
    setShowReviewForm(false);
  };
  const notification = {
    interactorId: user.uid, // Person writing the review
    action: listOwnerId ? "comment" : "review",
    docId: docId,
    docType: null,
    time: new Date(),
    seen: false, // Remains false until noti popper is opened.
    read: false, // Remains galse until popper is closed (so it can be specially styled)
    listId: listId ?? null,
    listOwnerId: listOwnerId ?? null,
    commentOwnerId: null,
  };

  const saveReview = async () => {
    handleSubmit();
    let docIdString = docId.toString();
    if (!errors.reviewTitle && !errors.review) {
      const userReview = {
        review: review,
        rating: rating,
        reviewTitle: reviewTitle,
        uid: user.uid,
        time: new Date(),
        edited: edited,
        applauseCount: emojis[0],
        heartCount: emojis[1],
        trashCount: emojis[2],
      };
      if (!localUser[type]) localUser[type] = [];
      if (!localUser[type].find((x) => x === docId)) {
        localUser[type].push(docId);
        SaveToFirestore(user, localUser);
      }
      const userID = user.uid.toString();
      await SaveReviewToFirestore(
        userID,
        userReview,
        docIdString,
        type,
        reviewCount
      );

      // Only provide notification when a comment is created NOT when edited
      if (!edited && type !== "reviews")
        SaveNotification(notification, listOwnerId);

      await GetPaginatedReviewsFromFirestore(
        docId,
        reviews,
        setReviews,
        ["time", "desc"],
        null,
        setLastVisible,
        null,
        setSeeMore,
        type
      );
      setDropSelection("newestFirst");
      setShowReviewForm(false);
    }
  };

  useEffect(() => {
    populateForm();
    if (localUser[type].includes(docId)) setEdited(true);
  }, [localUser]);

  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: "custom.subtleCardBg",
        borderRadius: "8px",
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        mb: 3,
        padding: 1,
      }}
    >
      <Box
        sx={{
          width: { xs: "48px", sm: "100px" },
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Avatar
          sx={{ width: "48px", height: "48px" }}
          src={getAvatarSrc(localUser.avatar)}
        ></Avatar>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          mr: { xs: 0, sm: 6 },
          mb: 1.5,
        }}
      >
        <Rating
          name="reviewRating"
          value={rating}
          color="primary"
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
          emptyIcon={<Star color={theme.palette.text.primary} />}
          icon={<Star color={theme.palette.text.primary} weight="fill" />}
          sx={{ mt: 2 }}
        ></Rating>
        <TextField
          label="Title"
          name="reviewTitle"
          id="reviewTitle"
          variant="outlined"
          required
          autoFocus
          {...register("reviewTitle")}
          error={errors.reviewTitle ? true : false}
          helperText={errors.reviewTitle?.message}
          autoComplete="off"
          value={reviewTitle}
          onChange={(e) => {
            setReviewTitle(e.target.value);
          }}
          sx={{
            pb: "10px",
            mt: 1.5,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderRadius: "8px",
              },
            },
          }}
          inputProps={{
            style: {
              paddingTop: "12.5px",
              paddingBottom: "12.5px",
              maxWidth: "none",
            },
          }}
        />{" "}
        <TextField
          label={typeSingular[0].toUpperCase() + typeSingular.slice(1)}
          name="review"
          id="review"
          variant="outlined"
          required
          {...register("review")}
          error={errors.review ? true : false}
          helperText={errors.review?.message}
          sx={{
            mb: 1.5,
            pt: 0,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderRadius: "8px",
              },
            },
          }}
          inputProps={{
            style: {
              paddingTop: "0px",
              paddingBottom: "0px",
              maxWidth: "none",
            },
          }}
          multiline={true}
          autoComplete="off"
          value={review}
          onChange={(e) => {
            setReview(e.target.value);
          }}
        />{" "}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button variant="outlined" color="inherit" onClick={cancelReview}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{ ml: 2 }}
            onClick={saveReview}
          >
            Save
          </Button>
        </div>
      </Box>
    </Paper>
  );
}
