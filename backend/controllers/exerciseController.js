const Exercise = require('../models/Exercise');
const axios = require('axios');

// @desc    Get all exercises
// @route   GET /api/exercises
// @access  Public
exports.getExercises = async (req, res, next) => {
  try {
    const exercises = await Exercise.find();
    res.status(200).json(exercises);
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Get single exercise
// @route   GET /api/exercises/:id
// @access  Public
exports.getExercise = async (req, res, next) => {
  try {
    const exercise = await Exercise.findOne({ id: req.params.id });

    if (!exercise) {
      return res.status(404).json({ success: false, message: 'Exercise not found' });
    }

    res.status(200).json(exercise);
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Create an exercise (Admin only placeholder)
// @route   POST /api/exercises
// @access  Private/Admin
exports.createExercise = async (req, res, next) => {
  try {
    const exercise = await Exercise.create(req.body);
    res.status(201).json({ success: true, data: exercise });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Get all body parts
// @route   GET /api/exercises/bodyPartList
// @access  Public
exports.getBodyPartList = async (req, res, next) => {
  try {
    const bodyParts = await Exercise.distinct('bodyPart');
    res.status(200).json(['all', ...bodyParts]);
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Get exercises by body part
// @route   GET /api/exercises/bodyPart/:bodyPart
// @access  Public
exports.getExercisesByBodyPart = async (req, res, next) => {
  try {
    const exercises = await Exercise.find({ bodyPart: req.params.bodyPart });
    res.status(200).json(exercises);
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Get exercises by target muscle
// @route   GET /api/exercises/target/:target
// @access  Public
exports.getExercisesByTarget = async (req, res, next) => {
  try {
    const exercises = await Exercise.find({ target: req.params.target });
    res.status(200).json(exercises);
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Get exercises by equipment
// @route   GET /api/exercises/equipment/:equipment
// @access  Public
exports.getExercisesByEquipment = async (req, res, next) => {
  try {
    const exercises = await Exercise.find({ equipment: req.params.equipment });
    res.status(200).json(exercises);
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Proxy exercise image to bypass CORS/header requirements
// @route   GET /api/exercises/proxy-image
// @access  Public
exports.proxyExerciseImage = async (req, res, next) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ success: false, message: 'Exercise ID is required' });
  }

  try {
    console.log('Proxying image for exercise ID:', id);
    const response = await axios({
      method: 'get',
      url: 'https://exercisedb.p.rapidapi.com/image',
      params: {
        exerciseId: id,
        resolution: '360' // Try 360, if fails we can fallback to 180
      },
      responseType: 'stream',
      headers: {
        'x-rapidapi-key': process.env.RAPID_API_KEY,
        'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
      }
    });

    res.set('Content-Type', response.headers['content-type']);
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Cross-Origin-Resource-Policy', 'cross-origin');
    response.data.pipe(res);
  } catch (err) {
    if (err.response && err.response.status === 403) {
      // Try 180 resolution if 360 is forbidden (Basic plan)
      try {
        const fallbackResponse = await axios({
          method: 'get',
          url: 'https://exercisedb.p.rapidapi.com/image',
          params: { exerciseId: id, resolution: '180' },
          responseType: 'stream',
          headers: {
            'x-rapidapi-key': process.env.RAPID_API_KEY,
            'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
          }
        });
        res.set('Content-Type', fallbackResponse.headers['content-type']);
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Cross-Origin-Resource-Policy', 'cross-origin');
        return fallbackResponse.data.pipe(res);
      } catch (fallbackErr) {
        console.error('Fallback Proxy Error:', fallbackErr.message);
      }
    }
    
    console.error('Proxy Error:', err.response ? `Status ${err.response.status}` : err.message);
    res.status(500).json({ success: false, message: 'Failed to proxy image' });
  }
};
// @desc    Proxy generic RapidAPI ExerciseDB requests to bypass CORS
// @route   GET /api/exercises/rapidapi
// @access  Public
exports.getRapidAPIData = async (req, res, next) => {
  const { url, limit } = req.query;

  if (!url) {
    return res.status(400).json({ success: false, message: 'RapidAPI URL is required' });
  }

  try {
    console.log(`[Proxy] Fetching from RapidAPI: ${url}${limit ? `?limit=${limit}` : ''}`);
    
    // Construct the endpoint URL if it's not a full URL
    const targetUrl = url.startsWith('http') ? url : `https://exercisedb.p.rapidapi.com${url.startsWith('/') ? '' : '/'}${url}`;
    
    // Ensure limit is appended correctly to the RapidAPI call if provided
    const finalUrl = new URL(targetUrl);
    if (limit) finalUrl.searchParams.append('limit', limit);

    const response = await axios({
      method: 'get',
      url: finalUrl.toString(),
      headers: {
        'x-rapidapi-key': process.env.RAPID_API_KEY,
        'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
      }
    });

    res.status(200).json(response.data);
  } catch (err) {
    console.error('[Proxy Error] RapidAPI Fetch Failed:', err.message);
    res.status(err.response?.status || 500).json({ 
      success: false, 
      message: 'Failed to fetch data from RapidAPI',
      error: err.response?.data || err.message 
    });
  }
};
