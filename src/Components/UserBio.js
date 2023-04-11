import { useContext, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ProfilePageContext from "./ProfilePageContext";

export default function UserBio() {
  const { profile, isOwnProfile, updateBio } = useContext(ProfilePageContext);

  const [editBio, setEditBio] = useState(false);
  const [editedBio, setEditedBio] = useState(profile?.bio);

  function saveBio() {
    updateBio(editedBio);
  }

  function handleBioToggle() {
    setEditBio(!editBio);
  }

  return (
    <div>
      <Typography
        sx={{ fontFamily: "interBlack", fontSize: "1.375rem", mt: 3 }}
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
            cursor: isOwnProfile ? "pointer" : "unset",
          }}
          onClick={isOwnProfile ? handleBioToggle : undefined}
        >
          {profile?.bio?.length > 0
            ? profile?.bio
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
            value={editedBio}
            onClick={(e) => e.preventDefault()}
            onChange={(e) => {
              setEditedBio(e.target.value);
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
