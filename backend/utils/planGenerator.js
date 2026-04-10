/**
 * Rule-Based Fitness Plan Generator (Fallback for AI Quota Issues)
 */

function calcCalories(weight, height, age, goalKey) {
  const w = parseFloat(weight) || 70;
  const h = parseFloat(height) || 170;
  const a = parseFloat(age) || 25;
  // Mifflin-St Jeor (neutral / male baseline)
  const bmr = 10 * w + 6.25 * h - 5 * a + 5;
  const tdee = Math.round(bmr * 1.55); // moderate activity
  
  if (goalKey === 'muscle') return { target: tdee + 400, bmr: Math.round(bmr), tdee };
  if (goalKey === 'fatloss') return { target: tdee - 500, bmr: Math.round(bmr), tdee };
  if (goalKey === 'abs') return { target: tdee - 200, bmr: Math.round(bmr), tdee };
  return { target: tdee, bmr: Math.round(bmr), tdee };
}

function calcMacros(targetCal, goalKey) {
  const ratios = {
    muscle:  { p: 0.30, c: 0.50, f: 0.20 },
    fatloss: { p: 0.40, c: 0.35, f: 0.25 },
    abs:     { p: 0.35, c: 0.40, f: 0.25 },
    default: { p: 0.25, c: 0.50, f: 0.25 },
  };
  const r = ratios[goalKey] || ratios.default;
  return {
    protein: Math.round((targetCal * r.p) / 4),
    carbs:   Math.round((targetCal * r.c) / 4),
    fat:     Math.round((targetCal * r.f) / 9),
  };
}

