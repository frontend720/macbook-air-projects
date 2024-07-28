import {useState, useEffect} from "react"
import { onAuthStateChanged } from "firebase/auth";
import auth from "./config";
import './App.css';
import TodoPage from './TodoPage';
import AuthPage from './AuthPage';

function App() {
  const [uid, setUid] = useState()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUid(user)
    })
  }, [])

  return (
    <>
      {/* <TodoPage /> */}
      {uid !== null ? <TodoPage /> : <AuthPage />}
      
    </>
  );
}

export default App;
