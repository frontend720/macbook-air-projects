import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./feed_styles.css";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Avatar, Card } from "antd";
import { breakpointsArr } from "./styles/breakpoints";
import { Wrapper, Tile, Button } from "./styles/Components";

function Feed() {
  axios.defaults.headers.common["ngrok-skip-browser-warning"] = true;
  const [videoArray, setVideoArray] = useState([]);
  const [videoCollections, setVideoCollections] = useState([]);
  const [toggle, setToggle] = useState(false);

  const [username, setUsername] = useState("");
  const [flatArr, setFlatArr] = useState([]);
  function searchUser(e) {
    e.preventDefault();
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_URL}`,
      data: {
        username: username || "Dennys",
        // limit: 100,
      },
      headers: {
        "Access-Control-Allow-Origin": true,
      },
    })
      .then((videos) => {
        setVideoArray(videos.data);
        setContinuationId(videos.data.continuation_token);
        setToggle((prev) => !prev);
        console.log(videos.data);
      })
      .catch((error) => {
        console.log(error);
      });
    setVideoCollections(videoArray);
  }
  // console.log(continuationId)
  const continueOn = videoArray.map((cont) =>
    cont.continuation_token.toString()
  );
  console.log(continueOn);
  console.log(flatArr);
  const [continuationId, setContinuationId] = useState();
  const [continueArray, setContinueArray] = useState([]);

  function paginate(e) {
    e.preventDefault();
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_URL}/${username}/${continuationId}`,
      headers: {
        "Access-Control-Allow-Origin": true,
      },
    })
      .then((videos) => {
        console.log(videos.data);
        setContinueArray(videos.data.results);
        setContinuationId(videos.data.continuation_token);
        console.log(videos.data.continuation_token);
        
      })
      .catch((error) => {
        console.log(error);
      });
    setContinuationId("");
    setVideoArray([])
    scrollToTop()
  }
  console.log(continuationId);

  function scrollToTop(){
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", width: breakpointsArr[0].mobileM  }}>
      {continueOn === undefined ? (
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
        <Wrapper
          padding="32px"
          className="feed-container"
          color="#ffffff"
          width={breakpointsArr[0].mobileM }
          //   fontColor="#333333"
        >
          <form
            className="search-form"
            style={{
              width: breakpointsArr[0].mobileS,
              margin: "0px auto",
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
            />
            <button className="search-btn" type="submit">
              <SearchOutlined />
            </button>
          </form>

          {/* <div
        style={{ width: breakpointsArr[0].mobileS }}
        className="card-container"
      >
        <div className="list-container"> */}
          {videoArray?.map((point) =>
            point.results?.map((tap) => (
              <Tile
                width={breakpointsArr[0].mobileS}
                color="#F2F2F2"
                padding="6px"
              >
                <div key={tap.tweet_id}>
                  <header style={{ width: breakpointsArr[0].mobileS, marginBottom: 6 }}>
                    <img style={{paddingRight: 6, borderRadius: 5}} src={tap.user.profile_pic_url} alt="" />
                    <div className="header-info">
                      <label className="username">{tap.user.username}</label>
                      <small className="timestamp">
                        {new Date(tap.creation_date).toLocaleString()}
                      </small>
                    </div>
                  </header>
                  <label>{tap.text}</label>

                  <div style={{marginTop: 6}} className="video-grid">
                    {tap.video_url?.length > 0 && (
                      <div
                        style={{ width: breakpointsArr[0].mobileS }}
                        className=""
                      >
                        <section className="">
                          <video
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
            ))
          )}
          {/* </div>
      </div> */}

          {continueArray.map((tap) => (
            <Tile
              width={breakpointsArr[0].mobileS}
              color="#F2F2F2"
              padding="6px"
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
              style={{ width: breakpointsArr[0].mobileS, margin: "0px auto" }}
              onClick={paginate}
            >
              Next
            </Button>
          </div>
        </Wrapper>
      )}
    </div>
  );
}

export default Feed;
