const axios = require('axios');
require('dotenv').config();

const key = (process.env.GEMINI_API_KEY || '').trim();
const tests = [
  { v: 'v1', m: 'gemini-3.1-flash-lite-preview', case: 'camel' },
  { v: 'v1', m: 'gemini-3.1-flash-lite-preview', case: 'snake' }
];

async function test() {
  console.log('Testing Case Sensitivity (camel vs snake)...');
  for (const t of tests) {
    const url = `https://generativelanguage.googleapis.com/${t.v}/models/${t.m}:generateContent?key=${key}`;
    const body = { contents: [{ parts: [{ text: "hi" }] }] };
    
    // Add config with the tested case
    if (t.case === 'camel') body.generationConfig = { temperature: 0.9 };
    else body.generation_config = { temperature: 0.9 };

    process.stdout.write(`Testing ${t.v}/${t.m} [${t.case}]... `);
    try {
      const res = await axios.post(url, body);
      console.log(`✅ SUCCESS!`);
    } catch (err) {
      if (err.response) {
        console.log(`❌ FAILED (${err.response.status}): ${JSON.stringify(err.response.data.error || err.response.data).substring(0, 50)}...`);
      } else {
        console.log(`❌ ERROR: ${err.message}`);
      }
    }
  }
}

test();
