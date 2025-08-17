import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../contexts/AuthContext';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import HomeIcon from "@mui/icons-material/Home";


export default function History() {
    const { getHistoryOfUser } = useContext(AuthContext);
    const [meetings, setMeetings] = useState([]);
    const routeTo = useNavigate();

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const history = await getHistoryOfUser();
                setMeetings(history);
            } catch (err) {
                console.log(err);
            }
        }

        fetchHistory();
    }, []);

    let formDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();

        return `${month}/${date}/${year}`
    }

    return (
        <div>
            <IconButton onClick={() => routeTo("/home")}>
                <HomeIcon />
            </IconButton>

            {meetings.length > 0 ? (meetings.map((e, idx) => {
                <h3>Jello</h3>
                return (
                    <>
                        <Card key={idx} variant="outlined">
                            <CardContent>
                                <Typography sx={{ color: 'text.secondary', fontSize: 14 }}>
                                    Code: {e.meetingCode}
                                </Typography>
                                <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
                                    Data: {e.date}
                                </Typography>
                                
                            </CardContent>
                        </Card>
                    </>
                )
            })) : <h1>Not an array</h1>}
        </div>
    )
}
