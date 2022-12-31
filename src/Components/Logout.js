import React from "react";

import { Link } from "react-router-dom";

export default function Logout() {
  return (
    <div className="logout">
      <div>
        A TRUE NINJA NEVER GIVES UP ON THEIR NINJA WAY! GET BACK TO TRAINING!!
      </div>
      <hr></hr>

      <Link to="/login">
        <button>LOG IN</button>
      </Link>
    </div>
  );
}
