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
  Container,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { PopulateFromFirestore, SaveToFirestore } from "./Firestore";

export default function Profile() {
  const [localUser, setLocalUser] = useContext(LocalUserContext);

  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();

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
    <div className="profile">
      <Container maxwidth="sm">
        <div className="gap" />
        <div className="profile__container">
          <h3>THE PROFILE OF</h3>
          {user ? <h4>{name}</h4> : <h4>an unnamed visitor</h4>}
        </div>
        <br></br>

        <h3>YOUR LIKES:</h3>
        {localUser && localUser["likes"] ? (
          <List>
            {localUser["likes"].map((item, index) => (
              <ListItem
                key={index}
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
                  onClick={() => {
                    navigate("/detailedview", { state: item });
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      alt={item.display_name}
                      src={item.image_large}
                    ></Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={item.display_name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        ) : (
          ""
        )}

        <Divider />
        <h3>YOUR DISLIKES:</h3>
        {localUser && localUser["dislikes"] ? (
          <List>
            {localUser["dislikes"].map((item, index) => (
              // <li key={index}>{item.name}</li>
              <ListItem
                key={index}
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
                  onClick={() => {
                    navigate("/detailedview", { state: item });
                  }}
                >
                  <ListItemAvatar>
                    <Avatar alt={item.name} src={item.image_large}></Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        ) : (
          ""
        )}
        <Divider />
      </Container>
    </div>
  );
}
