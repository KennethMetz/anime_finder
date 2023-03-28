import { useContext } from "react";

import { LocalUserContext } from "./LocalUserContext";
import { Button } from "@mui/material";
import { ArrowRight } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import UserBio from "./UserBio";
import Top8List from "./Top8List";
import ProfileUserBanner from "./ProfileUserBanner";

export default function ProfileSidebar({ hideDetails }) {
  const navigate = useNavigate();

  const [localUser, setLocalUser] = useContext(LocalUserContext);

  return (
    <>
      <ProfileUserBanner />
      {!hideDetails && (
        <>
          {localUser?.name === "guest" && (
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
