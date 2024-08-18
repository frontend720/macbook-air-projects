import React, { useState, useRef } from "react";
import { Card } from "./Components";
import { GoHeart, GoHeartFill } from "react-icons/go";
import "./CardContainer.css"

export default function CardContainer({
  username,
  timestamp,
  text,
  userimage,
  postimage,
  video,
  type,
   color,
   videoStyle,
   imageStyle,
   submit,
   poster,
   keys
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [isSaved, setIsSaved] = useState(true);
  const [expandImage, setExpandImage] = useState(true);
  const cardVisiblityRef = useRef(null);

  function handleChange() {
    setIsVisible((prev) => !prev);
  }

  function saved() {
    setIsSaved((prev) => !prev);
  }

  function imageToggle() {
    setExpandImage((prev) => !prev);
  }

  return (
    <Card
    color={color}
    onSubmit={submit}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        key={keys}
      >
        {/* Start user info container  */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {/* Start Profile Image */}
          <img src={userimage} alt="" />
          {/* End Profile Image */}
          {/* Start user info */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: 6,
              marginBottom: 10,
            }}
          >
            <label style={{ fontWeight: "700" }}>{username}</label>
            <small htmlFor="">{timestamp}</small>
          </div>
          {/* End user info */}
        </div>
        <button
          style={{ background: "transparent", border: "none" }}
          onClick={saved}
        >
          {isSaved ? (
            <GoHeart size="18px" color="#555555" />
          ) : (
            <GoHeartFill color="red" size="18px" />
          )}
        </button>
      </div>
      {/* End user info container */}
      {/* Start media container */}
      <div>
        <div  onClick={imageToggle}>

        <video className={expandImage ? "video" : "video-opened"} style={videoStyle}  width="100%" controls={expandImage ? true : false} poster={poster}>
          <source src={video} type={type} />
        </video>
        </div>
        <img
          onClick={imageToggle}
          style={imageStyle}
          className={expandImage ? "post-image" : "post-image-closed"}
          src={postimage}
          alt={text}
        />
        <label>{text}</label>
      </div>
      {/* End media Container */}
    </Card>
  );
}
