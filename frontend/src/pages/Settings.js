import React, { useState, useContext } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Paper, 
  TextField, 
  Button, 
  Stack, 
  Alert, 
  InputAdornment, 
  IconButton,
  Grid,
  useTheme
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import axios from 'axios';

import { AuthContext } from '../context/AuthContext';

const Settings = () => {
    const { user, token, logout } = useContext(AuthContext);
    const theme = useTheme();

    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [phone, setPhone] = useState(user?.phone || '');

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleUpdateDetails = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');
        try {
            await axios.put(`${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/auth/updatedetails`, 
                { name, email, phone }, 
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setSuccess('Profile updated successfully!');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update profile.');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            return setError('New passwords do not match.');
        }
        setLoading(true);
        setError('');
        setSuccess('');
        try {
            await axios.put(`${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/auth/updatepassword`, 
                { currentPassword, newPassword }, 
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setSuccess('Password updated successfully!');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update password.');
        } finally {
            setLoading(false);
        }
    };

    const sectionStyles = {
        p: 4,
        borderRadius: '24px',
        border: `1px solid ${theme.palette.divider}`,
        mb: 4
    };

    const textFieldStyles = {
        '& .MuiOutlinedInput-root': { borderRadius: '12px' }
    };

    return (
        <Box sx={{ mt: { lg: '60px', xs: '30px' }, pb: '100px' }}>
            <Container maxWidth="md">
                <Stack direction="row" alignItems="center" gap={2} mb={6}>
                    <SettingsIcon sx={{ color: '#FF2625', fontSize: '40px' }} />
                    <Box>
                        <Typography variant="h3" fontWeight="900" letterSpacing="-1px">
                            Elite <span style={{ color: '#FF2625' }}>Settings</span>
                        </Typography>
                        <Typography variant="body1" color="text.secondary" fontWeight="500">
                            Personalize your fitness evolution.
                        </Typography>
                    </Box>
                </Stack>

                {error && <Alert severity="error" sx={{ mb: 4, borderRadius: '12px' }}>{error}</Alert>}
                {success && <Alert severity="success" sx={{ mb: 4, borderRadius: '12px' }}>{success}</Alert>}

                <Paper elevation={0} sx={sectionStyles}>
                    <Stack direction="row" alignItems="center" gap={2} mb={4}>
                        <PersonIcon sx={{ color: '#FF2625' }} />
                        <Typography variant="h5" fontWeight="800">Profile Details</Typography>
                    </Stack>
                    <Box component="form" onSubmit={handleUpdateDetails}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth label="Full Name" value={name} onChange={e => setName(e.target.value)} sx={textFieldStyles} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth label="Email Address" value={email} onChange={e => setEmail(e.target.value)} sx={textFieldStyles} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Phone Number" value={phone} onChange={e => setPhone(e.target.value)} sx={textFieldStyles} />
                            </Grid>
                        </Grid>
                        <Button type="submit" variant="contained" disabled={loading} sx={{ mt: 4, py: 1.5, px: 4, borderRadius: '12px', background: 'linear-gradient(135deg, #FF2625, #FF8C00)', fontWeight: 700 }}>
                            Update Profile
                        </Button>
                    </Box>
                </Paper>

                <Paper elevation={0} sx={sectionStyles}>
                    <Stack direction="row" alignItems="center" gap={2} mb={4}>
                        <LockIcon sx={{ color: '#FF2625' }} />
                        <Typography variant="h5" fontWeight="800">Security & Password</Typography>
                    </Stack>
                    <Box component="form" onSubmit={handleUpdatePassword}>
                        <Stack spacing={3}>
                            <TextField fullWidth label="Current Password" type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} sx={textFieldStyles} />
                            <TextField fullWidth label="New Password" type={showPassword ? 'text' : 'password'} value={newPassword} onChange={e => setNewPassword(e.target.value)} sx={textFieldStyles}
                                InputProps={{ endAdornment: <InputAdornment position="end"><IconButton onClick={() => setShowPassword(!showPassword)} edge="end">{showPassword ? <VisibilityOff /> : <Visibility />}</IconButton></InputAdornment> }} />
                            <TextField fullWidth label="Confirm New Password" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} sx={textFieldStyles} />
                        </Stack>
                        <Button type="submit" variant="contained" disabled={loading} sx={{ mt: 4, py: 1.5, px: 4, borderRadius: '12px', background: 'linear-gradient(135deg, #FF2625, #FF8C00)', fontWeight: 700 }}>
                            Update Password
                        </Button>
                    </Box>
                </Paper>

                <Paper elevation={0} sx={{ p: 4, borderRadius: '24px', border: `1px solid ${theme.palette.divider}`, bgcolor: 'rgba(255, 38, 37, 0.04)' }}>
                    <Typography variant="h6" fontWeight="800" sx={{ mb: 1, color: '#FF2625' }}>Dangerous Zone</Typography>
                    <Typography variant="body2" color="text.secondary" mb={3}>Once you logout, you will need to sign in again to access your elite plans.</Typography>
                    <Button variant="outlined" color="error" onClick={logout} sx={{ borderRadius: '12px', fontWeight: 800 }}>
                        Logout From Elite
                    </Button>
                </Paper>
            </Container>
        </Box>
    );
};

export default Settings;
