// TODO Make these imports targeted, once set is finalized.
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useContext, useState } from "react";
import { APIGetMalLists } from "./APICalls";
import BreathingLogo from "./BreathingLogo";
import { useSnackbar } from "notistack";
import { LocalUserContext } from "./LocalUserContext";
import { ArrowsClockwise } from "phosphor-react";
import { generateId } from "./Firestore";

export default function ProfileImportDialog() {
  const [open, setOpen] = useState(false);

  const [localUser, setLocalUser] = useContext(LocalUserContext);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [loading, setLoading] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleSubmit = () => {
    if (loading) {
      throw new Error("Cannot import, already loading.");
    }
    setLoading(true);
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
        });
        setOpen(false);
      })
      .catch((e) => {
        enqueueSnackbar({
          message: "Unable to import from MAL",
          variant: "error",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleOpen}
        sx={{ mt: 2 }}
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
        <DialogTitle variant="h3">Sync from MAL</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Import your animelists from MAL as watchlists. If you have already
            imported watchlists, this will sync the existing lists.
          </DialogContentText>
          <DialogContentText sx={{ mb: 2 }}>
            Note: Your lists on MAL must be public to be imported.
          </DialogContentText>
          <DialogContentText sx={{ mb: 2 }}>
            TODO: Form goes here...
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ mx: 2, mb: 2 }}>
          <Button color="inherit" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit} disabled={loading}>
            {loading ? <BreathingLogo type="smallButton" /> : "Import"}
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
