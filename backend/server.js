const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

// Route files
const auth = require('./routes/auth');
const exercises = require('./routes/exercise');
const favorites = require('./routes/favorite');
const ai = require('./routes/ai');
const contact = require('./routes/contact');

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Root route for status check
app.get('/', (req, res) => {
  res.send('Elite Fitness API is running...');
});

// Mount routers
app.use('/api/auth', auth);
app.use('/api/exercises', exercises);
app.use('/api/favorites', favorites);
app.use('/api/ai', ai);
app.use('/api/contact', contact);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
