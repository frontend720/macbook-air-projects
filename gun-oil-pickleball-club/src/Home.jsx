import React, { useState, useRef, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import "./Home.css";
import {  GoPlus } from "react-icons/go";
import { MdOutlineNavigateNext } from "react-icons/md";
import Loading from "./Loading";
import CardContainer from "./CardContainer";

axios.defaults.headers.common["ngrok-skip-browser-warning"] = true;

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [posts, setPosts] = useState([]);
  const [continuationId, setContinuationId] = useState();
  const [error, setError] = useState("Search for a user to see their posts");
  const [isFetching, setIsFetching] = useState(false);
  const [collection, setCollection] = useState([]);

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
        if (data.data && data.data?.results) {
          setPosts(data.data?.results);
          setContinuationId(data.data?.continuation_token);
          if (data.data?.results) {
            localStorage.setItem("users", JSON.stringify(collection));
          }
          setIsFetching(false);
        } else {
          setPosts([]);
          setError("This user is private or doesn't exist.");
        }
        setCollection((prev) => [...prev, username]);
      })
      .catch((error) => {
        console.log(error.message);
        if (error.response?.status === 400) {
          setError(
            "User not found. Please try searching for a different username."
          );
        } else {
          console.error(error);
          setError("An unexpected error occurred. Please try again later.");
        }
      });
    setIsFetching(true);
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
        if (data.data && data.data.results) {
          setPosts(data.data.results);
          setContinuationId(data.data.continuation_token);
        } else {
          setPosts("No User");
        }
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
    setError("Search for a user to see their posts");
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <div style={isVisible ? {position: "fixed", minWidth: "100%"} : {position: "relative"}}>
      <Navbar
        // select={retrieveUser(username)}
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
            {error}
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
