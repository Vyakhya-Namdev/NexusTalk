import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import VideocamIcon from '@mui/icons-material/Videocam';
import ShareIcon from '@mui/icons-material/Share';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ScheduleIcon from '@mui/icons-material/Schedule';

export default function LandingPage() {
  const router = useNavigate();
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(()=>{
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if(token && storedUser){
      setUser(JSON.parse(storedUser));
    }
  },[]);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    router("/");
  }

  //encode the url of current window
  // const shareUrl = encodeURIComponent(window.location.origin);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.origin)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      })
  }

  return (
    <div className='landingPageContainer'>
      <nav>
        <div className='navHeader'>
          <h2><span>Smile</span>Meet</h2>
        </div>
        <div className='navList'>
          <a href='/about' className='nav-link'>About us</a>
          <a href='/contact' className='nav-link'>Contact us</a>
          <a href='/guest' className='nav-link'>Join as Guest</a>
          {!user ? (
            <>
              <a href='/auth' className='nav-link'>Register</a>
              <a href='/auth'>
                <button>Login</button>
              </a>
            </>
          ):(
            <a onClick={handleLogout} className='nav-link'>Logout</a>
          )}
          
        </div>
      </nav>

      <div className='hero-section'>
        <div className='info'>
          <h1><span>Connect</span> with your Loved<br /> Ones...</h1>
          <p>From family to business, Connectly unites hearts and ideas across <br />every screen</p>
          <a href='/auth'>
            <button>Get Started</button>
          </a>

          <div className='links'>
            <IconButton className='circular-icon' onClick={() => router("/guest")}>
              <VideocamIcon />
            </IconButton>
            <IconButton className='circular-icon' onClick={() => setIsShareOpen(true)}>
              <ShareIcon />
            </IconButton >
            <IconButton className='circular-icon'>
              <ScheduleIcon />
            </IconButton>
            <IconButton className='circular-icon'>
              <AccountCircleIcon />
            </IconButton>
          </div>
        </div>

        <div className="scrollColumns">
          <div className="rightImageScroll">
            <div className="imageTrack first">
              <img src="/images/img1.png" alt="img1" />
              <img src="/images/img2.webp" alt="img2" />
              <img src="/images/img3.webp" alt="img3" />
              <img src="/images/img1.png" alt="img1" />
              <img src="/images/img2.webp" alt="img2" />
              <img src="/images/img3.webp" alt="img3" />
            </div>
          </div>

          <div className="rightImageScroll">
            <div className="imageTrack second">
              <img src="/images/img4.webp" alt="img4" />
              <img src="/images/img5.png" alt="img5" />
              <img src="/images/img6.png" alt="img6" />
              <img src="/images/img4.webp" alt="img4" />
              <img src="/images/img5.png" alt="img5" />
              <img src="/images/img6.png" alt="img6" />
            </div>
          </div>
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
                {window.location.origin}
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
                  cursor: 'pointer',
                  fontSize: '0.95rem'
                }}
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
                href={`https://wa.me/?text=${encodeURIComponent(window.location.origin)}`}
                target="_blank"
                rel="noopener noreferrer"
                title="WhatsApp"
              >
                <img src="/images/whatsapp.png" alt="WhatsApp" />
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.origin)}`}
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook"
              >
                <img src="/images/facebook.png" alt="Facebook" />
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.origin)}`}
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
              >
                <img src="/images/linkdin.png" alt="LinkedIn" />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.origin)}`}
                target="_blank"
                rel="noopener noreferrer"
                title="X"
              >
                <img src="/images/x.png" alt="X" />
              </a>
              <a
                href={`https://www.instagram.com/`}
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

    </div>
  );
}
