import { Link } from "react-router-dom";
import { Icon } from "@mui/material";
import "../Styles/Header.css";
import edward from "../Styles/images/edward.jpg";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logout } from "./Firebase";
import { signOut } from "firebase/auth";

function Header() {
  const [user] = useAuthState(auth);

  return (
    <div className="header">
      <div className="logo">
        <img src={edward} alt="" />
      </div>
      <ul>
        <Link to="/">
          <li>HOME</li>
        </Link>

        {/* {user ? (
          <Link to="Dashboard">
            <li>MY DASHBOARD</li>
          </Link>
        ) : null} */}

        {user ? (
          <Link to="Profile">
            <li>MY PROFILE</li>
          </Link>
        ) : null}

        {!user || !user.displayName ? null : <li>{user.displayName}</li>}
        {!user ? (
          <Link to="Login">
            <li>LOGIN</li>
          </Link>
        ) : (
          <Link to="/logout">
            <button onClick={logout}>LOGOUT</button>
          </Link>
        )}
      </ul>
    </div>
  );
}

export default Header;
