import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ScheduledMeetings() {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
            return now - startTime < 30 * 60 * 1000;
          });
          setMeetings(filteredMeetings);
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

  const handleStartMeeting = (meeting) => {
  const now = new Date();
  const startTime = new Date(meeting.startTime);
  const thirtyMinutesAfterStart = new Date(startTime.getTime() + 30 * 60 * 1000);

  const isSameDate =
    now.getFullYear() === startTime.getFullYear() &&
    now.getMonth() === startTime.getMonth() &&
    now.getDate() === startTime.getDate();

  if (
    !isSameDate ||
    now < startTime || // Before start time
    now > thirtyMinutesAfterStart // More than 30 mins past start
  ) {
    alert("Meeting has not started yet.");
    return;
  }

  if (window.confirm(`Start meeting with code: ${meeting.meetingCode}?`)) {
    navigate(`/${meeting.meetingCode}`);
  }
};

  const handleClearAllMeetings = () => {
    if (window.confirm("Are you sure you want to clear all meetings?")) {
      setMeetings([]);
    }
  };

  if (loading) return <div style={styles.loading}>Loading meetings...</div>;
  if (error) return <div style={styles.error}>Error: {error}</div>;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Scheduled Meetings</h2>
      {meetings.length === 0 ? (
        <p style={styles.noMeetings}>No meetings scheduled yet.</p>
      ) : (
        <>
          <table style={styles.table} aria-label="Scheduled meetings table">
            <thead>
              <tr>
                <th style={styles.th}>Meeting Code</th>
                <th style={styles.th}>Title</th>
                <th style={styles.th}>Description</th>
                <th style={styles.th}>Start Time</th>
                <th style={styles.th}>Duration (mins)</th>
                <th style={styles.th}>User Phone</th>
                <th style={styles.th}>Action</th>
              </tr>
            </thead>
            <tbody>
              {meetings.map((meeting) => {
                const startTime = new Date(meeting.startTime);
                const now = new Date();
                const meetingExpired = now - startTime > 30 * 60 * 1000;
                return (
                  <tr
                    key={meeting._id}
                    style={meetingExpired ? styles.expiredRow : styles.row}
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
                          aria-label={`Start meeting ${meeting.meetingCode}`}
                        >
                          Start Meeting
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div style={styles.clearAllContainer}>
            <button
              onClick={handleClearAllMeetings}
              style={styles.clearAllButton}
              aria-label="Clear all meetings"
            >
              Clear All Meetings
            </button>
          </div>
        </>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "2rem",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    maxWidth: "900px",
    margin: "auto",
  },
  heading: {
    color: "#ff7a00",
    textAlign: "center",
    marginBottom: "1.5rem",
  },
  noMeetings: {
    textAlign: "center",
    fontSize: "1.2rem",
    color: "#555",
  },
  loading: {
    textAlign: "center",
    fontSize: "1.2rem",
    padding: "2rem",
    color: "#777",
  },
  error: {
    textAlign: "center",
    fontSize: "1.2rem",
    padding: "2rem",
    color: "red",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  th: {
    backgroundColor: "#ff7a00",
    color: "white",
    padding: "0.75rem",
    fontWeight: "bold",
    borderBottom: "2px solid #e07b00",
  },
  td: {
    padding: "0.75rem",
    borderBottom: "1px solid #ddd",
  },
  row: {
    backgroundColor: "white",
  },
  expiredRow: {
    backgroundColor: "#f8d7da",
  },
  expiredText: {
    color: "#721c24",
    fontWeight: "bold",
  },
  startButton: {
    backgroundColor: "#ff7a00",
    color: "white",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "600",
    transition: "background-color 0.3s",
  },
  clearAllContainer: {
    marginTop: "1.5rem",
    textAlign: "center",
  },
  clearAllButton: {
    backgroundColor: "#d9534f",
    color: "white",
    border: "none",
    padding: "0.6rem 1.2rem",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "1rem",
    transition: "background-color 0.3s",
  },
};
