import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "./Loading.css"
import {v4 as uuidv4} from "uuid"
import randomcolor from "randomcolor"

export default function Loading() {
  const lettersRef = useRef(null);
  const loadingArr = ["L", "o", "a", "d", "i", "n", "g", ".", ".", "."];
  const [color, setColor] = useState()





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
      <div style={{margin: "0px 4em", paddingTop: "6em"}}>
        {loadingArr.map((letter) => (
          <div className="loading-container" key={uuidv4()}>
            <label style={{color: "#333333"}} className="animated-letter">{letter}</label>
          </div>
        ))}
      </div>
    </div>
  );
}
