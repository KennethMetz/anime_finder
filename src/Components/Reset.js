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
import HtmlPageTitle from "./HtmlPageTitle";
import Typography from "@mui/material/Typography";

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
      <HtmlPageTitle title={"Password Reset"} />

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
              fontWeight: 800,
              textAlign: "center",
            }}
          >
            {"Password reset email sent!"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-description"
              sx={{
                textAlign: "center",
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
        <Typography variant="h3" sx={{ textAlign: "center", mb: "18px" }}>
          Let's Reset Your Password!
        </Typography>
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
                paddingTop: "12.5px",
                paddingBottom: "12.5px",
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
          <div>
            Need an account?{" "}
            <Link to="/register">
              <span style={{ fontWeight: 800 }}>Register here!</span>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
