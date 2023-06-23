import React, { useContext, useEffect, useRef, useState } from "react";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuList from "@mui/material/MenuList";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";

import { Bell } from "phosphor-react";
import { useNavigate } from "react-router-dom";

import { Badge } from "@mui/material";
import NotificationsContext from "./NotificationsContext";
import { NotificationListItem } from "./NotificationListItem";

export default function NotificationDropMenu() {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const [notifications, setNotifications] = useContext(NotificationsContext);

  const unreadCount = getUnreadCount(notifications);

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
  // To-Do: clear notifications count upon view of popper
  // To-Do: Get vertical scroll bar to show up

  return (
    <Stack>
      <IconButton
        aria-label="notifications"
        sx={{ mr: 2 }}
        onClick={handleToggle}
        onKeyDown={handleListKeyDown}
      >
        <Badge
          ref={anchorRef}
          id="composition-button"
          alt="notifications"
          aria-controls={open ? "composition-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          badgeContent={unreadCount}
          color="primary"
        >
          <Bell size={24} />
        </Badge>
      </IconButton>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        style={{
          zIndex: "4",
          maxHeight: "92vh",
          maxWidth: "500px",
          overflow: "scroll",
        }}
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
                  {notifications.map((item, index) => {
                    return (
                      <NotificationListItem
                        item={item}
                        key={item.time}
                        handleClose={handleClose}
                      />
                    );
                  })}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Stack>
  );
}

function getUnreadCount(input) {
  if (!input) return 0;
  let count = 0;
  for (let item of input) {
    if (item.read === false) count++;
  }
  return count;
}
