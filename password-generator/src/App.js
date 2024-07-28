import Generator from "./Generator";
import Vault from "./Vault";
import Form from "./Form";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
function App() {

  return (
  //  <Generator/>
  <>
  <Navbar />
  <Routes>
    <Route path="/" element={<Generator />} />
    <Route path="/vault" element={<Vault />} />
  </Routes>
  </>
  // <Form />
  );
}

export default App;
