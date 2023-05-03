import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

import { CaretDown, Minus, Plus } from "phosphor-react";
import { GetPaginatedReviewsFromFirestore } from "./Firestore";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ReviewFilterDropMenu from "./ReviewFilterDropMenu";
import ReviewForm from "./ReviewForm";
import Review from "./Review";

export default function ReviewContainer({ user, docId }) {
  const location = useLocation();

  const [reviews, setReviews] = useState(null);

  const [showReviewForm, setShowReviewForm] = useState(false);

  const [lastVisible, setLastVisible] = useState(null);
  const [seeMore, setSeeMore] = useState(true);
  const [sortOption, setSortOption] = useState(["time", "desc"]);

  const subheadStyle = {
    fontFamily: "interBlack",
    fontSize: "22px",
    lineHeight: "27px",
    marginTop: "24px",
    marginBottom: "12px",
  };

  useEffect(() => {
    GetPaginatedReviewsFromFirestore(
      docId,
      reviews,
      setReviews,
      sortOption,
      lastVisible,
      setLastVisible,
      seeMore,
      setSeeMore
    );
  }, [location.pathname, docId, sortOption]);

  return (
    <Grid item xs={12}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          component="div"
          variant="h5"
          style={{
            ...subheadStyle,
            display: "flex",
            alignItems: "baseline",
          }}
        >
          Reviews{" "}
          {reviews?.length > 2 && (
            <Typography
              sx={{
                fontFamily: "interMedium",
                fontSize: "1.0rem",
                marginL: "10px",
                color: "grey",
                ml: 1,
              }}
            >
              ({reviews?.length} total)
            </Typography>
          )}
          {!showReviewForm ? (
            <Tooltip title="Add a review">
              <Box sx={{ ml: 1 }}>
                <IconButton
                  variant="contained"
                  disabled={user?.isAnonymous ? true : false}
                  sx={{ color: "inherit" }}
                  onClick={(e) => {
                    if (!user.isAnonymous) setShowReviewForm(true);
                  }}
                >
                  <Plus />
                </IconButton>
              </Box>
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
        {reviews?.length > 1 ? (
          <div style={{ ...subheadStyle }}>
            <ReviewFilterDropMenu
              setLastVisible={setLastVisible}
              setSortOption={setSortOption}
            />
          </div>
        ) : (
          ""
        )}
      </div>

      {showReviewForm && (
        <ReviewForm
          docId={docId}
          reviews={reviews}
          setReviews={setReviews}
          setShowReviewForm={setShowReviewForm}
          setLastVisible={setLastVisible}
          setSeeMore={setSeeMore}
        />
      )}

      {reviews?.map((item, index) => {
        return (
          <Review
            key={item.uid}
            item={item}
            index={index}
            docId={docId}
            reviews={reviews}
            setReviews={setReviews}
            setShowReviewForm={setShowReviewForm}
          />
        );
      })}
      {seeMore && (
        <Grid item sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            color="inherit"
            variant="outlined"
            onClick={() =>
              GetPaginatedReviewsFromFirestore(
                docId,
                reviews,
                setReviews,
                sortOption,
                lastVisible,
                setLastVisible,
                seeMore,
                setSeeMore
              )
            }
            endIcon={<CaretDown />}
          >
            See more
          </Button>
        </Grid>
      )}
    </Grid>
  );
}
