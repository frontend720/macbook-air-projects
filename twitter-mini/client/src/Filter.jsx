import React from "react";
import data from "./data.json";

export default function Filter() {

    const [username, setUsername] = React.useState("")
// console.log(data)

function getInformation(e){
    e.preventDefault()
    if (data) {
      const information = data.map((tweets) => tweets.results.find(tweet => tweet.user.username === username));
      console.log(information);
    }
  }
  return (
    <div>
        <form action="" onSubmit={getInformation}>

      <input
        type="text"
        name="username"
        value={username}
        onChange={(e)=>setUsername(e.target.value)}
      />
      <button>search</button>
        </form>
    </div>
  );
}
