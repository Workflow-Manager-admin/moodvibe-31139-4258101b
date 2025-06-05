//
// Kavia AI Mood Analysis API Utility (Stub Version)
// File: moodvibe_frontend/src/api/kaviaAi.js
//
// This module exports analyzeMood - a placeholder function to "analyze" mood from input text
// For now, it simply returns a fixed or randomly chosen mood from demo values
// REPLACE this with a proper Kavia AI API integration once available.
//

// List of demo mood strings for placeholder return values
const MOCK_MOODS = [
  "Happy",
  "Excited",
  "Calm",
  "Sad",
  "Bored",
  "Motivated",
  "Tired",
  "Anxious"
];

// PUBLIC_INTERFACE
/**
 * Analyze user text and return a detected mood string.
 * Placeholder stub: returns a random mood for now.
 * In future: Connect to Kavia AI backend to get real mood prediction.
 * 
 * @param {string} inputText - User's mood input, text, or message
 * @returns {Promise<string>} - Detected mood (random demo value for now)
 */
export async function analyzeMood(inputText) {
  // 
  // TODO: Replace this implementation with a call to Kavia AI REST endpoint (when available)
  //
  // Example: 
  // const response = await fetch('/api/kavia-analyze', { ... })
  // const { mood } = await response.json();
  // return mood;
  //

  // For demo: pick a random mood as a mocked response
  const mood = MOCK_MOODS[Math.floor(Math.random() * MOCK_MOODS.length)];
  // Simulate async call to mimic real API
  return new Promise(resolve => setTimeout(() => resolve(mood), 650));
}

// (Optional) Export the mock mood array for testing/demo
export { MOCK_MOODS };