const MEAL_FOODS = {
  veg: {
    muscle: {
      breakfast: [
        'Oatmeal + Paneer Bhurji + Banana + Whole Milk',
        'Sprouted Moong Salad + Greek Yogurt + Almonds + Fruit',
        'Buckwheat Pancakes + Cottage Cheese + Honey + Walnuts',
        'Protein Smoothie (Soy) + Peanut Butter + Oats + Berries'
      ],
      lunch: [
        'Brown Rice + Dal Makhani + Sautéed Mushrooms + Curd',
        'Quinoa Pulao + Chickpea Curry + Tofu Tikka + Salad',
        'Multigrain Roti + Palak Paneer + Mixed Veg + Buttermilk',
        'Soya Chunk Biryani + Cucumber Raita + Roasted Papad'
      ],
      snacks: [
        'Whey Protein Shake + Greek Yogurt + Mixed Nuts',
        'Roasted Makhana + Roasted Chana + Green Tea',
        'Cottage Cheese (Paneer) Cubes + Cucumber + Lemon',
        'Peanut Butter on Apple Slices + Pumpkin Seeds'
      ],
      dinner: [
        'Tofu Stir Fry + Sweet Potato + Spinach + Olive Oil',
        'Lentil Soup + Grilled Paneer + Broccoli + Quinoa',
        'Vegetable Stir Fry + Tempeh + Brown Rice + Avocado',
        'Chickpea Pasta + Pesto + Sautéed Zucchini + Flax Seeds'
      ],
    },
    fatloss: {
      breakfast: [
        'Moong Dal Chilla + Avocado + Green Tea',
        'Vegetable Poha + Boiled Sprouts + Fresh Lime',
        'Oat Bran + Berries + Flax Seeds + Soy Milk',
        'Tofu Scramble + Spinach + Whole Grain Toast'
      ],
      lunch: [
        'Quinoa Salad + Roasted Chickpeas + Lemon Dressing',
        'Sprouted Moong Dal + Brown Rice + Steamed Broccoli',
        'Mixed Vegetable Salad + Tofu + Pumpkin Seeds',
        'Lentil Soup + Sautéed Asparagus + Multigrain Roti'
      ],
      snacks: [
        'Apple + Low-Fat Curd + Handful of Almonds',
        'Cucumber & Carrot Sticks + Hummus',
        'Roasted Chana + Green Tea',
        'Seasonal Fruit + Walnuts'
      ],
      dinner: [
        'Tofu Tikka + Steamed Veggies + Brown Rice',
        'Grilled Paneer + Sautéed Cauliflower + Spinach',
        'Vegetable Clear Soup + Quinoa + Roasted Veggies',
        'Lentil Stew + Sautéed Bell Peppers + Zucchini'
      ],
    },
    abs: {
      breakfast: [
        'Protein Smoothie (Soy) + Sprouts + Berries',
        'Eggless Omelet (Besan) + Spinach + Green Tea',
        'Greek Yogurt + Chia Seeds + Handful of Berries',
        'Cottage Cheese (Paneer) + Sliced Tomato + Basil'
      ],
      lunch: [
        'Paneer Bowl + Quinoa + Mixed Greens',
        'Tofu & Broccoli Salad + Sunflower Seeds',
        'Lentil Soup + Sautéed Spinach + Cucumber',
        'Zucchini Noodles + Marinara + Chickpeas'
      ],
      snacks: [
        'Cottage Cheese (Paneer) + Cucumber + Lemon Water',
        'Pumpkin Seeds + Roasted Chana',
        'Apple Slices + Cinnamon',
        'Celery Sticks + Almond Butter'
      ],
      dinner: [
        'Lentil Soup + Sautéed Broccoli + Multigrain Roti',
        'Grilled Tofu + Asparagus + Mixed Green Salad',
        'Mushroom Stew + Steamed Spinach + Brown Rice',
        'Vegetable Clear Soup + Sautéed Peppers + Cauliflower Rice'
      ],
    },
    default: {
      breakfast: ['Whole Grain Toast + Peanut Butter + Banana'],
      lunch:     ['Rajma Chawal + Raita + Salad'],
      snacks:    ['Mixed Nuts + Seasonal Fruit + Yogurt'],
      dinner:    ['Palak Paneer + Brown Rice + Cucumber Salad'],
    },
  },
  nonveg: {
    muscle: {
      breakfast: [
        'Oatmeal + 4 Boiled Eggs + Banana + Whole Milk',
        'Scrambled Eggs (3) + Turkey Sausage + Whole Grain Toast',
        'Protein Pancakes + Egg Whites + Berries + Maple Syrup',
        'Omelet with Chicken Breast + Avocado + Spinach'
      ],
      lunch: [
        'Grilled Chicken Rice Bowl + Broccoli + Olive Oil',
        'Lean Ground Beef + Sweet Potato + Asparagus',
        'Salmon Fillet + Brown Rice + Quinoa + Mixed Greens',
        'Turkey Meatballs + Whole Wheat Pasta + Tomato Sauce'
      ],
      snacks: [
        'Whey Protein Shake + Greek Yogurt + Almonds',
        'Canned Tuna + Crackers + Celery',
        'Beef Jerky + Handful of Mixed Nuts',
        'Hard Boiled Eggs + Apple'
      ],
      dinner: [
        'Baked Salmon + Sweet Potato + Spinach Salad',
        'Grilled Steak + Roasted Carrots + Broccoli',
        'Chicken Stir Fry + Bell Peppers + Snap Peas + Rice',
        'Tilapia Fillet + Sautéed Kale + Quinoa'
      ],
    },
    fatloss: {
      breakfast: [
        'Scrambled Eggs (3) + Avocado Toast + Black Coffee',
        'Egg White Omelet + Spinach + Mushrooms',
        'Smoked Salmon + Cream Cheese (Light) + Rye Bread',
        'Grilled Turkey + Sliced Tomato + Green Tea'
      ],
      lunch: [
        'Grilled Turkey Salad + Lemon Dressing + Quinoa',
        'Baked Chicken Breast + Steamed Broccoli + Cauliflower',
        'Grilled Cod + Mixed Green Salad + Balsamic Vinegar',
        'Chicken Soup with Vegetables + Handful of Berries'
      ],
      snacks: [
        'Boiled Egg + Apple + Green Tea',
        'Turkey Roll-ups with Cucumber',
        'Handful of Walnuts + Berries',
        'Low-Fat Greek Yogurt + Flax Seeds'
      ],
      dinner: [
        'Baked Tilapia + Steamed Veggies + Brown Rice',
        'Grilled Chicken Breast + Roasted Asparagus + Peppers',
        'Lean Pork Loin + Sautéed Spinach + Zucchini',
        'Shrimp Scampi + Zucchini Noodles + Lemon'
      ],
    },
    abs: {
      breakfast: [
        'Protein Smoothie + 2 Boiled Eggs + Berries',
        'Egg White Frittata + Asparagus + Black Coffee',
        'Grilled Chicken Strips + Cucumber + Green Tea',
        'Turkey Slices + Avocado + Spinach Bowl'
      ],
      lunch: [
        'Grilled Chicken Breast + Quinoa + Mixed Greens',
        'Tuna Salad with Lettuce + Olive Oil',
        'Baked Cod Fillet + Steamed Asparagus',
        'Turkey Breast + Sautéed Kale + Tomato'
      ],
      snacks: [
        'Cottage Cheese + Cucumber + Protein Shake',
        'Hard Boiled Egg White + Almonds',
        'Sliced Beef + Celery Sticks',
        'Protein Bar (Low Carb) + Black Coffee'
      ],
      dinner: [
        'Lean Beef Stir Fry + Steamed Veggies + Brown Rice',
        'Grilled Salmon Fillet + Mixed Greens + Lemon',
        'Baked Chicken + Sautéed Broccoli + Peppers',
        'Grilled Shrimp + Cauliflower Rice + Garlic'
      ],
    },
    default: {
      breakfast: ['Whole Grain Toast + Peanut Butter + Boiled Egg'],
      lunch:     ['Grilled Chicken + Brown Rice + Mixed Vegetables'],
      snacks:    ['Mixed Nuts + Seasonal Fruit + Yogurt'],
      dinner:    ['Grilled Fish + Roasted Veggies + Quinoa'],
    },
  },
};

