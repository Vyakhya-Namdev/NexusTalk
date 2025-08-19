import React, { useState, useContext } from 'react'
import WithAuth from '../utils/withAuth'
import { useNavigate } from 'react-router-dom';
import "../App.css";
import IconButton from '@mui/material/IconButton';
import RestoreIcon from "@mui/icons-material/Restore";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import ShareIcon from '@mui/icons-material/Share';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { AuthContext } from '../contexts/AuthContext.js';

function HomeComponent() {
  let navigate = useNavigate();
  const router = useNavigate();
  let [meetingCode, setMeetingCode] = useState("");
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  let { addToUserHistory } = useContext(AuthContext);

  let handleJoinVideoCall = async () => {
    if (!meetingCode || !meetingCode.trim()) {
      alert("Please enter a meeting code before joining!");
      return;
    }
    await addToUserHistory(meetingCode.trim());
    navigate(`/${meetingCode.trim()}`);
  }

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
  }

  const shareUrl = meetingCode && meetingCode.trim()
    ? `${window.location.origin}/${meetingCode.trim()}`
    : window.location.origin;

  return (
    <>
      <div className="navBar">
        <div style={{ display: "flex", alignItems: "center" }}>
          <h1><span>Smile</span>Meet</h1>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button className='home-btn' onClick={() => {
            navigate("/home")
          }}>Help</Button>
          <Button className="home-btn" onClick={() => {
            localStorage.removeItem("token");
            navigate("/");
          }} style={{marginLeft: "20px"}}>
            Logout
          </Button>
        </div>
      </div>

      <div className="meetContainer">
        <div className="leftPanel">
          <div>
            <h2><span>Connecting</span> People just like Education Connects Ideas...</h2>
            <div className="meeting-code" style={{ display: "flex", gap: "10px", marginTop: "6px" }}>
              <TextField
                onChange={e => setMeetingCode(e.target.value)}
                id="outlined-basic"
                label="Meeting Code"
                variant="outlined"
              />
              <Button onClick={handleJoinVideoCall} variant='contained' style={{backgroundColor: "#3b4aad", padding: " 0 35px", fontSize: "1em"}}>Join</Button>
            </div>
            <div className='links' style={{ position: 'relative' }}>
              <IconButton onClick={() => navigate("/history")} className='circular-icon'>
                <RestoreIcon />
              </IconButton>
              
              {/* Share button with relative positioning for modal */}
              <div className="share-modal-container">
                <IconButton className='circular-icon' onClick={() => setIsShareOpen(!isShareOpen)}>
                  <ShareIcon />
                </IconButton>
                
                {/* Share Modal - positioned relative to the share button */}
                {isShareOpen && (
                  <>
                    <div className="share-backdrop" onClick={() => setIsShareOpen(false)}></div>
                    <div className="share-modal">
                      <h3>Share SmileMeet</h3>
                      <p>
                        Invite others to connect with you on <strong>SmileMeet</strong>.<br />
                        Fast, secure & joyful video calling for friends, family, and teams.
                      </p>
                      
                      {/* URL display and copy button */}
                      <div className="share-url-container">
                        <span className="share-url-text">
                          {meetingCode && meetingCode.trim()
                            ? `${window.location.origin}/${meetingCode.trim()}`
                            : "You have not made your meeting code !"
                          }
                        </span>
                        <button
                          onClick={handleCopy}
                          className="copy-button"
                          disabled={!meetingCode || !meetingCode.trim()}
                        >
                          {isCopied ? (
                            <>
                              <span>Copied</span>
                              <span style={{ fontWeight: 'bold', fontSize: '1.3em', marginLeft: '4px' }}>✓</span>
                            </>
                          ) : (
                            "Copy link"
                          )}
                        </button>
                      </div>

                      {/* Social Share buttons */}
                      <div className="share-icons">
                        <a
                          href={meetingCode && meetingCode.trim() ? `https://wa.me/?text=${encodeURIComponent(shareUrl)}` : "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="WhatsApp"
                          style={{ pointerEvents: meetingCode && meetingCode.trim() ? "auto" : "none", opacity: meetingCode && meetingCode.trim() ? 1 : 0.4 }}
                        >
                          <img src="/images/whatsapp.png" alt="WhatsApp" />
                        </a>
                        <a
                          href={meetingCode && meetingCode.trim() ? `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}` : "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Facebook"
                          style={{ pointerEvents: meetingCode && meetingCode.trim() ? "auto" : "none", opacity: meetingCode && meetingCode.trim() ? 1 : 0.4 }}
                        >
                          <img src="/images/facebook.png" alt="Facebook" />
                        </a>
                        <a
                          href={meetingCode && meetingCode.trim() ? `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}` : "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="LinkedIn"
                          style={{ pointerEvents: meetingCode && meetingCode.trim() ? "auto" : "none", opacity: meetingCode && meetingCode.trim() ? 1 : 0.4 }}
                        >
                          <img src="/images/linkdin.png" alt="LinkedIn" />
                        </a>
                        <a
                          href={meetingCode && meetingCode.trim() ? `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}` : "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="X"
                          style={{ pointerEvents: meetingCode && meetingCode.trim() ? "auto" : "none", opacity: meetingCode && meetingCode.trim() ? 1 : 0.4 }}
                        >
                          <img src="/images/x.png" alt="X" />
                        </a>
                        <a
                          href="https://www.instagram.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Share on Instagram"
                          style={{ pointerEvents: meetingCode && meetingCode.trim() ? "auto" : "none", opacity: meetingCode && meetingCode.trim() ? 1 : 0.4 }}
                        >
                          <img src="/images/instagram.png" alt="Instagram" />
                        </a>
                      </div>

                      <button className="close-button" onClick={() => setIsShareOpen(false)}>
                        Close
                      </button>
                    </div>
                  </>
                )}
              </div>

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
          <img src='images/logo_home.svg' />
        </div>
      </div>
    </>
  )
}

export default WithAuth(HomeComponent)