const axios = require('axios');
require('dotenv').config();

const key = (process.env.GEMINI_API_KEY || '').trim();
const models = ['gemini-3.1-flash-lite-preview'];
const versions = ['v1'];

async function test() {
  console.log('Testing Gemini API Combinations...');
  for (const v of versions) {
    for (const m of models) {
      const url = `https://generativelanguage.googleapis.com/${v}/models/${m}:generateContent?key=${key}`;
      console.log(`\n--- Testing: ${v} | ${m} ---`);
      try {
        const res = await axios.post(url, {
          contents: [{ parts: [{ text: "hi" }] }]
        });
        console.log(`✅ SUCCESS! Response: ${res.data.candidates[0].content.parts[0].text.substring(0, 20)}...`);
        return { version: v, model: m };
      } catch (err) {
        console.log(`❌ FAILED: ${err.response ? err.response.status + ' ' + JSON.stringify(err.response.data.error || err.response.data) : err.message}`);
      }
    }
  }
  return null;
}

test().then(winner => {
  if (winner) console.log('\n🏆 WINNER:', winner);
  else console.log('\n💀 ALL COMBINATIONS FAILED. Check API Key.');
});
