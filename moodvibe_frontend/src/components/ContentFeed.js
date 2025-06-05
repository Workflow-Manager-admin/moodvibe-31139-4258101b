import React from "react";
import "../App.css";

/**
 * ContentCard Component
 * Represents a placeholder card for a single piece of content (meme, joke, gif, quote).
 *
 * Props:
 *   type: String ("Meme", "Joke", "GIF", "Quote")
 *   mood: Current mood prop (string)
 */
// PUBLIC_INTERFACE
function ContentCard({ type, mood }) {
  // Define friendly icons for each type (for visual cheerfulness)
  const typeIcon = {
    Meme: "😄",
    Joke: "😂",
    GIF: "🎬",
    Quote: "📝",
  }[type] || "✨";

  // Card color accent based on type
  const accentMap = {
    Meme: "var(--primary)",
    Joke: "var(--secondary)",
    GIF: "var(--accent)",
    Quote: "#8ac926", // splash of green for variety
  };
  const accent = accentMap[type] || "var(--primary)";

  return (
    <div
      className="content-card"
      style={{
        background: "#fff",
        border: `2.5px solid ${accent}`,
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
          fontSize: "2.35rem",
          marginBottom: 7,
          lineHeight: 1.1,
        }}
        aria-label={type + " icon"}
      >
        {typeIcon}
      </div>
      <strong style={{
        color: accent,
        fontSize: "1.25rem",
        marginBottom: 6,
        letterSpacing: 1
      }}>
        {type}
      </strong>
      <div
        style={{
          color: "#7c7c7c",
          fontSize: "1.05rem",
          marginBottom: 4,
          textAlign: "center"
        }}
      >
        {/* Placeholder text for future dynamic content */}
        <span style={{
          opacity: 0.93,
        }}>
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
          <span role="img" aria-label="sparkle">✨</span>
          Placeholder, API data coming soon
        </em>
      </div>
    </div>
  );
}

/**
 * ContentFeed
 * Renders four types of content cards (meme, joke, gif, quote) as uplifting placeholders.
 * Uses vibrant, cheery layout suitable for MoodVibe's uplifting style.
 *
 * Props:
 *   mood (string): Current mood selected by user (propagated for later dynamic content)
 */
// PUBLIC_INTERFACE
function ContentFeed({ mood }) {
  // Scaffold card types (to be dynamic in future)
  const cardTypes = ["Meme", "Joke", "GIF", "Quote"];

  return (
    <div
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
      {cardTypes.map((type) => (
        <ContentCard key={type} type={type} mood={mood} />
      ))}
    </div>
  );
}

export default ContentFeed;
