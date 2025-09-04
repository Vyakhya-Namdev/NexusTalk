import React, { useState, useContext } from 'react';
import {
    Box,
    Paper,
    Button,
    TextField,
    InputAdornment,
    Snackbar,
    ThemeProvider,
    createTheme,
    Typography,
    IconButton
} from '@mui/material';
import { AuthContext } from '../contexts/AuthContext';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';

const smileMeetTheme = createTheme({
    typography: {
        fontFamily: '"Inter", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", sans-serif',
        fontWeightBold: 600,
        h4: {
            fontWeight: 700,
            fontSize: '2.5rem',
            letterSpacing: '-0.02em'
        },
        h5: {
            fontWeight: 600,
            fontSize: '1.8rem',
            letterSpacing: '-0.01em'
        },
        h6: {
            fontWeight: 500,
            fontSize: '1rem'
        }
    },
    palette: {
        mode: 'dark',
        background: {
            default: '#0a0a0a',
            paper: 'rgba(255, 255, 255, 0.02)'
        },
        primary: {
            main: '#ff6b00',
            dark: '#e55a00',
            light: '#ff8533'
        },
        text: {
            primary: '#ffffff',
            secondary: 'rgba(255, 255, 255, 0.7)'
        }
    },
    shape: {
        borderRadius: 12
    }
});

