import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

export default function HandleDialog({ user }) {
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
    <div>
      <Dialog
        disableEscapeKeyDown
        maxWidth="sm  "
        PaperProps={{
          style: {
            borderRadius: "11px",
            border: "rgba(0, 0, 0, 0.12) 1px solid",
          },
        }}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle
          sx={{
            fontWeight: 700,
            fontSize: "2rem",
            pt: 3,
            pl: 5,
            pr: 5,
          }}
        >
          Choose account handle
        </DialogTitle>
        <DialogContent sx={{ pl: 5, pr: 5 }}>
          <DialogContentText>
            A handle is a unique name for each account <br />
            <br />
            Note:
            <li>Handle names are permanent</li>
            <li> Valid characters are: 0-9, A-z, -, _ </li>
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
            helperText={
              errors.duplicateHandle?.message ?? errors.handle?.message
            }
            id="handle"
            label="Account handle"
            type="text"
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions sx={{ mb: 1, pr: 5 }}>
          <Button onClick={handleCancel} variant="outlined" color="text">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit(() => {
              handleFormSubmission();
            })}
            variant="contained"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function normalizeHandleName() {}
