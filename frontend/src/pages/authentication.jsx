import React, { useState, useContext } from 'react';
import { TextField, Button, Box, ThemeProvider, Grid, createTheme, Paper, Avatar, Snackbar, CssBaseline } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { AuthContext } from "../contexts/AuthContext";
import Background from './background';

const defaultTheme = createTheme();
export default function Authentication() {
    const [username, setUsername] = useState();  //useState is used to notify about what changes we need to do
    const [name, setName] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();
    const [message, setMessage] = useState();
    const [formState, setFormState] = useState(0);  //to switch b/w login & signup page
    const { handleRegister, handleLogin } = useContext(AuthContext);   //Register & login from AuthContext file

    // Snackbar: a small, temporary message that auto-disappears (e.g. success/error)
    const [open, setOpen] = useState(false);


    let handleAuth = async () => {
        try {
            if (formState === 0) {
                let result = await handleLogin(username, password);
            }

            if (formState === 1) {
                let result = await handleRegister(name, username, password);
                console.log(result);
                setUsername("");
                setMessage(result);
                setOpen(true);
                setError("");
                setFormState(0);
                setPassword("");
            }
        } catch (err) {
            console.log(err);
            let message = (err.response.data.message);
            setError(message);
        }
    }
    return (
        <ThemeProvider theme={defaultTheme}>
            {/* <Background /> */}
            <Grid container component="main" sx={{ height: '100vh', width: '100%', margin: 0, padding: 0, overflow: 'hidden',display:'flex'}}>
                <CssBaseline />
                <Grid item xs={12} sm={6} md={10} sx={{height: "100vh", width:"100%",position:"absolute"}}>
                    <Background />
                </Grid>

                {/* Right side form */}
                <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    component={Paper}
                    elevation={8}
                    square
                    sx={{ px: 4, display: 'flex', width: "55%", alignItems: 'center', justifyContent: 'center' }}
                >
                    <Box sx={{ width: '100%', mt: formState === 1 ? 0 : 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />

                        </Avatar>

                        <Box sx={{ mb: 2 }}>
                            <Button
                                variant={formState === 0 ? 'contained' : 'text'}
                                onClick={() => setFormState(0)}
                                sx={{ mr: 2 }}
                            >
                                Sign In
                            </Button>
                            <Button
                                variant={formState === 1 ? 'contained' : 'text'}
                                onClick={() => setFormState(1)}
                            >
                                Sign Up
                            </Button>
                        </Box>

                        <Box component="form" sx={{ width: '75%' }}>
                            <Box sx={{ visibility: formState === 1 ? 'visible' : 'hidden', height: formState === 1 ? 'auto' : 0 }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Full Name"
                                    name="name"
                                    value={name}    //pass it to make the input textfield empty if registered successfully (done in handleAuth function)
                                    autoFocus={formState === 1}
                                    onChange={e => setName(e.target.value)}
                                />
                            </Box>

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                value={username}  //pass it to make the input textfield empty if registered/login successfully (done in handleAuth function)
                                autoFocus={formState === 0}
                                onChange={e => setUsername(e.target.value)}
                            />

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="password"
                                label="Password"
                                name="password"
                                type="password"
                                value={password}  //pass it to make the input textfield empty if registered/login successfully (done in handleAuth function)
                                onChange={e => setPassword(e.target.value)}
                            />
                            <p style={{ color: 'red' }}>{error}</p>

                            <Button
                                type="button"
                                variant="contained"
                                fullWidth
                                sx={{ mt: 3, mb: 2 }}
                                onClick={handleAuth}
                            >
                                {formState === 1 ? 'Register' : 'Login'}
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>

            <Snackbar
                open={open}
                autoHideDuration={3000}
                message={message}
            />
        </ThemeProvider>
    );
}
