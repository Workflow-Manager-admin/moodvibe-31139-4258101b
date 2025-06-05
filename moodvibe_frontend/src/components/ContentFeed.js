import React from "react";
import "../App.css";

/**
 * ContentFeed
 * Displays a vibrant feed of cheerful content cards, themed for MoodVibe.
 * Accepts a 'mood' prop to customize placeholder content, and is ready for future API/content integration.
 *
 * Props:
 *   mood (string): The currently selected user mood
 */
// PUBLIC_INTERFACE
function ContentFeed({ mood }) {
  // Placeholder for different content types ("Meme", "Joke", "GIF", "Quote")
  // In the future, this will be replaced/fetched dynamically from an API
  const placeholderTypes = ["Meme", "Joke", "GIF", "Quote"];

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
      {placeholderTypes.map((type) => (
        // Placeholder for ContentCard - replace with imported ContentCard in next implementation phase
        <div
          key={type}
          className="content-card content-card-placeholder"
          style={{
            background: "#fff",
            border: `2.5px solid ${
              type === "Meme"
                ? "var(--primary)"
                : type === "Joke"
                ? "var(--secondary)"
                : type === "GIF"
                ? "var(--accent)"
                : "#8ac926"
            }`,
            borderRadius: 16,
            padding: "22px 26px",
            boxShadow: "0 2px 12px rgba(255,179,71,0.12)",
            margin: "8px 0",
            minWidth: 270,
            flex: "1 1 44%",
            maxWidth: 340,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            transition: "box-shadow 0.15s",
            position: "relative",
          }}
        >
          <div
            style={{
              fontSize: "2.25rem",
              marginBottom: 7,
            }}
            aria-label={type + " icon"}
          >
            {type === "Meme"
              ? "😄"
              : type === "Joke"
              ? "😂"
              : type === "GIF"
              ? "🎬"
              : type === "Quote"
              ? "📝"
              : "✨"}
          </div>
          <strong
            style={{
              color:
                type === "Meme"
                  ? "var(--primary)"
                  : type === "Joke"
                  ? "var(--secondary)"
                  : type === "GIF"
                  ? "var(--accent)"
                  : "#8ac926",
              fontSize: "1.25rem",
              marginBottom: 6,
              letterSpacing: 1,
            }}
          >
            {type}
          </strong>
          <div
            style={{
              color: "#7c7c7c",
              fontSize: "1.05rem",
              marginBottom: 4,
              textAlign: "center",
            }}
          >
            {/* Placeholder text for future dynamic content */}
            <span style={{ opacity: 0.93 }}>
              {type === "GIF" ? (
                <>[Animated GIF here for <b>{mood || "your mood"}</b>]<br /></>
              ) : (
                <>[Placeholder {type.toLowerCase()} for <b>{mood || "your mood"}</b>]<br /></>
              )}
            </span>
          </div>
          <div
            style={{
              fontSize: "0.95rem",
              color: "var(--accent)",
              fontWeight: 500,
              marginTop: 2,
            }}
          >
            {/* Marking this clearly as a placeholder */}
            <em>
              <span role="img" aria-label="sparkle">
                ✨
              </span>
              &nbsp;Placeholder, API data coming soon
            </em>
          </div>
        </div>
      ))}
      {/* Insert here: FETCHED DATA FROM API, mapped to ContentCard instances, in future implementation */}
    </div>
  );
}

export default ContentFeed;
