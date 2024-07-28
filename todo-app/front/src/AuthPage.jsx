import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import auth from "./config";
import "./Auth.css";

export default function AuthPage() {

  const [togglePassword, setTogglePassword] = useState(true);
  const [authToggle, setAuthToggle] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function passwordToggle() {
    setTogglePassword((prev) => !prev);
  }

  function toggle() {
    setAuthToggle((prev) => !prev);
  }

  function signup(e) {
    e.preventDefault();
    const createRef = createUserWithEmailAndPassword(auth, email, password);
    createRef
      .then((user) => {
        if (!user.user.uid) {
          console.log("Error signing up. try again");
        } else {
          console.log(user.user.uid);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function login(e) {
    e.preventDefault();
    const createRef = signInWithEmailAndPassword(auth, email, password);
    createRef
      .then((user) => {
        if (!user.user.uid) {
          console.log("Error logging into app");
        } else {
          console.log(user.user.uid);
        }
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className="auth_container">
      <form onSubmit={authToggle ? login : signup} className="auth_form" action="">
        <h1>Todo App</h1>
        <input
          className="auth_input"
          placeholder="Email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
        />
        <input
          type={togglePassword ? "password" : "text"}
          className="auth_input"
          placeholder="Password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label
          onClick={passwordToggle}
          className="toggle_password_btn"
          htmlFor=""
        >
          Show Password
        </label>
        <button className="auth_btn">{authToggle ? "Login" : "Signup"}</button>
      </form>
      <div style={{ width: "30%", margin: "0 auto", minWidth: 300 }}>
        <p style={{ fontWeight: 800 }} onClick={toggle}>
          {authToggle ? "Signup Now." : "Login Here."}
        </p>
      </div>
    </div>
  );
}
