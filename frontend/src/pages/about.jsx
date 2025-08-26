import React from "react";
import "../styles/About.css";

export default function About() {
  return (
    <div className="about-container">
      {/* Hero Section */}
      <section className="hero-section animate-fade-in-up delay-100">
        <div className="welcome-badge">😊 Welcome to SmileMeet</div>
        <h1 className="hero-title">
          Make <span className="white-text">Every</span><br />
          Connection <span className="white-text">Count!</span>
        </h1>
        <p className="hero-description">
          SmileMeet is not just another video call app—it's a place where faces light up,
          stories are shared, and real smiles bring people closer despite any distance!
        </p>
      </section>

      {/* Features Section */}
      <section className="features-section animate-fade-in-up delay-200">
        <h2 className="features-title">Key Features</h2>
        <div className="features-list">
          <div className="feature-item">
            <div className="feature-icon instant-connect">⚡</div>
            <div className="feature-info">
              <h3>Instant Connect</h3>
              <p>Just one click and you're live—no downloads, no waiting.</p>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-icon share-anywhere">🔗</div>
            <div className="feature-info">
              <h3>Share Anywhere</h3>
              <p>Invite instantly—WhatsApp, Facebook, LinkedIn, X, Instagram—all with a tap.</p>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-icon secure-private">🔒</div>
            <div className="feature-info">
              <h3>Secure &amp; Private</h3>
              <p>Calls are encrypted, and your privacy always comes first.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section animate-fade-in-up delay-300">
        <div className="section-header">
          <span className="section-emoji">❤️</span>
          <h2 className="section-title">Our Mission</h2>
        </div>
        <p className="mission-text">
          At SmileMeet, we believe distance should never dilute the warmth of human connection.
          Our mission is to transform video calling into an experience that's simple, secure, and joyful.
          We empower families, friends, and teams worldwide to share moments effortlessly, bridging gaps and fostering real relationships.
          Every call becomes seamless and full of heart—bringing smiles closer, one conversation at a time.
        </p>
      </section>

      {/* Team Section */}
      <section className="team-section animate-fade-in-up delay-400">
        <div className="team-content">
          <div className="section-header">
            <span className="section-emoji">👥</span>
            <h2 className="section-title">Meet Our Team</h2>
          </div>
          <p className="team-description">
            We're a passionate group of engineers and designers who care about connection—because we use SmileMeet to stay in touch with those we love.
          </p>
          <div className="ceo-section">
            <div className="team-member">
              <div className="member-avatar">
                <img src="/images/CEO.jpg" alt="Vyakhya Namdev" />
              </div>
              <h3 className="member-name">Vyakhya Namdev</h3>
              <p className="member-role">Founder @SmileMeet</p>
            </div>
            <div className="ceo-bio">
              <h3>About Vyakhya Namdev...</h3>
              <p>
                Vyakhya is passionate about building meaningful connections through technology.
                With a strong background in software engineering and a love for design,
                Vyakhya founded SmileMeet to make video calling simpler, more secure, and a true joy for everyone.
                <br /><br />
                <em>"I believe every conversation can make your day brighter—no matter where you are."</em>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
