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
  Typography // Added Typography for the modal text
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home"; // Import HomeIcon
import "../App.css"; // Assuming you have some base styles here

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
  const [openDialog, setOpenDialog] = useState(false); // For Meeting Info Dialog
  const [openPostScheduleDialog, setOpenPostScheduleDialog] = useState(false); // For the new Post-Schedule Dialog
  const [meetingInfo, setMeetingInfo] = useState({
    meetingCode: "",
    meetingLink: "",
  });

  const navigate = useNavigate();

  // State for hover effects
  const [isCardHovering, setIsCardHovering] = useState(false);
  const [isSubmitButtonHovering, setIsSubmitButtonHovering] = useState(false);
  const [isGoToMeetingsButtonHovering, setIsGoToMeetingsButtonHovering] = useState(false);
  const [isGoToMainPageButtonHovering, setIsGoToMainPageButtonHovering] = useState(false);
  const [isHomeButtonHovering, setIsHomeButtonHovering] = useState(false); // New state for home button hover


  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

const handleCopy = (text) => {
  if (navigator.clipboard && window.isSecureContext) {
    // navigator.clipboard works in https or localhost
    navigator.clipboard.writeText(text)
      .then(() => {
        setMessage("Copied to clipboard!");
        setTimeout(() => setMessage(""), 2000);
      })
      .catch(err => {
        console.error("Failed to copy: ", err);
      });
  } else {
    // Fallback for older browsers
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed"; // avoid scrolling
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand("copy");
      setMessage("Copied to clipboard!");
      setTimeout(() => setMessage(""), 2000);
    } catch (err) {
      console.error("Fallback: Oops, unable to copy", err);
    }
    document.body.removeChild(textArea);
  }
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
        meetingType: "Scheduled Meet",
        duration: form.duration,
        userPhone: form.userPhone,
        token: localStorage.getItem("token")  //to get the currently logged-in user Id
      };

      const res = await fetch(`http://localhost:8000/api/v1/meetings/schedule`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });


      if (res.ok) {
        const data = await res.json();
        setMeetingInfo({
          meetingCode: data?.meeting?.meetingCode || "",
          meetingLink: data?.meetingLink || "",
        });
        setOpenDialog(true); // Open the meeting details dialog first
        setForm({
          title: "",
          description: "",
          startTime: "",
          duration: 30,
          userPhone: "",
        });
        setMessage("Meeting scheduled! You can copy details below.");
      } else {
        const errorData = await res.json();
        setMessage(errorData.message || "Something went wrong!");
      }
    } catch (error) {
      setMessage("Something went wrong!");
    }
    setLoading(false);
  };

  // Close handler for the Meeting Details Dialog
  const handleCloseMeetingDetailsDialog = () => {
    setOpenDialog(false);
    setOpenPostScheduleDialog(true); // Open the post-schedule dialog after closing details
  };

  // Close handler for the new Post-Schedule Dialog
  const handleClosePostScheduleDialog = () => {
    setOpenPostScheduleDialog(false);
  };

  const handleGoToScheduledMeetings = () => {
    navigate("/scheduled-meetings");
    setOpenPostScheduleDialog(false);
  };

  const handleGoToMainPage = () => {
    navigate("/home");
    setOpenPostScheduleDialog(false);
  };

  const styles = {
    // --- Card Container & Form
    scheduleContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center', // Changed from 'flex-start' to 'center'
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0d121c 0%, #1a1a2e 50%, #16213e 100%)',
      fontFamily: '"Inter", sans-serif',
      padding: '20px', // Adjusted padding to be uniform
      boxSizing: 'border-box', // Ensure padding is included in width
      overflowY: 'auto', // Keep overflowY auto in case content exceeds viewport height
      position: 'relative', // Added for absolute positioning of the home button
    },
    homeButtonContainer: { // New style for the home button container
      position: 'absolute',
      top: '20px',
      left: '20px',
      zIndex: 10,
    },
    iconButton: { // Style for general icon buttons, used by HomeIcon
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      color: 'white',
      transition: 'background-color 0.3s ease',
      borderRadius: '50%',
      padding: '10px',
    },
    iconButtonHover: { // Hover style for general icon buttons
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    scheduleCard: {
      padding: '40px',
      borderRadius: '20px',
      background: 'rgba(30, 30, 50, 0.8)', // Base background for the card
      boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.18)',
      color: 'white',
      width: '100%',
      maxWidth: '600px', // Increased width of the form
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      animation: 'fadeInUp 0.8s ease-out',
      transition: 'background 0.3s ease-in-out, transform 0.2s ease-in-out', // Added transition for hover
    },
    scheduleCardHover: { // New style for hover effect
      background: 'linear-gradient(135deg, rgba(40, 40, 70, 0.9) 0%, rgba(20, 20, 40, 0.9) 100%)',
      transform: 'translateY(-5px)', // Slight lift on hover
      boxShadow: '0 12px 40px rgba(0, 0, 0, 0.5)',
    },
    cardHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center', // Centered the header
      color: '#FF7700',
      marginBottom: '10px',
      textShadow: '1px 1px 3px rgba(0,0,0,0.5)',
    },
    scheduleForm: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
    },
    label: {
      display: 'flex',
      flexDirection: 'column',
      color: '#e0e0e0',
      fontSize: '16px', // Increased font size for labels
      fontWeight: '600',
      marginBottom: '5px',
      transition: 'color 0.3s',
      ':focusWithin': {
        color: '#FF7700',
      },
    },
    input: {
      width: '100%',
      padding: '12px',
      marginTop: '5px',
      background: 'rgba(255, 255, 255, 0.08)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '8px',
      color: 'white',
      fontSize: '16px',
      transition: 'border-color 0.3s, box-shadow 0.3s',
      ':focus': {
        outline: 'none',
        border: '1px solid #FF7700',
        boxShadow: '0 0 8px rgba(255, 119, 0, 0.5)',
      },
      '::placeholder': {
        color: 'rgba(255, 255, 255, 0.5)',
      },
    },
    textarea: {
      minHeight: '80px',
      resize: 'vertical',
    },
    highlight: {
      color: '#FF7700',
      marginLeft: '4px',
    },
    primaryBtn: {
      padding: '15px',
      borderRadius: '10px',
      background: 'linear-gradient(45deg, #FF7700, #ff9a00)',
      color: 'white',
      fontWeight: 'bold',
      fontSize: '16px',
      border: 'none',
      cursor: 'pointer',
      marginTop: '10px',
      transition: 'transform 0.2s, background 0.3s',
      ':hover': {
        transform: 'translateY(-2px)',
        background: 'linear-gradient(45deg, #ff9a00, #FF7700)',
      },
      ':disabled': {
        background: '#888',
        cursor: 'not-allowed',
        transform: 'none',
      },
    },
    formMessage: {
      marginTop: '15px',
      textAlign: 'center',
      color: '#FF7700',
      fontWeight: 'bold',
      animation: 'slideIn 0.5s ease-out',
    },
    // --- Dialog Styles (for both Meeting Details and Post-Schedule)
    dialogPaper: {
      background: 'rgba(30, 30, 50, 0.9)',
      color: 'white',
      backdropFilter: 'blur(10px)',
      borderRadius: '15px', // Rounded corners for dialog
      border: '1px solid rgba(255, 255, 255, 0.2)',
    },
    dialogTitle: {
      color: '#FF7700',
      textAlign: 'center',
      fontWeight: 'bold',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      paddingBottom: '15px',
      fontSize: '1.5rem',
    },
    dialogContent: {
      paddingTop: '20px',
      backgroundColor: 'transparent',
    },
    textField: {
      marginBottom: '15px',
      '& .MuiInputBase-input': {
        color: 'white',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'rgba(255, 255, 255, 0.3)',
        },
        '&:hover fieldset': {
          borderColor: '#FF7700',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#FF7700',
          boxShadow: '0 0 8px rgba(255, 119, 0, 0.5)',
        },
      },
      '& .MuiInputLabel-root': {
        color: '#e0e0e0',
      },
    },
    iconButtonDialog: { // Specific style for icon buttons in dialogs
      color: '#FF7700',
      transition: 'transform 0.2s',
      ':hover': {
        transform: 'scale(1.1)',
      }
    },
    // --- Post-Schedule Dialog Specific Styles
    postScheduleDialogContent: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '20px',
      padding: '20px',
    },
    postScheduleDialogText: {
      color: '#e0e0e0',
      textAlign: 'center',
      fontSize: '1.1rem',
      marginBottom: '10px',
    },
    postScheduleButton: {
      padding: '12px 25px',
      borderRadius: '8px',
      fontWeight: 'bold',
      fontSize: '16px',
      border: 'none',
      cursor: 'pointer',
      minWidth: '200px', // Ensures consistent button width
      transition: 'transform 0.2s, background 0.3s',
      marginTop: '5px',
    },
    goToMeetingsButton: {
      background: 'linear-gradient(45deg, #FF7700, #ff9a00)', // Orange gradient
      color: 'white',
      ':hover': {
        background: 'linear-gradient(45deg, #ff9a00, #FF7700)',
        transform: 'translateY(-2px)',
      },
    },
    goToMainPageButton: {
      background: 'rgba(255, 255, 255, 0.1)', // Subtle background
      color: '#e0e0e0',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      ':hover': {
        background: 'rgba(255, 255, 255, 0.2)',
        transform: 'translateY(-2px)',
      },
    },
    // --- Keyframes for animations
    keyframes: `
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      @keyframes slideIn {
        from {
          opacity: 0;
          transform: translateX(-20px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
    `,
    // Global styles to ensure page scrolling, embedded in the component
    globalStyles: `
      html, body, #root {
        height: 100%;
        margin: 0;
        padding: 0;
        /* Ensure that no parent of the scheduleContainer has a fixed height that prevents it from scrolling */
        /* If issues persist, check parent components and their CSS for fixed heights or overflow: hidden */
        overflow-y: auto; /* Ensure body and root can scroll */
        -webkit-overflow-scrolling: touch; /* For smooth scrolling on iOS */
      }
    `,
  };

  return (
    <div style={styles.scheduleContainer}>
      {/* Global styles injected into the head */}
      <style>{styles.globalStyles}</style>
      <style>{styles.keyframes}</style> {/* Inject keyframes */}

      {/* Home Button */}
      <div style={styles.homeButtonContainer}>
        <IconButton
          onClick={() => navigate("/home")}
          style={styles.iconButton}
          onMouseEnter={() => setIsHomeButtonHovering(true)}
          onMouseLeave={() => setIsHomeButtonHovering(false)}
          sx={isHomeButtonHovering ? styles.iconButtonHover : {}} // Apply hover style if needed
        >
          <HomeIcon style={{ color: 'white', fontSize: '28px' }} />
        </IconButton>
      </div>

      <div
        style={isCardHovering ? { ...styles.scheduleCard, ...styles.scheduleCardHover } : styles.scheduleCard}
        onMouseEnter={() => setIsCardHovering(true)}
        onMouseLeave={() => setIsCardHovering(false)}
      >
        <div style={styles.cardHeader}>
          <Schedule style={{ color: "#ff7a00", marginRight: 8, fontSize: '30px' }} />
          <h2>Schedule a Meeting</h2>
        </div>
        <form style={styles.scheduleForm} onSubmit={handleSubmit}>
          {/* Meeting title */}
          <label style={styles.label}>
            Meeting Title
            <input
              required
              name="title"
              value={form.title}
              onChange={handleChange}
              type="text"
              placeholder="E.g. Team Sync"
              style={styles.input}
            />
          </label>
          {/* Description */}
          <label style={styles.label}>
            Description
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Add notes or agenda"
              style={{ ...styles.input, ...styles.textarea }}
            />
          </label>
          {/* Start Time */}
          <label style={styles.label}>
            Start Time
            <input
              required
              name="startTime"
              value={form.startTime}
              onChange={handleChange}
              type="datetime-local"
              style={styles.input}
            />
          </label>
          {/* Duration */}
          <label style={styles.label}>
            Duration (mins)
            <input
              name="duration"
              type="number"
              min={5}
              max={180}
              value={form.duration}
              onChange={handleChange}
              style={styles.input}
            />
          </label>
          {/* User Phone */}
          <label style={styles.label}>
            Your Phone
            <input
              required
              name="userPhone"
              value={form.userPhone}
              onChange={handleChange}
              type="tel"
              placeholder="e.g. +919999999999"
              style={styles.input}
            />
          </label>
          <button
            disabled={loading}
            type="submit"
            style={{ ...styles.primaryBtn, ...(isSubmitButtonHovering && styles.primaryBtn[':hover']) }}
            onMouseEnter={() => setIsSubmitButtonHovering(true)}
            onMouseLeave={() => setIsSubmitButtonHovering(false)}
          >
            {loading ? "Scheduling..." : "Schedule Meeting"}
          </button>

          {message && <div style={styles.formMessage}>{message}</div>}
        </form>
      </div>

      {/* Meeting Details Dialog - Appears after successful schedule */}
      <Dialog
        open={openDialog}
        onClose={handleCloseMeetingDetailsDialog} // Changed handler
        PaperProps={{ style: styles.dialogPaper }}
      >
        <DialogTitle style={styles.dialogTitle}>Meeting Scheduled Successfully!</DialogTitle>
        <DialogContent dividers style={styles.dialogContent}>
          <Typography variant="h6" align="center" style={{ color: '#FF7700', marginBottom: 8 }}>
            Share SmileMeet
          </Typography>
          <Typography variant="body2" align="center" style={{ marginBottom: 12 }}>
            Invite others to connect with you on <b>SmileMeet</b>.<br />
            Fast, secure & joyful video calling for friends, family, and teams.
          </Typography>

          <TextField
            label="Meeting Code"
            value={meetingInfo.meetingCode}
            fullWidth
            InputProps={{
              readOnly: true,
              endAdornment: (
                <IconButton onClick={() => handleCopy(meetingInfo.meetingCode)} style={styles.iconButtonDialog}>
                  <ContentCopy />
                </IconButton>
              ),
            }}
            margin="normal"
            variant="outlined"
            sx={styles.textField} // Apply MUI specific styling
          />
          <TextField
            label="Meeting Link"
            value={meetingInfo.meetingLink}
            fullWidth
            InputProps={{
              readOnly: true,
              endAdornment: (
                <IconButton onClick={() => handleCopy(meetingInfo.meetingLink)} style={styles.iconButtonDialog}>
                  <ContentCopy />
                </IconButton>
              ),
            }}
            margin="normal"
            variant="outlined"
            sx={styles.textField} // Apply MUI specific styling
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseMeetingDetailsDialog} style={{ color: '#FF7700' }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* New Post-Schedule Navigation Dialog */}
      <Dialog
        open={openPostScheduleDialog}
        onClose={handleClosePostScheduleDialog}
        PaperProps={{ style: styles.dialogPaper }}
      >
        <DialogTitle style={styles.dialogTitle}>Where to next?</DialogTitle>
        <DialogContent style={styles.postScheduleDialogContent}>
          <Typography style={styles.postScheduleDialogText}>
            Your meeting is set! What would you like to do now?
          </Typography>
          <button
            onClick={handleGoToScheduledMeetings}
            style={{ ...styles.postScheduleButton, ...styles.goToMeetingsButton, ...(isGoToMeetingsButtonHovering && styles.goToMeetingsButton[':hover']) }}
            onMouseEnter={() => setIsGoToMeetingsButtonHovering(true)}
            onMouseLeave={() => setIsGoToMeetingsButtonHovering(false)}
          >
            Go to Scheduled Meetings
          </button>
          <button
            onClick={handleGoToMainPage}
            style={{ ...styles.postScheduleButton, ...styles.goToMainPageButton, ...(isGoToMainPageButtonHovering && styles.goToMainPageButton[':hover']) }}
            onMouseEnter={() => setIsGoToMainPageButtonHovering(true)}
            onMouseLeave={() => setIsGoToMainPageButtonHovering(false)}
          >
            Go to Home Page
          </button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePostScheduleDialog} style={{ color: '#FF7700' }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}