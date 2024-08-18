const express = require("express");
const cors = require("cors");
const app = express();
const morgan = require("morgan")("dev")
require("dotenv").config()


app.use(express.json());
app.use(cors());
app.use(cors({ origin: '*' }));

app.use(morgan)
app.use("/", cors(), require("./xRouter"))
app.use("/collection", require('./collectionRouter'))

app.listen(6200, () => {
  console.log("Connected to the server");
});
