import * as React from "react";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";
import { Plus } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import { auth, logout } from "./Firebase";
import { LocalUserContext } from "./LocalUserContext";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Tooltip,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import AppSettingsContext from "./AppSettingsContext";
import { SaveToFirestore } from "./Firestore";
import AddButton from "./AddButton";

export default function AddToListDropMenu({ anime }) {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const theme = useTheme();

  const [localUser, setLocalUser] = React.useContext(LocalUserContext);

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const [newList, setNewList] = React.useState(false);
  let [name, setName] = React.useState("");

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  function handleClose(event) {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
    setNewList(false);
  }

  function handleListKeyDown(event) {
    if (event.key === "Escape") {
      setOpen(false);
    }
  }

  //Creates new EMPTY watchlist
  const createNewList = () => {
    let temp = { ...localUser };
    !temp.lists
      ? (temp.lists = [{ name: name, anime: [] }])
      : (temp.lists = [...temp.lists, { name: name, anime: [] }]);
    setLocalUser(temp);
    SaveToFirestore(user, temp);
    setName("");
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <Tooltip title="Add to Watchlist">
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
          <Plus />
        </IconButton>
      </Tooltip>

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
                    <ListItemText primary="Add to Watchlist" />
                  </ListItemButton>
                  {localUser?.lists?.length > 0
                    ? localUser.lists.map((item, index) => {
                        return (
                          <ListItem key={index} sx={{ marginTop: "10px" }}>
                            {item.name}
                            <AddButton anime={anime} list={item.name} />
                          </ListItem>
                        );
                      })
                    : ""}
                  {!newList ? (
                    <MenuItem
                      sx={{ marginTop: "10px" }}
                      onClick={(e) => {
                        setNewList(true);
                        e.preventDefault();
                      }}
                    >
                      <ListItemIcon>
                        <Plus size={24} />
                      </ListItemIcon>
                      Create New List
                    </MenuItem>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <TextField
                        label="Name"
                        name="name"
                        id="name"
                        variant="standard"
                        required
                        autoFocus
                        value={name}
                        sx={{ width: "250px", marginBottom: "15px" }}
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                      />{" "}
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <Button
                          color="inherit"
                          variant="outlined"
                          onClick={(e) => {
                            setNewList(false);
                            setName("");
                            e.preventDefault();
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="contained"
                          onClick={(e) => {
                            createNewList();
                          }}
                          sx={{ ml: 1 }}
                        >
                          Create
                        </Button>
                      </div>
                    </div>
                  )}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}
