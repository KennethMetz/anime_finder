import React, { useContext, useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";
import {
  List,
  Moon,
  SignOut,
  Sun,
  User,
  UserCircle,
  UserCirclePlus,
} from "phosphor-react";
import { useNavigate } from "react-router-dom";
import { auth, logout } from "./Firebase";
import { LocalUserContext } from "./LocalUserContext";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import AppSettingsContext from "./AppSettingsContext";

export default function DropMenu() {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const theme = useTheme();

  const [localUser, setLocalUser] = useContext(LocalUserContext);

  const [appSettings, setAppSettings] = useContext(AppSettingsContext);
  const darkMode = appSettings.darkMode;

  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

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
    navigate("/profile");
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
    await logout();
    setLocalUser({
      likes: [],
      dislikes: [],
      lists: [],
      avatar: null,
      bio: null,
    });
    handleClose(e);
    navigate("/logout");
  }

  function toggleDarkMode() {
    setAppSettings({ ...appSettings, darkMode: !darkMode });
  }

  return (
    <Stack>
      <Avatar
        ref={anchorRef}
        id="composition-button"
        alt={user?.displayName}
        src={localUser?.avatar}
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
        }}
      />
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        style={{ zIndex: "4" }}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-start" ? "left top" : "left bottom",
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
                        alt={user?.displayName}
                        src="purposefully bad link"
                        sx={{ bgcolor: theme.palette.primary.main }}
                      />
                    </ListItemAvatar>

                    <ListItemText
                      primary={
                        user?.displayName ? `${user?.displayName}` : "Guest"
                      }
                      primaryTypographyProps={{ fontFamily: "interSemiBold" }}
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

                  {/* <MenuItem onClick={handleClose}>My account</MenuItem> */}

                  {localUser?.name === "guest" ? (
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
                  ) : (
                    ""
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
