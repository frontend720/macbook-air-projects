import React, { useState, useEffect } from "react";
import "./Todo.css";
import sun from "./images/icon-sun.svg";
import axios from "axios";
import { LuLogOut } from "react-icons/lu";
import { signOut, onAuthStateChanged } from "firebase/auth";
import auth from "./config";

export default function TodoPage() {
  axios.defaults.headers.common["ngrok-skip-browser-warning"] = true;

  const [email, setEmail] = useState("");

  const [todo, setTodo] = useState([]);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setEmail(user.uid);
    });
  }, []);

  function logout() {
    signOut(auth)
      .then((obj) => {
        console.log(obj);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const [complete, setComplete] = useState([]);

  const [newTodo, setNewTodo] = useState("");

  const [response, setResponse] = useState();
  const [everything, setEverything] = useState([])

  function createTodo(e) {
    e.preventDefault();
    axios({
      method: "POST",
      url: process.env.REACT_APP_PORT,
      data: {
        todo: newTodo,
        email: email,
      },
    })
      .then((todo) => {
        if (!newTodo) {
          console.log("Unable to create new todo");
        } else {
          setResponse(todo.data);
        }
        setNewTodo("");
        getCompleted();
      })
      .catch((error) => {
        console.log(error.message);
      });
    getCompleted();
    setNewTodo("");
  }

  
  function getCompleted() {
    const id = email.toString();
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_PORT}/${id}`,
    })
    .then((data) => {
      setTodo(data.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }
  
  localStorage.setItem("todos", JSON.stringify(todo))
  const localTodos = localStorage.getItem("todos")

  // todo.push(localTodos)


  console.log(JSON.parse(localTodos))

  function deleteTodo(todoId) {
    const id = email.toString();
   
      axios({
        method: "DELETE",
        url: `${process.env.REACT_APP_PORT}/${id}/${todoId}`,
      })
        .then((todo) => {
          console.log(todo.data);
          setResponse((prev) => {
            if (prev === undefined || !Array.isArray(prev)) {
              return console.log("No todo to delete")
            } else {
              return prev.filter((item) => item.todo_id !== todoId);
            }
          });
          getCompleted();
        })
        .catch((error) => {
          console.log(error);
        });
  }

  useEffect(() => {
    getCompleted();
  }, [email]);

  return (
    <div>
      <header className="header">
        <h1 onClick={logout} style={{ textAlign: "right", color: "#e8e8e8" }}>
          <LuLogOut />
        </h1>
      </header>
      <div className="container">
        <div className="text_container">
          <label>TODO</label>
          <img src={sun} alt="" />
        </div>
        <form onSubmit={createTodo} action="">
          <div className="todo_form" action="">
            <input
              disabled={!newTodo.length < 0 ? true : false}
              className="todo_input"
              placeholder="Create a new todo..."
              type="text"
              name="newTodo"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
            />
          </div>
          <div style={newTodo.length === 0 ? {display: "none"} : {display: ""}} className="btn_container">
            <button
              disabled={newTodo.length>= 5 ? true : false}
              className="todo_button"
            >
              Submit
            </button>
          </div>
        </form>

        <div className="todo_container">
          {todo.map((todo) => (
                <div key={todo.todo_id} className="todos">
                  <p
                    onClick={() => deleteTodo(todo.todo_id)}
                    className="todo_text"
                  >
                    {todo.todo}
                  </p>
                </div>
              ))}
        </div>
        <div style={{ width: "30%", minWidth: 300, margin: "0px auto" }}>
          <small>Click on a todo to delete it.</small>
        </div>
      </div>
    </div>
  );
}
