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
import DeleteIcon from "@mui/icons-material/Delete";
import { PopulateFromFirestore, SaveToFirestore } from "./Firestore";
import { X } from "phosphor-react";

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
    <Container maxWidth="xs">
      <Typography
        sx={{
          textAlign: "left",
          marginBottom: "5px",
          fontFamily: "interBlack",
          fontSize: "1.66rem",
        }}
      >
        Your Likes
      </Typography>

      <Typography>
        {localUser && localUser["likes"] ? (
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
                    <DeleteIcon />
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
          ""
        )}
      </Typography>
      <Typography
        sx={{
          textAlign: "left",
          marginBottom: "5px",
          fontFamily: "interBlack",
          fontSize: "1.66rem",
        }}
      >
        Your Dislikes
      </Typography>

      <Typography>
        {localUser && localUser["dislikes"] ? (
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
                    <DeleteIcon />
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
          ""
        )}
      </Typography>

      <Typography
        sx={{
          textAlign: "left",
          marginBottom: "5px",
          fontFamily: "interBlack",
          fontSize: "1.66rem",
        }}
      >
        Your Watchlists
      </Typography>

      {localUser["lists"].map((item, index) => (
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
              <X size={16} sx={{ marginBottom: "0px" }} />
            </IconButton>
          </ListItem>

          <List>
            {item["anime"].map((animeItem, animeIndex) => (
              <ListItem
                disablePadding={true}
                disableGutters={true}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => {
                      localUser["lists"][index]["anime"].splice(animeIndex, 1);
                      setLocalUser({ ...localUser });
                      SaveToFirestore(user, localUser);
                    }}
                  >
                    <X size={16} />
                  </IconButton>
                }
              >
                <ListItemButton
                  sx={{ padding: 0 }}
                  onClick={() => {
                    navigate(`/anime/${animeItem.id}`, { state: animeItem });
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

      <div className="gap" />
    </Container>
  );
}
