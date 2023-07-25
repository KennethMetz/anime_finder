import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

import { CaretDown, Minus, Plus } from "phosphor-react";
import { GetPaginatedReviewsFromFirestore, GetReviewCount } from "./Firestore";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ReviewFilterDropMenu from "./ReviewFilterDropMenu";
import ReviewForm from "./ReviewForm";
import Review from "./Review";
import { LocalUserContext } from "./LocalUserContext";

export default function ReviewContainer({
  user,
  docId,
  type,
  listOwnerId,
  listId,
}) {
  const location = useLocation();
  const [localUser, setLocalUser] = useContext(LocalUserContext);

  const [reviews, setReviews] = useState(null);

  const [showReviewForm, setShowReviewForm] = useState(false);

  const [lastVisible, setLastVisible] = useState(null);
  const [seeMore, setSeeMore] = useState(true);
  const [sortOption, setSortOption] = useState(["time", "desc"]);
  const [reviewCount, setReviewCount] = useState(undefined);

  const typeSingular = type === "comments" ? "comment" : "review";

  const subheadStyle = {
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
      setSeeMore,
      type
    );
  }, [location.pathname, docId, sortOption]);

  useEffect(() => {
    GetReviewCount(docId, type, setReviewCount);
  }, [localUser.reviews, localUser.comments]);

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
          variant="h3"
          style={{
            ...subheadStyle,
            display: "flex",
            alignItems: "baseline",
          }}
        >
          {type === "comments" ? "Comments" : "Reviews"}
          {reviews?.length > 2 && (
            <Typography
              sx={{
                marginL: "10px",
                color: "grey",
                ml: 1,
              }}
            >
              ({reviewCount} total)
            </Typography>
          )}
          {!showReviewForm ? (
            <Tooltip
              title={
                user?.isAnonymous
                  ? `Register to add a ${typeSingular}`
                  : `Add a ${typeSingular}`
              }
            >
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
            <Tooltip title={`Close ${type}`}>
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
        {reviews?.length > 1 && (
          <div style={{ ...subheadStyle }}>
            <ReviewFilterDropMenu
              setLastVisible={setLastVisible}
              setSortOption={setSortOption}
            />
          </div>
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
          type={type}
          reviewCount={reviewCount}
          listOwnerId={listOwnerId}
          listId={listId}
        />
      )}

      {reviews?.map((item, index) => {
        return (
          <Review
            key={`${item.uid}+${item.time.seconds}`}
            item={item}
            index={index}
            docId={docId}
            reviews={reviews}
            setReviews={setReviews}
            setShowReviewForm={setShowReviewForm}
            type={type}
            listOwnerId={listOwnerId}
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
                setSeeMore,
                type
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
