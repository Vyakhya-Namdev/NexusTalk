import mongoose, { Schema } from "mongoose";

const meettingSchema = new Schema({
    user_id: { type: String },
    meetingCode: { type: String, unique: true, required: true },
    date:  { type: Date, default: Date.now, required: true }
})

const Meeting = mongoose.model("Meeting", meettingSchema);
export { Meeting };