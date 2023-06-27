import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuList from "@mui/material/MenuList";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import useTheme from "@mui/material/styles/useTheme";

import { Bell, CaretDown } from "phosphor-react";

import Badge from "@mui/material/Badge";
import useMediaQuery from "@mui/material/useMediaQuery";

import NotificationsContext from "./NotificationsContext";
import { NotificationListItem } from "./NotificationListItem";
import { MarkNotificationsSeenOrRead, SaveNotification } from "./Firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Firebase";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

export default function NotificationDropMenu() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [user, loading, error] = useAuthState(auth);

  const [
    notifications,
    setNotifications,
    totalNotis,
    unreadNotiCount,
    moreNotiRequests,
    setMoreNotiRequests,
  ] = useContext(NotificationsContext);

  const isMobileWidth = useMediaQuery(theme.breakpoints.down("sm"));

  const handleToggle = () => {
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
  useMemo(() => {
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
  useMemo(() => {
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

  // Makes popper show default # of notifications when re-opened.
  useEffect(() => {
    if (open === false) setMoreNotiRequests(0);
  }, [open]);

  return (
    <Stack>
      <IconButton
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
          badgeContent={unreadNotiCount}
          color="primary"
        >
          <Bell size={24} />
        </Badge>
      </IconButton>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        style={{
          zIndex: "4",
          maxWidth: "530px",
        }}
      >
        {({ TransitionProps }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: isMobileWidth ? "right top" : "center top",
            }}
          >
            <Paper
              elevation={6}
              sx={{
                overflow: "auto",
                mr: 1,
                maxHeight: "92vh",
                overflowY: "auto",
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
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
                        key={`${item.time?.seconds} + ${index}`}
                        handleClose={handleClose}
                        index={index}
                      />
                    );
                  })}
                  {/* Render SEE MORE button */}
                  {totalNotis > notifications?.length && (
                    <ListItemButton
                      sx={{ display: "flex", justifyContent: "center" }}
                      onClick={() => {
                        setMoreNotiRequests(moreNotiRequests + 1);
                      }}
                    >
                      See More
                      <ListItemIcon sx={{ ml: 2 }}>
                        <CaretDown size={32} />
                      </ListItemIcon>
                    </ListItemButton>
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
