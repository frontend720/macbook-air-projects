import React, { useState, useEffect, useRef } from "react";
import breakpoints from "./breakpoints.json";
import { RiMenu5Line, RiMenu4Line, RiSearchLine } from "react-icons/ri";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "./Navbar.css";

export default function Navbar({
  title,
  username,
  handleChange,
  value,
  name,
  inputChange,
  submit,
}) {
  const [screenWidth, setScreenWidth] = useState(window.screenWidth);
  const [screenSize, setScreenSize] = useState(0);
  const [toggleNav, setToggleNav] = useState(false);

  const container = useRef(null);

  const { contextSafe } = useGSAP({ scope: container });

  console.log(name);

  useEffect(() => {
    setScreenWidth(
      window.addEventListener("resize", () => {
        const innerWidth = window.innerWidth;
        setScreenSize(innerWidth);
        console.log(innerWidth);
      })
    );
  }, [screenSize]);

  const rolloutNav = contextSafe(() => {
    gsap.to(".nav-item", { stagger: 0.25, opacity: 1 });
    setToggleNav(true);
    gsap.to(".container", {
      marginLeft: 0,
      backgroundColor: "#444444",
      color: "#e8e8e8",
      duration: 1,
    });
    gsap.to(".toggle-icon", {
      rotationX: 180,
      fontSize: 5,
      duration: 1.5,
    });
  });

  const rollupNav = contextSafe(() => {
    gsap.to(".nav-item", { stagger: 0.25, opacity: 0 });
    setToggleNav(false);
    gsap.to(".toggle-icon", {
      rotationX: 0,
      duration: 1,
    });
    gsap.to(".container", {
      marginLeft: "-100%",
      backgroundColor: "#444444",
      color: "#e8e8e8",
      duration: 1,
    });
  });

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      submit(event)
    }
  };

  return (
    <div className="nav-container" ref={container}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <p
          className="toggle-icon"
          htmlFor=""
          onClick={toggleNav !== true ? rolloutNav : rollupNav}
          style={
            screenSize < breakpoints[0].tabletM
              ? { display: "flex", color: "#e8e8e8", paddingLeft: 5 }
              : {
                  display: "none",
                }
          }
        >
          {toggleNav === false ? (
            <RiMenu5Line size="20px" />
          ) : (
            <RiMenu4Line size="20px" />
          )}
        </p>
        <input
          name="name"
          value={name}
          onChange={inputChange}
          onKeyDown={handleKeyDown}
          style={{
            width: "100%",
            padding: 4,
            fontSize: 18,
            borderRadius: 25,
            border: "none",
          }}
        />
        <p
          onClick={submit}
          style={{
            marginRight: 12,
            fontWeight: 800,
            color: "#e8e8e8",
            paddingLeft: 10,
          }}
        >
          {/* {title} */}
          <RiSearchLine />
        </p>
      </div>
      <nav
        style={
          screenSize < breakpoints[0].tabletM
            ? { flexDirection: "column" }
            : {
                flexDirection: "row",
              }
        }
        className="container"
      >
        <label onClick={rollupNav} className="nav-item" href="">
          Home{" "}
        </label>
        <label onClick={rollupNav} className="nav-item" href="">
          Products
        </label>
        <label onClick={rollupNav} className="nav-item" href="">
          About
        </label>
        <label onClick={rollupNav} className="nav-item" href="">
          Contact Us
        </label>
        <label onClick={rollupNav} className="nav-item" href="">
          Cart
        </label>
      </nav>
    </div>
  );
}
