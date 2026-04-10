import React, { useState, useContext, useRef, useEffect } from 'react';
import { Box, TextField, Button, Typography, Paper, IconButton, Stack, Avatar } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { role: 'bot', content: 'Hello! I am your AI Fitness Assistant. How can I help you today?' }
  ]);
  const [loading, setLoading] = useState(false);
  const { token } = useContext(AuthContext);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleSend = async () => {
    if (!message.trim() || !token) return;

    const userMessage = { role: 'user', content: message };
    setChatHistory([...chatHistory, userMessage]);
    setMessage('');
    setLoading(true);

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/ai/chat`, 
        { message },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setChatHistory(prev => [...prev, { role: 'bot', content: res.data.data }]);
    } catch (err) {
      setChatHistory(prev => [...prev, { role: 'bot', content: 'Sorry, something went wrong. Please check your connection.' }]);
    } finally {
      setLoading(false);
    }
  };

  if (!token) return null;

  return (
    <>
      {/* Floating Button */}
      <IconButton
        onClick={() => setIsOpen(!isOpen)}
        sx={{
          position: 'fixed',
          bottom: 30,
          right: 30,
          bgcolor: '#FF2625',
          color: 'white',
          '&:hover': { bgcolor: '#e02221' },
          width: 60,
          height: 60,
          boxShadow: 3,
          zIndex: 1000
        }}
      >
        {isOpen ? <CloseIcon /> : <ChatIcon />}
      </IconButton>

      {/* Chat Window */}
      {isOpen && (
        <Paper
          elevation={3}
          sx={{
            position: 'fixed',
            bottom: 100,
            right: 30,
            width: { xs: '300px', sm: '350px' },
            height: '450px',
            borderRadius: '15px',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            zIndex: 1000
          }}
        >
          {/* Header */}
          <Box sx={{ bgcolor: '#FF2625', p: 2, color: 'white' }}>
            <Typography variant="h6" fontWeight="bold">Fitness Assistant</Typography>
          </Box>

          {/* Messages Area */}
          <Box
            ref={scrollRef}
            sx={{ flex: 1, p: 2, overflowY: 'auto', bgcolor: '#f9f9f9', display: 'flex', flexDirection: 'column', gap: 1 }}
          >
            {chatHistory.map((chat, index) => (
              <Box
                key={index}
                sx={{
                  alignSelf: chat.role === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '80%',
                  bgcolor: chat.role === 'user' ? '#FF2625' : '#e0e0e0',
                  color: chat.role === 'user' ? 'white' : 'black',
                  p: 1.5,
                  borderRadius: chat.role === 'user' ? '15px 15px 0 15px' : '15px 15px 15px 0',
                  fontSize: '14px'
                }}
              >
                {chat.content}
              </Box>
            ))}
            {loading && (
               <Box sx={{ alignSelf: 'flex-start', bgcolor: '#e0e0e0', p: 1, borderRadius: '10px' }}>
                <Typography variant="body2">Thinking...</Typography>
               </Box>
            )}
          </Box>

          {/* Input Area */}
          <Box sx={{ p: 2, bgcolor: 'white', borderTop: '1px solid #eee' }}>
            <Stack direction="row" spacing={1}>
              <TextField
                fullWidth
                size="small"
                placeholder="Ask me anything..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              />
              <IconButton color="primary" onClick={handleSend} sx={{ color: '#FF2625' }}>
                <SendIcon />
              </IconButton>
            </Stack>
          </Box>
        </Paper>
      )}
    </>
  );
};

export default Chatbot;
