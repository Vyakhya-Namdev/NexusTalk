import React from 'react'

export default function LandingPage() {
  return (
    <div className='landingPageContainer'>
      <nav>
        <div className='navHeader'>
          <h2><span>Nexus</span>Talk</h2>
        </div>
        <div className='navList'>
          <a href=''>Join as Guest</a>
          <a href=''>Register</a>
          <button>Login</button>
        </div>
      </nav>

      <div className='hero-section'>
        <div className='info'>
          <h1><span>Connect</span> with your Loved<br /> Ones...</h1>
          <p>From family to business, Connectly unites hearts and ideas across <br />every screen</p>
          <button>Get Started</button>
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
    </div>
  )
}
