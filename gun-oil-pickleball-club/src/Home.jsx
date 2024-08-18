import React, { useState, useRef, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import "./Home.css";
import { Card } from "./Components";
import { GoHeart, GoHeartFill, GoPlus } from "react-icons/go";
import { MdOutlineNavigateNext } from "react-icons/md";
import Loading from "./Loading";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import CardContainer from "./CardContainer";
import data from "./data.json";

axios.defaults.headers.common["ngrok-skip-browser-warning"] = true;

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [posts, setPosts] = useState([]);
  const [continuationId, setContinuationId] = useState();
  const [error, setError] = useState();
  const [isFetching, setIsFetching] = useState(false)

  function searchUser(e) {
    e.preventDefault();
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_URL}`,
      data: {
        username: username,
      },
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((data) => {
        setPosts(data.data?.results);
        setContinuationId(data.data?.continuation_token);
        setIsFetching(false)
      })
      .catch((error) => {
        console.log(error.message);
        setError("this is an error");
      });
      setIsFetching(true)
  }

  function handleChange() {
    setIsVisible((prev) => !prev);
  }

  function continueSearch(e) {
    e.preventDefault();
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_URL}/${username}/${continuationId}`,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((data) => {
        setPosts(data.data.results);
        setContinuationId(data.data.continuation_token);
      })
      .catch((error) => {
        console.log(error);
      });
    scrollToTop();
  }

  function newSearch(e) {
    e.preventDefault();
    setPosts([]);
    setUsername("");
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }


  console.log(posts);
  console.log(continuationId);
  console.log(error);

  return (
    <div>
      <Navbar
        name={username}
        onChange={handleChange}
        inputChange={(e) => setUsername(e.target.value)}
        submit={searchUser}
      />
    
        <div
          style={isVisible ? { display: "none" } : { display: "block" }}
          className="feed-container"
        >
          {posts.length === 0 ? (
            <h3
              style={{ margin: "24px auto", color: "#e8e8e8" }}
              className="search"
            >
              Enter a username to search
            </h3>
          ) : (
            ""
          )}
          {posts?.map((post) => (
            <CardContainer
            key={post?.tweet_id}
              timestamp={post?.creation_date}
              username={post?.user.username}
              text={post?.text}
              userimage={post.user?.profile_pic_url}
              videoStyle={
                post.video_url === null
                  ? { display: "none" }
                  : { display: "block" }
              }
              imageStyle={
                post.media_url === null
                  ? { display: "none" }
                  : { display: "block" }
              }
              postimage={post?.media_url}
              video={post.video_url?.map((vid) => vid.url)}
              poster={post.extended_entities?.media.map(
                (url) => url.media_url_https
              )}
              color={post.favorite_count > 100 ? "#222222" : "#333333"}
            />
          ))}
          <div
            className="pagination-container"
            style={posts.length <= 0 ? { display: "none" } : { display: "flex" }}
          >
            <button className="pagination-button" onClick={newSearch}>
              <GoPlus size="20px" />
            </button>
            <button className="pagination-button" onClick={continueSearch}>
              <MdOutlineNavigateNext size="20px" />
            </button>
          </div>
        </div>
    </div>
  );
}
