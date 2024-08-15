import React, {useState} from 'react'
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth"
import {} from "antd"
import { Tile, Wrapper, Button } from './styles/Components'
import { breakpointsArr } from "./styles/breakpoints";
import { FaGoogle } from "react-icons/fa";
import "./Authentication.css"

export default function Authentication() {


    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    function signup(){
        const signupReference = createUserWithEmailAndPassword()
    }

  return (
    <div>
        <Tile
         width={breakpointsArr[0].mobileS}
         color="transparent"
         border="4px solid #333333"
         padding="6px"
        >
            <h3>Pocket Posty</h3>
            <form className="authentication-form" action="">
                <input placeholder="Email" className="auth-input" type="text" />
                <input placeholder="Password" className="auth-input" type="text" />
                <button className="auth-email-button">
                    Signup
                </button>
                <label className="toggle-input" htmlFor="">Login Here</label>
            </form>
        </Tile>
        <Button
        style={{margin: "0px auto", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center"}}
         width={breakpointsArr[0].mobileS}
         color="#333333"
        >
            <FaGoogle style={{marginRight: 10}} />
            <label htmlFor="">Signup with Google</label>
        </Button>
    </div>
  )
}
