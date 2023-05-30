import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "./Firebase";
import { LocalUserContext } from "./LocalUserContext";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  SaveHandle,
  CheckForHandleDuplicates,
  SaveToFirestore,
} from "./Firestore";
import useTheme from "@mui/material/styles/useTheme";

export default function HandleDialog({ user }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const [localUser, setLocalUser] = useContext(LocalUserContext);
  let newLocalUser;

  const [open, setOpen] = useState(true);

  const [handle, setHandle] = useState("");

  const handleClose = (event, reason) => {
    if (reason && reason === "backdropClick") return;
    setOpen(false);
  };

  async function handleCancel() {
    await logout();
    setLocalUser({
      name: [],
      likes: [],
      dislikes: [],
      lists: [],
      savedLists: [],
      avatar: null,
      bio: null,
      top8: [],
      reviews: [],
      comments: [],
      null: null,
    });
    navigate("/");
  }

  function handleFormSubmission() {
    let isDuplicate;
    let normalizedHandle = handle.toLowerCase();
    CheckForHandleDuplicates(normalizedHandle, user)
      .then((result) => {
        isDuplicate = result;
      })
      .then(() => {
        if (isDuplicate === true) {
          setError("duplicateHandle", {
            type: "custom",
            message: "*Handle has already been taken",
          });
        } else if (isDuplicate === false) {
          newLocalUser = { ...localUser };
          newLocalUser.handle = handle;
          SaveToFirestore(user, newLocalUser);
          SaveHandle(handle, user.uid);
          setLocalUser(newLocalUser);
        }
      });
  }

  // Define Yup schema
  const validationSchema = Yup.object().shape({
    handle: Yup.string()
      .required("*A handle is required")
      .matches(
        /^[a-zA-Z0-9-_]+$/,
        "*Invalid character used - can only use letters, numbers, dashes, and underscores"
      )
      .min(3, "*Handle must have at least 3 characters"),
  });

  //Use ReactHookForm hooks to validate Yup schema
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: "all",
    criteriaMode: "all",
    resolver: yupResolver(validationSchema),
  });

  return (
    <Dialog
      disableEscapeKeyDown
      PaperProps={{
        style: {
          borderRadius: "11px",
          border: "rgba(0, 0, 0, 0.12) 1px solid",
        },
      }}
      open={open}
      onClose={handleClose}
      sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            width: "100%",
            maxWidth: "470px",
            marginLeft: "0px",
            marginRight: "0px",
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          fontWeight: 700,
          fontSize: { xs: "1.8rem", fiveHundred: "2rem" },
          pt: { xs: 4, fiveHundred: 3 },
          pl: { xs: 3, fiveHundred: 5 },
          pr: { xs: 3, fiveHundred: 5 },
        }}
      >
        Choose account handle
      </DialogTitle>
      <DialogContent
        sx={{ pl: { xs: 3, fiveHundred: 5 }, pr: { xs: 3, fiveHundred: 5 } }}
      >
        <DialogContentText>
          <li type="circle">Handle names are permanent</li>
          <li type="circle">
            Valid characters are:
            <Box sx={{ ml: 4 }}>
              <li type="disc">
                0-9 <span style={{ color: "gray" }}> (numbers)</span>
              </li>{" "}
              <li type="disc">
                A-z <span style={{ color: "gray" }}> (letters)</span>
              </li>
              <li type="disc">
                {" "}
                - <span style={{ color: "gray" }}> (dashes)</span>
              </li>
              <li type="disc">
                {" "}
                _ <span style={{ color: "gray" }}> (underscores)</span>
              </li>
            </Box>
          </li>
        </DialogContentText>
        <br />
        <TextField
          autoFocus
          {...register("handle")}
          value={handle}
          onChange={(e) => {
            clearErrors(["duplicateHandle"]);
            setHandle(e.target.value);
          }}
          margin="dense"
          required
          error={errors.handle || errors.duplicateHandle ? true : false}
          helperText={errors.duplicateHandle?.message ?? errors.handle?.message}
          id="handle"
          label="Account handle"
          type="text"
          fullWidth
          variant="outlined"
        />
      </DialogContent>
      <DialogActions
        sx={{
          mb: { xs: 4, fiveHundred: 3 },
          justifyContent: "space-around",
        }}
      >
        <Button
          onClick={handleCancel}
          variant="outlined"
          color="text"
          size="large"
        >
          Cancel
        </Button>
        <Button
          size="large"
          onClick={handleSubmit(() => {
            handleFormSubmission();
          })}
          variant="contained"
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
