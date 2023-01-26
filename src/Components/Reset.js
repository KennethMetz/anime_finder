import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth, sendPasswordReset } from "./Firebase";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "../Styles/Reset.css";
import {
  Button,
  Container,
  Dialog,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import logo from "../Styles/images/logo.svg";
import { useTheme } from "@mui/material/styles";

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

  let regButtonStyling = {
    color: "black",
    borderColor: "black",
    textTransform: "none",
    borderRadius: "24px",
    width: "350px",
    fontFamily: "interExtraBold",
    fontSize: "1rem",
    marginBottom: "17px",
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
              variant="outlined"
              sx={{
                textTransform: "none",
                width: "211px",
                minHeight: "48px",
                marginTop: "10px",
                fontFamily: "interExtraBold",
                fontSize: "1rem",
                borderRadius: "24px",
                backgroundColor: theme.palette.day.primary,
                color: "white",
                "&:hover": {
                  color: theme.palette.day.primary,
                },
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
          <Link to="/home">
            <img src={logo} alt="" className="welcomeLogo" />
          </Link>
          <Link to="/home">
            <div className="welcomeTextBlock">
              <h1
                className="welcomeTitle"
                style={{ color: theme.palette.day.text, paddingLeft: "10px" }}
              >
                Edward
              </h1>
              <h1
                className="welcomeTitle"
                style={{ color: theme.palette.day.primary }}
              >
                ML
              </h1>
            </div>
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
        <div className="register__container" style={{ marginBottom: "50px" }}>
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
              textTransform: "none",
              width: "211px",
              minHeight: "48px",
              marginTop: "10px",
              fontFamily: "interExtraBold",
              fontSize: "1rem",
              borderRadius: "24px",
              backgroundColor: theme.palette.day.primary,
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
