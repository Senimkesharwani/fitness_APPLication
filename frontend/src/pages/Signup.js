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
  Fade,
  CircularProgress
} from '@mui/material';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';

const Signup = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { register } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const validateForm = () => {
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.password || !formData.confirmPassword) {
      setError('All fields are required');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!/^\d{10,}$/.test(formData.phone)) {
      setError('Phone number must be at least 10 digits');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError('');

    try {
      await register({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        password: formData.password
      });
      setSuccess(true);
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const textFieldStyles = {
    '& .MuiOutlinedInput-root': { 
      borderRadius: '14px', 
      height: '52px',
      overflow: 'visible',
      bgcolor: theme.palette.mode === 'light' ? '#fff' : 'rgba(15, 23, 42, 0.4)',
      transition: '0.3s all ease',
      border: `1px solid ${theme.palette.mode === 'light' ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.06)'}`,
      '&:hover': { border: `1px solid #FF2625` },
      '&.Mui-focused': { 
        boxShadow: theme.palette.mode === 'light' ? '0 0 10px rgba(255, 38, 37, 0.18)' : '0 0 15px rgba(255, 38, 37, 0.3)',
        border: `1px solid #FF2625`
      },
      '& fieldset': { border: 'none' }
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: '#FF2625'
    }
  };

  return (
    <AnimatePresence>
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
          pt: '70px',
          width: { xs: 'calc(100% + 40px)', sm: 'calc(100% + 80px)' },
          overflow: 'hidden'
        }}
      >
        <Grid container sx={{ height: '100vh' }}>

          {/* Left Section: Glassmorphism Informational Card */}
          <Grid 
            item 
            xs={false} 
            sm={5} 
            md={6} 
            sx={{ 
              display: { xs: 'none', sm: 'flex' }, 
              alignItems: 'center', 
              justifyContent: 'center', 
              p: 4, 
              position: 'relative' 
            }}
          >
            <motion.div
              initial={{ opacity: 0, x: -60, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
            >
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 6,
                    maxWidth: '520px',
                    borderRadius: '32px',
                    background: theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(15, 23, 42, 0.4)',
                    backdropFilter: 'blur(30px)',
                    border: `1px solid ${theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.05)'}`,
                    boxShadow: '0 30px 60px rgba(0,0,0,0.1)'
                  }}
                >
                  <Avatar sx={{ background: '#FF2625', width: 64, height: 64, mb: 4, boxShadow: '0 10px 20px rgba(255, 38, 37, 0.3)' }}>
                    <FitnessCenterIcon fontSize="large" />
                  </Avatar>
                  
                  <Typography 
                    variant="h2" 
                    fontWeight="900" 
                    sx={{ 
                        mb: 3, 
                        lineHeight: 1.3, 
                        fontSize: { sm: '42px', md: '54px' }, 
                        letterSpacing: '-2px',
                        color: theme.palette.text.primary
                    }}
                  >
                    Start Your Fitness <br />
                    <span style={{ 
                        background: 'linear-gradient(90deg, #FF2625, #FF8C00)', 
                        WebkitBackgroundClip: 'text', 
                        WebkitTextFillColor: 'transparent',
                        paddingRight: '10px'
                    }}>Journey</span> Today 💪
                  </Typography>

                  <Typography 
                    variant="h6" 
                    sx={{ 
                        color: theme.palette.text.secondary, 
                        lineHeight: 1.7, 
                        fontWeight: '500', 
                        opacity: 0.8,
                        maxWidth: '420px'
                    }}
                  >
                    Experience the future of fitness with AI-powered personalized workout recommendations. Join our elite community.
                  </Typography>

                  <Box sx={{ width: '80px', height: '6px', background: '#FF2625', borderRadius: '10px', mt: 4, opacity: 0.3 }} />
                </Paper>
              </motion.div>
            </motion.div>
          </Grid>

          {/* Right Section: Premium Signup Form Card */}
          <Grid 
            item 
            xs={12} 
            sm={7} 
            md={6} 
            sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                p: { xs: 2, sm: 4 } 
            }}
          >
            <motion.div
              initial={{ opacity: 0, x: 60, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              style={{ width: '100%', maxWidth: '460px' }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3, sm: 4, md: 5 },
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '100%',
                  borderRadius: '28px',
                  bgcolor: theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.88)' : 'rgba(15, 23, 42, 0.8)',
                  backdropFilter: 'blur(20px)',
                  border: `1px solid ${theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.05)'}`,
                  boxShadow: '0 30px 80px rgba(0,0,0,0.12)'
                }}
              >
                <Avatar sx={{ background: 'linear-gradient(135deg, #FF2625, #FF8C00)', width: 64, height: 64, mb: 2.5, boxShadow: '0 10px 20px rgba(255, 38, 37, 0.25)' }}>
                  <PersonAddOutlinedIcon fontSize="large" />
                </Avatar>
                
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                  <Typography component="h1" variant="h4" fontWeight="900" sx={{ color: theme.palette.text.primary, letterSpacing: '-1.5px', mb: 0.5 }}>
                    Elite Signup
                  </Typography>
                  <Typography variant="body2" sx={{ color: theme.palette.text.secondary, fontWeight: '500' }}>
                    Create your premium fitness profile.
                  </Typography>
                </Box>

                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ width: '100%' }}>
                  <Stack spacing={2} sx={{ pt: 1.5 }}>

                    {/* Success Alert */}
                    {success && (
                      <Fade in={success}>
                        <Alert severity="success" sx={{ borderRadius: '12px', fontWeight: '600' }}>
                          🎉 Account created! Redirecting to dashboard...
                        </Alert>
                      </Fade>
                    )}

                    {/* Error Alert */}
                    {error && (
                      <Fade in={!!error}>
                        <Alert 
                          severity="error" 
                          sx={{ 
                            borderRadius: '12px', 
                            fontWeight: '600',
                            '& .MuiAlert-message': { width: '100%' }
                          }}
                        >
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                            <Typography variant="body2" sx={{ fontWeight: '600' }}>{error}</Typography>
                            {error.toLowerCase().includes('already exists') && (
                              <Button 
                                component={Link} 
                                to="/login" 
                                size="small" 
                                variant="outlined" 
                                color="inherit"
                                sx={{ 
                                  ml: 2, 
                                  fontSize: '11px', 
                                  fontWeight: '800', 
                                  borderRadius: '8px',
                                  textTransform: 'none'
                                }}
                              >
                                Login Now
                              </Button>
                            )}
                          </Box>
                        </Alert>
                      </Fade>
                    )}

                    {/* Full Name */}
                    <TextField
                      required
                      fullWidth
                      id="name"
                      label="Full Name"
                      name="name"
                      autoComplete="off"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={loading || success}
                      sx={textFieldStyles}
                    />

                    {/* Email */}
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={loading || success}
                      error={!!error && (error.toLowerCase().includes('email') || error.toLowerCase().includes('already exists'))}
                      sx={{
                        ...textFieldStyles,
                        '& .MuiOutlinedInput-root': {
                          ...textFieldStyles['& .MuiOutlinedInput-root'],
                          border: !!error && (error.toLowerCase().includes('email') || error.toLowerCase().includes('already exists'))
                            ? '1px solid #d32f2f'
                            : textFieldStyles['& .MuiOutlinedInput-root'].border
                        }
                      }}
                    />

                    {/* Phone */}
                    <TextField
                      required
                      fullWidth
                      id="phone"
                      label="Phone Number"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="1234567890"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={loading || success}
                      sx={textFieldStyles}
                    />

                    {/* Password */}
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      autoComplete="new-password"
                      placeholder="Min. 6 characters"
                      value={formData.password}
                      onChange={handleChange}
                      disabled={loading || success}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton 
                              onClick={() => setShowPassword(!showPassword)} 
                              edge="end" 
                              sx={{ color: theme.palette.text.secondary }}
                              tabIndex={-1}
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      sx={textFieldStyles}
                    />

                    {/* Confirm Password */}
                    <TextField
                      required
                      fullWidth
                      name="confirmPassword"
                      label="Confirm Password"
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      autoComplete="new-password"
                      placeholder="Re-enter password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      disabled={loading || success}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton 
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
                              edge="end" 
                              sx={{ color: theme.palette.text.secondary }}
                              tabIndex={-1}
                            >
                              {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      sx={textFieldStyles}
                    />

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      disabled={loading || success}
                      sx={{ 
                        py: 1.8, 
                        mt: 1, 
                        borderRadius: '14px',
                        background: 'linear-gradient(135deg, #FF2625, #FF8C00)',
                        fontSize: '16px',
                        fontWeight: '800',
                        textTransform: 'none',
                        boxShadow: '0 10px 25px rgba(255, 38, 37, 0.3)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-2px) scale(1.02)',
                          boxShadow: '0 15px 35px rgba(255, 38, 37, 0.4)',
                          background: 'linear-gradient(135deg, #FF2625, #FF8C00)',
                        },
                        '&:disabled': {
                          background: 'linear-gradient(135deg, #FF2625, #FF8C00)',
                          opacity: 0.7,
                          color: '#fff'
                        }
                      }}
                    >
                      {loading ? (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          <CircularProgress size={20} sx={{ color: '#fff' }} />
                          Creating Account...
                        </Box>
                      ) : success ? 'Account Created! ✓' : 'Create Elite Account'}
                    </Button>

                    {/* Sign In Link */}
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="body2" sx={{ color: theme.palette.text.secondary, fontWeight: '500' }}>
                        Already have an account?{" "}
                        <Link to="/login" style={{ textDecoration: 'none', color: '#FF2625', fontWeight: '800' }}>Sign In</Link>
                      </Typography>
                    </Box>

                  </Stack>
                </Box>
              </Paper>
            </motion.div>
          </Grid>

        </Grid>
      </Box>
    </AnimatePresence>
  );
};

export default Signup;
