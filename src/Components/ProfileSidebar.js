import { useContext } from "react";

import { Box, Button, Skeleton } from "@mui/material";
import { ArrowRight } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import UserBio from "./UserBio";
import Top8List from "./Top8List";
import ProfileUserBanner from "./ProfileUserBanner";
import ProfilePageContext from "./ProfilePageContext";
import ProfileSidebarGhost from "./ProfileSidebarGhost";

export default function ProfileSidebar({ hideDetails }) {
  const navigate = useNavigate();

  const { profile, isOwnProfile, isLoading } = useContext(ProfilePageContext);

  if (isLoading) {
    return <ProfileSidebarGhost />;
  }

  return (
    <>
      <ProfileUserBanner />
      {!hideDetails && (
        <>
          {isOwnProfile && profile?.name === "guest" && (
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
          <UserBio />
          <Top8List />
        </>
      )}
    </>
  );
}
