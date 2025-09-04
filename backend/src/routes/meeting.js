import express from "express";
import { scheduleMeeting, getMeetings, clearAllMeetings, markAsAttended, getAllMeetings } from "../controllers/meetingController.js";

const router = express.Router();

router.post("/schedule", scheduleMeeting);
router.get("/", getMeetings);
router.delete("/clear", clearAllMeetings);
router.patch("/:id/attend", markAsAttended);
router.get('/allMeetings', getAllMeetings);

export default router;