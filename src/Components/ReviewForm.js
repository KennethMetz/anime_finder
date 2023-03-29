import { useTheme } from "@emotion/react";
import {
  Avatar,
  Box,
  Button,
  Paper,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Firebase";
import { LocalUserContext } from "./LocalUserContext";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Fire, Heart } from "phosphor-react";
import {
  PopulateReviewsFromFirestore,
  SaveReviewToFirestore,
  SaveToFirestore,
} from "./Firestore";

export default function ReviewForm({
  anime,
  animeReviews,
  setAnimeReviews,
  setShowReviewForm,
}) {
  const [localUser, setLocalUser] = useContext(LocalUserContext);
  const [user] = useAuthState(auth);
  const theme = useTheme();

  let [reviewTitle, setReviewTitle] = useState("");
  let [review, setReview] = useState("");
  let [rating, setRating] = useState(null);
  let [existingReview, setExistingReview] = useState(false);

  // Define Yup schema
  const validationSchema = Yup.object().shape({
    reviewTitle: Yup.string().required("*A title is required"),
    // .min(1, "*A title is required"),
    review: Yup.string()
      .required("*A review is required")
      .min(3, "*A review must be at least 3 characters long"),
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
    if (localUser.reviews.includes(anime.id)) {
      for (let i = 0; i < animeReviews.length; i++) {
        if (animeReviews[i].uid === user.uid) {
          setExistingReview(true);
          setReviewTitle(animeReviews[i].reviewTitle);
          setReview(animeReviews[i].review);
          setRating(animeReviews[i].rating);
        }
      }
    }
  }

  const cancelReview = () => {
    setShowReviewForm(false);
  };

  const saveReview = () => {
    handleSubmit();
    console.log(errors);
    let animeID = anime.id.toString();
    if (!errors.reviewTitle && !errors.review) {
      const userReview = {
        review: review,
        rating: rating,
        reviewTitle: reviewTitle,
        uid: user.uid,
        time: new Date(),
      };
      if (!localUser.reviews) localUser.reviews = [];
      if (!localUser?.reviews?.find((x) => x === anime.id)) {
        localUser.reviews.push(anime.id);
        SaveToFirestore(user, localUser);
      }
      SaveReviewToFirestore(user, userReview, animeID);
      setShowReviewForm(false);
    }
  };

  useEffect(() => {
    populateForm();
  }, []);

  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: "custom.subtleCardBg",
        borderRadius: "8px",
        display: "flex",
        mb: 3,
      }}
    >
      <Box
        sx={{
          width: "100px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 2,
        }}
      >
        <Avatar
          sx={{ width: "48px", height: "48px" }}
          src={localUser.avatar}
        ></Avatar>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          mr: 6,
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
          emptyIcon={<Heart color={theme.palette.text.primary} />}
          icon={<Heart color={theme.palette.text.primary} weight="fill" />}
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
              fontSize: "1.0rem",
              fontFamily: "interMedium",
              paddingTop: "12.5px",
              paddingBottom: "12.5px",
              maxWidth: "none",
            },
          }}
        />{" "}
        <TextField
          label="Review"
          placeholder={`Tell us what you thought of ${anime.display_name}`}
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
              fontSize: "1.0rem",
              fontFamily: "interMedium",
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
