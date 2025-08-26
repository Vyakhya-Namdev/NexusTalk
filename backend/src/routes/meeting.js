import express from "express";
import { scheduleMeeting, getMeetings, clearAllMeetings } from "../controllers/meetingController.js";

const router = express.Router();

router.post("/schedule", scheduleMeeting);
router.get("/", getMeetings);
router.delete("/clear", clearAllMeetings);

export default router;