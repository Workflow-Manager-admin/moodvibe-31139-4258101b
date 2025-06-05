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
  // State: loading/error + all content types
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [content, setContent] = useState({
    memes: [],
    joke: "",
    gif: "",
    quote: null,
  });

  // Ref: fetch on mood change
  useEffect(() => {
    let didCancel = false;

    const fetchAllContent = async () => {
      setLoading(true);
      setError("");
      try {
        // Fetch all types in parallel
        const [memes, joke, gif, quote] = await Promise.all([
          fetchMemes(mood),
          fetchJoke(mood),
          fetchGif(mood),
          fetchQuote(mood),
        ]);
        if (!didCancel) {
          setContent({
            memes: memes || [],
            joke: joke || "",
            gif: gif || "",
            quote: quote || null,
          });
        }
      } catch (e) {
        if (!didCancel) setError("Failed to fetch content. Please try again later.");
      } finally {
        if (!didCancel) setLoading(false);
      }
    };

    if (!mood) {
      setContent({
        memes: [],
        joke: "",
        gif: "",
        quote: null,
      });
      setError("");
      setLoading(false);
      return;
    }

    fetchAllContent();

    return () => {
      didCancel = true;
    };
  }, [mood]);

  // UI - Awaiting user mood
  if (!mood) {
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
          fontSize: "1.25rem",
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

  // UI - Loading
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

  // UI - Error
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

  // Main content rendering (cards)
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
      {/* Dynamically render meme cards (limit 2 for demo) */}
      {Array.isArray(content.memes) && content.memes.length > 0 &&
        content.memes.slice(0, 2).map((meme, idx) => (
          <ContentCard
            key={`meme-${idx}`}
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
                  {meme.source ? `Source: ${meme.source}` : ""}
                </span>
              </div>
            }
          />
        ))
      }

      {/* Joke Card */}
      {content.joke && (
        <ContentCard contentType="Joke" contentValue={content.joke} />
      )}

      {/* GIF Card */}
      {content.gif && (
        <ContentCard contentType="GIF" contentValue={content.gif} />
      )}

      {/* Quote Card */}
      {content.quote && (
        <ContentCard
          contentType="Quote"
          contentValue={
            <>
              <span>"{content.quote.text}"</span>
              <br />
              <span style={{ fontStyle: "italic", color: "#6cab46", fontSize: "0.97rem" }}>
                - {content.quote.author}
              </span>
            </>
          }
        />
      )}
    </div>
  );
}

export default ContentFeed;
