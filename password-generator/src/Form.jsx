import React from 'react'
import { IoLockClosedOutline,IoCloseOutline } from "react-icons/io5";
import { IoMdArrowForward } from "react-icons/io";
import "./Form.css"

export default function Form({webPage, username, password, onUsernameChange, onWebChange, submit, toggleForm}) {
  return (
    <div className="container">
        <form onSubmit={submit} action="" className="form-container">
            <h2 style={{padding: 0, margin: 0, justifyContent: "left", color: "rgb(230, 229, 234)"}}>Add password to vault</h2>
            <input placeholder="Website" className="website-input" type="text" name="password" value={webPage} onChange={onWebChange}/>
            <input placeholder="Username" className="website-input" type="text" name="username" value={username} onChange={onUsernameChange} />
            <div style={{display: "flex", flexDirection: 'row', alignItems: "center"}}> <IoLockClosedOutline color="rgb(230, 229, 234)"/> <label htmlFor="">{password}</label></div>
            <input placeholder='Note' className="website-input" type="text" />
            <button className="submit-btn">
                <label className="btn-text" htmlFor="">
                Submit 

                </label>
                <IoMdArrowForward />
            </button>
        </form>
        <div className="close_container">
            <label style={{textAlign: "right", float: "right", fontSize: 32}} onClick={toggleForm} htmlFor="">
                <IoCloseOutline />
            </label>
        </div>
    </div>
  )
}
