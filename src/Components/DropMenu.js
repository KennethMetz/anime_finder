import * as React from "react";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";
import { List } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import { auth, logout } from "./Firebase";
import { LocalUserContext } from "./LocalUserContext";
import { useAuthState } from "react-firebase-hooks/auth";

export default function DropMenu() {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const [localUser, setLocalUser] = React.useContext(LocalUserContext);

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

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
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
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

  function sendToLogout(e) {
    logout();
    setLocalUser([{ likes: [], dislikes: [] }]);
    handleClose(e);
    navigate("/logout");
  }

  return (
    <Stack>
      <List
        size={32}
        ref={anchorRef}
        id="composition-button"
        aria-controls={open ? "composition-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      />
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-start" ? "left top" : "left bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem
                    onClick={(e) => {
                      sendToProfile(e);
                    }}
                  >
                    Profile
                  </MenuItem>

                  {/* <MenuItem onClick={handleClose}>My account</MenuItem> */}

                  {user ? (
                    <MenuItem
                      onClick={(e) => {
                        sendToLogout(e);
                      }}
                    >
                      Logout
                    </MenuItem>
                  ) : (
                    <MenuItem
                      onClick={(e) => {
                        sendToLogin(e);
                      }}
                    >
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
