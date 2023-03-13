import "../Styles/Profile.css";

import React, { useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "./Firebase";

import { LocalUserContext } from "./LocalUserContext";
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { PopulateFromFirestore, SaveToFirestore } from "./Firestore";
import { ArrowRight, Camera, Check, Pencil, X, XCircle } from "phosphor-react";
import NoResultsImage from "./NoResultsImage";
import ChooseAvatar from "./ChooseAvatar";
import UserBio from "./UserBio";
import Top8 from "./Top8List";
import Top8List from "./Top8List";

export default function Profile() {
  const [localUser, setLocalUser] = useContext(LocalUserContext);

  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [editAvatar, setEditAvatar] = useState(false);

  const theme = useTheme();

  useEffect(() => {
    if (loading) return;
    if (user) PopulateFromFirestore(user, localUser, setLocalUser);
    // fetchUserName();
    console.log(localUser);
  }, [user, loading]);

  function handleAvatarToggle() {
    setEditAvatar((editAvatar) => !editAvatar);
  }

  return (
    <Container maxWidth="sm">
      {/*****************User Banner******************/}
      <div style={{ display: "flex", alignItems: "center" }}>
        <Tooltip title="Change your avatar">
          <ListItemButton
            onClick={handleAvatarToggle}
            sx={{ maxWidth: "110px" }}
          >
            <Avatar
              sx={{ width: "80px", height: "80px" }}
              alt={user?.displayName}
              src={localUser?.avatar}
            ></Avatar>{" "}
            <Box
              sx={{
                position: "absolute",
                left: "70px",
                top: "66px",
                width: "30px",
                height: "30px",
                borderRadius: "20px",
                backgroundColor: "custom.subtleCardBg",
                boxSizing: "border-box",
                padding: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Camera sx={{ color: "text" }} size={24} />
            </Box>
          </ListItemButton>
        </Tooltip>

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
      </div>

      {editAvatar ? (
        <Box
          sx={{
            backgroundColor: "custom.subtleCardBg",
            pt: 2,
            borderRadius: "24px",
          }}
        >
          <div
            className="row"
            style={{ position: "relative", justifyContent: "end" }}
          >
            <IconButton
              // variant="text"
              color="inherit"
              size="small"
              sx={{ mr: 1, position: "absolute", top: "-5px" }}
              onClick={handleAvatarToggle}
            >
              <X size={40} color="grey" />
            </IconButton>
          </div>
          <ChooseAvatar />{" "}
        </Box>
      ) : (
        ""
      )}

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
                      src={item.image_large ?? item.image_small}
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
                      src={item.image_large ?? item.image_small}
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
                          src={animeItem.image_large ?? animeItem.image_small}
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
