import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Schedule, ContentCopy } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  TextField,
} from "@mui/material";
import "../App.css";

export default function ScheduleMeeting() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    startTime: "",
    duration: 30,
    userPhone: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [meetingInfo, setMeetingInfo] = useState({
    meetingCode: "",
    userId: "",
    meetingLink: "",
  });

  const [showPostDialogBtn, setShowPostDialogBtn] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      let startTimeISO = "";
      if (form.startTime) {
        const d = new Date(form.startTime);
        if (!isNaN(d)) {
          startTimeISO = d.toISOString();
        } else {
          setMessage("Invalid Start Time!");
          setLoading(false);
          return;
        }
      }

      const payload = {
        title: form.title,
        description: form.description,
        startTime: startTimeISO,
        duration: form.duration,
        userPhone: form.userPhone,
      };

      const res = await fetch("http://localhost:8000/api/v1/meetings/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = await res.json();
        setMeetingInfo({
          meetingCode: data?.meeting?.meetingCode || "",
          userId: data?.meeting?.user_id || "",
          meetingLink: data?.meetingLink || "",
        });
        setOpenDialog(true);
        setForm({
          title: "",
          description: "",
          startTime: "",
          duration: 30,
          userPhone: "",
        });
        setMessage("Meeting scheduled! You can copy details below.");
        setShowPostDialogBtn(false);
      } else {
        const errorData = await res.json();
        setMessage(errorData.message || "Something went wrong!");
      }
    } catch (error) {
      setMessage("Something went wrong!");
    }
    setLoading(false);
  };

  const handleClose = () => {
    setOpenDialog(false);
    setShowPostDialogBtn(true); // Show the post-popup button when dialog closes
  };

  const handlePostDialogBtn = () => {
    // Toggle between going to Scheduled Meetings or Main Page
    if (window.confirm("Go to Scheduled Meetings? Click Cancel to go to Main Page.")) {
      navigate("/scheduled-meetings");
    } else {
      navigate("/");
    }
    setShowPostDialogBtn(false);
  };

  return (
    <div className="schedule-container">
      <div className="schedule-card">
        <div className="card-header">
          <Schedule style={{ color: "#ff7a00", marginRight: 8 }} />
          <h2>Schedule a Meeting</h2>
        </div>
        <form className="schedule-form" onSubmit={handleSubmit}>
          {/* Meeting title */}
          <label>
            Meeting Title <span className="highlight">*</span>
            <input
              required
              name="title"
              value={form.title}
              onChange={handleChange}
              type="text"
              placeholder="E.g. Team Sync"
            />
          </label>
          {/* Description */}
          <label>
            Description
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Add notes or agenda"
            />
          </label>
          {/* Start Time */}
          <label>
            Start Time <span className="highlight">*</span>
            <input
              required
              name="startTime"
              value={form.startTime}
              onChange={handleChange}
              type="datetime-local"
            />
          </label>
          {/* Duration */}
          <label>
            Duration (mins)
            <input
              name="duration"
              type="number"
              min={5}
              max={180}
              value={form.duration}
              onChange={handleChange}
            />
          </label>
          {/* User Phone */}
          <label>
            Your Phone <span className="highlight">*</span>
            <input
              required
              name="userPhone"
              value={form.userPhone}
              onChange={handleChange}
              type="tel"
              placeholder="e.g. +919999999999"
            />
          </label>
          <button disabled={loading} type="submit" className="primary-btn">
            {loading ? "Scheduling..." : "Schedule Meeting"}
          </button>
          {message && <div className="form-message">{message}</div>}
        </form>
      </div>

      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>Meeting Scheduled Successfully!</DialogTitle>
        <DialogContent dividers>
          <TextField
            label="Meeting Code"
            value={meetingInfo.meetingCode}
            fullWidth
            InputProps={{
              readOnly: true,
              endAdornment: (
                <IconButton onClick={() => handleCopy(meetingInfo.meetingCode)}>
                  <ContentCopy />
                </IconButton>
              ),
            }}
            margin="normal"
          />
          <TextField
            label="User ID"
            value={meetingInfo.userId}
            fullWidth
            InputProps={{
              readOnly: true,
              endAdornment: (
                <IconButton onClick={() => handleCopy(meetingInfo.userId)}>
                  <ContentCopy />
                </IconButton>
              ),
            }}
            margin="normal"
          />
          <TextField
            label="Meeting Link"
            value={meetingInfo.meetingLink}
            fullWidth
            InputProps={{
              readOnly: true,
              endAdornment: (
                <IconButton onClick={() => handleCopy(meetingInfo.meetingLink)}>
                  <ContentCopy />
                </IconButton>
              ),
            }}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {showPostDialogBtn && (
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <button onClick={handlePostDialogBtn} className="primary-btn">
            Go to Scheduled Meetings or Main Page
          </button>
        </div>
      )}
    </div>
  );
}
