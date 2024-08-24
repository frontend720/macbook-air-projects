const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/", (req, res) => {
  const videoArr = [];
  const searchRequest = axios({
    method: "POST",
    url: `https://${process.env.HOST}/user/tweets`,
    headers: {
      "x-rapidapi-key": process.env.KEY,
      "x-rapidapi-host": process.env.HOST,
      "Content-Type": "application/json",
    },
    data: {
      username: req.body.username,
      include_replies: req.body.replies,
      include_pinned: req.body.pinned,
    },
  });
  searchRequest
    .then((data) => {
      if (!req.body.username) {
        res.status(400).send({ message: "Missing parameter: username." });
      } else {
        res.status(200).send(data.data);
      }
    })
    .catch((error) => {
      res.status(500).send({
        message:
          "Something went wrong on our end. We apologize for the inconvenience.",
      });
    });
});

router.get("/:username/:token", async (req, res) => {
  const continuationReference = await axios({
    method: "GET",
    url: `https://${process.env.HOST}/user/tweets/continuation`,
    params: {
      username: req.params.username,
      continuation_token: req.params.token,
      limit: "40",
      include_replies: false,
    },
    headers: {
      "x-rapidapi-key": process.env.KEY,
      "x-rapidapi-host": process.env.HOST,
    },
  });
  try {
    if (!req.params.username && !req.params.token) {
      res
        .status(400)
        .send({ message: "Missing required parameter: username & token" });
    } else {
        const results = continuationReference;
        res.status(200).send(results.data);
    }
  } catch (error) {
    res.status(500).send({
      message:
        "Something went wrong on our end. We apologize for the inconvenience.",
    });
  }
});

module.exports = router;