import 'dotenv/config'
import express from "express"
import cors from "cors"
import videoRouter from "./videoRouter.js"

import morgan from "morgan"

const app = express()

app.use(morgan("dev"))
app.use(cors())
app.use(cors({ origin: '*' }));
// app.use(cors({origin: "https://pocket-posty.surge.sh/"}))

app.use(express.json()) 

app.use("/", videoRouter)

app.listen(5400, () => {
    console.log("Server running on port http://localhost:5400")
})
