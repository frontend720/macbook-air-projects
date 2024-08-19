import React, { useState } from "react";
import "./Authentication.css";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
} from "firebase/auth";
import { PiEye, PiEyeSlash } from "react-icons/pi";
import app from "./config";

export default function Authentication() {
  const auth = getAuth(app);

  const [toggleAuthType, setToggleAuthType] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordToggle, setPassowrdToggle] = useState(false);
  const [error, setError] = useState("");
  const [resetSent, setResetSent] = useState(false);

  function dissapearingError() {
    // Replace with gsap code
      setTimeout(() => {
        setError("")
        setResetSent(false)
      }, 5000)
  }

  function signup(e) {
    e.preventDefault();
    const reference = createUserWithEmailAndPassword(auth, email, password);
    reference
      .then((user) => {
        if (!email && !password) {
          console.log("Unable to create user without email and password.");
        } else {
          console.log(user.user.email);
        }
      })
      .catch((error) => {
        console.log(error.code);
        if (error.code === "auth/email-already-in-use") {
          setError(
            "It looks like this email is already taken. Please try another."
          );
        } else if (error.code === "auth/invalid-email") {
          setError(
            "Oops! That doesn't look like a valid email address. Please double-check."
          );
        } else if (error.code === "auth/wrong-password") {
          setError(
            "Oops! Looks like that's the wrong password. Please double-check."
          );
        }
        dissapearingError()
      });
  }

  function login(e) {
    e.preventDefault();
    const reference = signInWithEmailAndPassword(auth, email, password);
    reference
      .then((user) => {
        if (!email && !password) {
          console.log(
            "Unable to login without providing username and password"
          );
        } else {
          console.log(user.user.email);
        }
      })
      .catch((error) => {
        console.log(error.code);
        if (error.code === "auth/email-already-in-use") {
          setError(
            "It looks like this email is already taken. Please try another."
          );
        } else if (error.code === "auth/invalid-email") {
          setError(
            "Oops! That doesn't look like a valid email address. Please double-check."
          );
        } else if (error.code === "auth/wrong-password") {
          setError(
            "Oops! Looks like that's the wrong password. Please double-check."
          );
        }
        dissapearingError()
      });
  }

  function forgot(e) {
    e.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then((user) => {
        console.log(user);
        setResetSent(true);
        dissapearingError();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function toggle() {
    setToggleAuthType((prev) => !prev);
  }

  function passToggle() {
    setPassowrdToggle((prev) => !prev);
  }

  console.log(error);

  return (
    <div className="authentication-container">
      <form className="authentication-form" action="">
        <h1 className="auth-title">Pancake Posts</h1>
        <label
          htmlFor=""
          style={{ fontWeight: "700", color: "#F45B69", margin: "12px 0px" }}
        >
          {error}
        </label>
        <br />
        <label className="helper-text" htmlFor="">
          email
        </label>
        <input
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="authentication-input"
          type="email"
          placeholder="Email"
        />
        <label className="helper-text" htmlFor="">
          password
        </label>
        <input
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="authentication-input"
          type={passwordToggle ? "text" : "password"}
          placeholder="Password"
        />
        <div onClick={passToggle}>
          {passwordToggle ? (
            <PiEyeSlash size="24px" color="#e8e8e890" />
          ) : (
            <PiEye size="24px" color="#e8e8e890" />
          )}
        </div>
        <h4 style={{ color: "#4CB944" }}>
          {resetSent === true ? "Password request sent! Check your email." : ""}
        </h4>
        <button
          onClick={toggleAuthType ? login : signup}
          className="authentication-button"
        >
          {toggleAuthType ? "Login" : "Signup"}
        </button>
        <label onClick={toggle} className="authentication-toggle" htmlFor="">
          {toggleAuthType ? "Not a user?" : "Login here"}
        </label>
        <label
          htmlFor=""
          className="forgot"
          onClick={resetSent !== true ? forgot : null}
        >
          Forgot your password?
        </label>
      </form>
    </div>
  );
}
