import 'dotenv/config';  //import and install 'dotenv' to connect with database

import express from "express";
import { createServer } from "node:http";
import mongoose from "mongoose";
import cors from "cors";
import { connectToSocket } from './controllers/socketManager.js';
import userRoutes from "./routes/user.js";
import meetingRoutes from "./routes/meeting.js";
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
//creating websocket for server
const server = createServer(app);
const io = connectToSocket(server);

const uri = process.env.MONGO_URL;  //fetch the DB url from '.env' file
app.set("port", (process.env.PORT || 8000));
app.use(cors());
app.use(express.json({limit: "40kb"}));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/meetings", meetingRoutes);
server.listen(app.get("port"), () => {
    mongoose.connect(uri)       //connect with DB
        .then(() => console.log("MongoDB connected successfully"))
        .catch((err) => console.error("MongoDB connection error:", err));
    console.log("Listening on PORT 8000");
})