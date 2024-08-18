import React, {useState} from "react";
import "./Authentication.css";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth} from "firebase/auth"
import { PiEye, PiEyeSlash } from "react-icons/pi";
import app from "./config";

export default function Authentication() {

    const auth = getAuth(app)

    const [toggleAuthType, setToggleAuthType] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordToggle, setPassowrdToggle] = useState(false)

    console.log(app)

    function signup(e){
        e.preventDefault()
        const reference = createUserWithEmailAndPassword(auth, email, password)
        reference.then((user) => {
            if (!email && !password) {
                console.log("Unable to create user without email and password.")
            } else {
             console.log(user.user.email)   
            }
        }).catch((error) => {
            console.log(error.code)
        })
    }

    function login(e){
        e.preventDefault()
        const reference = signInWithEmailAndPassword(auth, email, password)
        reference.then((user) => {
            if (!email && !password) {
                console.log("Unable to login without providing username and password")
            } else {
                console.log(user.user.email)
            }
        }).catch((error) => {
            console.log(error.code)
        })
    }

    function toggle(){
        setToggleAuthType(prev => !prev)
    }

    function passToggle(){
        setPassowrdToggle(prev => !prev)
    }

  return (
    <div className="authentication-container">
      <form className="authentication-form" action="">
        <h1 className="auth-title">Pancake Posts</h1>
        <label className="helper-text" htmlFor="">
          email
        </label>
        <input name="email" value={email} onChange={(e)=>setEmail(e.target.value)}  className="authentication-input" type="email" placeholder="Email" />
        <label className="helper-text" htmlFor="">
          password
        </label>
        <input name="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="authentication-input" type={passwordToggle ? "text" : "password"} placeholder="Password"/>
        <div onClick={passToggle}>
            {passwordToggle ? <PiEyeSlash size="24px" color="#e8e8e890"/> : <PiEye size="24px" color="#e8e8e890"/>}
        </div>
        <button onClick={toggleAuthType ? login : signup} className="authentication-button">
            {toggleAuthType ? "Login" : "Signup"}
        </button>
        <label onClick={toggle} className="authentication-toggle" htmlFor="">{toggleAuthType ? "Not a user?" : "Login here"}</label>
      </form>
    </div>
  );
}
