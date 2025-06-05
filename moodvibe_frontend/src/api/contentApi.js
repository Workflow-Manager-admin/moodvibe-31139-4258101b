//
// MoodVibe Content API Utility
// File: moodvibe_frontend/src/api/contentApi.js
//
// Provides functions to fetch memes, jokes, GIFs, and quotes.
// - Uses free public APIs where available
// - Falls back to mock/demo data if requests fail or for local development (CORS, API quota, etc.)
// - All functions take a `mood` argument for future mood-personalization support
// - Designed for easy extension/integration with UI
//

// MOCK DATA (used for local dev or fallback)
const MOCK_MEMES = [
  {
    title: "Hang in there",
    image: "https://i.imgur.com/JqAXf4T.jpg",
    source: "Demo"
  },
  {
    title: "Just VIBIN'",
    image: "https://i.imgur.com/dM7Thhn.png",
    source: "Demo"
  },
  {
    title: "When you code all night...",
    image: "https://i.imgur.com/zG0Ndje.jpeg",
    source: "Demo"
  }
];

const MOCK_JOKES = [
  "Why don't skeletons fight each other? They don't have the guts.",
  "Why was the math book sad? Because it had too many problems.",
  "How do you organize a space party? You planet!"
];

const MOCK_GIFS = [
  "https://media.giphy.com/media/l0MYGb1LuZ3n7dRnO/giphy.gif",
  "https://media.giphy.com/media/PKX6cVvkQwKjS/giphy.gif",
  "https://media.giphy.com/media/3ohhwl0ZbLq1CdfCRG/giphy.gif"
];

const MOCK_QUOTES = [
  { author: "Walt Disney", text: "The way to get started is to quit talking and begin doing." },
  { author: "Maya Angelou", text: "Try to be a rainbow in someone's cloud." },
  { author: "Oscar Wilde", text: "Be yourself; everyone else is already taken." }
];

// --- Utility Fetch Helpers (with fallback to mock data) ---
async function fetchJson(url, options = {}, fallback) {
  try {
    const resp = await fetch(url, options);
    if (!resp.ok) throw new Error("Bad response");
    return await resp.json();
  } catch (e) {
    if (process.env.NODE_ENV !== "production") {
      // In dev mode, use fallback/mocks
      return fallback ?? null;
    }
    throw e;
  }
}

// PUBLIC_INTERFACE
/**
 * Fetch memes from a public API, falling back to mock data if unavailable.
 * @param {string} mood - Mood string (for future personalization, optional)
 * @returns {Promise<Array<{title: string, image: string, [source]: string}>>}
 */
export async function fetchMemes(mood = "") {
  // Meme API (public sample): https://meme-api.com/gimme/3 (returns {memes: [{title, url,...}]})
  const memeApiUrl = "https://meme-api.com/gimme/3";
  const fallback = MOCK_MEMES;

  try {
    const data = await fetchJson(memeApiUrl, {}, fallback);
    // .memes is an array, but fallback is already array
    if (data && Array.isArray(data.memes)) {
      // Map API response to our format
      return data.memes.map(m => ({
        title: m.title || "Untitled Meme",
        image: m.url || "",
        source: m.postLink || "meme-api.com"
      }));
    }
    // fallback to mock data, if data invalid
    return fallback;
  } catch (err) {
    return fallback;
  }
}

// PUBLIC_INTERFACE
/**
 * Fetch a random joke for the given mood from a joke API or mock fallback.
 * @param {string} mood
 * @returns {Promise<string>} - Joke text
 */
export async function fetchJoke(mood = "") {
  // Joke API (public): https://official-joke-api.appspot.com/random_joke
  const jokeUrl = "https://official-joke-api.appspot.com/random_joke";
  const fallback = MOCK_JOKES[Math.floor(Math.random() * MOCK_JOKES.length)];

  try {
    const data = await fetchJson(jokeUrl, {}, null);
    if (data && typeof data.setup === "string" && typeof data.punchline === "string") {
      return `${data.setup} ${data.punchline}`;
    }
    return fallback;
  } catch {
    return fallback;
  }
}

// PUBLIC_INTERFACE
/**
 * Fetch a cheerful GIF URL from Giphy public API or use a mock in fallback/dev mode.
 * @param {string} mood
 * @returns {Promise<string>} - GIF URL
 */
export async function fetchGif(mood = "") {
  // Giphy public test API: https://api.giphy.com/v1/gifs/random?tag=funny&api_key=dc6zaTOxFJmzC
  // (Note: This public key is rate-limited; using in demo-only)
  const apiKey = "dc6zaTOxFJmzC"; // Public beta key
  const gifApiUrl = `https://api.giphy.com/v1/gifs/random?tag=funny,${encodeURIComponent(mood)}&api_key=${apiKey}`;
  const fallback = MOCK_GIFS[Math.floor(Math.random() * MOCK_GIFS.length)];

  try {
    const data = await fetchJson(gifApiUrl, {}, null);
    if (data && data.data && data.data.images && data.data.images.fixed_height) {
      return data.data.images.fixed_height.url;
    }
    // Fallback to GIF from mock list
    return fallback;
  } catch {
    return fallback;
  }
}

// PUBLIC_INTERFACE
/**
 * Fetch an inspiring or mood-lifting quote from a free quotes API, with fallback.
 * @param {string} mood
 * @returns {Promise<{text: string, author: string}>}
 */
export async function fetchQuote(mood = "") {
  // Quote API (public sample): https://api.quotable.io/random
  const quoteUrl = "https://api.quotable.io/random";
  const fallback = MOCK_QUOTES[Math.floor(Math.random() * MOCK_QUOTES.length)];

  try {
    const data = await fetchJson(quoteUrl, {}, null);
    if (data && data.content && data.author) {
      return { text: data.content, author: data.author };
    }
    return fallback;
  } catch {
    return fallback;
  }
}

// Also export the mock data for development/demo/testing
export const __mockData = {
  memes: MOCK_MEMES,
  jokes: MOCK_JOKES,
  gifs: MOCK_GIFS,
  quotes: MOCK_QUOTES,
};
