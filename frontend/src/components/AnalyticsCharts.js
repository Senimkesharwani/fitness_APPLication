import React from 'react';
import { Box, Paper, Typography, useTheme, Grid, Stack } from '@mui/material';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';

const AnalyticsCharts = ({ data }) => {
  const theme = useTheme();

  // Mock data for initial visual if no data provided
  const weeklyData = data?.weekly || [
    { name: 'Mon', workouts: 1, cals: 2100 },
    { name: 'Tue', workouts: 0, cals: 1900 },
    { name: 'Wed', workouts: 1, cals: 2300 },
    { name: 'Thu', workouts: 1, cals: 2000 },
    { name: 'Fri', workouts: 0, cals: 1800 },
    { name: 'Sat', workouts: 1, cals: 2500 },
    { name: 'Sun', workouts: 1, cals: 2200 },
  ];

  const macroData = data?.macros || [
    { name: 'Protein', value: 35, color: '#4CAF50' },
    { name: 'Carbs', value: 45, color: '#FFB800' },
    { name: 'Fats', value: 20, color: '#33A1FF' },
  ];

  const cardStyle = {
    p: 3, 
    borderRadius: '12px', 
    border: `1px solid ${theme.palette.divider}`, 
    height: '400px',
    boxShadow: 'var(--shadow-soft)',
    background: theme.palette.mode === 'light' ? '#fff' : 'rgba(255,255,255,0.02)',
    transition: 'transform 0.2s ease-in-out',
    '&:hover': { transform: 'translateY(-4px)' }
  };

  return (
    <Grid container spacing={3} mb={4}>
      {/* Weekly Activity */}
      <Grid item xs={12} md={8}>
        <Paper elevation={0} sx={cardStyle}>
          <Typography variant="h6" fontWeight="700" mb={3}>Weekly Activity Score</Typography>
          <ResponsiveContainer width="100%" height="85%">
            <AreaChart data={weeklyData}>
              <defs>
                <linearGradient id="colorCals" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF4D4D" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#FF4D4D" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme.palette.divider} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 500, fill: theme.palette.text.secondary }} />
              <YAxis hide />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 16px rgba(0,0,0,0.1)', background: theme.palette.background.paper }}
                itemStyle={{ fontWeight: 600, color: theme.palette.text.primary }}
              />
              <Area type="monotone" dataKey="cals" stroke="#FF4D4D" strokeWidth={3} fillOpacity={1} fill="url(#colorCals)" />
            </AreaChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>

      {/* Macro Distribution */}
      <Grid item xs={12} md={4}>
        <Paper elevation={0} sx={cardStyle}>
          <Typography variant="h6" fontWeight="700" mb={3}>Macro Balance</Typography>
          <ResponsiveContainer width="100%" height="60%">
            <PieChart>
              <Pie
                data={macroData}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={85}
                paddingAngle={8}
                dataKey="value"
                stroke="none"
              >
                {macroData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <Stack spacing={2} mt={2}>
            {macroData.map((m) => (
              <Stack key={m.name} direction="row" justifyContent="space-between" alignItems="center">
                <Stack direction="row" alignItems="center" gap={1.5}>
                  <Box sx={{ width: 12, height: 12, borderRadius: '3px', bgcolor: m.color }} />
                  <Typography variant="body2" fontWeight="600" color="text.secondary">{m.name}</Typography>
                </Stack>
                <Typography variant="body2" fontWeight="800">{m.value}%</Typography>
              </Stack>
            ))}
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AnalyticsCharts;
