import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import useTheme from "@mui/material/styles/useTheme";
import { Moon, SignOut, Sun, User, UserCirclePlus } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import { auth, logout } from "./Firebase";
import { LocalUserContext } from "./LocalUserContext";
import { useAuthState } from "react-firebase-hooks/auth";

import AppSettingsContext from "./AppSettingsContext";
import { getAvatarSrc } from "./Avatars";

export default function DropMenu() {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const theme = useTheme();

  const [localUser, setLocalUser] = useContext(LocalUserContext);

  const [appSettings, setAppSettings] = useContext(AppSettingsContext);
  const darkMode = appSettings.darkMode;

  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const avatarSrc = useMemo(
    () => getAvatarSrc(localUser?.avatar),
    [localUser?.avatar]
  );

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  function handleClose(event) {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  }

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  function sendToProfile(e) {
    handleClose(e);
    user ? navigate(`/profile/${user.uid}`) : navigate("/login");
  }

  function sendToLogin(e) {
    handleClose(e);
    navigate("/login");
  }

  function sendToRegister(e) {
    handleClose(e);
    navigate("/register");
  }

  async function sendToLogout(e) {
    navigate("/logout");
    await logout();
    setLocalUser({
      name: [],
      likes: [],
      dislikes: [],
      lists: [],
      savedLists: [],
      avatar: null,
      bio: null,
      top8: [],
      reviews: [],
      comments: [],
      handle: null,
    });
    handleClose(e);
  }

  function toggleDarkMode() {
    setAppSettings({ ...appSettings, darkMode: !darkMode });
  }

  return (
    <Stack>
      <Avatar
        ref={anchorRef}
        id="composition-button"
        alt={localUser?.name ?? "Guest"}
        src={avatarSrc ?? "purposefully bad link"}
        aria-controls={open ? "composition-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleToggle();
        }}
        tabIndex="0"
        sx={{
          bgcolor: theme.palette.primary.main,
          cursor: "pointer",
          width: "35px",
          height: "35px",
          fontWeight: 600,
        }}
      />
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        style={{ zIndex: "4" }}
      >
        {({ TransitionProps }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: "right top",
            }}
          >
            <Paper elevation={6}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                >
                  <ListItemButton
                    disabled
                    divider
                    sx={{
                      color: theme.palette.primary.main,
                      "&.Mui-disabled": { opacity: 1.0 },
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        alt={localUser?.name ?? "Guest"}
                        src={avatarSrc ?? "purposefully bad link"}
                        sx={{
                          bgcolor: theme.palette.primary.main,
                          fontWeight: 600,
                        }}
                      />
                    </ListItemAvatar>

                    <ListItemText
                      sx={{
                        color: user ? "primary" : theme.palette.text.primary,
                      }}
                      primary={localUser?.name ? `${localUser?.name}` : "Guest"}
                      primaryTypographyProps={{ fontWeight: 600 }}
                    />
                  </ListItemButton>
                  <MenuItem
                    divider
                    sx={{ paddingTop: "10px", paddingBottom: "10px" }}
                    onClick={(e) => {
                      toggleDarkMode(e);
                    }}
                  >
                    <ListItemIcon>
                      {darkMode ? <Moon size={24} /> : <Sun size={24} />}
                    </ListItemIcon>
                    {darkMode ? "Dark Mode" : "Light Mode"}
                  </MenuItem>
                  <MenuItem
                    sx={{ marginTop: "10px" }}
                    onClick={(e) => {
                      sendToProfile(e);
                    }}
                  >
                    <ListItemIcon>
                      <User size={24} />
                    </ListItemIcon>
                    Your Profile
                  </MenuItem>
                  {localUser?.authProvider === "anonymous" && (
                    <MenuItem
                      onClick={(e) => {
                        sendToRegister(e);
                      }}
                    >
                      <ListItemIcon>
                        <UserCirclePlus size={24} />
                      </ListItemIcon>
                      Save Account
                    </MenuItem>
                  )}

                  {user ? (
                    <MenuItem
                      onClick={(e) => {
                        sendToLogout(e);
                      }}
                    >
                      <ListItemIcon>
                        <SignOut size={24} />
                      </ListItemIcon>
                      Logout
                    </MenuItem>
                  ) : (
                    <MenuItem
                      onClick={(e) => {
                        sendToLogin(e);
                      }}
                    >
                      {" "}
                      <ListItemIcon>
                        <SignOut size={24} />
                      </ListItemIcon>
                      Login
                    </MenuItem>
                  )}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Stack>
  );
}
