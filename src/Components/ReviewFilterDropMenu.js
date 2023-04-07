import React, { useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";
import { FunnelSimple } from "phosphor-react";

export default function ReviewFilterDropMenu({
  setLastVisible,
  setSortOption,
}) {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const [selected, setSelected] = useState("newestFirst");

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

  function handleSelection(e, option) {
    handleClose(e);
    setLastVisible(null);
    setSortOption([option[0], option[1]]);
    setSelected(option[2]);
  }

  return (
    <Stack>
      <Button
        variant="outlined"
        startIcon={<FunnelSimple />}
        color="inherit"
        ref={anchorRef}
        id="composition-button"
        aria-controls={open ? "composition-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleToggle();
        }}
      >
        {" "}
        Filter By{" "}
      </Button>
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
                  sx={{ padding: 0 }}
                >
                  <MenuItem
                    divider
                    onClick={(e) => {
                      handleSelection(e, ["time", "asc", "oldestFirst"]);
                    }}
                    selected={selected === "oldestFirst" ? true : false}
                  >
                    Date: Oldest First
                  </MenuItem>

                  <MenuItem
                    divider
                    onClick={(e) => {
                      handleSelection(e, ["time", "desc", "newestFirst"]);
                    }}
                    selected={selected === "newestFirst" ? true : false}
                  >
                    Date: Newest First{" "}
                  </MenuItem>

                  <MenuItem
                    divider
                    onClick={(e) => {
                      handleSelection(e, ["rating", "desc", "highestRating"]);
                    }}
                    selected={selected === "highestRating" ? true : false}
                  >
                    Rating: Highest First{" "}
                  </MenuItem>

                  <MenuItem
                    divider
                    onClick={(e) => {
                      handleSelection(e, ["rating", "asc", "lowestRating"]);
                    }}
                    selected={selected === "lowestRating" ? true : false}
                  >
                    Rating: Lowest First{" "}
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Stack>
  );
}