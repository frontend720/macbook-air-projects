import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PiVaultDuotone, PiLockKeyDuotone, PiXBold } from "react-icons/pi";
import { IoMenu } from "react-icons/io5";

import "./Navbar.css";

export default function Navbar() {
  const [navToggle, setNavToggle] = useState(false) ;

  function toggle() {
    setNavToggle((prev) => !prev);
  }

  return (
    <div>
      <div
        style={
          navToggle
            ? { display: "none" }
            : {
                position: "absolute",
                zIndex: 4,
                right: 0,
                padding: 8,
                fontSize: 32,
              }
        }
      >
        <IoMenu onClick={toggle} color="#ffffff" />
      </div>
      <ul
        className={navToggle ? "nav-container" : "nav-container-closed"}
        style={{ position: "absolute", zIndex: 3 }}
      >
        <li onClick={toggle} className="nav-items">
          <Link to="/">
            <PiLockKeyDuotone />
            <label htmlFor="">Generator</label>
          </Link>
        </li>

        <li onClick={toggle} className="nav-items">
          <Link to="/vault">
            <PiVaultDuotone />
            <label htmlFor="">Vault</label>
          </Link>
        </li>
        <li onClick={toggle} style={{ paddingTop: 42 }} className="nav-items">
          <PiXBold />
          <label htmlFor="">Close</label>
        </li>
      </ul>
    </div>
  );
}
