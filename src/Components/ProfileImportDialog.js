// TODO Make these imports targeted, once set is finalized.
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

import { useContext, useEffect, useState } from "react";
import { APIGetMalLists } from "./APICalls";
import BreathingLogo from "./BreathingLogo";
import { useSnackbar } from "notistack";
import { LocalUserContext } from "./LocalUserContext";
import { ArrowsClockwise } from "phosphor-react";
import { generateId } from "./Firestore";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

export default function ProfileImportDialog({ subheadStyle }) {
  const [open, setOpen] = useState(false);

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

  useEffect(() => {
    console.log(accountName);
  }, [accountName]);

  function handleFormSubmission() {
    clearErrors("accountName");
    console.log(errors);
    if (!errors.accountName) {
      if (loading) {
        throw new Error("Cannot import, already loading.");
      }
      console.log("IT DID NOT GET STOPPED");
      // setLoading(true);
      // TODO Use form data in API call.
      // NOTE: the 'fake' argument, which will call the API but tell it to return
      // fake data instead of calling the mal API, which will reduce calls to MAL
      // while in development.
      APIGetMalLists(/*username=*/ "rasengan-rascal", /*fake=*/ true)
        .then(async (response) => {
          console.log(response);

          syncWatchlists(localUser, response);

          enqueueSnackbar({
            message: "Watchlists updated",
            variant: "success",
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
          });
          setOpen(false);
        })
        .catch((e) => {
          enqueueSnackbar({
            message: "Unable to import from MAL",
            variant: "error",
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
    mode: "onSubmit",
    criteriaMode: "all",
    reValidateMode: "onChange",
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
            imported watchlists, this will sync the existing lists.
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
            onChange={(e) => setAccountName(e.target.value)}
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

function syncWatchlists(localUser, response) {
  // TODO Implement sync with existing lists.  Add new watchlists if
  // needed.  New watchlists will have to also have watchlistData/
  // created for them, etc, so this will be a fun challenge.  There is
  // already code to create lists in `AddToListDropMenu`, maybe there
  // is a way to centralize this in ListUtil.js or something.

  // Also, synced lists should have some data embedded in them to
  // indicate they are synced from MAL, and what list they are synced
  // from.

  // Maybe something like:

  const syncDate = new Date();

  for (const status in response) {
    const anime = response[status];

    // Find existing list, and update.

    // If not, need to create and add one.
    const newList = {
      id: generateId(),
      name: "Completed on MAL",
      anime: anime,
      privateList: false,
      desc: "My 'Completed' anime on MAL.",
      syncData: {
        source: "mal/completed",
        syncDate,
      },
    };

    // Add list to localUser, prepare to create watchlistData, etc.
  }

  // Do the writes:

  // setLocalUser(newLocalUser);
  // SaveToFirestore(newLocalUser);
  // etc, etc.s
}
