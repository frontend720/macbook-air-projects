import "./App.css";
import { useEffect, useState } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import app from "./config";
import breakpoints from "./breakpoints.json";
import Navbar from "./Navbar";
import Home from "./Home";
import Authentication from "./Authentication";

function App() {
  // const screenSize = 600;

  const [userObj, setUserObj] = useState();
  const auth = getAuth(app);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUserObj(user);
    });
  }, []);

  console.log(userObj);

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
      {userObj !== null ? <Home /> : <Authentication />}
      <header className="App-header">
        <div>
          <h1>{screenSize}</h1>
        </div>
      </header>
    </div>
  );
}

export default App;
