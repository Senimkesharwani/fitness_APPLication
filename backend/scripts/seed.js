const axios = require('axios');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Exercise = require('../models/Exercise');

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for seeding...');

    await Exercise.deleteMany();
    console.log('Cleared existing exercises...');

    const options = {
      method: 'GET',
      url: 'https://exercisedb.p.rapidapi.com/exercises',
      params: { limit: '1000' },
      headers: {
        'x-rapidapi-key': process.env.RAPID_API_KEY,
        'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
      }
    };

    const response = await axios.request(options);
    const exercises = response.data;

    await Exercise.insertMany(exercises);
    console.log(`${exercises.length} exercises seeded successfully!`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error.message);
    process.exit(1);
  }
};

seedDatabase();
