import React, { useState, useContext, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import heart from "../Styles/images/favorite_border_black_24dp.svg";
import frown from "../Styles/images/sentiment_dissatisfied_black_24dp.svg";
import cancel from "../Styles/images/cancel_black_24dp.svg";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "./Firebase";

import { LocalUserContext } from "./LocalUserContext";
import { SaveToFirestore } from "./Firestore";
import { useNavigate } from "react-router-dom";

export const RecommendedList = (props) => {
  const [localUser, setLocalUser] = useContext(LocalUserContext);
  const navigate = useNavigate();

  const [user] = useAuthState(auth);

  // function checkForDuplicates(movie) {
  //   for(let i =0;i<localUser["likes"].length;i++){
  //     if(localUser["likes"][i].id === movie.id) return true
  //   }
  //   for(let i =0;i<localUser["dislikes"].length;i++){
  //     if(localUser["dislikes"][i].id === movie.id) return true

  // }

  return (
    <Grid container spacing={3} justifyContent="center" overflow={true}>
      {props.movies.map((movie, index) => (
        <Grid
          item
          xs={3}
          // sm={6}
          // md={3}
          // lg={2.4}
          key={movie.id}
          className="tileContainer"
        >
          <div
            style={{
              backgroundImage: "url(" + movie.image_large + ")",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              height: "100%",
            }}
            component="div"
            className="tile"
            src={movie.image_large ? movie.image_large : movie.image_small}
            alt=""
          >
            <div
              id="title"
              onClick={() => {
                navigate("/detailedview", { state: movie });
              }}
            >
              {movie.name}
            </div>
            <img
              src={heart}
              alt=""
              className="overlaidIcon"
              id="heartIcon"
              onClick={(e) => {
                let temp = {
                  ...localUser,
                  likes: [...localUser["likes"], movie],
                };
                setLocalUser(temp);
                console.log(localUser);
                SaveToFirestore(user, temp);
              }}
            ></img>
            <img
              src={frown}
              alt=""
              className="overlaidIcon"
              id="frownIcon"
              onClick={(e) => {
                let temp = {
                  ...localUser,
                  dislikes: [...localUser["dislikes"], movie],
                };
                setLocalUser(temp);
                console.log(localUser);
                SaveToFirestore(user, temp);
              }}
            ></img>
            <div
              className="overlaidFill"
              id="gradientFill"
              onClick={() => {
                navigate("/detailedview", { state: movie });
              }}
            ></div>
          </div>
        </Grid>
      ))}
    </Grid>
  );
};
