const express = require("express");
const collectionRouter = express.Router();
const { v4: uuidv4 } = require("uuid");
const admin = require("firebase-admin");
const app = require("./config");

const db = admin.firestore(app);
db.settings({ ignoreUndefinedProperties: true });
console.log(uuidv4());

collectionRouter.post("/", (req, res) => {
  const data = {
    video: req.body.video,
    image: req.body.image,
    username: req.body.username,
    creation_date: req.body.creation_date,
    id: uuidv4(),
  };
  const collectionRef = db
    .collection("users")
    .doc(req.body.email)
    .collection("collection")
    .doc(uuidv4())
    .set(data);
  collectionRef
    .then((data) => {
      if (!data) {
        res.status(400).send({
          message: "Unable to save post without required information.",
        });
      } else {
        res.status(200).send(data.writeTime);
      }
    })
    .catch((error) => {
      res.status(500).send({ message: "Internal server error. Try again." });
    });
});

collectionRouter.get("/:email/:id", (req, res) => {
  const email = req.params.email;
  const postCollection = [];
  const collectionRef = db
    .collection("users")
    .doc(email)
    .collection("collection")
    .get();
  collectionRef
    .then((data) => {
      if (!email) {
        res.status(400).send({ message: "Error" });
      } else {
        data.forEach((data) => {
          postCollection.push(data.data());
        });
        res.status(200).send(postCollection);
      }
    })
    .catch((error) => {
      res.status(500).send({ message: "Internal server error. Try again." });
    });
});

collectionRouter.delete("/:email/:id", (req, res) => {
  const postReference = db
    .collection("users")
    .doc(req.params.email)
    .collection("collection")
    .doc(req.params.id)
    .delete();

  postReference
    .then((post) => {
      if (!req.params.email && !req.params.id) {
        res.status(400).send({
          message: "Unable to delete post without required information",
        });
      } else {
        res.status(200).send(post.writeTime);
      }
    })
    .catch((error) => {
      res.status(500).send({ message: "Internal server error. Try again." });
    });
});

module.exports = collectionRouter;
