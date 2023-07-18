import React, {
  Fragment,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuList from "@mui/material/MenuList";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import useTheme from "@mui/material/styles/useTheme";
import ListItemButton from "@mui/material/ListItemButton";
import CircularProgress from "@mui/material/CircularProgress";
import Badge from "@mui/material/Badge";
import useMediaQuery from "@mui/material/useMediaQuery";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import { Bell, CaretDown, CaretUp } from "phosphor-react";

import NotificationsContext from "./NotificationsContext";
import { NotificationListItem } from "./NotificationListItem";
import { MarkNotificationsSeenOrRead } from "./Firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Firebase";

export default function NotificationDropMenu() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [user, loading, error] = useAuthState(auth);
  const [loadingMoreNotis, setLoadingMoreNotis] = useState(false);

  const [
    notifications,
    showMore,
    hideBadge,
    getNotis,
    showNewNotiButton,
    displayLatestNotis,
    resetPagination,
  ] = useContext(NotificationsContext);

  const isMobileWidth = useMediaQuery(
    theme.breakpoints.down("sevenHundredFifty")
  );

  const handleToggle = () => {
    if (!open) getNotis();
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

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

  // Mark all notifications as "seen" when the popper is opened
  useEffect(() => {
    if (open && notifications) {
      let temp = [];
      for (let item of notifications) {
        if (!item.seen) {
          item.seen = true;
          temp.push(item);
        }
      }
      if (temp.length === 0) return;
      MarkNotificationsSeenOrRead(temp, user.uid, "seen");
    }
  }, [open, notifications]);

  // Mark all notifications as "read" when the popper is closed
  useEffect(() => {
    if (!open && notifications) {
      let temp = [];
      for (let item of notifications) {
        if (!item.read) {
          item.read = true;
          temp.push(item);
        }
      }
      if (temp.length === 0) return;
      MarkNotificationsSeenOrRead(temp, user.uid, "read");
    }
  }, [open]);

  // Hides spinner once additional notis have been added to notifications array
  useEffect(() => {
    setLoadingMoreNotis(false);
  }, [notifications]);

  return (
    <Stack>
      <IconButton
        color="inherit"
        aria-label="notifications"
        sx={{ mr: 2 }}
        onClick={handleToggle}
        ref={anchorRef}
      >
        <Badge
          id="composition-button"
          alt="notifications"
          aria-controls={open ? "composition-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          invisible={hideBadge}
          color="primary"
          variant="dot"
          sx={{
            "& .MuiBadge-dot": {
              borderRadius: "6px",
              width: "12px",
              height: "12px",
            },
          }}
        >
          <Bell size={24} />
        </Badge>
      </IconButton>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        placement="bottom-end"
        transition
        style={{
          zIndex: "4",
          maxWidth: isMobileWidth ? "95vw" : "530px",
        }}
      >
        {({ TransitionProps }) => (
          <Grow
            {...TransitionProps}
            onExited={() => resetPagination()}
            style={{
              transformOrigin: "right top",
            }}
          >
            <Paper
              elevation={6}
              sx={{
                overflow: "auto",
                ml: 1,
                maxHeight: "92vh",
                overflowY: "auto",
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <Box>
                  <MenuList
                    autoFocusItem={open}
                    variant="menu"
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    {notifications?.map((item, index) => {
                      return (
                        <NotificationListItem
                          item={item}
                          key={`${item.time?.seconds}+${item.interactorId}`}
                          handleClose={handleClose}
                          index={index}
                        />
                      );
                    })}

                    {/* Render SEE MORE button */}
                    {showMore && (
                      <ListItemButton
                        sx={{ display: "flex", justifyContent: "center" }}
                        onClick={() => {
                          getNotis();
                          setLoadingMoreNotis(true);
                        }}
                      >
                        {!loadingMoreNotis ? "See More" : ""}
                        {!loadingMoreNotis ? (
                          <CaretDown size={32} style={{ marginLeft: "10px" }} />
                        ) : (
                          <CircularProgress />
                        )}
                      </ListItemButton>
                    )}
                  </MenuList>
                  {/* Render SEE LATEST button */}
                  {showNewNotiButton && (
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <Button
                        onClick={() => {
                          displayLatestNotis();
                        }}
                        sx={{
                          position: "absolute",
                          top: "10px",
                          textAlign: "center",
                          height: "25px",
                        }}
                        variant="contained"
                        size="medium"
                      >
                        New Notifications
                        <CaretUp size={28} style={{ marginLeft: "5px" }} />
                      </Button>
                    </Box>
                  )}
                </Box>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Stack>
  );
}
