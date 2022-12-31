import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  logInWithEmailAndPassword,
  signInWithGoogle,
  signInWithTwitter,
  logInWithPhoneNumber,
} from "./Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth, signInWithRedirect } from "firebase/auth";
import { TwitterAuthProvider } from "firebase/auth";

import "../Styles/Login.css";
import { PopulateFromFirestore } from "./Firestore";

import { LocalUserContext } from "./LocalUserContext";

export default function Login() {
  const [localUser, setLocalUser] = useContext(LocalUserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) {
      PopulateFromFirestore(user, localUser, setLocalUser);
      navigate("/home");
    }
  }, [user, loading]);
  return (
    <div className="login">
      <div className="login__container">
        <input
          type="text"
          className="login__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="login__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          className="login__btn"
          onClick={() => logInWithEmailAndPassword(email, password)}
        >
          Login
        </button>
        {/* <Link to="/phone">
          <button className="login__btn login__phone">
            Login with Phone Number
          </button>
        </Link> */}
        <div>__________________________________________</div>
        <div></div> <div></div> <div></div>
        <button className="login__btn login__google" onClick={signInWithGoogle}>
          Login with Google
        </button>
        <button
          className="login__btn login__twitter"
          onClick={signInWithTwitter}
        >
          Login with Twitter
        </button>
        <div>
          <Link to="/reset">Forgot Password</Link>
        </div>
        <div>
          Don't have an account? <Link to="/register">Register</Link> now.
        </div>
      </div>
    </div>
  );
}
