import React, { useState, useRef, useEffect } from "react";
import { Card } from "./Components";
import { GoHeart, GoHeartFill } from "react-icons/go";
import ReactPlayer from 'react-player'
import "./CardContainer.css"
import axios from "axios"

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
   keys,
   videoRef,
   loop,
   twitterKey,
  //  isSaved,
   saved,
   save,
   media,
  
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [isSaved, setIsSaved] = useState(true);
  const [expandImage, setExpandImage] = useState(true);
  const cardVisiblityRef = useRef(null);

const postArr = []

  postArr.push(video, username, keys, postimage, timestamp)
// console.log(postArr)
const collectionArr = []
collectionArr.push(postArr)
// console.log(collectionArr)

  const [mediaArr, setMediaArr] = useState([])
  const [object, setObject] = useState({
    video: video,
    image: postimage,
    timestamp: timestamp,
    username: username
  })

  const [data, setData] = useState()

  const [array, setArray] = useState([])

  console.log(mediaArr)

  const twitterKeyRef = useRef(null)

  useEffect(() => {
    twitterKeyRef.current = keys
  }, [keys])

  
  function saveMedia(id){
    setIsSaved(prev => !prev)    
    const filter = mediaArr.filter((item) => item?.key === twitterKeyRef)
    // console.log(filter) 
    console.log(
      filter.map((item) => ({
        imageURL: item?.imageURL, // Optional chaining
        videoURL: item?.videoURL, // Optional chaining
        timestamp: item?.timestamp, // Optional chaining
        username: item?.username, // Optional chaining
      })),
       "HI"
    );
  }

  console.log(data)

  function handleChange() {
    setIsVisible((prev) => !prev);
  }

  console.log(twitterKeyRef)

 
  
  function imageToggle() {
    setExpandImage((prev) => !prev);
  }

  // console.log(postimage)

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
     <input type="text" ref={twitterKey} style={{display: "none"}}/>
          <button
          
            style={{ background: "transparent", border: "none" }}
            onClick={saveMedia}
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

        <video loop="true" ref={videoRef} playsInline autoPlay muted preload="metadata" type="video/mp4" style={videoStyle}  width="100%" controls={expandImage ? true : false} poster={poster}>
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
      {array}
    </Card>
  );
}
