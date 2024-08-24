import React, { useState, useContext, useEffect, useRef } from 'react';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
} from 'mdb-react-ui-kit';
import { FaSearch, FaMoon, FaRegSun } from "react-icons/fa";
import { IoMoon, IoSunny } from "react-icons/io5";
import { ThemeContext } from './themeContext';
import "./Navbar.css"
import gsap from "gsap";
import { useGSAP } from "@gsap/react";


export default function Navbar({search_input, input_change, search}) {

  const themeRef = useRef(null)
  const {contextSafe} = useGSAP({scope: themeRef})

  const onExclamationAnimation = contextSafe(() => {
    gsap.to(".exclamation", {
      duration: 1,
     opacity: 1
    })
  })

  
  
  
  const [openBasic, setOpenBasic] = useState(false);
  const [themeState, setThemeState] = useState()
  
  const {theme, toggleTheme} =  useContext(ThemeContext)

  // useEffect(() => {
  //   const storedTheme = localStorage.getItem('theme');
  //   if (storedTheme) {
  //     try {
  //       const parsedTheme = JSON.parse(storedTheme);
  //       toggleTheme(parsedTheme); // Set the theme from localStorage
  //     } catch (error) {
  //       console.error('Error parsing stored theme:', error);
  //       // Handle error, e.g., set a default theme
  //       toggleTheme("light")
  //     }
  //   }
  // }, []);

  // useEffect(() => {
  //     localStorage.setItem("theme", JSON.stringify(theme))
  // }, [theme])
  
  console.log(search_input)

  const toggleNav = () => {
    setOpenBasic(prev => !prev)
    onExclamationAnimation()
  }

  function handleSubmit(){
    if (theme) {
      toggleNav()
    } else {
      toggleNav()
    }
  }
  return (
    <MDBNavbar ref={themeRef} expand='lg'>
      <MDBContainer fluid>
        <MDBNavbarBrand className={`navbar-brand-${theme}`} href='#'>TwitStash</MDBNavbarBrand>
        <MDBNavbarToggler
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={toggleNav}
        >
          <label style={theme === "dark" ? {color: "#e8e6e8"} : {color: "#222222"}}>

          <MDBIcon icon='bars' fas />
          </label>
        </MDBNavbarToggler>
        <MDBCollapse navbar open={openBasic}>
          <MDBNavbarNav style={{background: "red !important"}} className='mr-auto mb-2 mb-lg-0'>
            <MDBNavbarItem>
              <MDBNavbarLink className={`nav-link-${theme}`} aria-current='page' href='#'>
                Home
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem >
              <MDBNavbarLink style={theme === "dark" ? {color: "#f6f8f675"} : {color: "#22222275"}} href='#'>Saved</MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem ref={themeRef}ck={toggleTheme}>
              <div style={{display: "flex", flexDirection: "row", alignItems: "center"}} onClick={toggleTheme}>
                {theme === "dark" ? <label>Light Mode <span className="exclamation"><IoSunny/></span></label> : <label>Dark Mode <span className="exclamation"><IoMoon /></span></label>}
                    </div> 
            </MDBNavbarItem>
          </MDBNavbarNav>
          <form onSubmit={search} className='d-flex input-group w-auto'>
            <input value={search_input} onChange={input_change} name="search_input" type='search' className='form-control' placeholder='Type query' aria-label='Search' />
            <MDBBtn onClick={toggleNav} color='dark'><FaSearch /></MDBBtn>
          </form>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}