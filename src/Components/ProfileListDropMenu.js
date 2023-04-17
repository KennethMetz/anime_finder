import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuList from "@mui/material/MenuList";
import { DotsThreeOutlineVertical, Share, Trash } from "phosphor-react";
import IconButton from "@mui/material/IconButton";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { useEffect, useRef, useState } from "react";

export default function ProfileListDropMenu({ userId, listId, onDelete }) {
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
    if (event.key === "Escape") {
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

  const listItemStyling = {
    fontSize: "1rem",
    fontFamily: "interMedium",
  };

  return (
    <>
      {/**********************DROP MENU ICON**********************/}
      <IconButton
        ref={anchorRef}
        id="composition-button"
        alt="add to watchlist"
        aria-controls={open ? "composition-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={(e) => {
          handleToggle();
          e.preventDefault();
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleToggle();
        }}
        sx={{
          color: "inherit",
          border: "0px solid",
        }}
      >
        <DotsThreeOutlineVertical />
      </IconButton>

      {/**********************DROP MENU POP-UP**********************/}
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom"
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
            <Paper elevation={6} onClick={(e) => e.preventDefault()}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                  sx={{
                    minWidth: "200px",
                  }}
                >
                  <ListItemButton
                    divider
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      setOpen(false);
                    }}
                  >
                    <ListItemIcon>
                      <Share size={24} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Copy Link"
                      primaryTypographyProps={listItemStyling}
                    />
                  </ListItemButton>

                  <ListItemButton
                    onClick={() => {
                      onDelete();
                    }}
                  >
                    <ListItemIcon>
                      <Trash size={24} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Delete List"
                      primaryTypographyProps={listItemStyling}
                    ></ListItemText>
                  </ListItemButton>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}
