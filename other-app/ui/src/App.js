import logo from "./logo.svg";
import { Card, Row, Col } from "antd";
import { RiProfileLine } from "react-icons/ri";
import { IoMdTimer } from "react-icons/io";
import { FaPhotoVideo } from "react-icons/fa";
import { FaPerson } from "react-icons/fa6";

import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Feed from "./Feed";

function App() {
  const [array, setArray] = useState([]);
  const [username, setUsername] = useState("");
  function getUser(e) {
    e.preventDefault();
    axios({
      method: "POST",
      url: "http://localhost:4200/",
      data: {
        username: username || "Dennys",
        // limit: 100,
      },
      headers: {
        "Access-Control-Allow-Origin": true,
      },
    })
      .then((user) => {
        // setArr(user.data.results);
        console.log(user.data.results)
      })
      .catch((error) => {
        console.log(error);
      });
    // setVideoArr(arr.map((i) => i.video_url));
    // setVideoUrls(videoArr.filter((url) => Array.isArray(url)));
  }
  return (
    // <div className="App">
    //   <form onSubmit={getResults}>
    //     <input
    //       type="text"
    //       value={query}
    //       onChange={(e) => setQuery(e.target.value)}
    //     />
    //     <button type="submit">Submit</button>
    //   </form>
    //   {array.map((point) => (
    //     <Card key={point.title}>
    //       <Card.Grid style={{background: "#444444", border: "none"}}>
    //         <a style={{display: "flex", flexDirection: "row", alignItems: "center", color: "#C6D4E1 "}} href={point.profile.url}>
    //         <FaPerson size="24px" />

    //           <label>
    //           {point.profile.name}

    //           </label>
    //           </a>
    //       </Card.Grid>
    //       <Card.Grid style={{background: "#444444"}}>
    //         <a style={{display: "flex", flexDirection: "row", alignItems: "center", color: "#D8E2DC"}} target="_blank" href={point.url}>
    //           <FaPhotoVideo size="24px" />
    //           <label style={{paddingLeft: 10}}>{point.title}</label>
    //         </a>
    //       </Card.Grid>
    //       <Card.Grid style={{background: "#444444"}}>
    //         <div style={{display: "flex", flexDirection: "row", alignItems: "center", color: "#F2D9D9"}}>

    //         <IoMdTimer size="24px" />
    //         <label style={{paddingLeft: 10}}>
    //         {point.duration}
    //         </label>
    //         </div>
    //         </Card.Grid>
    //     </Card>
    //   ))}
    // </div>
    <>
    <Feed />
    </>
  );
}

export default App;
