import mongoose, { Schema } from "mongoose";

const meettingSchema = new Schema({
    // user_id: { type: String },
    // meetingCode: { type: String, unique: true, required: true },
    // date:  { type: Date, default: Date.now, required: true }

    user_id: { type: String, required: true },
    meetingCode: { type: String, unique: true },
    title: { type: String },
    description: { type: String },
    startTime: { type: Date, default: Date.now() },
    meetingType: { type: String, default: "Instant Meet" },
    duration: { type: Number, default: 30 },
    userPhone: { type: String },
    reminderSent: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
})

const Meeting = mongoose.model("Meeting", meettingSchema);
export { Meeting };