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
import theme from "./theme";

export default function Profile() {
  const [localUser, setLocalUser] = useContext(LocalUserContext);

  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const theme = useTheme();

  //Firebase auth does not save user's name for email/password login. Making this function necessary.
  const fetchUserName = async (user) => {
    if (user) {
      try {
        const q = query(collection(db, "users"), where("uid", "==", user?.uid));
        const doc = await getDocs(q);
        const data = doc.docs[0].data();
        setName(data.name);
      } catch (err) {
        console.error(err);
        alert("An error occured while fetching user data");
      }
    } else return;
  };

  useEffect(() => {
    if (loading) return;
    if (user) PopulateFromFirestore(user, localUser, setLocalUser);
    fetchUserName();
    console.log(localUser);
  }, [user, loading]);

  return (
    <Container maxWidth="sm">
      <div className="gap" />
      <h3 className="leftH3">Your Likes</h3>
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

      <h3 className="leftH3">Your Dislikes</h3>
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
      <div className="gap" />
    </Container>
  );
}
