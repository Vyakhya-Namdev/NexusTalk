import 'dotenv/config';  //import and install 'dotenv' to connect with database

import express from "express";
import { createServer } from "node:http";
import mongoose from "mongoose";
import cors from "cors";
import { connectToSocket } from './controllers/socketManager.js';
import userRoutes from "./routes/user.js";

const app = express();
const uri = process.env.MONGO_URL;  //fetch the DB url from '.env' file
app.set("port", (process.env.PORT || 8000));
app.use(cors());
app.use(express.json({limit: "40kb"}));
app.use(express.urlencoded({ limit: "40kb", extended: true }));


//creating websocket for server
const server = createServer(app);
const io = connectToSocket(server);

app.get("/home", (req, res) => {
    return res.send("Hello World!");
})

server.listen(app.get("port"), () => {
    mongoose.connect(uri)       //connect with DB
        .then(() => console.log("MongoDB connected successfully"))
        .catch((err) => console.error("MongoDB connection error:", err));
    console.log("Listening on PORT 8000");
})