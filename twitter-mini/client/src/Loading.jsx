import React, { useRef, useState, useContext } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "./Loading.css"
import {v4 as uuidv4} from "uuid"
import {ThemeContext} from "./themeContext"

export default function Loading() {
  const lettersRef = useRef(null);
  const loadingArr = ["J", "u", "s", "t", " ", "C", "h", "i", "l", "l", ".", ".", "."];
  const [color, setColor] = useState()

const {theme} = useContext(ThemeContext)
console.log(theme)



  useGSAP(
    () => {
      gsap.to(lettersRef.current.querySelectorAll(".animated-letter"), 0.05, {
        opacity: 1,
        stagger: 0.15,
        repeat: -1,
        duration: 0.05,
      });
    },
    { scope: lettersRef }
  );

  return (
    <div ref={lettersRef}>
      <div style={{}}>
        {loadingArr.map((letter) => (
          <div className="loading-container" key={uuidv4()}>
            <label style={theme === "dark" ? {color: "#e6e8e6"} : {color: "#222222"}} className="animated-letter">{letter}</label>
          </div>
        ))}
      </div>
    </div>
  );
}