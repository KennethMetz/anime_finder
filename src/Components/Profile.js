import "../Styles/Profile.css";

import React, { useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "./Firebase";

import { LocalUserContext } from "./LocalUserContext";
import {
  Avatar,
  Box,
  Container,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import { PopulateFromFirestore, SaveToFirestore } from "./Firestore";
import { X } from "phosphor-react";
import NoResultsImage from "./NoResultsImage";

export default function Profile() {
  const [localUser, setLocalUser] = useContext(LocalUserContext);

  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const theme = useTheme();

  useEffect(() => {
    if (loading) return;
    if (user) PopulateFromFirestore(user, localUser, setLocalUser);
    // fetchUserName();
    console.log(localUser);
  }, [user, loading]);

  return (
    <Container maxWidth="sm">
      {/*****************User Banner******************/}
      <List>
        <ListItem disablePadding>
          <ListItemAvatar>
            <Avatar
              sx={{ width: "80px", height: "80px", fontSize: "2.5rem" }}
              alt={user?.displayName}
              src="purposefully bad link"
            ></Avatar>
          </ListItemAvatar>
          <ListItemText
            sx={{ ml: 3 }}
            primary={user?.displayName ? user.displayName : "Guest"}
            primaryTypographyProps={{
              fontFamily: "interBlack",
              fontSize: "1.66rem",
            }}
            secondary={user?.email}
            secondaryTypographyProps={{
              fontFamily: "interMedium",
              fontSize: "1rem",
              color: "text",
            }}
          />
        </ListItem>
      </List>

      {/**********************LIKES***********************/}
      <Typography
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

      <Typography>
        {localUser && localUser["likes"]?.length > 0 ? (
          <List>
            {localUser["likes"].map((item, index) => (
              <ListItem
                key={index}
                disablePadding={true}
                disableGutters={true}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => {
                      localUser["likes"].splice(index, 1);
                      setLocalUser({ ...localUser });
                      SaveToFirestore(user, localUser);
                    }}
                  >
                    <X size={20} />{" "}
                  </IconButton>
                }
              >
                <ListItemButton
                  sx={{ padding: 0 }}
                  onClick={() => {
                    navigate(`/anime/${item.id}`, { state: item });
                  }}
                >
                  <ListItemAvatar>
                    <Box
                      component="img"
                      alt={item.display_name}
                      src={item.image_large}
                      sx={{ height: "56px" }}
                    ></Box>
                  </ListItemAvatar>

                  <ListItemText
                    primary={item.display_name}
                    primaryTypographyProps={{ fontFamily: "interMedium" }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        ) : (
          <NoResultsImage />
        )}
      </Typography>

      {/**********************DISLIKES***********************/}
      <Typography
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

      <Typography>
        {localUser && localUser["dislikes"]?.length > 0 ? (
          <List>
            {localUser["dislikes"].map((item, index) => (
              <ListItem
                key={index}
                disablePadding={true}
                disableGutters={true}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => {
                      localUser["dislikes"].splice(index, 1);
                      setLocalUser({ ...localUser });
                      SaveToFirestore(user, localUser);
                    }}
                  >
                    <X size={20} />{" "}
                  </IconButton>
                }
              >
                <ListItemButton
                  sx={{ padding: 0 }}
                  onClick={() => {
                    navigate(`/anime/${item.id}`, { state: item });
                  }}
                >
                  <ListItemAvatar>
                    <Box
                      component="img"
                      alt={item.display_name}
                      src={item.image_large}
                      sx={{ height: "56px" }}
                    ></Box>{" "}
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.display_name}
                    primaryTypographyProps={{ fontFamily: "interMedium" }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        ) : (
          <NoResultsImage />
        )}
      </Typography>

      {/**********************WATCHLISTS***********************/}
      <Typography
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
                  <ListItem
                    key={animeIndex}
                    disablePadding={true}
                    disableGutters={true}
                    secondaryAction={
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => {
                          localUser["lists"][index]["anime"].splice(
                            animeIndex,
                            1
                          );
                          setLocalUser({ ...localUser });
                          SaveToFirestore(user, localUser);
                        }}
                      >
                        <X size={20} />
                      </IconButton>
                    }
                  >
                    <ListItemButton
                      sx={{ padding: 0 }}
                      onClick={() => {
                        navigate(`/anime/${animeItem.id}`, {
                          state: animeItem,
                        });
                      }}
                    >
                      <ListItemAvatar>
                        <Box
                          component="img"
                          alt={animeItem.display_name}
                          src={animeItem.image_large}
                          sx={{ height: "56px" }}
                        ></Box>{" "}
                      </ListItemAvatar>
                      <ListItemText
                        primary={animeItem.display_name}
                        primaryTypographyProps={{ fontFamily: "interMedium" }}
                      />
                    </ListItemButton>
                  </ListItem>
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
