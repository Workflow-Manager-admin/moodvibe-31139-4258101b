import React, { useEffect, useState } from "react";
import "../App.css";
import {
  fetchMemes,
  fetchJoke,
  fetchGif,
  fetchQuote,
} from "../api/contentApi";
import ContentCard from "./ContentCard";

/**
 * ContentFeed
 * Displays a vibrant feed of cheerful content cards, themed for MoodVibe.
 * Fetches memes, jokes, GIFs, and quotes tailored to current mood.
 *
 * Props:
 *   mood (string): The currently selected user mood
 */
// PUBLIC_INTERFACE
function ContentFeed({ mood }) {
  // State for each content type
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [memes, setMemes] = useState([]);
  const [joke, setJoke] = useState("");
  const [gif, setGif] = useState("");
  const [quote, setQuote] = useState(null);

  // Fetch all content types whenever the mood changes
  useEffect(() => {
    let didCancel = false;

    async function fetchContent() {
      setLoading(true);
      setError("");
      try {
        // Parallel fetches for all types
        const [memesData, jokeData, gifData, quoteData] = await Promise.all([
          fetchMemes(mood),
          fetchJoke(mood),
          fetchGif(mood),
          fetchQuote(mood),
        ]);
        if (!didCancel) {
          setMemes(memesData || []);
          setJoke(jokeData || "");
          setGif(gifData || "");
          setQuote(quoteData || null);
        }
      } catch (e) {
        if (!didCancel) {
          setError("Failed to fetch content. Please try again.");
        }
      } finally {
        if (!didCancel) setLoading(false);
      }
    }

    // If no mood, clear content
    if (!mood) {
      setMemes([]);
      setJoke("");
      setGif("");
      setQuote(null);
      setLoading(false);
      setError("");
      return;
    }

    fetchContent();

    return () => {
      didCancel = true;
    };
  }, [mood]);

  // Determine render state
  if (!mood) {
    // No mood selected yet
    return (
      <div
        className="content-feed"
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 210,
          opacity: 0.93,
          fontSize: "1.25rem"
        }}
        aria-label="Awaiting user mood"
      >
        <span className="content-feed-placeholder">
          <span role="img" aria-label="sparkle">✨</span>
          &nbsp;Select your mood above to discover uplifting content!
        </span>
      </div>
    );
  }

  if (loading) {
    return (
      <div
        className="content-feed"
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 210,
          fontSize: "1.15rem",
        }}
        aria-label="Loading cheerful content"
      >
        <span style={{ color: "var(--primary)", fontWeight: 600 }}>
          Fetching your mood-based memes, jokes, GIFs, and quotes…
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="content-feed"
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 210,
          color: "var(--accent)",
          fontSize: "1.12rem",
        }}
        aria-label="Content loading error"
      >
        {error}
      </div>
    );
  }

  // Main content rendering - Meme(s), Joke, GIF, Quote
  return (
    <div
      className="content-feed"
      style={{
        width: "100%",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "20px 16px",
        padding: "8px 3vw",
        background: "var(--bg-secondary)",
        borderRadius: 20,
        boxShadow: "var(--shadow)",
        minHeight: 240,
      }}
      aria-label="Content feed with uplifting cards"
    >
      {/* Memes (may have multiple) */}
      {Array.isArray(memes) && memes.length > 0 && memes.slice(0, 2).map((meme, i) => (
        <ContentCard
          key={`meme-${i}`}
          contentType="Meme"
          contentValue={
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <img
                src={meme.image}
                alt={meme.title}
                style={{
                  maxWidth: 210,
                  borderRadius: 8,
                  marginBottom: 7,
                  boxShadow: "0 2px 11px rgba(255,179,71,0.08)",
                  background: "#fff4",
                }}
                loading="lazy"
              />
              <span style={{ color: "#e87a41", fontWeight: 600, fontSize: "1rem" }}>
                {meme.title}
              </span>
              <span
                style={{
                  color: "#a0866a",
                  fontSize: "0.85rem",
                  opacity: 0.7,
                  fontStyle: "italic",
                  marginTop: 2
                }}
              >
                {/* Demo label for source */}
                {meme.source ? `Source: ${meme.source}` : ""}
              </span>
            </div>
          }
        />
      ))}

      {/* Joke */}
      {joke && (
        <ContentCard contentType="Joke" contentValue={joke} />
      )}

      {/* GIF */}
      {gif && (
        <ContentCard contentType="GIF" contentValue={gif} />
      )}

      {/* Quote */}
      {quote && (
        <ContentCard
          contentType="Quote"
          contentValue={
            <>
              <span>"{quote.text}"</span>
              <br />
              <span style={{ fontStyle: "italic", color: "#6cab46", fontSize: "0.97rem" }}>
                - {quote.author}
              </span>
            </>
          }
        />
      )}
    </div>
  );
}

export default ContentFeed;
