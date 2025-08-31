import React, { useState, useContext, useEffect } from 'react';
import WithAuth from '../utils/withAuth';
import { useNavigate } from 'react-router-dom';
import "../styles/home.css";
import IconButton from '@mui/material/IconButton';
import RestoreIcon from "@mui/icons-material/Restore";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ShareIcon from '@mui/icons-material/Share';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { AuthContext } from '../contexts/AuthContext.js';

// Define the carousel data
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
  const [currentSlide, setCurrentSlide] = useState(0); // State for the current carousel slide
  const { addToUserHistory } = useContext(AuthContext);

  const handleJoinVideoCall = async () => {
    if (!meetingCode || !meetingCode.trim()) {
      alert("Please enter a meeting code before joining!");
      return;
    }
    await addToUserHistory(meetingCode);
    navigate(`/${meetingCode}`);
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

  // Carousel functionality
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide(prevSlide => (prevSlide + 1) % carouselData.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(slideInterval);
  }, []);

  const shareUrl = meetingCode && meetingCode.trim()
    ? `${window.location.origin}/${meetingCode.trim()}`
    : window.location.origin;

  return (
    <>
      <div className="home-background-gradient"></div>
      <div className="noise-overlay"></div>
      <div className="navBar">
        <div style={{ display: "flex", alignItems: "center" }}>
          <h1 className="logo"><span>Smile</span>Meet</h1>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button className='home-btn' onClick={() => {
            navigate("/help")
          }}>Help</Button>
          <Button className="home-btn" onClick={() => {
            localStorage.removeItem("token");
            navigate("/");
          }} style={{ marginLeft: "20px" }}>
            Logout
          </Button>
        </div>
      </div>

      <div className="meetContainer">
        <div className="leftPanel">
          <div className="content-wrapper">
            <h2>
              <span>Connecting</span> People just like
                Education Connects Ideas...
            </h2>
            <div className="meeting-code">
              <TextField
                onChange={e => setMeetingCode(e.target.value)}
                id="outlined-basic"
                label="Meeting Code"
                variant="outlined"
              />
              <Button onClick={handleJoinVideoCall} variant='contained' className='join-btn'>Join</Button>
            </div>
            <div className='links'>
              <IconButton onClick={() => navigate("/history")} className='circular-icon'>
                <RestoreIcon />
              </IconButton>
              <IconButton className='circular-icon' onClick={() => setIsShareOpen(!isShareOpen)}>
                <ShareIcon />
              </IconButton>
              <IconButton className='circular-icon' onClick={() => navigate("/schedule-meeting")}>
                <ScheduleIcon />
              </IconButton>
              <IconButton className='circular-icon' onClick={() => navigate("/scheduled-meetings")}>
                <AccountCircleIcon />
              </IconButton>
            </div>
          </div>
        </div>
        <div className="rightPanel">
          <div className="carousel-container">
            {carouselData.map((item, index) => (
              <div
                key={index}
                className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
              >
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
            <p>
              Invite others to connect with you on <strong>SmileMeet</strong>.<br />
              Fast, secure & joyful video calling for friends, family, and teams.
            </p>
            <div className="share-url-container">
              <span className="share-url-text">
                {meetingCode && meetingCode.trim()
                  ? `${meetingCode.trim()}`
                  : "You have not made your meeting code!"
                }
              </span>
              <button
                onClick={handleCopy}
                className="copy-button"
                disabled={!meetingCode || !meetingCode.trim()}
              >
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
    </>
  );
}

export default WithAuth(HomeComponent);