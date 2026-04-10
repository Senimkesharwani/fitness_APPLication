const { generateFallbackPlan } = require('../utils/planGenerator'); 

console.log('🚀 Plan Controller Module Loaded (Local Logic Only)');

// @desc    Get fitness plan recommendation (Local Logic)
exports.getRecommendation = async (req, res, next) => {
  const { goal, weight, height, age, diet } = req.body;
  console.log('📬 NEW LOCAL PLAN GENERATION REQUEST');

  try {
    // Generate plan using enhanced local logic
    const planData = generateFallbackPlan(goal, weight, height, age, diet);
    
    console.log('✅ LOCAL GENERATION SUCCESSFUL!');
    res.status(200).json({ success: true, data: planData });
  } catch (err) {
    console.error('Final Backend Catch:', err.message);
    res.status(500).json({ success: false, message: 'Plan Generation failed locally.' });
  }
};

// @desc    Disabled Gemini AI Chatbot assistant
exports.chat = async (req, res, next) => {
  res.status(200).json({ 
    success: true, 
    data: "The AI Chatbot has been decommissioned in favor of a 100% local, high-performance plan generator. Please use the 'Optimize Plan' button on your dashboard for a personalized fitness strategy." 
  });
};

