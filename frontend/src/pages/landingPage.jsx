import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import VideocamIcon from '@mui/icons-material/Videocam';
import ShareIcon from '@mui/icons-material/Share';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ScheduleIcon from '@mui/icons-material/Schedule';

export default function LandingPage() {
  const router = useNavigate();

  return (
    <div className='landingPageContainer' 
  style={{backgroundImage:  "url('images/background.jpg')",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center"
    }}>
      <nav>
        <div className='navHeader'>
          <h2><span>Smile</span>Meet</h2>
        </div>
        <div className='navList'>
          <a href='/about' className='nav-link'>About us</a>
          <a href='/guest' className='nav-link'>Join as Guest</a>
          <a href='/auth' className='nav-link'>Register</a>
          <a href='/auth'>
            <button>Login</button>
          </a>
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
            <IconButton className='circular-icon' onClick={() => router("/auth")}>
              <VideocamIcon />
            </IconButton>
            <IconButton className='circular-icon' onClick={() => router("/auth")}>
              <ShareIcon />
            </IconButton >
            <IconButton className='circular-icon' onClick={() => router("/auth")}>
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
              <img src="/images/img2.png" alt="img2" />
              <img src="/images/img3.png" alt="img3" />
              <img src="/images/img1.png" alt="img1" />
              <img src="/images/img2.png" alt="img2" />
              <img src="/images/img3.png" alt="img3" />
            </div>
          </div>

          <div className="rightImageScroll">
            <div className="imageTrack second">
              <img src="/images/img4.png" alt="img4" />
              <img src="/images/img5.png" alt="img5" />
              <img src="/images/img6.png" alt="img6" />
              <img src="/images/img4.png" alt="img4" />
              <img src="/images/img5.png" alt="img5" />
              <img src="/images/img6.png" alt="img6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
