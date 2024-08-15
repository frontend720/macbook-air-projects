import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./feed_styles.css";
import {
  SearchOutlined,
  RedoOutlined,
} from "@ant-design/icons";
import { breakpointsArr } from "./styles/breakpoints";
import { Wrapper, Tile, Button } from "./styles/Components";
import Loading from "./Loading";

axios.defaults.headers.common["ngrok-skip-browser-warning"] = true;

function Feed() {
  let stickyScroll = useRef(null);

  function scroller() {
    if (stickyScroll.current) {
      stickyScroll.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }
  
  const localusername = localStorage.getItem("usernames")
  const [videoArray, setVideoArray] = useState([]);
  const [videoCollections, setVideoCollections] = useState([]);
  const [toggle, setToggle] = useState(false);

  const [username, setUsername] = useState(JSON.parse(localusername) || "");
  console.log(username)
  const [flatArr, setFlatArr] = useState([]);

  const [toggleLoading, setToggleLoading] = useState(false)
  const [initialToggle, setInitialToggle] = useState(false)
  const [localUsernames, setLocalUsernames] = useState([])

  console.log(toggleLoading)

  useEffect(() => {
    if(username)
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_URL}`,
      data: {
        username: username,
        // limit: 100,
      },
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((videos) => {
        setVideoArray(videos.data);
        setContinuationId(videos.data.continuation_token);
        setIdArr(videos.data.continuation_token)
        console.log(videos.data);
        setToggle((prev) => !prev);
        setToggleLoading(false)
        setInitialToggle(false)
        if (!localUsernames.includes(username)) {
          const users = []
          setLocalUsernames(username)
          localStorage.setItem("usernames", JSON.stringify(username));
        }
        setTimeout(()=>{
          refresh()
        },250)
      })
      .catch((error) => {
        console.log(error);
      });
  },[])


  function refresh(){
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_URL}/${username}/${continuationId}`,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((videos) => {
        console.log(videos.data);
        setContinueArray(videos.data.results);
        setContinuationId(videos.data.continuation_token);
        console.log(videos.data.continuation_token);
        setToggleLoading(false)
      })
      .catch((error) => {
        console.log(error);
      });
      setToggleLoading(true)
  }
  const strUser  =JSON.parse(localStorage.getItem("usernames"))

  function searchUser(e) {
    e.preventDefault();
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_URL}`,
      data: {
        username: username || JSON.stringify(strUser),
        // limit: 100,
      },
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((videos) => {
        setVideoArray(videos.data);
        setContinuationId(videos.data.continuation_token);
        setIdArr(videos.data.continuation_token)
        setToggle((prev) => !prev);
        setToggleLoading(false)
        setInitialToggle(false)
        if (!localUsernames.includes(username)) {
          const users = []
          setLocalUsernames(username)
          localStorage.setItem("usernames", JSON.stringify(username));
        }
        // Check if the entered username already exists in the collection
        // localUsernames.push(enteredUsername);
        // Update localStorage with the new collection
        // If not found, add the username to the collection
        setTimeout(()=>{
          refresh()
        },250)
        console.log(videos.data);
      })
      .catch((error) => {
        console.log(error);
      });
      setVideoCollections(videoArray);
      setToggleLoading(true)
      setInitialToggle(true)
    }
    
    console.log(JSON.parse(localusername))

  const continueOn = videoArray.map((cont) =>
    cont.continuation_token.toString()
  );
  console.log(continueOn);
  console.log(flatArr);
  const [continuationId, setContinuationId] = useState();
  const [continueArray, setContinueArray] = useState([]);

  const [idArr, setIdArr] = useState([])

  function paginate(e) {
    e.preventDefault();
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_URL}/${username}/${continuationId}`,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((videos) => {
        console.log(videos.data);
        setContinueArray(videos.data.results);
        setContinuationId(videos.data.continuation_token);
        setToggleLoading(false)
        console.log(videos.data.continuation_token);
      })
      .catch((error) => {
        console.log(error);
      });
    scroller();
    scrollToTop();
    setToggleLoading(true)
  }
  console.log(continuationId);
 

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }


  function reset() {
    scrollToTop();
    setContinueArray([]);
    setVideoArray([]);
    setUsername("")
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: breakpointsArr[0].mobileM,
      }}
    >
      {toggleLoading === undefined ? (
        <>
          {" "}
          <form
            style={{ width: breakpointsArr[0].mobileS }}
            onSubmit={searchUser}
            action=""
          >
            <input
              type="text"
              name="query"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button type="submit">Get Videos</button>
          </form>
        </>
      ) : (
        <>{
          toggleLoading === false ? 
        <Wrapper
          padding="32px"
          className="feed-container"
          color="#ffffff"
          width={breakpointsArr[0].mobileM}
          //   fontColor="#333333"
        >
          <form
            ref={stickyScroll}
            className="search-form"
            style={{
              width: breakpointsArr[0].mobileS,
              margin: "20px auto",
              display: "flex",
              justifyContent: "space-between",
              fontSize: 20,
            }}
            onSubmit={searchUser}
            action=""
          >
            <input
              style={{ width: breakpointsArr[0].mobileS }}
              type="text"
              name="query"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="search-input"
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
            />
            <button className="search-btn" type="submit">
              <SearchOutlined />
            </button>
          </form>
          {continueArray.map((tap) => (
            <Tile
              width={breakpointsArr[0].mobileS}
              color="#F2F2F2"
              padding="6px"
              display={toggleLoading === true ? "none" : "block"}
            >
              <div key={tap.tweet_id}>
                <header style={{ width: breakpointsArr[0].mobileS }}>
                  <img src={tap.user.profile_pic_url} alt="" />
                  <div className="header-info">
                    <label className="username">{tap.user.username}</label>
                    <small className="timestamp">
                      {new Date(tap.creation_date).toLocaleString()}
                    </small>
                  </div>
                </header>
                <label>{tap.text}</label>

                <div className="video-grid">
                  {tap.video_url?.length > 0 && (
                    <div
                      style={{ width: breakpointsArr[0].mobileS }}
                      className=""
                    >
                      <section className="">
                        <video
                          autoPlay
                          playsInline
                          muted
                          loop="true"
                          // autoPlay="true"
                          style={{ width: breakpointsArr[0].mobileS }}
                          key={tap.video_url[0].url}
                          controls
                        >
                          <source
                            src={tap.video_url[0].url}
                            type={tap.video_url[0].content_type}
                          />
                        </video>
                      </section>
                    </div>
                  )}
                </div>
                <section style={{ width: breakpointsArr[0].mobileS }}>
                  {tap.media_url?.length > 0 && (
                    <>
                      <img
                        style={{ width: breakpointsArr[0].mobileS }}
                        src={tap.media_url[0]}
                        alt={tap.text}
                      />
                    </>
                  )}
                </section>
              </div>
            </Tile>
          ))}
          <div style={{ width: breakpointsArr[0].mobileS, margin: "0px auto" }}>
            <Button
              
              style={ continueArray.length > 0 ? { width: breakpointsArr[0].mobileS, margin: "0px auto" } : {display: "none"}}
              onClick={paginate}
            >
              Next
            </Button>
            <button
              style={{
                marginTop: 16,
                border: "none",
                background: "transparent",
              }}
              onClick={reset}
            >
              <label htmlFor="" style={{ fontSize: 20 }}>
                <h4 style={{ color: "#ff9f68", fontWeight: "bold" }}>
                  <RedoOutlined size="32px" />
                </h4>
              </label>
            </button>
          </div>
        </Wrapper>
        :
        <Loading />
        }
        </>
      )}
    </div>
  );
}

export default Feed;
