import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../contexts/AuthContext';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


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
                //Implement Snackbar
            }
        }

        fetchHistory();
    }, []);
    return (
        <div>
            {meetings.map(e => {
                return (
                    <Card variant="outlined">
                        <CardContent>
                            <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                                Word of the Day
                            </Typography>
                            <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>adjective</Typography>
                            <Typography variant="body2">
                                well meaning and kindly.
                                <br />
                                {'"a benevolent smile"'}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                    </Card>
                )
            })}
        </div>
    )
}
