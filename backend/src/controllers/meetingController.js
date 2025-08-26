import { nanoid } from 'nanoid';
import { Meeting } from "../models/meetingModel.js";
import { User } from "../models/userModel.js";

console.log('Meeting import value:', Meeting);

export const scheduleMeeting = async (req, res) => {
  try {
    const { title, description, startTime, duration, userPhone, token } = req.body;

    //finding user from token
    const user = await User.findOne({ token });
    if(!user){
      return res.status(401).json({ success: false, message: "Invalid Token" });
    }

    console.log('Incoming body:', req.body);
    console.log('Meeting import at controller:', Meeting);

    const user_id = user.username;
    const meetingCode = nanoid(6).toUpperCase();

    const meeting = new Meeting({
      user_id,
      meetingCode,
      title,
      description,
      startTime,
      duration,
      userPhone,
    });
    
    // console.log(meeting);
    await meeting.save();

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

export const clearAllMeetings = async (req, res) => {
  try {
    await Meeting.deleteMany({});
    res.status(200).json({ success: true, message: "All meetings cleared successfully" });
  } catch (error) {
    console.error("Clear Meetings Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
