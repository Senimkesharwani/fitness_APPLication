const User = require('../models/User');
const Exercise = require('../models/Exercise');

// @desc    Add/Remove exercise to favorites
// @route   POST /api/favorites
// @access  Private
exports.toggleFavorite = async (req, res, next) => {
  try {
    const { exerciseId } = req.body;
    const user = await User.findById(req.user.id);

    const isFavorite = user.favorites.includes(exerciseId);

    if (isFavorite) {
      user.favorites = user.favorites.filter(id => id.toString() !== exerciseId);
    } else {
      user.favorites.push(exerciseId);
    }

    await user.save();

    res.status(200).json({
      success: true,
      data: user.favorites
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Get user favorites
// @route   GET /api/favorites
// @access  Private
exports.getFavorites = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate('favorites');

    res.status(200).json({
      success: true,
      data: user.favorites
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
