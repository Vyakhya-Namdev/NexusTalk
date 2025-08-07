import React, { useState } from 'react';
import { TextField, Button, Box, ThemeProvider, Grid, createTheme, Paper, Avatar, Snackbar } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const defaultTheme = createTheme();
export default function Authentication() {
    const [username, setUsername] = useState();  //useState is used to notify about what changes we need to do
    const [name, setName] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();
    const [messages, setMessages] = useState();
    const [formState, setFormState] = useState(0);

    // Snackbar: a small, temporary message that auto-disappears (e.g. success/error)
    const [open, setOpen] = useState(false);
    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: "100vh" }}>
                <Grid 
                    item
                    xs={false}
                    sm={4}
                    md={7}
                     sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />

                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box 
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m:1, bgcolor:'secondary.main'}}>
                            <LockOutlinedIcon />
                        </Avatar>

                        <div>
                            <Button style={{margin: "5px"}}
                                variant={formState === 0 ? "contained" : ""} onClick={() => { setFormState(0) }}>Sign In</Button>
                            <Button
                                variant={formState === 1 ? "contained" : ""}
                                onClick={() => setFormState(1)}>Sign Up</Button>
                        </div>
                    
                        <Box component='form'>
                            {formState === 1 ? 
                                <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Full Name"
                                name="username"
                                value={name}
                                autoFocus
                                onChange={(e) => setUsername(e.target.value)}
                            /> : <></>}
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                value={username}
                                autoFocus
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="password"
                                label="Password"
                                name="password"
                                value={password}
                                autoFocus
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <p style={{ color: 'red' }}>{error}</p>

                            <Button
                                type='button'
                                variant='contained'
                                fullWidth
                                sx={{ mt: 3, mb: 2 }}
                            // onClick={handleAuth}
                            >{formState === 1 ? "Register" : "Login"}</Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <Snackbar 
                open={open}
                autoHideDuration={3000}
                message={messages}
            />
        </ThemeProvider>
    )
}
