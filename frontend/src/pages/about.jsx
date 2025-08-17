import React from 'react';
import "../styles/About.css";

export default function About() {
    return (
        <div className="about-container">
            <div className="hero-section">
                <div className="hero-content">
                    <div className="welcome-badge">
                        <span className="emoji">😊</span>
                        <span className="welcome-text">Welcome to SmileMeet</span>
                    </div>
                    <h1 className="hero-title">
                        Make Every<br />Connection Count!
                    </h1>
                    <p className="hero-description">
                        SmileMeet is not just another video call app—it's a place where faces light up, stories are shared, and real smiles bring people closer despite any distance!
                    </p>
                </div>
            </div>
            <div className="features-section">
                <div className="features-container">
                    <div className="feature-item">
                        <div className="feature-icon instant-connect"><img src='/images/instant_connect.jpeg' alt="Instant Connect" /></div>
                        <h3 className="feature-title">Instant Connect</h3>
                        <p className="feature-description">Just one click and you're live—no downloads, no waiting.</p>
                    </div>
                    <div className="feature-item">
                        <div className="feature-icon share-anywhere"><img src='/images/share.png' alt="Share Anywhere" /></div>
                        <h3 className="feature-title">Share Anywhere</h3>
                        <p className="feature-description">Invite instantly—WhatsApp, Facebook, LinkedIn, X, Instagram—all with a tap.</p>
                    </div>
                    <div className="feature-item">
                        <div className="feature-icon secure-private"><img src='/images/secure.avif' alt="Secure & Private" /></div>
                        <h3 className="feature-title">Secure & Private</h3>
                        <p className="feature-description">Calls are encrypted, and your privacy always comes first.</p>
                    </div>
                </div>
            </div>
            <div className="mission-section">
                <div className="section-header">
                    <span className="section-emoji">❤️</span>
                    <h2 className="section-title">Our Mission</h2>
                </div>
                <p className="mission-text">
                    At SmileMeet, we are driven by the belief that distance should never dilute the warmth of human connection. Our mission is to transform video calling into an experience that is not only simple and accessible but also joyful and secure. We strive to empower families, friends, and teams worldwide to share their moments effortlessly, bridging gaps and fostering genuine relationships regardless of physical separation. Through innovative technology and a user-friendly design, SmileMeet makes every call seamless, reliable, and full of heart—bringing smiles closer, one conversation at a time.
                </p>
            </div>

            <div className="team-section">
                <div className="team-content">
                    <div className="section-header">
                        <span className="section-emoji">👥</span>
                        <h2 className="section-title">Meet Our Team</h2>
                    </div>
                    <p className="team-description">
                        We're a passionate group of engineers and designers who care about connection—because we use SmileMeet ourselves to stay in touch with those we love.
                    </p>

                    <div className="ceo-section">
                        <div className="team-member">
                            <div className="member-avatar">
                                <img src="/images/CEO.jpg" alt="CEO Avatar" />
                            </div>
                            <h3 className="member-name">Vyakhya Namdev</h3>
                            <p className="member-role">Founder @SmileMeet</p>
                        </div>
                        <div className="ceo-bio">
                            <h3>About Vyakhya Namdev...</h3>
                            <p>
                                Vyakhya is passionate about building meaningful connections through technology.
                                With a strong background in software engineering and a love for design,
                                Vyakhya founded SmileMeet to make video calling simpler, more secure, and a true joy for everyone.<br /><br />
                                "I believe every conversation can make your day brighter—no matter where you are."
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}