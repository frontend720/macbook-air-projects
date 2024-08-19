import "./App.css";
import { useEffect, useState } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import app from "./config";
import Home from "./Home";
import Authentication from "./Authentication";

function App() {
  const [userObj, setUserObj] = useState();
  const auth = getAuth(app);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUserObj(user);
    });
  }, []);

  return (
    <div className="App">
      {userObj !== null ? <Home /> : <Authentication />}
    </div>
  );
}

export default App;
