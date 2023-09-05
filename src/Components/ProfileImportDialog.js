// TODO Make these imports targeted, once set is finalized.
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

import { useContext, useState } from "react";
import { APIGetMalLists } from "./APICalls";
import BreathingLogo from "./BreathingLogo";
import { useSnackbar } from "notistack";
import { LocalUserContext } from "./LocalUserContext";
import { ArrowsClockwise } from "phosphor-react";
import { SaveToFirestore, generateId } from "./Firestore";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { createNewWatchlist } from "../Util/ListUtil";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Firebase";

export default function ProfileImportDialog({ subheadStyle }) {
  const [open, setOpen] = useState(false);
  const [user] = useAuthState(auth);

  const [localUser, setLocalUser] = useContext(LocalUserContext);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [loading, setLoading] = useState(false);

  const [accountName, setAccountName] = useState("");

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setAccountName("");
    clearErrors();
  };

  function handleFormSubmission() {
    clearErrors("accountName");
    if (!errors.accountName) {
      if (loading) {
        throw new Error("Cannot import, already loading.");
      }
      setLoading(true);
      // NOTE: the 'fake' argument, which will call the API but tell it to return
      // fake data instead of calling the mal API, which will reduce calls to MAL
      // while in development.
      APIGetMalLists(/*username=*/ accountName, /*fake=*/ false)
        .then(async (response) => {
          console.log(response);

          syncWatchlists(response, localUser, setLocalUser, user);

          enqueueSnackbar({
            message: "Watchlists updated",
            variant: "success",
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
          });
          handleClose();
        })
        .catch((e) => {
          enqueueSnackbar({
            message: "Unable to import from MAL",
            variant: "error",
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
          });
          createFormError();
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }

  function createFormError() {
    setError("unknownImportError", {
      type: "custom",
      message: "*There was an error syncing this account. Please try again.",
    });
  }

  // Define Yup schema
  const validationSchema = Yup.object().shape({
    accountName: Yup.string()
      .required("*An account name is required")
      .min(1, "*An account name is required"),
  });

  //Use ReactHookForm hooks to validate Yup schema
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
  });

  return (
    <div>
      <Button
        variant="outlined"
        size="small"
        color="inherit"
        onClick={handleOpen}
        sx={{ ...subheadStyle }}
        startIcon={<ArrowsClockwise />}
      >
        Sync from MAL
      </Button>
      <Dialog
        disableRestoreFocus
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            borderRadius: "16px",
            border: "rgba(0, 0, 0, 0.12) 1px solid",
          },
        }}
      >
        <DialogTitle
          variant="h3"
          sx={{ fontSize: { xs: "1.8rem", fiveHundred: "2rem" } }}
        >
          Sync from MyAnimeList
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Import your animelists from MAL as watchlists. If you have already
            imported watchlists, this will overwrite those existing lists.
          </DialogContentText>
          <DialogContentText sx={{ mb: 2 }}>
            Note: Your lists on MAL must be public to be imported.
          </DialogContentText>
          <br />
          <TextField
            autoFocus
            name="accountName"
            id="accountName"
            {...register("accountName")}
            value={accountName}
            onChange={(e) => {
              clearErrors(["accountName"]);
              setAccountName(e.target.value);
            }}
            margin="dense"
            required
            error={Boolean(errors.accountName || errors.unknownImportError)}
            helperText={
              errors.accountName?.message ?? errors.unknownImportError?.message
            }
            label="MAL Account Name"
            fullWidth
            variant="outlined"
            type="text"
          />
        </DialogContent>
        <DialogActions
          sx={{
            mb: { xs: 4, fiveHundred: 3 },
            justifyContent: "space-around",
          }}
        >
          <Button
            onClick={handleClose}
            variant="outlined"
            color="text"
            size="large"
          >
            Cancel
          </Button>
          <Button
            size="large"
            sx={{ width: "100px", height: "48px" }}
            onClick={handleSubmit(() => handleFormSubmission())}
            variant="contained"
          >
            {loading ? <BreathingLogo type="handleButton" /> : "Sync"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function syncWatchlists(response, localUser, setLocalUser, user) {
  if (!response) return;

  let malListsExist = {
    completed: false,
    dropped: false,
    on_hold: false,
    plan_to_watch: false,
    watching: false,
  };

  let temp = { ...localUser };

  // Find any imported MAL lists in localUser and update its anime and syncDate fields.
  localUser.lists.forEach((list, index) => {
    if (list?.syncData?.source === "mal/completed") {
      malListsExist.completed = true;
      temp.lists[index].anime = response["completed"];
      temp.lists[index].syncData.syncDate = new Date();
    } else if (list?.syncData?.source === "mal/dropped") {
      malListsExist.dropped = true;
      temp.lists[index].anime = response["dropped"];
      temp.lists[index].syncData.syncDate = new Date();
    } else if (list?.syncData?.source === "mal/onHold") {
      malListsExist.on_hold = true;
      temp.lists[index].anime = response["on_hold"];
      temp.lists[index].syncData.syncDate = new Date();
    } else if (list?.syncData?.source === "mal/planToWatch") {
      malListsExist.plan_to_watch = true;
      temp.lists[index].anime = response["plan_to_watch"];
      temp.lists[index].syncData.syncDate = new Date();
    } else if (list?.syncData?.source === "mal/watching") {
      malListsExist.watching = true;
      temp.lists[index].anime = response["watching"];
      temp.lists[index].syncData.syncDate = new Date();
    }
  });

  if (
    malListsExist?.completed ||
    malListsExist?.dropped ||
    malListsExist?.on_hold ||
    malListsExist?.plan_to_watch ||
    malListsExist?.watching
  ) {
    setLocalUser(temp);
    SaveToFirestore(user, temp);
  }

  // Create new watchlists for any MAL lists missing from localUser
  for (const listName in malListsExist) {
    if (!malListsExist[listName]) {
      temp = createNewWatchlist(
        /*name=*/ null,
        /*anime=*/ response[listName],
        /*privateList=*/ false, // Assuming we want to display MAL lists on /home
        /*desc=*/ null,
        user,
        temp,
        /*malList=*/ listName
      );
    }
  }

  setLocalUser(temp);
  SaveToFirestore(user, temp);
}
