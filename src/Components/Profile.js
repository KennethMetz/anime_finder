import "../Styles/Profile.css";
import React, { useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "./Firebase";
import { LocalUserContext } from "./LocalUserContext";
import {
  Button,
  Container,
  IconButton,
  List,
  ListItem,
  Typography,
  useTheme,
} from "@mui/material";
import { PopulateFromFirestore, SaveToFirestore } from "./Firestore";
import { ArrowRight, X } from "phosphor-react";
import NoResultsImage from "./NoResultsImage";
import UserBio from "./UserBio";
import Top8List from "./Top8List";
import ProfileList from "./ProfileList";
import ProfileUserBanner from "./ProfileUserBanner";

export default function Profile() {
  const [localUser, setLocalUser] = useContext(LocalUserContext);
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const theme = useTheme();

  useEffect(() => {
    if (loading) return;
    if (user) PopulateFromFirestore(user, localUser, setLocalUser);
  }, [user, loading]);

  return (
    <Container maxWidth="sm">
      {/**********************User Banner***********************/}
      <ProfileUserBanner />

      {/**********************Upsell Button***********************/}
      {localUser?.name === "guest" ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            size="large"
            sx={{
              width: "280px",
              mt: 3,
              fontSize: "0.875rem",
            }}
            onClick={(e) => {
              navigate("/register");
            }}
          >
            Register to save your profile! <ArrowRight size={22} />
          </Button>
        </div>
      ) : (
        ""
      )}

      {/**********************Your Bio***********************/}
      <UserBio />

      {/**********************Your Top 8*********************/}
      <Top8List />

      {/**********************LIKES***********************/}
      <Typography
        component="div"
        sx={{
          textAlign: "left",
          marginBottom: "15px",
          marginTop: "33px",
          fontFamily: "interBlack",
          fontSize: "1.66rem",
        }}
      >
        Your Likes
      </Typography>

      <div>
        {localUser && localUser["likes"]?.length > 0 ? (
          <List>
            {localUser["likes"].map((item, index) => (
              <ProfileList item={item} index={index} />
            ))}
          </List>
        ) : (
          <NoResultsImage />
        )}
      </div>

      {/**********************DISLIKES***********************/}
      <Typography
        component="div"
        sx={{
          textAlign: "left",
          marginBottom: "15px",
          marginTop: "33px",
          fontFamily: "interBlack",
          fontSize: "1.66rem",
        }}
      >
        Your Dislikes
      </Typography>

      <div>
        {localUser && localUser["dislikes"]?.length > 0 ? (
          <List>
            {localUser["dislikes"].map((item, index) => (
              <ProfileList item={item} index={index} />
            ))}
          </List>
        ) : (
          <NoResultsImage />
        )}
      </div>

      {/**********************WATCHLISTS***********************/}
      <Typography
        component="div"
        sx={{
          textAlign: "left",
          marginBottom: "15px",
          marginTop: "33px",
          fontFamily: "interBlack",
          fontSize: "1.66rem",
        }}
      >
        Your Watchlists
      </Typography>

      {localUser && localUser["lists"]?.length > 0 ? (
        <>
          {localUser["lists"]?.map((item, index) => (
            <div key={index}>
              <ListItem
                disablePadding
                sx={{ display: "flex", justifyContent: "left" }}
              >
                <Typography
                  component="div"
                  sx={{
                    mb: 0,
                    fontFamily: "interBlack",
                    fontSize: "1.25rem",
                  }}
                >
                  {item.name}
                </Typography>
                <IconButton
                  sx={{ ml: 6 }}
                  onClick={() => {
                    localUser["lists"].splice(index, 1);
                    setLocalUser({ ...localUser });
                    SaveToFirestore(user, localUser);
                  }}
                >
                  <X size={20} sx={{ marginBottom: "0px" }} />
                </IconButton>
              </ListItem>

              <List>
                {item["anime"]?.map((animeItem, animeIndex) => (
                  <ProfileList item={animeItem} index={animeIndex} />
                ))}
              </List>
            </div>
          ))}
        </>
      ) : (
        <NoResultsImage />
      )}
      <div className="gap" />
    </Container>
  );
}
