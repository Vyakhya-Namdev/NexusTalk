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
          <h2>SmileMeet</h2>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={() => navigate("/help")}>
            <QuestionMarkIcon />
          </IconButton>
          <p>Help</p>

          {/* if user wants to logout so remove its token and navigate it to signup page */}
          <Button onClick={() => {
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
            <h2>Connecting People just like Education Connects Ideas</h2>

            <div style={{ display: "flex", gap: "10px" }}>
              <TextField
                onChange={e => setMeetingCode(e.target.value)}
                id="outlined-basic"
                label="Meeting Code"
                variant="outlined"
              />
              <Button onClick={handleJoinVideoCall} variant='contained'>Join</Button>
            </div>

            <div className='links'>
              <IconButton onClick={() => navigate("/history")} className='circular-icon'>
                <RestoreIcon />
              </IconButton>
              {/* <p>History</p> */}
              {/* <IconButton className='circular-icon' onClick={() => router("/guest")}>
                <VideocamIcon />
              </IconButton> */}
              <IconButton className='circular-icon' onClick={() => setIsShareOpen(true)}>
                <ShareIcon />
              </IconButton>
              <IconButton className='circular-icon'>
                <ScheduleIcon />
              </IconButton>
              <IconButton className='circular-icon'>
                <AccountCircleIcon />
              </IconButton>
            </div>
          </div>
        </div>

        <div className="rightPanel">
          <img src='images/logo_home.svg' />
        </div>
      </div>

      {/* Share Modal */}
      {isShareOpen && (
        <div className="share-modal-backdrop" onClick={() => setIsShareOpen(false)}>
          <div className="share-modal" onClick={e => e.stopPropagation()}>
            <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Share SmileMeet</h3>

            <p style={{ marginBottom: '1rem', color: '#444' }}>
              Invite others to connect with you on <strong>SmileMeet</strong>.<br />
              Fast, secure & joyful video calling for friends, family, and teams.
            </p>

            {/* Big site link with Copy button */}
            <div
              style={{
                margin: '1rem auto',
                background: '#f4f6fa',
                border: '1px solid #e0e0e0',
                borderRadius: '6px',
                padding: '10px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                maxWidth: '360px'
              }}
            >
              <span style={{ fontSize: '1.05rem', color: '#222', wordBreak: 'break-all' }}>
                {meetingCode && meetingCode.trim()
                  ? `${window.location.origin}/${meetingCode.trim()}`
                  : "You have not made your meeting code !"
                }
              </span>
              <button
                onClick={handleCopy}
                style={{
                  marginLeft: '8px',
                  background: '#FF7700',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '6px 14px',
                  fontWeight: 500,
                  cursor: meetingCode && meetingCode.trim() ? 'pointer' : 'not-allowed',
                  fontSize: '0.95rem'
                }}
                disabled={!meetingCode || !meetingCode.trim()}
              >
                {isCopied ? (
                  <>
                    <span>Copied</span>
                    <span style={{ fontWeight: 'bold', fontSize: '1.3em' }}>✓</span>
                  </>
                ) : (
                  <>Copy link</>
                )}
              </button>
            </div>

            {/* Social Share buttons */}
            <div className="share-icons" style={{ margin: '1rem auto 0', justifyContent: 'center' }}>
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
              >
                <img src="/images/instagram.png" alt="Instagram" />
              </a>
            </div>

            <button className="close-button" style={{ marginTop: '1.5rem' }} onClick={() => setIsShareOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  )
}

export default WithAuth(HomeComponent)
