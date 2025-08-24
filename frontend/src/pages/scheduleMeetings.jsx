import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import HomeIcon from "@mui/icons-material/Home";
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { Dialog, DialogTitle, DialogContent, Button } from "@mui/material"; // Import Dialog components

export default function ScheduledMeetings() {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [openMessageDialog, setOpenMessageDialog] = useState(false); // State for the new message dialog
  const navigate = useNavigate();

  // State for hover effects on buttons
  const [hoveredStartButton, setHoveredStartButton] = useState(null);
  const [hoveredClearButton, setHoveredClearButton] = useState(false);
  const [hoveredHomeButton, setHoveredHomeButton] = useState(false);

  // Inline styles for the component
  const styles = {
    // Global styles for scrolling
    globalStyles: `
      html, body, #root {
        height: 100%;
        margin: 0;
        padding: 0;
        overflow-y: auto; /* Ensure body and root can scroll */
        -webkit-overflow-scrolling: touch; /* For smooth scrolling on iOS */
      }
    `,
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
      padding: '20px',
      fontFamily: '"Inter", sans-serif',
      color: 'white',
      boxSizing: 'border-box',
      position: 'relative',
    },
    homeButtonContainer: {
      position: 'absolute',
      top: '20px',
      left: '20px',
      zIndex: 10,
    },
    iconButton: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      color: 'white',
      transition: 'background-color 0.3s ease',
      borderRadius: '50%',
      padding: '10px',
    },
    iconButtonHover: {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    heading: {
      color: '#FF7700',
      textAlign: 'center',
      marginBottom: '30px',
      fontSize: '2.5rem',
      fontWeight: 'bold',
      textShadow: '2px 2px 6px rgba(0, 0, 0, 0.4)',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginTop: '60px',
    },
    messageBox: { // This style will still exist but won't be directly rendered in JSX
        backgroundColor: 'rgba(255, 119, 0, 0.15)',
        color: '#FF7700',
        padding: '10px 20px',
        borderRadius: '8px',
        margin: '15px 0',
        textAlign: 'center',
        fontWeight: 'bold',
        width: 'fit-content',
        maxWidth: '80%',
        animation: 'fadeIn 0.5s ease-out',
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
    },
    loading: {
      fontSize: '1.2rem',
      padding: '2rem',
      color: '#aaa',
      textAlign: 'center',
    },
    error: {
      fontSize: '1.2rem',
      padding: '2rem',
      color: '#ff4d4d',
      textAlign: 'center',
      backgroundColor: 'rgba(255, 0, 0, 0.1)',
      borderRadius: '8px',
    },
    tableWrapper: {
        width: '100%',
        maxWidth: '1200px',
        overflowX: 'auto',
        borderRadius: '12px',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        backdropFilter: 'blur(5px)',
        border: '1px solid rgba(255, 255, 255, 0.18)',
        backgroundColor: 'rgba(30, 30, 50, 0.8)',
        animation: 'fadeInUp 0.8s ease-out',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      minWidth: '700px',
    },
    th: {
      backgroundColor: '#FF7700',
      color: 'white',
      padding: '1rem',
      fontWeight: 'bold',
      borderBottom: '2px solid #e07b00',
      textAlign: 'left',
      fontSize: '1rem',
    },
    td: {
      padding: '1rem',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      color: 'white',
      fontSize: '0.95rem',
    },
    row: {
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      transition: 'background-color 0.3s ease, transform 0.2s ease',
      ':hover': {
        backgroundColor: 'rgba(255, 119, 0, 0.1)',
        transform: 'scale(1.01)',
      }
    },
    expiredRow: {
      backgroundColor: 'rgba(200, 200, 200, 0.03)',
      color: 'rgba(255, 255, 255, 0.5)',
      textDecoration: 'line-through',
      transition: 'background-color 0.3s ease',
    },
    expiredText: {
      color: 'rgba(255, 255, 255, 0.4)',
      fontWeight: 'bold',
      fontSize: '0.9rem',
    },
    startButton: {
      background: 'linear-gradient(45deg, #FF7700, #ff9a00)',
      color: 'white',
      border: 'none',
      padding: '0.6rem 1.2rem',
      borderRadius: '25px',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '0.9rem',
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
      transition: 'background 0.3s ease, transform 0.2s ease',
      ':hover': {
        background: 'linear-gradient(45deg, #ff9a00, #FF7700)',
        transform: 'translateY(-2px)',
      },
    },
    clearAllContainer: {
      marginTop: '30px',
      textAlign: 'center',
      width: '100%',
      maxWidth: '1200px',
    },
    clearAllButton: {
      backgroundColor: '#dc3545',
      color: 'white',
      border: 'none',
      padding: '0.8rem 1.5rem',
      borderRadius: '25px',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      margin: 'auto',
      transition: 'background-color 0.3s ease, transform 0.2s ease',
      ':hover': {
        backgroundColor: '#c82333',
        transform: 'translateY(-2px)',
      },
    },
    noMeetings: {
        textAlign: 'center',
        fontSize: '1.3rem',
        color: 'rgba(255, 255, 255, 0.7)',
        marginTop: '50px',
    },
    // Styles for the new message dialog
    messageDialogPaper: {
      background: 'rgba(30, 30, 50, 0.9)',
      color: 'white',
      backdropFilter: 'blur(10px)',
      borderRadius: '15px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      width: 'fit-content',
      maxWidth: '400px',
      animation: 'fadeIn 0.3s ease-out',
    },
    messageDialogTitle: {
      color: '#FF7700',
      textAlign: 'center',
      fontWeight: 'bold',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      paddingBottom: '15px',
      fontSize: '1.5rem',
    },
    messageDialogContent: {
      color: '#e0e0e0',
      textAlign: 'center',
      fontSize: '1.1rem',
      padding: '20px',
    },
    // Keyframes for animations
    keyframes: `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `,
  };

  useEffect(() => {
    async function fetchMeetings() {
      try {
        const res = await fetch("http://localhost:8000/api/v1/meetings");
        if (!res.ok) {
          throw new Error("Failed to fetch meetings");
        }
        const data = await res.json();
        if (data.success) {
          const now = new Date();
          const filteredMeetings = data.meetings.filter((meeting) => {
            const startTime = new Date(meeting.startTime);
            const thirtyMinutesAfterStart = new Date(startTime.getTime() + 30 * 60 * 1000);
            return now < thirtyMinutesAfterStart;
          });
          setMeetings(filteredMeetings.sort((a,b) => new Date(a.startTime) - new Date(b.startTime)));
        } else {
          setError("Error loading meetings");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchMeetings();
  }, []);

  const showTemporaryMessage = (msg) => {
    setMessage(msg);
    setOpenMessageDialog(true);
    setTimeout(() => {
      setOpenMessageDialog(false);
      setMessage("");
    }, 3000); // Dialog will be open for 3 seconds
  };

  const handleStartMeeting = (meeting) => {
    const now = new Date();
    const startTime = new Date(meeting.startTime);
    const thirtyMinutesAfterStart = new Date(startTime.getTime() + 30 * 60 * 1000);

    if (now < startTime) {
      showTemporaryMessage("Meeting has not started yet. Please wait until the scheduled time. ⏰");
      return;
    }

    if (now > thirtyMinutesAfterStart) {
      showTemporaryMessage("This meeting has already ended. It was available for 30 minutes after start time. 🙁");
      return;
    }

    showTemporaryMessage(`Starting meeting: ${meeting.meetingCode}... 🚀`);
    setTimeout(() => {
        navigate(`/${meeting.meetingCode}`);
    }, 1500);
  };

  const handleClearAllMeetings = () => {
    if (window.confirm("Are you sure you want to clear all currently displayed meetings? This cannot be undone.")) {
      setMeetings([]);
      showTemporaryMessage("All meetings cleared from this view. ✨");
    }
  };

  if (loading) return <div style={styles.loading}>Loading scheduled meetings... ⏳</div>;
  if (error) return <div style={styles.error}>Error: {error} ❌</div>;

  return (
    <div style={styles.container}>
      <style>{styles.globalStyles}</style>
      <style>{styles.keyframes}</style>

      <div style={styles.homeButtonContainer}>
        <IconButton 
          onClick={() => navigate("/home")}
          style={styles.iconButton}
          onMouseEnter={() => setHoveredHomeButton(true)}
          onMouseLeave={() => setHoveredHomeButton(false)}
          sx={hoveredHomeButton ? styles.iconButtonHover : {}}
        >
          <HomeIcon style={{ color: 'white', fontSize: '28px' }} />
        </IconButton>
      </div>

      <h2 style={styles.heading}>
        <EventAvailableIcon style={{ fontSize: '2.5rem' }} /> Scheduled Meetings
      </h2>

      {/* Message Dialog */}
      <Dialog
        open={openMessageDialog}
        onClose={() => setOpenMessageDialog(false)} // Allows closing by clicking outside
        PaperProps={{ style: styles.messageDialogPaper }}
      >
        <DialogContent style={styles.messageDialogContent}>
          {message}
        </DialogContent>
      </Dialog>

      {meetings.length === 0 ? (
        <p style={styles.noMeetings}>No active meetings scheduled yet. Why not create one? 🚀</p>
      ) : (
        <>
          <div style={styles.tableWrapper}>
            <table style={styles.table} aria-label="Scheduled meetings table">
              <thead>
                <tr>
                  <th style={styles.th}>Code</th>
                  <th style={styles.th}>Title</th>
                  <th style={styles.th}>Description</th>
                  <th style={styles.th}>Start Time</th>
                  <th style={styles.th}>Duration (mins)</th>
                  <th style={styles.th}>Phone</th>
                  <th style={styles.th}>Action</th>
                </tr>
              </thead>
              <tbody>
                {meetings.map((meeting, index) => {
                  const startTime = new Date(meeting.startTime);
                  const now = new Date();
                  const meetingExpired = now > new Date(startTime.getTime() + 30 * 60 * 1000);

                  return (
                    <tr
                      key={meeting._id}
                      style={meetingExpired ? styles.expiredRow : styles.row}
                      onMouseEnter={!meetingExpired ? () => {} : undefined}
                      onMouseLeave={!meetingExpired ? () => {} : undefined}
                      sx={!meetingExpired ? ({} /* Add dynamic hover style here if needed*/) : {}}
                    >
                      <td style={styles.td}>{meeting.meetingCode}</td>
                      <td style={styles.td}>{meeting.title}</td>
                      <td style={styles.td}>{meeting.description || "-"}</td>
                      <td style={styles.td}>{startTime.toLocaleString()}</td>
                      <td style={styles.td}>{meeting.duration}</td>
                      <td style={styles.td}>{meeting.userPhone}</td>
                      <td style={styles.td}>
                        {meetingExpired ? (
                          <span style={styles.expiredText}>Expired</span>
                        ) : (
                          <button
                            onClick={() => handleStartMeeting(meeting)}
                            style={styles.startButton}
                            onMouseEnter={() => setHoveredStartButton(index)}
                            onMouseLeave={() => setHoveredStartButton(null)}
                            sx={hoveredStartButton === index ? styles.startButton[':hover'] : {}}
                            aria-label={`Start meeting ${meeting.meetingCode}`}
                          >
                            <PlayCircleFilledWhiteIcon fontSize="small" /> Start
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div style={styles.clearAllContainer}>
            <button
              onClick={handleClearAllMeetings}
              style={styles.clearAllButton}
              onMouseEnter={() => setHoveredClearButton(true)}
              onMouseLeave={() => setHoveredClearButton(false)}
              sx={hoveredClearButton ? styles.clearAllButton[':hover'] : {}}
              aria-label="Clear all meetings"
            >
              <DeleteForeverIcon fontSize="small" /> Clear All Meetings
            </button>
          </div>
        </>
      )}
    </div>
  );
}
