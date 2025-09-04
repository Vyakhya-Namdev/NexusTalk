import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../contexts/AuthContext';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import HomeIcon from "@mui/icons-material/Home";
import EventIcon from '@mui/icons-material/Event'; 
import CodeIcon from '@mui/icons-material/Code';   

export default function History() {
    const { getHistoryOfUser } = useContext(AuthContext);
    const [meetings, setMeetings] = useState([]);
    const [loading, setLoading] = useState(true);
    const routeTo = useNavigate();

    // Inline styles for the component
    const pageStyles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: '#0d121c',
            padding: '20px',
            color: 'white',
            fontFamily: '"Inter", sans-serif',
            background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
            animation: 'fadeIn 1s ease-in-out',
        },
        header: {
            fontSize: '2.5rem',
            fontWeight: 'bold',
            marginBottom: '30px',
            color: '#FF7700',
            textShadow: '2px 2px 6px rgba(0, 0, 0, 0.4)',
        },
        homeButtonContainer: {
            position: 'absolute',
            top: '20px',
            left: '20px',
            zIndex: 10,
        },
        iconButton: {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            color: 'white',
            transition: 'background-color 0.3s ease',
            borderRadius: '50%',
            padding: '10px',
        },
        iconButtonHover: {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
        },
        card: {
            minWidth: 300,
            maxWidth: 500,
            margin: '15px 0',
            backgroundColor: 'rgba(40, 40, 60, 0.7)',
            backdropFilter: 'blur(5px)',
            borderRadius: '12px',
            border: '1px solid rgba(255, 119, 0, 0.3)',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
            color: 'white',
            transition: 'transform 0.2s ease-in-out',
        },
        cardHover: {
            transform: 'translateY(-5px)',
        },
        cardContent: {
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
        },
        typographyLabel: {
            fontSize: 14,
            color: '#FF7700',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
        },
        typographyValue: {
            fontSize: 16,
            color: 'white',
        },
        noMeetsMessage: {
            fontSize: '1.5rem',
            color: 'rgba(255, 255, 255, 0.8)',
            textAlign: 'center',
            marginTop: '50px',
        },
        loadingMessage: {
            fontSize: '1.5rem',
            color: 'rgba(255, 255, 255, 0.8)',
            textAlign: 'center',
            marginTop: '50px',
        },
    };

    const [hoveredCard, setHoveredCard] = useState(null);

    useEffect(() => {
  const fetchHistory = async () => {
    setLoading(true);
    let start = Date.now(); // Record start time
    try {
      const history = await getHistoryOfUser();
      // Your existing filtering code
      const filteredHistory = history.filter(meeting => {
        if (meeting.meetingType === "Scheduled Meet") {
          return meeting.status === "attended";
        }
        if (meeting.meetingType === "Instant Meet") {
          return true;
        }
        return false;
      });
      setMeetings(filteredHistory);
    } catch (err) {
      console.log(err);
    }
    // Ensure minimum loading delay
    const elapsed = Date.now() - start;
    const minDelay = 1200; // 1.2 seconds
    if (elapsed < minDelay) {
      setTimeout(() => setLoading(false), minDelay - elapsed);
    } else {
      setLoading(false);
    }
  };
  fetchHistory();
}, [getHistoryOfUser]);


    let formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        return `${day}/${month}/${year} ${hours}:${minutes}`;
    };

    return (
        <div style={pageStyles.container}>
            <div style={pageStyles.homeButtonContainer}>
                <IconButton
                    onClick={() => routeTo("/home")}
                    style={pageStyles.iconButton}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = pageStyles.iconButtonHover.backgroundColor}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = pageStyles.iconButton.backgroundColor}
                >
                    <HomeIcon style={{ color: 'white', fontSize: '28px' }} />
                </IconButton>
            </div>

            <h1 style={pageStyles.header}>Meeting History 📜</h1>

            {loading ? (
                <Typography style={pageStyles.loadingMessage}>
                    Loading scheduled meetings... <span role="img" aria-label="hourglass">⏳</span>
                </Typography>
            ) : (
                meetings.length > 0 ? (
                    meetings.map((e, idx) => (
                        <Card
                            key={idx}
                            style={hoveredCard === idx ? { ...pageStyles.card, ...pageStyles.cardHover } : pageStyles.card}
                            onMouseEnter={() => setHoveredCard(idx)}
                            onMouseLeave={() => setHoveredCard(null)}
                        >
                            <CardContent style={pageStyles.cardContent}>
                                <Typography style={pageStyles.typographyLabel}>
                                    <CodeIcon fontSize="small" /> Code: <span style={pageStyles.typographyValue}>{e.meetingCode}</span>
                                </Typography>
                                <Typography style={pageStyles.typographyLabel}>
                                    <EventIcon fontSize="small" /> Date: <span style={pageStyles.typographyValue}>{formatDate(e.startTime)}</span>
                                </Typography>
                                <Typography style={pageStyles.typographyLabel}>
                                    <EventIcon fontSize="small" /> Meeting Type: <span style={pageStyles.typographyValue}>{e.meetingType}</span>
                                </Typography>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <Typography style={pageStyles.noMeetsMessage}>
                        You haven't had any meetings yet! Start one to see it here. 🚀
                    </Typography>
                )
            )}
            <style>
                {`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                `}
            </style>
        </div>
    );
}
