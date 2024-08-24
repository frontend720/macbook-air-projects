import React, { useState, useEffect, useContext, useRef } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCarousel,
  MDBCarouselItem,
  MDBBtn,
} from "mdb-react-ui-kit";
import { Avatar } from "@mui/material";
import "./Feed.css";
import { FaRegBookmark, FaBookmark } from "react-icons/fa6";
import Navbar from "./Navbar";
import axios from "axios";
import { ThemeContext } from "./themeContext";
import Loading from "./Loading";
import { Skeleton } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  Thumbs,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { PiDotOutlineFill } from "react-icons/pi";

axios.defaults.headers.common["ngrok-skip-browser-warning"] = true;

export default function Feed() {
  const { theme } = useContext(ThemeContext);
  const [bookmark, setBookmark] = useState(false);
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState("");
  const [token, setToken] = useState("");
  const [expandedImages, setExpandedImages] = useState({});
  const [isSearching, setIsSearching] = useState(false);
  const [isContinuing, setIsContinuing] = useState(false);

  const ellipsesRef = useRef(null);
  const ellipse = [".", ".", "."];

  function imageViewToggle(postId, image) {
    setExpandedImages((prev) => ({
      ...prev,
      [postId]: prev[postId] === image ? null : image,
    }));
  }

  // Search for a user

  function searchUser(e) {
    e.preventDefault();
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_URL}`,
      data: {
        username: query,
        pinned: true,
      },
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((data) => {
        if (data.data && data.data?.results) {
          setPosts(data.data.results);
          setToken(data.data.continuation_token);
          setIsSearching(false);
        } else {
          console.log("Errors in your ways");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    setIsSearching(true);
  }

  function continueSearch(e) {
    e.preventDefault();
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_URL}/${query}/${token}`,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((data) => {
        if (data.data && data.data.results) {
          setPosts(posts.concat(data.data.results));
          setToken(data.data.continuation_token);
          setIsContinuing(false);
        } else if(data.data.continuation_token === setToken) {
          console.log("No more posts")
        } else {
          console.log("no posts");
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
    setIsContinuing(true);
  }

  console.log(posts);

  // Toggla a bookmark
  function toggleBookmark() {
    setBookmark((prev) => !prev);
  }

  const handleUsernameClick = (text) => {
    // Prevent default browser navigation
    console.log(text);

    // Open the external link in a new tab
    window.open(`${text}`, "_blank");
  };

  function handleLinkClick(e){
    e.preventDefault()
    handleUsernameClick()
  }

  return (
    <div className={`feed-container-${theme}`}>
      <Navbar
        search={searchUser}
        search_input={query}
        input_change={(e) => setQuery(e.target.value)}
      />
      <div style={isSearching ? { padding: "48px 6px" } : { padding: "0px" }}>
        <Skeleton round="true" loading={isSearching ? true : false} active />
      </div>
      {posts?.map((post) => (
        <MDBCard
          key={post?.tweet_id}
          style={
            isSearching
              ? { display: "none" }
              : { width: "100%", borderRadius: "0px" }
          }
          className="mb-4"
        >
          <div className={`feed-card-${theme} card-header`}>
            <div className={`feed-card-${theme}`}>
              <Avatar alt="Travis Howard" src={post?.user.profile_pic_url} />
              <label className="username-label" htmlFor="">
                {post?.user.username}
              </label>
            </div>
            <div onClick={toggleBookmark}>
              {bookmark ? <FaBookmark /> : <FaRegBookmark />}
            </div>
          </div>
          {
            <label htmlFor="">
            </label>
          }
          <div>

          {post.media_url?.length && post.media_url?.length === 1 ? (
            <div>
              <MDBCardImage src={post?.media_url[0]} style={{width: "100%"}} />
            </div>
          ) : (
            <div>

            <Swiper
          modules={[Thumbs]}
          spaceBetween={50}
          slidesPerView={1}
          touchMoveStopPropagation
          mousewheel={true}
          // navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          className="mySwiper"
        >
          {post?.media_url?.map((photo) => (
            <SwiperSlide key={post?.tweet_id}>
              <img
                style={{ backgroundSize: "cover", width: "100%" }}
                src={photo}
                alt={photo}
              />
            </SwiperSlide>
          ))}
          <div style={{display: "flex", justifyContent: "center", padding: 6}}>

          {post?.media_url?.map((id)=> (
            <div key={id}>
                <PiDotOutlineFill />
            </div>
          ))}
          </div>
        </Swiper>
            </div>
          )}
          </div>
       
            <iframe
              id="i"
              loading
              muted
              loop
              width="100%"
              height="100%"
              style={
                post.video_url === null &&
                post?.extended_entities?.media.map(
                  (url) => url?.media_url_https
                ) !== null
                  ? { display: "none" }
                  : { display: "" }
              }
              className="frame"
              src={post?.video_url?.[2]?.url}
              title="YouTube video"
              allowFullScreen
            ></iframe>
           
          <iframe
              id="i"
              loading
              muted
              loop
              width="100%"
              height="100%"
              
              className="frame"
              style={post?.video_url?.[2]?.url !== undefined || post?.retweet_status?.video_url?.[2]?.url === undefined ? {display: "none"} : {display: "block"}}
              src={post?.retweet_status?.video_url?.[2]?.url}
              title="YouTube video"
              allowFullScreen
            ></iframe>

          <MDBCardBody className={`feed-card-${theme}`}>
            <label>
              <a
                href={post?.user.text}
                onClick={(event) => handleLinkClick(event, post?.user.text)}
                className="inline-username"
                htmlFor=""
                // style={
                //   post?.user?.profile_pic_url === null
                //     ? { display: "none" }
                //     : { display: "", width: 45, borderRadius: 50 }
                // }
                style={post?.user?.profile_pic_url === null ? {display: "none"} : {display: ""}}
              >
            <img
              style={
                post?.user?.profile_pic_url === null
                  ? { display: "none" }
                  : { display: "", width: 25, borderRadius: 50, marginLeft: 5 }
              }
             
              src={post?.retweet_status?.user?.profile_pic_url === undefined ? post?.user.profile_pic_url :post?.retweet_status?.user?.profile_pic_url}
              // post?.user.profile_pic_url
              alt=""
            />
              </a>
              <img style={post?.binding_values !== null ? {width: 25, borderRadius: 5} : {width: 0}} src={post?.binding_values?.[0]?.value?.image_value?.url} alt="" />
              {post?.text}
            </label>
            <small className="timestamp">
              {new Date(post?.creation_date).toDateString()}
            </small>
          </MDBCardBody>
        </MDBCard>
      ))}
      <MDBBtn
        ref={ellipsesRef}
        onClick={continueSearch}
        style={posts.length === 0 ? { display: "none" } : { display: "block" }}
        className="w-100 mb-5"
        color={theme !== "dark" ? "light" : "dark"}
      >
        {isContinuing ? <Loading /> : <label>Continue</label>}
      </MDBBtn>
    </div>
  );
}
