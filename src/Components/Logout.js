import { Container } from "@mui/system";
import React from "react";

import { Link } from "react-router-dom";

export default function Logout() {
  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div className="gap"></div>
      <div>
        A TRUE NINJA NEVER GIVES UP ON THEIR NINJA WAY! GET BACK TO TRAINING!!
      </div>
      <div className="gap"></div>

      <Link to="/login">
        <button>LOG IN</button>
      </Link>
    </Container>
  );
}
