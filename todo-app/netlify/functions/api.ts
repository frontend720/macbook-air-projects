// YOUR_BASE_DIRECTORY/netlify/functions/api.ts

import  express  from "express";
import serverless from  "serverless-http";
import todoRouter  from "../../todoRouter"

const api = express();

const router = express.Router();


api.use("/api/", todoRouter);

export const handler = serverless(api);
