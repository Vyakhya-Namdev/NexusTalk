import React, { useState, useContext, useEffect } from 'react';
import WithAuth from '../utils/withAuth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../styles/home.css";
import IconButton from '@mui/material/IconButton';
import RestoreIcon from "@mui/icons-material/Restore";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ShareIcon from '@mui/icons-material/Share';
import EventIcon from '@mui/icons-material/Event';
import ScheduleIcon from '@mui/icons-material/Schedule';
import AddIcon from '@mui/icons-material/Add';
import { AuthContext } from '../contexts/AuthContext.js';
import { nanoid } from 'nanoid';

const carouselData = [
  {
    image: 'images/logo3.png',
    text: "Securely connect with end-to-end encryption, ensuring your conversations stay private."
  },
  {
    image: 'images/logo2.png',
    text: "Enjoy crystal-clear audio and high-definition video for a seamless meeting experience."
  },
  {
    image: 'images/logo1.png',
    text: "Schedule meetings easily and share the link with participants in just a few clicks."
  }
];

function HomeComponent() {
  const navigate = useNavigate();
  const [meetingCode, setMeetingCode] = useState("");
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isInstantMeetOpen, setIsInstantMeetOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allMeetings, setAllMeetings] = useState([]);

  const { addToUserHistory } = useContext(AuthContext);

  // New states for meetings history and popup
  const [instantMeetHistory, setInstantMeetHistory] = useState([]);
  const [scheduledMeetings, setScheduledMeetings] = useState([]);
  const [validationPopup, setValidationPopup] = useState({ open: false, message: "" });

  useEffect(() => {
    const fetchAllMeetings = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/meetings/allMeetings`);
        setAllMeetings(res.data.meetings || []);
      } catch (error) {
        console.error("Error fetching all meetings", error);
      }
    };
    fetchAllMeetings();
  }, []);



  const handleJoinVideoCall = async () => {
    const code = meetingCode.trim().toUpperCase();
    if (!code) {
      setValidationPopup({ open: true, message: "Please enter a meeting code before joining!" });
      return;
    }

    // Find meeting by code in allMeetings, ignoring user ownership or attendance
    const meeting = allMeetings.find(m => m.meetingCode?.toUpperCase() === code);

    if (!meeting) {
      setValidationPopup({ open: true, message: "No meeting code found." });
      return;
    }

    if (meeting.meetingType === "Scheduled Meet") {
      const now = new Date();
      const startTime = new Date(meeting.startTime);
      const endTime = new Date(startTime.getTime() + meeting.duration * 60000);

      if (now < startTime) {
        setValidationPopup({ open: true, message: "Meeting has not been started yet." });
        return;
      }
      if (now > endTime) {
        setValidationPopup({ open: true, message: "Scheduled meeting ended." });
        return;
      }
    }

    // Record user history and navigate
    await addToUserHistory(code);
    navigate(`/${code}`);
  };


  const handleCopy = () => {
    if (meetingCode && meetingCode.trim()) {
      const link = `${window.location.origin}/${meetingCode.trim()}`;
      navigator.clipboard.writeText(link)
        .then(() => {
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 2000);
        });
    } else {
      alert("You have not made your meeting code");
    }
  };

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide(prevSlide => (prevSlide + 1) % carouselData.length);
    }, 4000);
    return () => clearInterval(slideInterval);
  }, []);

  const shareUrl = meetingCode && meetingCode.trim()
    ? `${window.location.origin}/${meetingCode.trim()}`
    : window.location.origin;

  if (loading) {
    const styles = {
      loading: {
        color: '#FF7700',
        fontSize: '1.5rem',
        fontWeight: '600',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0D1117',
      }
    };
    return <div style={styles.loading}>Meeting is starting... ⏳</div>;
  }

  return (
    <>
      <div className="home-background-gradient"></div>
      <div className="noise-overlay"></div>
      <div className="navBar">
        <div style={{ display: "flex", alignItems: "center" }}>
          <h1 className="logo"><span>Smile</span>Meet</h1>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button className='home-btn' onClick={() => { navigate("/help") }}>Help</Button>
          <Button className="home-btn" onClick={() => {
            localStorage.removeItem("token");
            navigate("/");
          }} style={{ marginLeft: "20px" }}>Logout</Button>
        </div>
      </div>

      <div className="meetContainer">
        <div className="leftPanel">
          <div className="content-wrapper">
            <h2>
              <span>Connecting</span> People just like Education Connects Ideas...
            </h2>
            <div className="meeting-code">
              <TextField
                onChange={e => setMeetingCode(e.target.value)}
                id="outlined-basic"
                label="Meeting Code"
                variant="outlined"
              />
              <Button onClick={handleJoinVideoCall} variant='contained' className='join-btn' >Join</Button>
            </div>

            <div className='links' style={{ position: "relative" }}>
              <Button
                className='rectangular-meet-button'
                startIcon={<AddIcon />}
                onClick={() => setIsInstantMeetOpen(!isInstantMeetOpen)}
              >
                New Meeting
              </Button>
              <IconButton className='circular-icon' onClick={() => setIsShareOpen(!isShareOpen)}>
                <ShareIcon />
              </IconButton>
              <IconButton className='circular-icon' onClick={() => navigate("/scheduled-meetings")}>
                <RestoreIcon />
              </IconButton>
              <IconButton onClick={() => navigate("/history")} className='circular-icon'>
                <EventIcon />
              </IconButton>

              {isInstantMeetOpen && (
                <div className="instant-meet-popup">
                  <div
                    className="popup-option"
                    onClick={async () => {
                      const randomMeetingCode = nanoid(6).toUpperCase();
                      setIsInstantMeetOpen(false);
                      setLoading(true);

                      // Add new instant meeting code to history state
                      setInstantMeetHistory(prev => [...prev, { code: randomMeetingCode }]);

                      // Persist in user history context or backend
                      await addToUserHistory(randomMeetingCode);

                      setTimeout(() => { navigate(`/${randomMeetingCode}`); }, 1500);
                    }}
                  >
                    <span className="popup-icon"><AddIcon /></span>
                    Start an Instant Meeting
                  </div>
                  <div
                    className="popup-option"
                    onClick={() => { setIsInstantMeetOpen(false); navigate("/schedule-meeting"); }}
                  >
                    <span className="popup-icon"><ScheduleIcon /></span>
                    Create a Meeting for Later
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>

        <div className="rightPanel">
          <div className="carousel-container">
            {carouselData.map((item, index) => (
              <div key={index} className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}>
                <img src={item.image} alt={`Feature ${index + 1}`} />
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isShareOpen && (
        <div className="share-modal-backdrop">
          <div className="share-modal">
            <h3>Share SmileMeet</h3>
            <p>Invite others to connect with you on <strong>SmileMeet</strong>.<br />
              Fast, secure & joyful video calling for friends, family, and teams.
            </p>
            <div className="share-url-container">
              <span className="share-url-text">
                {meetingCode && meetingCode.trim()
                  ? `${window.location.origin}/${meetingCode.trim()}`
                  : "You have not made your meeting code!"
                }
              </span>
              <button onClick={handleCopy} className="copy-button" disabled={!meetingCode || !meetingCode.trim()}>
                {isCopied ? "Copied ✓" : "Copy link"}
              </button>
            </div>
            <div className="share-icons">
              <a href={meetingCode && meetingCode.trim() ? `https://wa.me/?text=${encodeURIComponent(shareUrl)}` : "#"} target="_blank" rel="noopener noreferrer" title="WhatsApp" style={{ pointerEvents: meetingCode && meetingCode.trim() ? "auto" : "none", opacity: meetingCode && meetingCode.trim() ? 1 : 0.4 }}><img src='https://cdn-icons-png.flaticon.com/512/124/124034.png' alt="WhatsApp" /></a>
              <a href={meetingCode && meetingCode.trim() ? `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}` : "#"} target="_blank" rel="noopener noreferrer" title="Facebook" style={{ pointerEvents: meetingCode && meetingCode.trim() ? "auto" : "none", opacity: meetingCode && meetingCode.trim() ? 1 : 0.4 }}><img src='https://cdn-icons-png.flaticon.com/512/124/124010.png' alt="Facebook" /></a>
              <a href={meetingCode && meetingCode.trim() ? `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}` : "#"} target="_blank" rel="noopener noreferrer" title="LinkedIn" style={{ pointerEvents: meetingCode && meetingCode.trim() ? "auto" : "none", opacity: meetingCode && meetingCode.trim() ? 1 : 0.4 }}><img src='https://cdn-icons-png.flaticon.com/512/124/124011.png' alt="LinkedIn" /></a>
              <a href={meetingCode && meetingCode.trim() ? `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}` : "#"} target="_blank" rel="noopener noreferrer" title="X" style={{ pointerEvents: meetingCode && meetingCode.trim() ? "auto" : "none", opacity: meetingCode && meetingCode.trim() ? 1 : 0.4 }}><img src='https://cdn-icons-png.flaticon.com/512/124/124021.png' alt="X" /></a>
            </div>
            <button className="close-button" onClick={() => setIsShareOpen(false)}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Validation popup */}
      {validationPopup.open && (
        <div className="meeting-validation-popup-backdrop" onClick={() => setValidationPopup({ open: false, message: "" })}>
          <div className="meeting-validation-popup" onClick={e => e.stopPropagation()}>
            <div className="popup-icon">⚠️</div>
            <h2>Alert</h2>
            <p>{validationPopup.message}</p>
            <div className="popup-tip">You can double-check the meeting code or create a new meeting.</div>
            <div className="popup-action-row">
              <button onClick={() => setValidationPopup({ open: false, message: "" })}>Close</button>
            </div>
            <a href="/help" className="help-link">Need Help?</a>
          </div>
        </div>
      )}


    </>
  );
}

export default WithAuth(HomeComponent);
