import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuList from "@mui/material/MenuList";
import { DotsThreeVertical } from "phosphor-react";

import IconButton from "@mui/material/IconButton";
import { useEffect, useRef, useState } from "react";
import LikeButtons from "./LikeButtons";

export default function LikeButtonsDropMenu({ anime, isOwnProfile, onRemove }) {
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

  return (
    <>
      {/**********************DROP MENU ICON**********************/}
      <IconButton
        ref={anchorRef}
        id="composition-button"
        alt="options"
        aria-controls={open ? "composition-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        color="inherit"
        onClick={(e) => {
          handleToggle();
          e.stopPropagation();
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleToggle();
        }}
      >
        <DotsThreeVertical />
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
            <Paper elevation={6} onClick={(e) => e.stopPropagation()}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                >
                  <div
                    style={{
                      display: "flex",
                      width: "220px",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <LikeButtons
                      anime={anime}
                      selected={true}
                      showDeleteButton={isOwnProfile}
                      onRemove={onRemove}
                    />
                  </div>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}