const EXERCISE_DATA = {
  muscle: {
    schedule: [
      { day: 'Mon', label: 'Chest',     icon: '🏋️', focus: 'chest' },
      { day: 'Tue', label: 'Back',      icon: '🔙', focus: 'back' },
      { day: 'Wed', label: 'Legs',      icon: '🦵', focus: 'legs' },
      { day: 'Thu', label: 'Shoulders', icon: '⬆️', focus: 'shoulders' },
      { day: 'Fri', label: 'Arms',      icon: '💪', focus: 'arms' },
      { day: 'Sat', label: 'Cardio',    icon: '🏃', focus: 'cardio' },
      { day: 'Sun', label: 'Rest',      icon: '😴', focus: 'rest' },
    ],
    exercises: {
      chest:     [
        { name: 'Barbell Bench Press',    sets: 4, reps: '8-10',  muscle: 'Pectorals',     tip: 'Control the descent' },
        { name: 'Incline Dumbbell Press', sets: 3, reps: '10-12', muscle: 'Upper Chest',   tip: 'Full range of motion' },
        { name: 'Cable Flyes',            sets: 3, reps: '12-15', muscle: 'Pectorals',     tip: 'Squeeze at center' },
        { name: 'Push-Ups',              sets: 3, reps: '15-20', muscle: 'Chest/Triceps', tip: 'Keep core tight' },
      ],
      back:      [
        { name: 'Deadlift',       sets: 4, reps: '6-8',  muscle: 'Full Back', tip: 'Neutral spine always' },
        { name: 'Pull-Ups',       sets: 4, reps: '8-10', muscle: 'Lats',      tip: 'Dead hang at bottom' },
        { name: 'Barbell Rows',   sets: 3, reps: '10-12',muscle: 'Mid Back',  tip: 'Pull to lower chest' },
        { name: 'Lat Pulldown',   sets: 3, reps: '12-15',muscle: 'Lats',      tip: 'Lean slightly back' },
      ],
      legs:      [
        { name: 'Barbell Squat',       sets: 4, reps: '8-10',  muscle: 'Quads/Glutes',  tip: 'Knees track toes' },
        { name: 'Romanian Deadlift',   sets: 3, reps: '10-12', muscle: 'Hamstrings',    tip: 'Hinge at hips' },
        { name: 'Leg Press',           sets: 3, reps: '12-15', muscle: 'Quads',         tip: 'Don\'t lock knees' },
        { name: 'Calf Raises',         sets: 4, reps: '15-20', muscle: 'Calves',        tip: 'Full stretch at bottom' },
      ],
      shoulders: [
        { name: 'Overhead Press', sets: 4, reps: '8-10',  muscle: 'Deltoids',    tip: 'Brace your core' },
        { name: 'Lateral Raises', sets: 4, reps: '12-15', muscle: 'Side Delts',  tip: 'Lead with elbows' },
        { name: 'Front Raises',   sets: 3, reps: '12-15', muscle: 'Front Delts', tip: 'Controlled motion' },
        { name: 'Face Pulls',     sets: 3, reps: '15-20', muscle: 'Rear Delts',  tip: 'Pull to forehead' },
      ],
      arms:      [
        { name: 'Barbell Curl',    sets: 4, reps: '10-12', muscle: 'Biceps',      tip: 'No swinging' },
        { name: 'Skull Crushers',  sets: 3, reps: '10-12', muscle: 'Triceps',     tip: 'Elbows stay fixed' },
        { name: 'Hammer Curl',     sets: 3, reps: '12-15', muscle: 'Brachialis',  tip: 'Neutral grip' },
        { name: 'Tricep Pushdown', sets: 3, reps: '12-15', muscle: 'Triceps',     tip: 'Full extension' },
      ],
      cardio:    [
        { name: 'Treadmill Run',   sets: 1, reps: '30 min', muscle: 'Cardio',      tip: 'Zone 2 pace' },
        { name: 'Jump Rope',       sets: 5, reps: '2 min',  muscle: 'Calves',      tip: 'Light on feet' },
        { name: 'Rowing Machine',  sets: 3, reps: '10 min', muscle: 'Full Body',   tip: 'Drive with legs' },
      ],
      rest: [],
    },
  },
  fatloss: {
    schedule: [
      { day: 'Mon', label: 'HIIT',        icon: '🔥', focus: 'hiit' },
      { day: 'Tue', label: 'Upper Body',  icon: '🏋️', focus: 'upper' },
      { day: 'Wed', label: 'Cardio',      icon: '🏃', focus: 'cardio' },
      { day: 'Thu', label: 'Lower Body',  icon: '🦵', focus: 'lower' },
      { day: 'Fri', label: 'Full Body',   icon: '⚡', focus: 'fullbody' },
      { day: 'Sat', label: 'Active Rest', icon: '🚶', focus: 'active' },
      { day: 'Sun', label: 'Rest',        icon: '😴', focus: 'rest' },
    ],
    exercises: {
      hiit:     [
        { name: 'Burpees',           sets: 5, reps: '20 sec on/10 off', muscle: 'Full Body',    tip: 'Max effort each set' },
        { name: 'Mountain Climbers', sets: 4, reps: '30 sec',           muscle: 'Core/Cardio',  tip: 'Keep hips level' },
        { name: 'Jump Squats',       sets: 4, reps: '15',               muscle: 'Quads/Glutes', tip: 'Soft landing' },
        { name: 'High Knees',        sets: 4, reps: '30 sec',           muscle: 'Cardio',       tip: 'Drive knees high' },
      ],
      upper:    [
        { name: 'Push-Ups',        sets: 4, reps: '15-20', muscle: 'Chest/Triceps', tip: 'Full range' },
        { name: 'Dumbbell Rows',   sets: 3, reps: '12-15', muscle: 'Back',          tip: 'Squeeze at top' },
        { name: 'Shoulder Press',  sets: 3, reps: '12-15', muscle: 'Shoulders',     tip: 'No back arch' },
        { name: 'Bicep Curls',     sets: 3, reps: '15',    muscle: 'Biceps',        tip: 'Controlled tempo' },
      ],
      cardio:   [
        { name: 'Steady Run',        sets: 1, reps: '40 min', muscle: 'Cardio',       tip: 'Conversational pace' },
        { name: 'Cycling',           sets: 1, reps: '30 min', muscle: 'Legs/Cardio',  tip: 'Moderate resistance' },
        { name: 'Stair Climber',     sets: 1, reps: '20 min', muscle: 'Glutes',       tip: 'Good posture' },
      ],
      lower:    [
        { name: 'Goblet Squat',   sets: 4, reps: '15',      muscle: 'Quads/Glutes', tip: 'Deep squat' },
        { name: 'Walking Lunges', sets: 3, reps: '20 steps', muscle: 'Legs',         tip: 'Long stride' },
        { name: 'Hip Thrusts',    sets: 3, reps: '15',       muscle: 'Glutes',       tip: 'Full hip extension' },
        { name: 'Step-Ups',       sets: 3, reps: '12 each',  muscle: 'Quads',        tip: 'Drive through heel' },
      ],
      fullbody: [
        { name: 'Kettlebell Swing', sets: 4, reps: '15',      muscle: 'Full Body',  tip: 'Hinge not squat' },
        { name: 'Thruster',         sets: 3, reps: '12',       muscle: 'Full Body',  tip: 'Fluid motion' },
        { name: 'Renegade Row',     sets: 3, reps: '10 each',  muscle: 'Back/Core',  tip: 'Hips stay square' },
        { name: 'Box Jumps',        sets: 3, reps: '10',       muscle: 'Explosive',  tip: 'Stick the landing' },
      ],
      active:   [
        { name: '30-min Walk',    sets: 1, reps: '30 min', muscle: 'Recovery',    tip: 'Get outside' },
        { name: 'Yoga/Stretching',sets: 1, reps: '20 min', muscle: 'Flexibility', tip: 'Hold each stretch' },
      ],
      rest: [],
    },
  },
  abs: {
    schedule: [
      { day: 'Mon', label: 'Core',        icon: '🎯', focus: 'core' },
      { day: 'Tue', label: 'Cardio',      icon: '🏃', focus: 'cardio' },
      { day: 'Wed', label: 'Core+Upper',  icon: '💪', focus: 'coreupper' },
      { day: 'Thu', label: 'HIIT',        icon: '🔥', focus: 'hiit' },
      { day: 'Fri', label: 'Core+Lower',  icon: '🦵', focus: 'corelower' },
      { day: 'Sat', label: 'Cardio',      icon: '🚴', focus: 'cardio' },
      { day: 'Sun', label: 'Rest',        icon: '😴', focus: 'rest' },
    ],
    exercises: {
      core:      [
        { name: 'Plank',             sets: 4, reps: '60 sec',   muscle: 'Core',        tip: 'Straight line' },
        { name: 'Crunches',          sets: 4, reps: '20',       muscle: 'Abs',         tip: 'Don\'t pull neck' },
        { name: 'Leg Raises',        sets: 4, reps: '15',       muscle: 'Lower Abs',   tip: 'Slow descent' },
        { name: 'Russian Twists',    sets: 3, reps: '20 each',  muscle: 'Obliques',    tip: 'Rotate fully' },
        { name: 'Bicycle Crunches',  sets: 3, reps: '20 each',  muscle: 'Abs/Obliques',tip: 'Controlled tempo' },
      ],
      cardio:    [
        { name: 'Jump Rope',            sets: 5, reps: '3 min',  muscle: 'Cardio',  tip: 'Light steps' },
        { name: 'Incline Treadmill Walk',sets: 1, reps: '30 min', muscle: 'Cardio',  tip: '10% incline' },
      ],
      coreupper: [
        { name: 'Hanging Knee Raise', sets: 4, reps: '12',     muscle: 'Lower Abs', tip: 'Controlled' },
        { name: 'Push-Ups',           sets: 3, reps: '15',     muscle: 'Chest',     tip: 'Engage core' },
        { name: 'Ab Wheel Rollout',   sets: 3, reps: '10',     muscle: 'Full Core', tip: 'Don\'t let hips drop' },
        { name: 'Diamond Push-Ups',   sets: 3, reps: '12',     muscle: 'Triceps',   tip: 'Elbows tight' },
      ],
      hiit:      [
        { name: 'Burpees',           sets: 5, reps: '20 sec', muscle: 'Full Body', tip: 'Max intensity' },
        { name: 'Mountain Climbers', sets: 4, reps: '30 sec', muscle: 'Core',      tip: 'Fire up core' },
        { name: 'Jump Squats',       sets: 4, reps: '15',     muscle: 'Legs',      tip: 'Land softly' },
      ],
      corelower: [
        { name: 'Squat',      sets: 4, reps: '12',      muscle: 'Quads',          tip: 'Engage core' },
        { name: 'Side Plank', sets: 3, reps: '45 sec',  muscle: 'Obliques',       tip: 'Stack feet' },
        { name: 'V-Ups',      sets: 3, reps: '12',      muscle: 'Full Abs',       tip: 'Meet in middle' },
        { name: 'Dead Bug',   sets: 3, reps: '10 each', muscle: 'Core Stability', tip: 'Back stays flat' },
      ],
      rest: [],
    },
  },
};