export default function Authentication() {
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [formState, setFormState] = useState(0); // 0 = Sign In, 1 = Sign Up
    const [loading, setLoading] = useState(false);
    const { handleLogin, handleRegister } = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    let handleAuth = async () => {
        try {
            if (formState === 0) {
                setLoading(true);
                let result = await handleLogin(username, password);
                setLoading(false);
                setMessage(result.message || "User logged-in successfully!");
                setOpen(true);
                setError("");
                setLoading(false);
                setTimeout(() => {
                    navigate("/home");  
                }, 1000);
            }

            if (formState === 1) {
                let result = await handleRegister(name, username, password);
                console.log(result);
                setUsername("");
                setMessage(result);
                setOpen(true);
                setError("")
                setFormState(0)
                setPassword("")
            }
        } catch (err) {

            console.log(err);
            let message = (err.response.data.message);
            setError(message);
        }
    }

    return (
        <ThemeProvider theme={smileMeetTheme}>
            <Box sx={{
                minHeight: '100vh',
                minWidth: '100vw',
                background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                py: { xs: 2, md: 4 }
            }}>
                <Box sx={{
                    display: 'flex',
                    width: '100%',
                    maxWidth: 1200,
                    minHeight: { xs: 'auto', md: '80vh' },
                    borderRadius: '24px',
                    overflow: 'hidden',
                    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
                    mx: { xs: 2, md: 4 },
                    flexDirection: { xs: 'column', md: 'row' }
                }}>
                    {/* Left Panel - Brand Information */}
                    <Box sx={{
                        flex: 1,
                        background: 'linear-gradient(135deg, rgba(255, 107, 0, 0.15) 0%, rgba(255, 107, 0, 0.05) 100%)',
                        backdropFilter: 'blur(10px)',
                        p: { xs: 4, md: 6 },
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        borderTopLeftRadius: { xs: '24px', md: '24px' },
                        borderBottomLeftRadius: { xs: 0, md: '24px' },
                        borderTopRightRadius: { xs: '24px', md: 0 },
                        borderBottomRightRadius: 0,
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRight: { xs: '1px solid rgba(255, 255, 255, 0.1)', md: 'none' },
                        borderBottom: { xs: 'none', md: '1px solid rgba(255, 255, 255, 0.1)' }
                    }}>
                        <Typography sx={{
                            color: '#ff6b00',
                            fontWeight: 700,
                            fontSize: { xs: '2rem', md: '2.5rem' },
                            mb: 2,
                            letterSpacing: '-0.02em'
                        }}>
                            SmileMeet
                        </Typography>

                        <Typography sx={{
                            color: '#ffffff',
                            fontWeight: 600,
                            fontSize: { xs: '1.5rem', md: '1.8rem' },
                            mb: 2,
                            lineHeight: 1.2
                        }}>
                            Connect with your Loved Ones...
                        </Typography>

                        <Typography sx={{
                            color: 'rgba(255, 255, 255, 0.7)',
                            fontSize: { xs: '0.95rem', md: '1rem' },
                            mb: 3,
                            lineHeight: 1.5
                        }}>
                            From family to business, Connectly unites hearts and ideas across every screen
                        </Typography>

                        <Box component="ul" sx={{
                            listStyle: 'none',
                            p: 0,
                            display: { xs: 'none', md: 'block' }
                        }}>
                            {[
                                'High-quality video calls with crystal clear audio',
                                'Secure and encrypted conversations',
                                'Cross-platform compatibility',
                                'Group video calls with up to 100 participants',
                                'Screen sharing and file transfer'
                            ].map((text, index) => (
                                <Box key={index} component="li" sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    mb: 1.5,
                                    color: 'rgba(255, 255, 255, 0.8)',
                                    fontSize: '1rem'
                                }}>
                                    <Typography sx={{
                                        color: '#ff6b00',
                                        fontWeight: 900,
                                        fontSize: '1.2rem',
                                        mr: 1.5
                                    }}>
                                        ✓
                                    </Typography>
                                    {text}
                                </Box>
                            ))}
                        </Box>
                    </Box>

                    {/* Right Panel - Authentication Form */}
                    <Box sx={{
                        flex: 1,
                        background: 'rgba(255, 255, 255, 0.02)',
                        backdropFilter: 'blur(20px)',
                        p: { xs: 4, md: 6 },
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: { xs: '24px', md: 0 },
                        borderTopRightRadius: { xs: 0, md: '24px' },
                        borderBottomRightRadius: '24px',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderLeft: 'none'
                    }}>
                        {/* Tab Toggle */}
                        <Box sx={{
                            display: 'flex',
                            background: 'rgba(255, 255, 255, 0.05)',
                            borderRadius: '12px',
                            p: '1px',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            mb: 4
                        }}>
                            <Button
                                variant={formState === 0 ? 'contained' : 'text'}
                                onClick={() => { setFormState(0); setError(''); }}
                                sx={{
                                    flex: 1,
                                    py: 1.5,
                                    borderRadius: '8px',
                                    bgcolor: formState === 0 ? '#ff6b00' : 'transparent',
                                    color: formState === 0 ? '#ffffff' : 'rgba(255, 255, 255, 0.6)',
                                    fontWeight: 600,
                                    fontSize: '1rem',
                                    textTransform: 'none',
                                    boxShadow: formState === 0 ? '0 4px 12px rgba(255, 107, 0, 0.3)' : 'none',
                                    '&:hover': {
                                        bgcolor: formState === 0 ? '#ff6b00' : 'rgba(255, 255, 255, 0.05)'
                                    }
                                }}
                            >
                                Sign In
                            </Button>
                            <Button
                                variant={formState === 1 ? 'contained' : 'text'}
                                onClick={() => { setFormState(1); setError(''); }}
                                sx={{
                                    flex: 1,
                                    py: 1.5,
                                    borderRadius: '8px',
                                    bgcolor: formState === 1 ? '#ff6b00' : 'transparent',
                                    color: formState === 1 ? '#ffffff' : 'rgba(255, 255, 255, 0.6)',
                                    fontWeight: 600,
                                    fontSize: '1rem',
                                    textTransform: 'none',
                                    boxShadow: formState === 1 ? '0 4px 12px rgba(255, 107, 0, 0.3)' : 'none',
                                    '&:hover': {
                                        bgcolor: formState === 1 ? '#ff6b00' : 'rgba(255, 255, 255, 0.05)'
                                    }
                                }}
                            >
                                Sign Up
                            </Button>
                        </Box>

                        {/* Form Fields */}
                        <Box sx={{ mb: 3 }}>
                            {formState === 1 && (
                                <Box sx={{ mb: 2.5 }}>
                                    <Typography sx={{
                                        color: 'rgba(255, 255, 255, 0.8)',
                                        mb: 1,
                                        fontWeight: 500,
                                        fontSize: '0.9rem'
                                    }}>
                                        Full Name
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        placeholder="Enter your full name"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <PersonOutlineIcon sx={{ color: 'rgba(255, 255, 255, 0.5)' }} />
                                                </InputAdornment>
                                            ),
                                            sx: {
                                                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                                borderRadius: '12px',
                                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                                color: '#ffffff',
                                                '&:hover': {
                                                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                                                },
                                                '&.Mui-focused': {
                                                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                                                    borderColor: '#ff6b00',
                                                    boxShadow: '0 0 0 3px rgba(255, 107, 0, 0.1)',
                                                },
                                                '&:before, &:after': { display: 'none' }
                                            }
                                        }}
                                        variant="filled"
                                    />
                                </Box>
                            )}

                            <Box sx={{ mb: 2.5 }}>
                                <Typography sx={{
                                    color: 'rgba(255, 255, 255, 0.8)',
                                    mb: 1,
                                    fontWeight: 500,
                                    fontSize: '0.9rem'
                                }}>
                                    Email Address
                                </Typography>
                                <TextField
                                    fullWidth
                                    placeholder="Enter your email"
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <EmailOutlinedIcon sx={{ color: 'rgba(255, 255, 255, 0.5)' }} />
                                            </InputAdornment>
                                        ),
                                        sx: {
                                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                            borderRadius: '12px',
                                            border: '1px solid rgba(255, 255, 255, 0.1)',
                                            color: '#ffffff',
                                            '&:hover': {
                                                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                                            },
                                            '&.Mui-focused': {
                                                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                                                borderColor: '#ff6b00',
                                                boxShadow: '0 0 0 3px rgba(255, 107, 0, 0.1)',
                                            },
                                            '&:before, &:after': { display: 'none' }
                                        }
                                    }}
                                    variant="filled"
                                />
                            </Box>

                            <Box sx={{ mb: formState === 1 ? 2.5 : 3 }}>
                                <Typography sx={{
                                    color: 'rgba(255, 255, 255, 0.8)',
                                    mb: 1,
                                    fontWeight: 500,
                                    fontSize: '0.9rem'
                                }}>
                                    Password
                                </Typography>
                                <TextField
                                    fullWidth
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder={formState === 0 ? "Enter your password" : "Create a strong password"}
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LockOutlinedIcon sx={{ color: 'rgba(255, 255, 255, 0.5)' }} />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    edge="end"
                                                    sx={{ color: 'rgba(255, 255, 255, 0.5)' }}
                                                >
                                                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                        sx: {
                                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                            borderRadius: '12px',
                                            border: '1px solid rgba(255, 255, 255, 0.1)',
                                            color: '#ffffff',
                                            '&:hover': {
                                                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                                            },
                                            '&.Mui-focused': {
                                                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                                                borderColor: '#ff6b00',
                                                boxShadow: '0 0 0 3px rgba(255, 107, 0, 0.1)',
                                            },
                                            '&:before, &:after': { display: 'none' }
                                        }
                                    }}
                                    variant="filled"
                                />
                            </Box>

                            {formState === 1 && (
                                <Box sx={{ mb: 3 }}>
                                    <Typography sx={{
                                        color: 'rgba(255, 255, 255, 0.8)',
                                        mb: 1,
                                        fontWeight: 500,
                                        fontSize: '0.9rem'
                                    }}>
                                        Confirm Password
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        type="password"
                                        placeholder="Confirm your password"
                                        value={confirmPassword}
                                        onChange={e => setConfirmPassword(e.target.value)}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LockOutlinedIcon sx={{ color: 'rgba(255, 255, 255, 0.5)' }} />
                                                </InputAdornment>
                                            ),
                                            sx: {
                                                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                                borderRadius: '12px',
                                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                                color: '#ffffff',
                                                '&:hover': {
                                                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                                                },
                                                '&.Mui-focused': {
                                                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                                                    borderColor: '#ff6b00',
                                                    boxShadow: '0 0 0 3px rgba(255, 107, 0, 0.1)',
                                                },
                                                '&:before, &:after': { display: 'none' }
                                            }
                                        }}
                                        variant="filled"
                                    />
                                </Box>
                            )}

                            {error && (
                                <Typography sx={{
                                    color: '#ff4757',
                                    mb: 2,
                                    fontWeight: 500,
                                    fontSize: '0.875rem'
                                }}>
                                    {error}
                                </Typography>
                            )}

                            <Button
                                variant="contained"
                                fullWidth
                                onClick={handleAuth}
                                disabled={loading}
                                sx={{
                                    background: 'linear-gradient(135deg, #ff6b00 0%, #ff8533 100%)',
                                    color: '#ffffff',
                                    fontWeight: 600,
                                    fontSize: '1.1rem',
                                    py: 1,
                                    borderRadius: '12px',
                                    textTransform: 'none',
                                    boxShadow: '0 8px 20px rgba(255, 107, 0, 0.3)',
                                    mb: 3,
                                    '&:hover': {
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 12px 25px rgba(255, 107, 0, 0.4)',
                                    },
                                    '&:disabled': {
                                        background: 'rgba(255, 107, 0, 0.5)',
                                        color: 'rgba(255, 255, 255, 0.7)',
                                    }
                                }}
                            >
                                {loading
                                    ? (formState === 0 ? 'Signing In...' : 'Creating Account...')
                                    : (formState === 0 ? 'Sign In' : 'Create Account')
                                }
                            </Button>

                            {formState === 0 && (
                                <Box sx={{ textAlign: 'center', mb: 3 }}>
                                    <Button
                                        variant="text"
                                        sx={{
                                            color: '#ff6b00',
                                            textTransform: 'none',
                                            fontWeight: 500,
                                            fontSize: '0.9rem'
                                        }}
                                        onClick={() => {
                                            setMessage('Password reset instructions would be sent to your email');
                                            setOpen(true);
                                        }}
                                    >
                                        Forgot your password?
                                    </Button>
                                </Box>
                            )}
                        </Box>
                    </Box>
                </Box>

                <Snackbar
                    open={open}
                    autoHideDuration={4000}
                    message={message}
                    onClose={() => setOpen(false)}
                    sx={{
                        '& .MuiSnackbarContent-root': {
                            backgroundColor: 'rgba(0, 0, 0, 0.9)',
                            color: '#ffffff',
                            borderRadius: '12px',
                            border: '1px solid rgba(255, 107, 0, 0.3)',
                            backdropFilter: 'blur(10px)',
                        }
                    }}
                />
            </Box>
        </ThemeProvider>
    );
}