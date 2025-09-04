import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import InfoIcon from '@mui/icons-material/Info';
import ScheduleIcon from '@mui/icons-material/Schedule';
import VideocamIcon from '@mui/icons-material/Videocam';
import BugReportIcon from '@mui/icons-material/BugReport';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';

export default function Help() {
  const navigate = useNavigate();
  const [isHomeButtonHovering, setIsHomeButtonHovering] = useState(false);
  const [expandedPanel, setExpandedPanel] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpandedPanel(isExpanded ? panel : false);
  };

  const styles = {
    globalStyles: `
      html, body, #root {
        height: 100%;
        margin: 0;
        padding: 0;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
      }
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `,
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)",
      fontFamily: '"Inter", sans-serif',
      color: "white",
      padding: "20px",
      boxSizing: "border-box",
      position: "relative",
      animation: "fadeIn 0.8s ease-out",
    },
    homeButtonContainer: {
      position: "absolute",
      top: "20px",
      left: "20px",
      zIndex: 10,
    },
    iconButton: {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      color: "white",
      transition: "background-color 0.3s ease",
      borderRadius: "50%",
      padding: "10px",
    },
    iconButtonHover: {
      backgroundColor: "rgba(255, 255, 255, 0.2)",
    },
    header: {
      color: "#FF7700",
      textAlign: "center",
      marginBottom: "10px",
      fontSize: "2.8rem",
      fontWeight: "bold",
      textShadow: "2px 2px 6px rgba(0, 0, 0, 0.4)",
      display: "flex",
      alignItems: "center",
      gap: "15px",
      marginTop: "60px",
      animation: "fadeInUp 0.8s ease-out",
    },
    subHeading: {
      color: 'rgba(255, 255, 255, 0.8)',
      textAlign: 'center',
      fontSize: '1.1rem',
      maxWidth: '700px',
      marginBottom: '40px',
      animation: 'fadeInUp 0.8s ease-out',
      animationDelay: '0.1s',
      animationFillMode: 'both',
    },
    accordionWrapper: {
      width: "100%",
      maxWidth: "800px",
      marginTop: "20px",
      animation: "fadeInUp 1s ease-out",
      animationDelay: "0.2s",
      animationFillMode: "both",
    },
    accordion: {
      backgroundColor: "rgba(30, 30, 50, 0.7)",
      color: "white",
      marginBottom: "15px",
      borderRadius: "12px",
      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
      ':hover': {
        transform: 'translateY(-3px)',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.5)',
      }
    },
    accordionSummary: {
      borderRadius: "12px",
      minHeight: "60px",
      backgroundColor: "rgba(40, 40, 70, 0.8)",
      color: "#FF7700",
      fontWeight: "bold",
      fontSize: "1.2rem",
      padding: "0 20px",
      '& .MuiAccordionSummary-content': {
        margin: '12px 0',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
      },
    },
    accordionDetails: {
      backgroundColor: "rgba(30, 30, 50, 0.6)",
      padding: "20px",
      borderTop: "1px solid rgba(255, 255, 255, 0.1)",
      color: "rgba(255, 255, 255, 0.8)",
      fontSize: "1rem",
      lineHeight: "1.6",
      borderBottomLeftRadius: '12px',
      borderBottomRightRadius: '12px',
    },
    link: {
      color: "#ff9a00",
      textDecoration: "none",
      fontWeight: "bold",
      transition: "color 0.2s",
      ':hover': {
        color: "#fff",
      },
    },
  };

  return (
    <div style={styles.container}>
      <style>{styles.globalStyles}</style>

      {/* Home Button */}
      <div style={styles.homeButtonContainer}>
        <IconButton
          onClick={() => navigate("/home")}
          style={styles.iconButton}
          onMouseEnter={() => setIsHomeButtonHovering(true)}
          onMouseLeave={() => setIsHomeButtonHovering(false)}
          sx={isHomeButtonHovering ? styles.iconButtonHover : {}}
        >
          <HomeIcon style={{ color: 'white', fontSize: '28px' }} />
        </IconButton>
      </div>

      <h1 style={styles.header}>
        <LiveHelpIcon style={{ fontSize: '3rem' }} /> Need a Hand with SmileMeet?
      </h1>
      <p style={styles.subHeading}>
        Don't worry, we've got your back! SmileMeet is designed to be simple and intuitive, but if you need a little guidance,
        you're in the right place. Explore our FAQs or reach out for personalized support. Let's get you connecting! ✨
      </p>

      <div style={styles.accordionWrapper}>
        {/* Getting Started */}
        <Accordion
          expanded={expandedPanel === 'panel1'}
          onChange={handleChange('panel1')}
          style={styles.accordion}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon style={{ color: '#FF7700' }} />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            style={styles.accordionSummary}
          >
            <InfoIcon /> <Typography style={{color: 'inherit', fontSize: 'inherit', fontWeight: 'inherit'}}>Getting Started</Typography>
          </AccordionSummary>
          <AccordionDetails style={styles.accordionDetails}>
            <Typography>
              Welcome! To begin, simply navigate to the home page and choose to either "Join a Meeting" with an existing code or "Schedule a Meeting" to create a new one. Ensure your camera and microphone permissions are granted for a seamless experience.
            </Typography>
          </AccordionDetails>
        </Accordion>

        {/* Scheduling Meetings */}
        <Accordion
          expanded={expandedPanel === 'panel2'}
          onChange={handleChange('panel2')}
          style={styles.accordion}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon style={{ color: '#FF7700' }} />}
            aria-controls="panel2a-content"
            id="panel2a-header"
            style={styles.accordionSummary}
          >
            <ScheduleIcon /> <Typography style={{color: 'inherit', fontSize: 'inherit', fontWeight: 'inherit'}}>Scheduling Meetings</Typography>
          </AccordionSummary>
          <AccordionDetails style={styles.accordionDetails}>
            <Typography>
              On the "Schedule a Meeting" page, fill in the meeting "title", "description", "start time", desired "duration", and your "phone number". After submitting, you'll receive a unique meeting code and link to share with participants. You can then go to "Scheduled Meetings" to see your upcoming events.
            </Typography>
          </AccordionDetails>
        </Accordion>

        {/* Joining Meetings */}
        <Accordion
          expanded={expandedPanel === 'panel3'}
          onChange={handleChange('panel3')}
          style={styles.accordion}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon style={{ color: '#FF7700' }} />}
            aria-controls="panel3a-content"
            id="panel3a-header"
            style={styles.accordionSummary}
          >
            <VideocamIcon /> <Typography style={{color: 'inherit', fontSize: 'inherit', fontWeight: 'inherit'}}>Joining Meetings</Typography>
          </AccordionSummary>
          <AccordionDetails style={styles.accordionDetails}>
            <Typography>
              To join a meeting, you'll need the "meeting code" provided by the host. Enter this code on the home page or click on a shared meeting link. Make sure your audio and video are enabled before joining for full participation.
            </Typography>
          </AccordionDetails>
        </Accordion>

        {/* Troubleshooting */}
        <Accordion
          expanded={expandedPanel === 'panel4'}
          onChange={handleChange('panel4')}
          style={styles.accordion}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon style={{ color: '#FF7700' }} />}
            aria-controls="panel4a-content"
            id="panel4a-header"
            style={styles.accordionSummary}
          >
            <BugReportIcon /> <Typography style={{color: 'inherit', fontSize: 'inherit', fontWeight: 'inherit'}}>Troubleshooting</Typography>
          </AccordionSummary>
          <AccordionDetails style={styles.accordionDetails}>
            <Typography>
              "Camera/Mic Not Working?" Ensure browser permissions are granted and no other application is using them. <br /><br />
              "Connection Issues?" Check your internet connection. <br /><br />
              "Meeting Not Starting?" Verify the start time. Meetings can only be started at or within 30 minutes of their scheduled time.
            </Typography>
          </AccordionDetails>
        </Accordion>

        {/* Contact Support */}
        <Accordion
          expanded={expandedPanel === 'panel5'}
          onChange={handleChange('panel5')}
          style={styles.accordion}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon style={{ color: '#FF7700' }} />}
            aria-controls="panel5a-content"
            id="panel5a-header"
            style={styles.accordionSummary}
          >
            <ContactSupportIcon /> <Typography style={{color: 'inherit', fontSize: 'inherit', fontWeight: 'inherit'}}>Contact Support</Typography>
          </AccordionSummary>
          <AccordionDetails style={styles.accordionDetails}>
            <Typography>
              Still having trouble? Feel free to reach out to our support team at <a href="mailto:support@yourwebsite.com" style={styles.link}>support@smilemeet.com</a>. We're here to help!
            </Typography>
          </AccordionDetails>
        </Accordion>

        {/* Account Management */}
        <Accordion
          expanded={expandedPanel === 'panel6'}
          onChange={handleChange('panel6')}
          style={styles.accordion}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon style={{ color: '#FF7700' }} />}
            aria-controls="panel6a-content"
            id="panel6a-header"
            style={styles.accordionSummary}
          >
            <InfoIcon /> <Typography style={{color: 'inherit', fontSize: 'inherit', fontWeight: 'inherit'}}>Account Management</Typography>
          </AccordionSummary>
          <AccordionDetails style={styles.accordionDetails}>
            <Typography>
              You can update your profile information and change your password on the settings page. Make sure to save changes before leaving the page.
            </Typography>
          </AccordionDetails>
        </Accordion>

        {/* Privacy and Security */}
        <Accordion
          expanded={expandedPanel === 'panel7'}
          onChange={handleChange('panel7')}
          style={styles.accordion}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon style={{ color: '#FF7700' }} />}
            aria-controls="panel7a-content"
            id="panel7a-header"
            style={styles.accordionSummary}
          >
            <BugReportIcon /> <Typography style={{color: 'inherit', fontSize: 'inherit', fontWeight: 'inherit'}}>Privacy and Security</Typography>
          </AccordionSummary>
          <AccordionDetails style={styles.accordionDetails}>
            <Typography>
              SmileMeet encrypts all meeting data to ensure your conversations are private and secure. Regularly update your password and avoid sharing meeting codes publicly.
            </Typography>
          </AccordionDetails>
        </Accordion>

        {/* Feature Requests */}
        <Accordion
          expanded={expandedPanel === 'panel8'}
          onChange={handleChange('panel8')}
          style={styles.accordion}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon style={{ color: '#FF7700' }} />}
            aria-controls="panel8a-content"
            id="panel8a-header"
            style={styles.accordionSummary}
          >
            <LiveHelpIcon /> <Typography style={{color: 'inherit', fontSize: 'inherit', fontWeight: 'inherit'}}>Feature Requests</Typography>
          </AccordionSummary>
          <AccordionDetails style={styles.accordionDetails}>
            <Typography>
              Have ideas for new features or improvements? Please send your suggestions to <a href="mailto:features@smilemeet.com" style={styles.link}>features@smilemeet.com</a>. We love hearing from our community!
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
}
