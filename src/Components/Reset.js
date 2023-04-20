import "../Styles/Reset.css";

import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth, sendPasswordReset } from "./Firebase";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import EdwardMLLogo from "./EdwardMLLogo";

import Container from "@mui/material/Container";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import useTheme from "@mui/material/styles/useTheme";

export default function Reset() {
  const [email, setEmail] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/home");
  }, [user, loading]);

  return (
    <div className="login">
      <Container maxWidth="lg">
        {/* //*************Pop-up that's displayed once reset email is sent********/}
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle
            id="alert-dialog-title"
            sx={{
              fontFamily: "interExtraBold",
              fontSize: "1.5rem",
              textAlign: "center",
            }}
          >
            {"Password reset email sent!"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-description"
              sx={{
                fontFamily: "interMedium",
                textAlign: "center",
                fontSize: "1.1rem",
              }}
            >
              If EdwardML has an account with the email address that was
              submitted, a password reset email has been sent!
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center" }}>
            <Button
              variant="contained"
              size="large"
              sx={{
                width: "211px",
                marginTop: "10px",
              }}
              onClick={() => {
                navigate("/login");
              }}
            >
              Return to Login
            </Button>
          </DialogActions>
        </Dialog>
        <div className="welcomeBanner">
          <Link to="/">
            <EdwardMLLogo />
          </Link>
        </div>
        <h4 className="H4" style={{ textAlign: "center" }}>
          Let's Reset Your Password!
        </h4>
      </Container>

      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          className="register__container"
          style={{ marginBottom: "50px", borderColor: theme.palette.divider }}
        >
          {/* *******************EdwardML - Email Field************************** */}
          <TextField
            type="email"
            className="register__textBox"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            required
            inputProps={{
              style: {
                fontSize: "1.0rem",
                fontFamily: "interMedium",
                paddingTop: "12.5px",
                paddingBottom: "12.5px",
              },
            }}
            InputLabelProps={{
              style: {
                fontSize: "1.0rem",
                fontFamily: "interMedium",
              },
            }}
            sx={{
              width: {
                xs: "250px",
                fourHundred: "280px",
                sm: "350px",
              },
              borderRadius: "9px",
              marginBottom: "20px",
              fontFamily: "interMedium",
              fontSize: "1rem",
            }}
          />
          {/* *******************'Send Password Reset' Button************************** */}
          <Button
            variant="contained"
            size="large"
            sx={{
              width: "211px",
              marginTop: "10px",
            }}
            onClick={() => {
              sendPasswordReset(email);
              handleClickOpen();
            }}
          >
            Submit{" "}
          </Button>

          <Divider
            sx={{
              width: "100%",
              borderColor: "black",
              marginTop: "32px",
              marginBottom: "27px",
            }}
          />
          {/* *******************Already Registered Section************************** */}
          <div style={{ fontFamily: "interMedium" }}>
            Need an account?{" "}
            <Link to="/register">
              <span
                style={{ fontFamily: "interExtraBold", fontWeight: "bold" }}
              >
                Register here!
              </span>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
