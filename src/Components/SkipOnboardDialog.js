import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";
import { Divider, useTheme } from "@mui/material";

export default function SkipOnboardDialog() {
  const navigate = useNavigate();
  const theme = useTheme();

  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{
            textAlign: "center",
            fontFamily: "interMedium",
            fontSize: "1.8rem",
          }}
        >
          Already have an account with{" "}
          <span style={{ fontFamily: "montserrat", fontSize: "2rem" }}>
            Edward
          </span>
          <span
            style={{
              fontFamily: "montserrat",
              color: theme.palette.primary.main,
              fontSize: "2rem",
            }}
          >
            ML
          </span>
          ?
        </DialogTitle>
        {/* <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ textAlign: "center" }}
          >
            Do you have an account with EdwardML?
          </DialogContentText>
        </DialogContent> */}
        <Divider
          sx={{
            width: "80%",
            bgcolor: "black",
            marginLeft: "10%",
            marginBottom: "15px",
          }}
        />
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button
            variant="contained"
            sx={{
              textAlign: "center",
              textTransform: "none",
              fontFamily: "interExtraBold",
              fontSize: "1.1rem",
              width: "125px",
              marginRight: "50px",
            }}
            onClick={() => {
              navigate("/login");
            }}
          >
            Yes
          </Button>
          <Button
            variant="contained"
            sx={{
              textAlign: "center",
              textTransform: "none",
              fontFamily: "interExtraBold",
              fontSize: "1.1rem",
              width: "125px",
            }}
            onClick={handleClose}
          >
            No
          </Button>
        </DialogActions>
        <div style={{ height: "20px" }}></div>
      </Dialog>
    </div>
  );
}
