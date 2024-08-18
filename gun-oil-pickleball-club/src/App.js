import "./App.css";
import { useEffect, useState } from "react";

import breakpoints from "./breakpoints.json";
import Navbar from "./Navbar";
import Home from "./Home"

function App() {
  // const screenSize = 600;

  const [screenWidth, setScreenWidth] = useState(window.screenWidth);
  const [screenSize, setScreenSize] = useState(0);

  useEffect(() => {
    // setScreenWidth()
    setScreenWidth(
      window.addEventListener("resize", () => {
        const innerWidth = window.innerWidth;
        setScreenSize(innerWidth);
        console.log(innerWidth);
      })
    );
  }, [screenSize]);

  console.log(screenSize);

  return (
    <div className="App">
      {/* <Navbar title="X Deck" username="Big_cb3000"/> */}
      <Home username="TTTripleHaze" />
      <header
        className="App-header"
      >
        <div>
          <h1>{screenSize}</h1>
        </div>
      </header>
    </div>
  );
}

export default App;
