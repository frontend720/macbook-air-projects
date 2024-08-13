// const express = require("express");
// import 'dotenv/config'
import express from "express";
const videoRouter = express.Router();

// const axios = require("axios");
import axios from "axios";

console.log(process.env.HOST);
console.log(process.env.KEY);

videoRouter.post("/", (req, res) => {
  const videoArray = [];
  axios({
    method: "POST",
    url: `https://${process.env.HOST}/user/tweets`,
    headers: {
      "x-rapidapi-key": process.env.KEY,
      "x-rapidapi-host": process.env.HOST,
      "Content-Type": "application/json",
    },
    data: {
      username: req.body.username,
      include_replies: false,
      include_pinned: false,
    },
  })
    .then((data) => {
      videoArray.push(data.data);
      res.status(200).send(videoArray);
    })

    .catch((error) => {
      res.status(500).send({ message: "Internal server error." });
    });
});

videoRouter.get("/:username/:continuation_token", async (req, res) => {
  const continuation = await axios({
    method: "GET",
    url: `https://${process.env.HOST}/user/tweets/continuation`,
    params: {
      username: req.params.username,
      limit: "40",
      continuation_token: req.params.continuation_token,
      include_replies: "false",
    },
    headers: {
      "x-rapidapi-key": process.env.KEY,
      "x-rapidapi-host": process.env.HOST,
    },
  });
  try {
    const results = continuation;
    res.status(200).send(results.data);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default videoRouter;
