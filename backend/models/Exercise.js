const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema({
  bodyPart: String,
  equipment: String,
  gifUrl: String,
  id: {
    type: String,
    unique: true
  },
  name: String,
  target: String,
  secondaryMuscles: [String],
  instructions: [String]
}, { timestamps: true });

module.exports = mongoose.model('Exercise', ExerciseSchema);
