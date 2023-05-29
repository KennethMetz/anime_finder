import { useContext } from "react";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { ArrowRight } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import Top8List from "./Top8List";
import ProfilePageContext from "./ProfilePageContext";
import ClickAndEdit from "./ClickAndEdit";

export default function ProfileSidebar({ hideDetails }) {
  const navigate = useNavigate();

  const { profile, isOwnProfile, updateBio } = useContext(ProfilePageContext);

  return (
    <>
      {!hideDetails && (
        <>
          {isOwnProfile && profile?.authProvider === "anonymous" && (
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
          )}
          <Typography
            variant="h3"
            sx={{
              mt: 3,
              pb: 1,
            }}
          >
            Bio
          </Typography>
          <ClickAndEdit
            data={profile?.bio}
            canEdit={isOwnProfile}
            onSave={updateBio}
            placeholder={"Tell us a bit about yourself..."}
          />

          <Top8List />
        </>
      )}
    </>
  );
}
