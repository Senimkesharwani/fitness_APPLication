const express = require('express');
const router = express.Router();
const { getExercises, getExercise, createExercise, getBodyPartList, getExercisesByBodyPart, getExercisesByTarget, getExercisesByEquipment, proxyExerciseImage } = require('../controllers/exerciseController');
const { protect } = require('../middleware/auth');

router.get('/', getExercises);
router.get('/bodyPartList', getBodyPartList);
router.get('/bodyPart/:bodyPart', getExercisesByBodyPart);
router.get('/target/:target', getExercisesByTarget);
router.get('/equipment/:equipment', getExercisesByEquipment);
router.get('/proxy-image', proxyExerciseImage);
router.get('/:id', getExercise);
router.post('/', protect, createExercise); // Protect for admin only in production

module.exports = router;
