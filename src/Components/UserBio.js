import { useContext, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { LocalUserContext } from "./LocalUserContext";
import { auth } from "./Firebase";
import {
  Avatar,
  Button,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  TextField,
  Typography,
} from "@mui/material";

import { SaveToFirestore } from "./Firestore";
import { Box } from "@mui/system";
import { useTheme } from "@mui/material";

export default function UserBio() {
  const [localUser, setLocalUser] = useContext(LocalUserContext);
  const [user, loading, error] = useAuthState(auth);
  const [editBio, setEditBio] = useState(false);
  const [bio, setBio] = useState(localUser?.bio);

  const theme = useTheme();

  function saveBio() {
    let newLocalUser = { ...localUser };
    newLocalUser.bio = bio;
    setLocalUser(newLocalUser);
    SaveToFirestore(user, newLocalUser);
  }

  function handleBioToggle() {
    setEditBio((editBio) => !editBio);
  }

  return (
    <div>
      <Typography
        sx={{ fontFamily: "interBlack", fontSize: "1.375rem", mt: 1 }}
      >
        Bio
      </Typography>
      {!editBio ? (
        <Box
          sx={{
            fontFamily: "interMedium",
            fontSize: "1rem",
            pt: 1,
            pb: 1,
            pl: 0,
            cursor: "pointer",
          }}
          onClick={(e) => {
            handleBioToggle();
          }}
        >
          {localUser?.bio?.length > 0
            ? localUser.bio
            : "Tell us a bit about yourself..."}
        </Box>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <TextField
            name="bio"
            id="bio"
            size="small"
            variant="filled"
            autoComplete="off"
            color="text"
            placeholder="Tell us a bit about yourself..."
            autoFocus
            multiline
            value={bio}
            onClick={(e) => e.preventDefault()}
            onChange={(e) => {
              setBio(e.target.value);
            }}
            sx={{ width: "100%", mb: 2 }}
            InputProps={{
              style: {
                padding: "10px 10px 10px 5px",
              },
            }}
          ></TextField>
          <Button
            size="small"
            variant="outlined"
            color="inherit"
            sx={{ width: "84px" }}
            onClick={(e) => {
              saveBio();
              handleBioToggle();
            }}
          >
            Save Bio
          </Button>
        </div>
      )}
    </div>
  );
}
