const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

require("dotenv").config();

const app = express();
app.use(cors());

app.use(express.json());
app.use(morgan("dev"));

app.use("/employee", require("./Routes/employeeRouter"));
app.use("/", require("./Routes/businessRouter"));

app.listen(4500, () => {
  console.log("Connected on http://localhost:4500");
});
