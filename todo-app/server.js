const express = require("express");
const app = express();
const cors = require("cors");
const firebase = require("./config");
const morgan = require("morgan")

app.use(morgan("dev"))

app.use(express.json());
app.use(cors());
app.use(cors({ origin: 'http://localhost:3000' }));

app.use("/", cors(), require("./todoRouter.js"));

app.listen(4500, () => {
  console.log("Server running on port 5999");
});
