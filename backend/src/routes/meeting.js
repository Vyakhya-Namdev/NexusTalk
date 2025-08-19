import express from "express";
import { scheduleMeeting, getMeetings } from "../controllers/meetingController.js";

const router = express.Router();

router.post("/schedule", scheduleMeeting);
router.get("/", getMeetings);

export default router;