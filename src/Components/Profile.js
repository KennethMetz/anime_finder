import "../Styles/Profile.css";

import React, { useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "./Firebase";
import {
  query,
  collection,
  getDocs,
  where,
  document,
} from "firebase/firestore";
import TitleAutocomplete from "./TitleAutocomplete";
import { GenericList } from "./GenericList";
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
      <h3
        className="leftH3"
        style={{ textAlign: "center", marginBottom: "5px" }}
      >
        Your Likes
      </h3>
      <Divider></Divider>

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
                    primaryTypographyProps={{ fontFamily: "interSemiBold" }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        ) : (
          ""
        )}
      </Typography>
      <h3
        className="leftH3"
        style={{ textAlign: "center", marginBottom: "5px" }}
      >
        Your Dislikes
      </h3>
      <Divider></Divider>

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
                    primaryTypographyProps={{ fontFamily: "interSemiBold" }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        ) : (
          ""
        )}
      </Typography>

      <h3
        className="leftH3"
        style={{ textAlign: "center", marginBottom: "5px" }}
      >
        Your Watchlists
      </h3>
      <Divider></Divider>

      {localUser["lists"].map((item, index) => (
        <div key={index}>
          <h3>{item.name}</h3>
          <Divider sx={{ ml: 15, mr: 15 }}></Divider>
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
                      // localUser["lists"].splice(index, 1);
                      // setLocalUser({ ...localUser });
                      // SaveToFirestore(user, localUser);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemButton
                  sx={{ padding: 0 }}
                  onClick={() => {
                    // navigate(`/anime/${item.anime.id}`, { state: item });
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
                    primaryTypographyProps={{ fontFamily: "interSemiBold" }}
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