function detectGoalKey(goal) {
  const g = goal.toLowerCase();
  if (g.includes('muscle') || g.includes('bulk') || g.includes('gain') || g.includes('mass')) return 'muscle';
  if (g.includes('fat') || g.includes('loss') || g.includes('weight') || g.includes('cut') || g.includes('slim')) return 'fatloss';
  if (g.includes('abs') || g.includes('core') || g.includes('belly') || g.includes('shred')) return 'abs';
  return 'muscle';
}

/**
 * Randomly picks one item from an array.
 */
function pickRandom(arr) {
  if (!arr || arr.length === 0) return null;
  return arr[Math.floor(Math.random() * arr.length)];
}

exports.generateFallbackPlan = (goal, weight, height, age, diet) => {
  const goalKey = detectGoalKey(goal);
  const calories = calcCalories(weight, height, age, goalKey);
  const macros = calcMacros(calories.target, goalKey);
  
  const dietMap = MEAL_FOODS[diet] || MEAL_FOODS.nonveg;
  const foods = dietMap[goalKey] || dietMap.default;
  
  const split = { breakfast: 0.25, lunch: 0.35, snacks: 0.15, dinner: 0.25 };
  const meals = {};
  
  ['breakfast', 'lunch', 'snacks', 'dinner'].forEach(k => {
    const mealCal = Math.round(calories.target * split[k]);
    const m = calcMacros(mealCal, goalKey);
    // Pick a random food item from the list
    const foodList = foods[k] || [foods[k]]; // Fallback if it's already a string (unlikely now)
    const pickedFood = pickRandom(Array.isArray(foodList) ? foodList : [foodList]);
    
    meals[k] = { 
      food: pickedFood, 
      cal: mealCal, 
      p: m.protein, 
      c: m.carbs, 
      f: m.fat 
    };
  });

  const exData = EXERCISE_DATA[goalKey] || EXERCISE_DATA.muscle;

  return {
    calories: {
      target: calories.target,
      bmr: calories.bmr,
      tdee: calories.tdee
    },
    macros: {
      protein: macros.protein,
      carbs: macros.carbs,
      fats: macros.fat // Matching Gemini naming for backward compatibility
    },
    goalKey,
    diet,
    meals,
    workout: exData.exercises, // Keeping same structure as AI response
    schedule: exData.schedule
  };
};

