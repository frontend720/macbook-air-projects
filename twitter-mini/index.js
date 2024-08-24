const express = require("express")
const app = express()
const morgan = require("morgan")
const cors = require("cors")
require("dotenv").config()

app.use(morgan('dev'))
app.use(express.json())
app.use(cors())
app.use(cors({
    origin: "*"
}))

app.use("/", require("./router"))

app.listen(4200, ()=>{
    console.log("Connected to server on port 4200")
})
