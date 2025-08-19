import { nanoid } from 'nanoid';
import { Meeting } from "../models/meetingModel.js";
import twilio from "twilio";
import dayjs from "dayjs";

console.log('Meeting import value:', Meeting);

const client = new twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Helper function to send SMS (can be imported from a shared file)
async function sendSMSReminder(to, meeting, instant = false) {
  try {
    const msg = await client.messages.create({
      body: instant
        ? `📅 Meeting Scheduled: "${meeting.title}" at ${dayjs(meeting.startTime).format("YYYY-MM-DD HH:mm")}`
        : `📅 Reminder: Your meeting "${meeting.title}" starts at ${dayjs(meeting.startTime).format("YYYY-MM-DD HH:mm")}`,
      messagingServiceSid: process.env.TWILIO_MESSAGING_SERVICE_SID,
      to
    });
    console.log(instant ? "✅ Instant SMS sent:" : "✅ Reminder sent:", msg.sid);
  } catch (err) {
    console.error("❌ Twilio Error:", err.message);
  }
}

export const scheduleMeeting = async (req, res) => {
  try {
    const { title, description, startTime, duration, userPhone } = req.body;
    console.log('Incoming body:', req.body);
    console.log('Meeting import at controller:', Meeting);

    const user_id = nanoid(10);
    const meetingCode = nanoid(6).toUpperCase();

    const meeting = new Meeting({
      user_id,
      meetingCode,
      title,
      description,
      startTime,
      duration,
      userPhone
    });

    await meeting.save();

    // Send instant SMS on schedule
    await sendSMSReminder(userPhone, meeting, true);

    // Use your domain for the meeting link
    const meetingLink = `https://meet.smilemeet.com/${meetingCode}`;

    res.status(201).json({ success: true, meeting, meetingLink });
  } catch (error) {
    console.error('ScheduleMeeting Error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find();
    res.status(200).json({ success: true, meetings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};