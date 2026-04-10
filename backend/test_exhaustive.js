const axios = require('axios');
require('dotenv').config();

const key = (process.env.GEMINI_API_KEY || '').trim();
const tests = [
  { v: 'v1', m: 'gemini-3.1-flash-lite-preview' }
];

async function test() {
  console.log('Testing ALL Gemini Combinations...');
  for (const t of tests) {
    const url = `https://generativelanguage.googleapis.com/${t.v}/models/${t.m}:generateContent?key=${key}`;
    process.stdout.write(`Testing ${t.v}/${t.m}... `);
    try {
      const res = await axios.post(url, {
        contents: [{ parts: [{ text: "hi" }] }]
      });
      console.log(`✅ SUCCESS! (${res.data.candidates[0].content.parts[0].text.substring(0, 10).trim()}...)`);
    } catch (err) {
      if (err.response) {
        console.log(`❌ FAILED (${err.response.status}): ${err.response.data.error ? err.response.data.error.message : 'No msg'}`);
      } else {
        console.log(`❌ ERROR: ${err.message}`);
      }
    }
  }
}

test();
