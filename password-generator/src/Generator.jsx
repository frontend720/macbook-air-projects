import { useState, useEffect } from "react";
import generator from "generate-password-browser";
import { IoCopyOutline } from "react-icons/io5";

import { GrSave } from "react-icons/gr";
import "./Generator.css";
import Form from "./Form";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import moment from "moment"

import app from "./config";
import Vault from "./Vault";


function Generator() {
  const db = getFirestore(app);

  const [characters, setCharacters] = useState(8);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [uppercase, setUppercase] = useState(true);
  const [feedback, setFeedback] = useState();
  const [display, setDisplay] = useState(5000);

  const [toggleSaveForm, setToggleSaveForm] = useState(false);

  const [username, setUsername] = useState("");
  const [website, setWebsite] = useState("");

 

  function characterLength(e) {
    setCharacters(Number(e.target.value));
  }

  useEffect(() => {
    const password = generator.generate({
      length: characters,
      numbers: numbers,
      symbols: symbols,
      lowercase:
      uppercase === false && symbols === false && numbers === false
      ? true
      : lowercase,
      uppercase: uppercase,
      excludeSimilarCharacters: false,
      strict: false,
    });
    setPasswordStr(password)
  }, [characters, numbers, symbols, lowercase, uppercase])

  const [passwordStr, setPasswordStr] = useState()

  function savePassword(e) {
    const id = uuidv4()
    localStorage.setItem("id", JSON.stringify(id))
    e.preventDefault();
    const passwordReference = setDoc(doc(db, "passwords",(id)), {
      password: passwordStr,
      username: username,
      website: website,
      createdOn: moment().format("MMM Do YY")
    });
    passwordReference
      .then((pass) => {
        console.log(pass);
        setPasswordStr(passwordStr)
      })
      .catch((error) => {
        console.log(error);
      });
  }



  // useEffect(() => {
  //   console.log(password);
  // }, [characters, numbers, symbols, lowercase, uppercase]);

  function toggleNumbers() {
    setNumbers((prev) => !prev);
  }

  function toggleSymbols() {
    setSymbols((prev) => !prev);
  }

  function toggleLowerCase() {
    setLowercase((prev) => !prev);
  }

  function toggleUppercase() {
    setUppercase((prev) => !prev);
  }

  function copyToClipboard() {
    navigator.clipboard
      .writeText(passwordStr)
      .then(() => {
        setFeedback("Copied to clipboard!");
        displayFeedback();
      })
      .catch((error) => {
        setFeedback("Unable to copy. Try again.");
      });
  }

  let content;
  if (characters <= 10) {
    content = <div className="weak">Weak</div>;
  } else if (characters > 10 && characters <= 16) {
    content = <div className="moderate">Moderate</div>;
  } else {
    content = <div className="strong">Strong</div>;
  }

  function displayFeedback() {
    const timeoutId = setTimeout(() => {
      setFeedback("");
    }, display);
    setDisplay(5000);

    return () => clearTimeout(timeoutId);
  }

  function toggleForm() {
    setToggleSaveForm((prev) => !prev);
  }

  return (
    <>
      {!toggleSaveForm ? (
        <div className="container">
          <h1 className="title">Password Generator</h1>
          <div className="copy-container">
            <h1 className="password-result">
              {!passwordStr ? "Must select 1 or more rules" : passwordStr}
            </h1>
            <h2 onClick={copyToClipboard}>
              <IoCopyOutline />
            </h2>
          </div>
          <div className="feedback-container">
            <label
              className="clipboard-feedback"
              style={
                display.length === 0 ? { display: "none" } : { display: "" }
              }
            >
              {feedback}
            </label>
          </div>
          <form className="generator-form">
            <div className="character-length">
              <p>Character Length</p>
              <h1 className="characters">{characters}</h1>
            </div>
            <input
              onChange={characterLength}
              value={characters}
              min="8"
              max={20}
              name="characters"
              className="range"
              type="range"
              // step="20"
            />
            <div className="criteria-container top">
              <input defaultChecked onChange={toggleNumbers} type="checkbox" />
              <label>Include Numbers</label>
            </div>
            <div className="criteria-container">
              <input defaultChecked onChange={toggleSymbols} type="checkbox" />
              <label>Include Symbols</label>
            </div>
            <div className="criteria-container">
              <input
                defaultChecked
                onChange={toggleLowerCase}
                type="checkbox"
              />
              <label>Include Lowercase Characters</label>
            </div>
            <div className="criteria-container">
              <input
                defaultChecked
                onChange={toggleUppercase}
                type="checkbox"
              />
              <label>Include Uppercase Characters</label>
            </div>
            <div className="strength-meter">
              <label className="meter-title">stength</label>
              <label>{content}</label>
            </div>
          </form>
          <div onClick={toggleForm} className="save-button">
            <label className="save-text">
            <GrSave />
            <label htmlFor="">

              Save
            </label>
              </label>
          </div>
        </div>
      ) : (
        <div>
          <Form
            webPage={website}
            username={username}
            onWebChange={(e) => setWebsite(e.target.value)}
            onUsernameChange={(e) => setUsername(e.target.value)}
            submit={savePassword}
            toggleForm={toggleForm}
            password={passwordStr}
          />
        </div>
      )}
      <Vault display={passwordStr} style={{display: "none"}} />
    </>
  );
}

export default Generator;
