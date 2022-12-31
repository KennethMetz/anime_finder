import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, signInWithGoogle } from "./Firebase";
import "../Styles/RegisterByPhone.css";

export default function RegisterByPhone() {
  const [otp, setOtp] = useState("");
  const [phone, setPhone] = useState("");
  const [otpToggle, setOtpToggle] = useState(false);
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const register = () => {
    if (!name) alert("Please enter name");
    registerWithPhone(name, email, password);
  };
  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard");
  }, [user, loading]);
  return (
    <div className="register">
      <div className="register__container">
        <input
          type="phone"
          className="register__textBox"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone Number"
        />
        <button className="register__btn" onClick={register}>
          Register
        </button>
        {!otp ? (
          <div>
            <input
              type="phone"
              className="register__textBox"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Code sent to your phone"
            />
            <button className="register__btn" onClick={register}>
              Log-In
            </button>{" "}
          </div>
        ) : (
          ""
        )}
        <div>
          Already have an account? <Link to="/login">Login</Link> now.
        </div>
      </div>
    </div>
  );
}
