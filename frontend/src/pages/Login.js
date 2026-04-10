import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Grid, 
  Paper, 
  Avatar, 
  Stack, 
  useTheme,
  IconButton,
  InputAdornment,
  Alert,
  Fade
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';


const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  // View state: 'login' | 'forgot' | 'otp' | 'reset'
  const [view, setView] = useState('login');
  
  // Login states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Forgot Password states
  const [resetEmail, setResetEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login({ email, password });
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await axios.post('http://localhost:5000/api/auth/forgot-password', { email: resetEmail });
      setSuccess('Verification code sent to your email.');
      setView('otp');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await axios.post('http://localhost:5000/api/auth/verify-otp', { email: resetEmail, otp });
      setSuccess('OTP verified! You can now reset your password.');
      setView('reset');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid or expired OTP.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      return setError('Passwords do not match.');
    }
    setLoading(true);
    setError('');
    try {
      await axios.post('http://localhost:5000/api/auth/reset-password', { email: resetEmail, otp, password: newPassword });
      setSuccess('Password reset successful! Redirecting to login...');
      setTimeout(() => {
        setView('login');
        setSuccess('');
        setEmail(resetEmail);
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset password.');
    } finally {
      setLoading(false);
    }
  };

  const textFieldStyles = {
    '& .MuiOutlinedInput-root': { 
      borderRadius: '16px', 
      height: '56px',
      bgcolor: theme.palette.mode === 'light' ? '#fff' : 'rgba(15, 23, 42, 0.4)',
      transition: '0.3s all ease',
      border: `1px solid ${theme.palette.mode === 'light' ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)'}`,
      '&:hover': { border: `1px solid #FF2625` },
      '&.Mui-focused': { 
        boxShadow: theme.palette.mode === 'light' ? '0 0 10px rgba(255, 38, 37, 0.2)' : '0 0 15px rgba(255, 38, 37, 0.3)',
        border: `1px solid #FF2625`
      },
      '& fieldset': { border: 'none' }
    }
  };

  const renderView = () => {
    switch (view) {
      case 'forgot':
        return (
          <Box component="form" noValidate onSubmit={handleForgotPassword} sx={{ width: '100%' }}>
            <Typography variant="h5" fontWeight="900" sx={{ mb: 1, color: theme.palette.text.primary }}>Forgot Password?</Typography>
            <Typography variant="body2" sx={{ mb: 4, color: theme.palette.text.secondary }}>Enter your email to receive a 6-digit verification code.</Typography>
            <Stack spacing={3}>
              <TextField required fullWidth label="Email Address" value={resetEmail} onChange={(e) => setResetEmail(e.target.value)} sx={textFieldStyles} />
              <Button type="submit" fullWidth variant="contained" disabled={loading} sx={{ py: 2, borderRadius: '16px', background: 'linear-gradient(135deg, #FF2625, #FF8C00)', fontWeight: '800', textTransform: 'none' }}>
                {loading ? 'Sending...' : 'Send Verification OTP'}
              </Button>
              <Button onClick={() => setView('login')} sx={{ color: '#FF2625', fontWeight: '800', textTransform: 'none' }}>Back to Login</Button>
            </Stack>
          </Box>
        );
      case 'otp':
        return (
          <Box component="form" noValidate onSubmit={handleVerifyOtp} sx={{ width: '100%' }}>
            <Typography variant="h5" fontWeight="900" sx={{ mb: 1, color: theme.palette.text.primary }}>Verify OTP</Typography>
            <Typography variant="body2" sx={{ mb: 4, color: theme.palette.text.secondary }}>Enter the 6-digit code sent to <b>{resetEmail}</b>.</Typography>
            <Stack spacing={3}>
              <TextField required fullWidth label="6-Digit Code" value={otp} onChange={(e) => setOtp(e.target.value)} sx={textFieldStyles} inputProps={{ maxLength: 6, style: { textAlign: 'center', letterSpacing: '10px', fontSize: '20px' } }} />
              <Button type="submit" fullWidth variant="contained" disabled={loading} sx={{ py: 2, borderRadius: '16px', background: 'linear-gradient(135deg, #FF2625, #FF8C00)', fontWeight: '800', textTransform: 'none' }}>
                {loading ? 'Verifying...' : 'Verify & Continue'}
              </Button>
              <Button onClick={() => setView('forgot')} sx={{ color: '#FF2625', fontWeight: '800', textTransform: 'none' }}>Resend Code</Button>
            </Stack>
          </Box>
        );
      case 'reset':
        return (
          <Box component="form" noValidate onSubmit={handleResetPassword} sx={{ width: '100%' }}>
            <Typography variant="h5" fontWeight="900" sx={{ mb: 1, color: theme.palette.text.primary }}>Set New Password</Typography>
            <Typography variant="body2" sx={{ mb: 4, color: theme.palette.text.secondary }}>Choose a strong password for your elite account.</Typography>
            <Stack spacing={3}>
              <TextField required fullWidth label="New Password" type={showNewPassword ? 'text' : 'password'} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} sx={textFieldStyles}
                InputProps={{ endAdornment: ( <InputAdornment position="end"><IconButton onClick={() => setShowNewPassword(!showNewPassword)} edge="end"><VisibilityOff /></IconButton></InputAdornment> ) }} />
              <TextField required fullWidth label="Confirm Password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} sx={textFieldStyles} />
              <Button type="submit" fullWidth variant="contained" disabled={loading} sx={{ py: 2, borderRadius: '16px', background: 'linear-gradient(135deg, #FF2625, #FF8C00)', fontWeight: '800', textTransform: 'none' }}>
                {loading ? 'Resetting...' : 'Update Password'}
              </Button>
            </Stack>
          </Box>
        );
      default:
        return (
          <Box component="form" noValidate onSubmit={handleLogin} sx={{ width: '100%' }}>
              <Stack spacing={3}>
                  <TextField required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus value={email} onChange={(e) => setEmail(e.target.value)} sx={textFieldStyles} />
                  <Box>
                    <TextField required fullWidth name="password" label="Password" type={showPassword ? 'text' : 'password'} id="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)}
                        InputProps={{ endAdornment: ( <InputAdornment position="end"><IconButton onClick={() => setShowPassword(!showPassword)} edge="end" sx={{ color: theme.palette.text.secondary }}>{showPassword ? <VisibilityOff /> : <Visibility />}</IconButton></InputAdornment> ), }}
                        sx={textFieldStyles} />
                    <Box sx={{ textAlign: 'right', mt: 1 }}>
                      <Typography variant="caption" onClick={() => setView('forgot')} sx={{ color: '#FF2625', fontWeight: '800', cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>Forgot Password?</Typography>
                    </Box>
                  </Box>
                  <Button type="submit" fullWidth variant="contained" disabled={loading} sx={{ py: 2, mt: 1, borderRadius: '16px', background: 'linear-gradient(135deg, #FF2625, #FF8C00)', fontSize: '17px', fontWeight: '800', textTransform: 'none', boxShadow: '0 10px 25px rgba(255, 38, 37, 0.3)', '&:hover': { transform: 'translateY(-2px) scale(1.02)', boxShadow: '0 15px 35px rgba(255, 38, 37, 0.4)', background: 'linear-gradient(135deg, #FF2625, #FF8C00)', } }}>
                      {loading ? 'Authenticating...' : 'Sign In To Elite'}
                  </Button>
                  <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="body2" sx={{ color: theme.palette.text.secondary, fontWeight: '500', mt: 2 }}>
                          Don't have an elite account?{" "}
                          <Link to="/signup" style={{ textDecoration: 'none', color: '#FF2625', fontWeight: '800' }}>Sign Up Now</Link>
                      </Typography>
                  </Box>
              </Stack>
          </Box>
        );
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={view}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <Box 
            sx={{ 
                minHeight: '100vh', 
                display: 'flex', 
                alignItems: 'center', 
                background: theme.palette.mode === 'light' 
                  ? 'linear-gradient(135deg, #FDFCFB 0%, #FFE2E2 100%)' 
                  : 'linear-gradient(135deg, #020617 0%, #0F172A 100%)',
                mx: { xs: '-20px', sm: '-40px' }, 
                mt: '-70px',
                width: { xs: 'calc(100% + 40px)', sm: 'calc(100% + 80px)' },
                overflow: 'hidden'
            }}
        >
          <Grid container sx={{ height: '100vh' }}>
            {/* Left Section: Glassmorphism Informational Card */}
            <Grid item xs={false} sm={5} md={6} sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', justifyContent: 'center', p: 4, position: 'relative' }}>
              <motion.div initial={{ opacity: 0, x: -60, scale: 0.9 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ duration: 1, ease: 'easeOut' }}>
                <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
                  <Paper elevation={0} sx={{ p: 6, maxWidth: '520px', borderRadius: '32px', background: theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(30px)', border: `1px solid ${theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.05)'}`, boxShadow: '0 30px 60px rgba(0,0,0,0.1)' }}>
                    <Avatar sx={{ background: '#FF2625', width: 64, height: 64, mb: 4, boxShadow: '0 10px 20px rgba(255, 38, 37, 0.3)' }}><FitnessCenterIcon fontSize="large" /></Avatar>
                    <Typography variant="h2" fontWeight="900" sx={{ mb: 3, lineHeight: 1.3, fontSize: { sm: '42px', md: '54px' }, letterSpacing: '-2px', color: theme.palette.text.primary }}>
                      Start Your Fitness <br /><span style={{ background: 'linear-gradient(90deg, #FF2625, #FF8C00)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', paddingRight: '10px' }}>Journey</span> Today 💪
                    </Typography>
                    <Typography variant="h6" sx={{ color: theme.palette.text.secondary, lineHeight: 1.7, fontWeight: '500', opacity: 0.8, maxWidth: '420px' }}>
                      Welcome back. Log in to your premium profile and continue your fitness evolution.
                    </Typography>
                    <Box sx={{ width: '80px', height: '6px', background: '#FF2625', borderRadius: '10px', mt: 4, opacity: 0.3 }} />
                  </Paper>
                </motion.div>
              </motion.div>
            </Grid>

            {/* Right Side: Premium Login Form Card */}
            <Grid item xs={12} sm={7} md={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: { xs: 2, sm: 4 } }}>
              <motion.div initial={{ opacity: 0, x: 60, scale: 0.95 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ duration: 1, ease: 'easeOut' }}>
                <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
                    <Paper elevation={0} sx={{ p: { xs: 4, md: 6 }, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '460px', borderRadius: '28px', bgcolor: theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(20px)', border: `1px solid ${theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.05)'}`, boxShadow: '0 40px 100px rgba(0,0,0,0.1)' }}>
                        <Avatar sx={{ background: 'linear-gradient(135deg, #FF2625, #FF8C00)', width: 64, height: 64, mb: 3, boxShadow: '0 10px 20px rgba(255, 38, 37, 0.2)' }}>
                            <LockOutlinedIcon fontSize="large" />
                        </Avatar>
                        <Box sx={{ textAlign: 'center', mb: 5 }}>
                            <Typography component="h1" variant="h3" fontWeight="900" sx={{ color: theme.palette.text.primary, letterSpacing: '-1.5px', mb: 1 }}>
                                {view === 'login' ? 'Elite Login' : 'Elite Access'}
                            </Typography>
                            <Typography variant="body1" sx={{ color: theme.palette.text.secondary, fontWeight: '500' }}>
                                {view === 'login' ? 'Sign in to your transformation profile.' : 'Security-first elite reset flow.'}
                            </Typography>
                        </Box>
                        {error && ( <Fade in={!!error}><Alert severity="error" sx={{ width: '100%', mb: 4, borderRadius: '12px', fontWeight: '600' }}>{error}</Alert></Fade> )}
                        {success && ( <Fade in={!!success}><Alert severity="success" sx={{ width: '100%', mb: 4, borderRadius: '12px', fontWeight: '600' }}>{success}</Alert></Fade> )}
                        {renderView()}
                    </Paper>
                </motion.div>
              </motion.div>
            </Grid>
          </Grid>
        </Box>
      </motion.div>
    </AnimatePresence>
  );
};

export default Login;
