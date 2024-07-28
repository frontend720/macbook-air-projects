const express = require("express");
const todoRouter = express.Router();
const admin = require("firebase-admin");
const firebase = require("./config");
const moment = require("moment");
const { v4 } = require("uuid");

const db = admin.firestore(firebase);

todoRouter.post("/", (req, res) => {
    const date_id =moment().format()
  const note_id = v4();
  const data = {
    creation_at: moment().format("MMMM Do YYYY, h:mm:ss a"),
    todo: req.body.todo,
    todo_id: date_id,
    // isCompleted: req.body.isCompleted || false,
  };
  const todoReference = db.collection(req.body.email).doc(date_id).set(data);
  todoReference
    .then((todo) => {
      if (!req.body.todo) {
        res
          .status(400)
          .send({ message: "Unable to create a todo without and account." });
      } else {
        res.status(200).send(todo.writeTime);
      }
    })
    .catch((error) => {
      res.status(500).send({ message: "Internal server error. Try again." });
    });
});



todoRouter.get("/:email/:todo_id", (req, res) => {
  const todoReference = db
    .collection(req.params.email)
    .doc(req.params.todo_id)
    .get();
  todoReference
    .then((todo) => {
      if (!todo) {
        res.status(400).send({
          message: "Unable to retrieve todo without email and todo ID",
        });
      } else {
        res.status(200).send(todo.data());
      }
    })
    .catch((error) => {
      res.status(500).send({ message: "Internal server error. Try again." });
    });
});

todoRouter.get("/:email", (req, res) => {
  const collectionArr = [];
  const todoCollection = db.collection(req.params.email)
  .orderBy("creation_at", "desc")
  .get();
  todoCollection
    .then((todos) => {
      if (!req.params.email) {
        res
          .status(400)
          .send({ message: "Can't retrieve collection without user ID." });
      } else {
        todos.forEach((todo) => {
          collectionArr.push(todo.data());
        });
        res.status(200).send(collectionArr);
      }
    })
    .catch((error) => {
      res.status(500).send({ message: "Internal server error. Try again" });
    });
});

todoRouter.delete("/:email/:todo_id", (req, res) => {
  const todoReference = db
    .collection(req.params.email)
    .doc(req.params.todo_id)
    .delete();
  todoReference
    .then((todo) => {
      if (!req.params.email && !req.params.todo_id) {
        res
          .status(400)
          .send({ message: "Can't delete todo without user ID and todo ID." });
      } else {
        res.status(200).send(todo.writeTime);
      }
    })
    .catch((error) => {
      res.status(500).send({ message: "Internal server error. Try again." });
    });
});

module.exports = todoRouter;
