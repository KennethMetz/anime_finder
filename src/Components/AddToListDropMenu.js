import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import { GlobeHemisphereWest, LockSimple, Plus } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import { auth } from "./Firebase";
import { LocalUserContext } from "./LocalUserContext";
import { useAuthState } from "react-firebase-hooks/auth";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import useTheme from "@mui/material/styles/useTheme";
import { generateId, SaveToFirestore } from "./Firestore";
import AddButton from "./AddButton";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AddButtonForTop8 from "./AddButtonForTop8";
import { useContext, useEffect, useRef, useState } from "react";
import { PrivacySwitch } from "./PrivacySwitch";

export default function AddToListDropMenu({ anime, variant, selected }) {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const theme = useTheme();

  const [localUser, setLocalUser] = useContext(LocalUserContext);

  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const [newList, setNewList] = useState(false);
  let [name, setName] = useState("");
  let [desc, setDesc] = useState("");
  let [privateList, setPrivateList] = useState(false);

  let listNames = localUser?.lists?.map((x) => x.name);

  // Define Yup schema
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("*A name is required")
      .min(1, "*Watchlist name must be at least 1 character long")
      .test(
        "duplicate-name",
        "Name already in use - try new name",
        (value) => !listNames.includes(value)
      ),
  });

  //Use ReactHookForm hooks to validate Yup schema
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: "all",
    criteriaMode: "all",
    reValidateMode: "onChange",
    resolver: yupResolver(validationSchema),
  });

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  function handleClose(event) {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
    setNewList(false);
    setName("");
    clearErrors();
  }

  function handleListKeyDown(event) {
    if (event.key === "Escape") {
      setOpen(false);
    }
  }

  //Creates new EMPTY watchlist
  const createNewList = () => {
    let listId = generateId();
    let temp = { ...localUser };
    temp.lists = [
      ...(temp.lists ?? []),
      {
        name: name,
        anime: [],
        privateList: privateList,
        desc: desc,
        id: listId,
      },
    ];
    setLocalUser(temp);
    SaveToFirestore(user, temp);
    setName("");
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const submitListName = () => {
    clearErrors("test");
    handleSubmit();
    if (!errors.name) {
      setNewList(false);
      createNewList();
    }
  };

  const size = variant === "contained" ? "large" : "medium";

  return (
    <>
      {/**********************DROP MENU ICON**********************/}
      <Tooltip title="Add to Watchlist">
        <IconButton
          ref={anchorRef}
          id="composition-button"
          alt="add to watchlist"
          aria-controls={open ? "composition-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          color={!selected ? "background" : "inherit"}
          onClick={(e) => {
            handleToggle();
            e.preventDefault();
            e.stopPropagation();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleToggle();
          }}
          sx={{
            border: "0px solid",
          }}
          size={size}
          variant={variant}
        >
          <Plus />
        </IconButton>
      </Tooltip>

      {/**********************DROP MENU POP-UP**********************/}
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom"
        transition
        style={{ zIndex: "4", maxWidth: "600px" }}
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
                  <ListItemButton
                    disabled
                    divider
                    sx={{
                      color: theme.palette.primary.main,
                      "&.Mui-disabled": { opacity: 1.0 },
                      minWidth: "281px",
                      textAlign: "center",
                    }}
                  >
                    <ListItemText
                      primary="Add to Watchlists"
                      primaryTypographyProps={{
                        fontSize: "1rem",
                        fontWeight: 800,
                      }}
                    />
                  </ListItemButton>

                  {localUser.top8 ? (
                    <ListItem
                      tabIndex={-1}
                      sx={{
                        margin: "10px 0px 10px",
                        fontWeight: 600,
                      }}
                      secondaryAction={
                        <AddButtonForTop8 anime={anime} list={localUser.top8} />
                      }
                    >
                      <ListItemText primary="My Top 8" sx={{ mr: 4 }} />
                    </ListItem>
                  ) : (
                    ""
                  )}

                  {/*******************Print Watchlists*******************/}
                  {localUser?.lists?.length > 0
                    ? localUser.lists.map((item, index) => {
                        return (
                          <ListItem
                            key={index}
                            tabIndex={-1}
                            sx={{
                              margin: "10px 0px 10px",
                            }}
                            secondaryAction={
                              <AddButton anime={anime} list={item.name} />
                            }
                          >
                            <ListItemText primary={item.name} sx={{ mr: 4 }} />
                          </ListItem>
                        );
                      })
                    : ""}
                  <Divider />

                  {/****************Create New List Button****************/}
                  {!newList ? (
                    <MenuItem
                      sx={{ marginTop: "10px", fontWeight: 600 }}
                      tabIndex={0}
                      onClick={(e) => {
                        setNewList(true);
                      }}
                    >
                      <ListItemIcon>
                        <Plus size={24} />
                      </ListItemIcon>
                      Create New List
                    </MenuItem>
                  ) : (
                    <div
                      onKeyDown={(e) => e.stopPropagation()}
                      style={{ display: "flex", flexDirection: "column" }}
                    >
                      <ListItemText
                        primary="New Watchlist"
                        primaryTypographyProps={{
                          fontSize: "1rem",
                          fontWeight: 800,
                          mt: 1.5,
                          textAlign: "center",
                        }}
                      />
                      <TextField
                        label="Name"
                        name="name"
                        id="name"
                        {...register("name")}
                        error={errors.name ? true : false}
                        helperText={errors.name?.message}
                        variant="outlined"
                        autoComplete="off"
                        autoFocus
                        required
                        color="text"
                        value={name}
                        sx={{
                          minWidth: "200px",
                          margin: "15px 25px 15px 25px",
                        }}
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                      />{" "}
                      <TextField
                        label="Description"
                        name="desc"
                        id="desc"
                        variant="outlined"
                        autoComplete="off"
                        color="text"
                        value={desc}
                        sx={{
                          minWidth: "200px",
                          margin: "15px 25px 15px 25px",
                        }}
                        onChange={(e) => {
                          setDesc(e.target.value);
                        }}
                      />
                      <PrivacySwitch
                        privateList={privateList}
                        setPrivateList={setPrivateList}
                      />
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <Button
                          color="inherit"
                          variant="outlined"
                          onClick={(e) => {
                            setNewList(false);
                            setName("");
                            clearErrors();
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          disabled={name.length === 0 ? true : false}
                          variant="contained"
                          onClick={submitListName}
                          sx={{ ml: 1 }}
                        >
                          Create
                        </Button>
                      </div>{" "}
                    </div>
                  )}

                  {/*******************View my Lists Button*******************/}
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button
                      color="inherit"
                      variant="text"
                      onClick={(e) => {
                        navigate(`/profile/${user?.uid}`);
                      }}
                      sx={{
                        fontSize: "0.8rem",
                        mt: 1,
                      }}
                    >
                      View my Lists
                    </Button>
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
