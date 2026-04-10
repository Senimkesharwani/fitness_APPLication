import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Grid, Paper, Stack, useTheme, Zoom } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { motion } from 'framer-motion';
import axios from 'axios';
import { CircularProgress } from '@mui/material';

const Contact = () => {
  const theme = useTheme();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const validate = () => {
    let tempErrors = {};
    if (!formState.name) tempErrors.name = "Full Name is required";
    if (!formState.email) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      tempErrors.email = "Please enter a valid email address";
    }
    if (!formState.phone) {
      tempErrors.phone = "Phone number is required";
    } else if (!/^\d{10,}$/.test(formState.phone)) {
      tempErrors.phone = "Phone number must be at least 10 digits (numeric only)";
    }
    if (!formState.message) tempErrors.message = "Message is required";
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      setErrorMessage('');
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/contact`, formState);
        if (response.data.success) {
          setIsSubmitted(true);
          setFormState({ name: '', email: '', phone: '', subject: '', message: '' });
        } else {
          setErrorMessage(response.data.message || 'Something went wrong. Please try again.');
        }
      } catch (error) {
        console.error('Contact submit error:', error);
        setErrorMessage(error.response?.data?.message || 'Server connection failed. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing again
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <Box id="contact" sx={{ py: { lg: '30px', xs: '20px' }, pb: { lg: '80px', xs: '40px' }, width: '100%', scrollMarginTop: '100px' }}>
      <Typography 
        variant="h3" 
        sx={{ fontWeight: '800', textAlign: 'center', mb: '40px', fontSize: { lg: '48px', xs: '32px' }, color: theme.palette.text.primary }}
      >
        Get In <span style={{ color: '#FF2625' }}>Touch</span>
      </Typography>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <Paper
          elevation={0}
          sx={{
            p: { lg: 8, xs: 4 },
            borderRadius: '40px',
            background: theme.palette.mode === 'light' 
                ? 'rgba(255, 38, 37, 0.02)' 
                : 'rgba(15, 23, 42, 0.8)',
            border: `1px solid ${theme.palette.divider}`,
            backdropFilter: 'blur(10px)',
          }}
        >
          <Grid container spacing={6}>
            <Grid item xs={12} md={5}>
              <Stack spacing={4}>
                <Typography variant="h4" fontWeight="800" sx={{ color: theme.palette.text.primary }}>
                  Have Questions?
                </Typography>
                <Typography variant="body1" sx={{ color: theme.palette.text.secondary, lineHeight: '1.8', fontSize: '18px' }}>
                  Our AI Fitness platform is designed to make your fitness journey easier. Reach out for any inquiries or support.
                </Typography>
                <Box>
                    <Typography fontWeight="700" color="#FF2625" sx={{ textTransform: 'uppercase', fontSize: '12px', mb: 1, letterSpacing: '1px' }}>Email Us</Typography>
                    <Typography variant="h6" sx={{ color: theme.palette.text.primary, fontWeight: '600' }}>support@fitnessapp.com</Typography>
                </Box>
                <Box>
                    <Typography fontWeight="700" color="#FF2625" sx={{ textTransform: 'uppercase', fontSize: '12px', mb: 1, letterSpacing: '1px' }}>Reach Us At</Typography>
                    <Typography variant="h6" sx={{ color: theme.palette.text.primary, fontWeight: '600' }}>123 Fitness Street, India</Typography>
                </Box>
              </Stack>
            </Grid>
            <Grid item xs={12} md={7}>
              {!isSubmitted ? (
                <form onSubmit={handleSubmit}>
                  <Stack spacing={3}>
                      <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                              <TextField 
                                  fullWidth 
                                  label="Full Name" 
                                  name="name"
                                  value={formState.name}
                                  onChange={handleChange}
                                  error={!!errors.name}
                                  helperText={errors.name}
                                  variant="outlined"
                                  placeholder="Enter your name"
                                  sx={{ 
                                      bgcolor: theme.palette.background.default, 
                                      borderRadius: '12px',
                                      '& .MuiOutlinedInput-root': {
                                          '& fieldset': { borderColor: theme.palette.divider },
                                          '&:hover fieldset': { borderColor: '#FF2625' }
                                      }
                                  }}
                              />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                              <TextField 
                                  fullWidth 
                                  label="Email Address" 
                                  name="email"
                                  value={formState.email}
                                  onChange={handleChange}
                                  error={!!errors.email}
                                  helperText={errors.email}
                                  variant="outlined"
                                  placeholder="Enter your email"
                                  sx={{ 
                                      bgcolor: theme.palette.background.default, 
                                      borderRadius: '12px',
                                      '& .MuiOutlinedInput-root': {
                                          '& fieldset': { borderColor: theme.palette.divider },
                                          '&:hover fieldset': { borderColor: '#FF2625' }
                                      }
                                  }}
                              />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                              <TextField 
                                  fullWidth 
                                  label="Phone Number" 
                                  name="phone"
                                  type="tel"
                                  value={formState.phone}
                                  onChange={handleChange}
                                  error={!!errors.phone}
                                  helperText={errors.phone}
                                  variant="outlined"
                                  placeholder="Enter your phone number"
                                  sx={{ 
                                      bgcolor: theme.palette.background.default, 
                                      borderRadius: '12px',
                                      '& .MuiOutlinedInput-root': {
                                          '& fieldset': { borderColor: theme.palette.divider },
                                          '&:hover fieldset': { borderColor: '#FF2625' }
                                      }
                                  }}
                              />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                              <TextField 
                                  fullWidth 
                                  label="Subject" 
                                  name="subject"
                                  value={formState.subject}
                                  onChange={handleChange}
                                  variant="outlined"
                                  placeholder="Enter query subject"
                                  sx={{ 
                                      bgcolor: theme.palette.background.default, 
                                      borderRadius: '12px',
                                      '& .MuiOutlinedInput-root': {
                                          '& fieldset': { borderColor: theme.palette.divider },
                                          '&:hover fieldset': { borderColor: '#FF2625' }
                                      }
                                  }}
                              />
                          </Grid>
                      </Grid>
                      <TextField 
                          fullWidth 
                          label="Message" 
                          name="message"
                          value={formState.message}
                          onChange={handleChange}
                          error={!!errors.message}
                          helperText={errors.message}
                          variant="outlined" 
                          multiline 
                          rows={4}
                          placeholder="Tell us what you need help with..."
                          sx={{ 
                              bgcolor: theme.palette.background.default, 
                              borderRadius: '12px',
                              '& .MuiOutlinedInput-root': {
                                  '& fieldset': { borderColor: theme.palette.divider },
                                  '&:hover fieldset': { borderColor: '#FF2625' }
                              }
                          }}
                      />
                      {errorMessage && (
                        <Box sx={{ p: 2, bgcolor: 'rgba(211, 47, 47, 0.05)', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: 1, border: '1px solid rgba(211, 47, 47, 0.2)' }}>
                          <ErrorOutlineIcon color="error" />
                          <Typography variant="body2" color="error.main" fontWeight="600">{errorMessage}</Typography>
                        </Box>
                      )}
                      <Button 
                          type="submit"
                          variant="contained" 
                          size="large"
                          disabled={loading}
                          endIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
                          sx={{ 
                              bgcolor: '#FF2625', 
                              py: 2, 
                              borderRadius: '10px',
                              fontWeight: '700',
                              fontSize: '16px',
                              '&:hover': { bgcolor: '#e02221', transform: 'scale(1.02)' },
                              transition: 'all 0.3s ease',
                              boxShadow: '0 10px 30px rgba(255, 38, 37, 0.2)'
                          }}
                      >
                          {loading ? 'Sending...' : 'Send Message'}
                      </Button>
                  </Stack>
                </form>
              ) : (
                <Zoom in={isSubmitted}>
                    <Box 
                        sx={{ 
                            height: '100%', 
                            display: 'flex', 
                            flexDirection: 'column', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            textAlign: 'center',
                            py: 4
                        }}
                    >
                        <CheckCircleOutlineIcon sx={{ fontSize: '100px', color: '#FF2625', mb: 3 }} />
                        <Typography variant="h4" fontWeight="800" sx={{ mb: 2, color: theme.palette.text.primary }}>
                            Message Sent Successfully!
                        </Typography>
                        <Typography variant="body1" sx={{ color: theme.palette.text.secondary, mb: 4, fontSize: '18px' }}>
                           👉 Thank you! Your message has been sent successfully. We'll get back to you as soon as possible.
                        </Typography>
                        <Button 
                            variant="outlined" 
                            onClick={() => setIsSubmitted(false)}
                            sx={{ 
                                color: '#FF2625', 
                                borderColor: '#FF2625', 
                                borderRadius: '10px',
                                px: 4,
                                '&:hover': { borderColor: '#e02221', bgcolor: 'rgba(255, 38, 37, 0.05)' }
                            }}
                        >
                            Send Another Message
                        </Button>
                    </Box>
                </Zoom>
              )}
            </Grid>
          </Grid>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default Contact;
