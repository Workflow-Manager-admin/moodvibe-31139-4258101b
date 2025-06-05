import React from "react";

/**
 * ContentCard
 * Cheerful, themed card component for MoodVibe to display a meme, joke, GIF, or quote.
 * - Visually distinct and uplifting per content type (cheerful accent colors, icons).
 * - Card features entrance & hover animation.
 * - Theme-based, vibrant styling using MoodVibe CSS color vars.
 * 
 * Props:
 *   contentType (string): One of "Meme" | "Joke" | "GIF" | "Quote"
 *   contentValue (string|JSX): Main content to display (text, image src, GIF url, etc.)
 */
// PUBLIC_INTERFACE
function ContentCard({ contentType, contentValue }) {
  // Accent color and icon per content type
  const styleMap = {
    Meme: {
      border: "2.5px solid var(--primary)",
      bg: "linear-gradient(130deg, #ffe3c2 70%, #fffaee 100%)",
      color: "var(--primary)",
      icon: "😄",
      shadow: "0 2px 14px 0 rgba(255,179,71,0.13)",
      label: "Meme",
      accentRing: "rgba(255,179,71,0.21)"
    },
    Joke: {
      border: "2.5px solid var(--secondary)",
      bg: "linear-gradient(130deg, #e1f5fe 68%, #f3fbff 100%)",
      color: "var(--secondary)",
      icon: "😂",
      shadow: "0 2.5px 13px 0 rgba(110,198,255,0.12)",
      label: "Joke",
      accentRing: "rgba(110,198,255,0.23)"
    },
    GIF: {
      border: "2.5px solid var(--accent)",
      bg: "linear-gradient(125deg, #ffd2e3 64%, #feeeec 100%)",
      color: "var(--accent)",
      icon: "🎬",
      shadow: "0 2px 13px 0 rgba(255,111,145,0.13)",
      label: "GIF",
      accentRing: "rgba(255,111,145,0.18)"
    },
    Quote: {
      border: "2.5px solid #8ac926",
      bg: "linear-gradient(120deg, #dbffdd 65%, #f5fff7 100%)",
      color: "#6cab46",
      icon: "📝",
      shadow: "0 2.5px 13px 0 rgba(138,201,38,0.12)",
      label: "Quote",
      accentRing: "rgba(138,201,38,0.19)"
    }
  };
  // Fallback for invalid types
  const style = styleMap[contentType] || styleMap.Meme;

  // Distinctive card entrance animation + hover uplift
  const cardStyle = {
    background: style.bg,
    border: style.border,
    borderRadius: 17,
    padding: "22px 24px 18px 24px",
    boxShadow: style.shadow + ", var(--shadow)",
    minWidth: 240,
    maxWidth: 350,
    width: "100%",
    margin: "10px 0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    position: "relative",
    animation: "mvCardFadeIn 0.67s cubic-bezier(.18,1.2,.22,1)",
    overflow: "hidden",
    // Subtle breathing effect when focused
    transition: "transform 0.21s cubic-bezier(.47,1.87,.23,1), box-shadow 0.24s cubic-bezier(.39,1.5,.38,1), outline 0.16s",
  };

  // Unique class for hover/focus/keyframes scoping
  const uniqueId = Math.random().toString(36).slice(2, 10);

  // Helper for rendering contentValue appropriately (GIF = image, others = text)
  function renderContent() {
    if (contentType === "GIF") {
      // Accepts string URL or JSX
      if (typeof contentValue === "string") {
        return (
          <img
            src={contentValue}
            alt="Cheerful GIF"
            style={{
              maxWidth: "98%",
              borderRadius: 11,
              boxShadow: "0 2px 13px 0 rgba(255,111,145,0.10)",
              margin: "10px 0 6px 0",
              background: "rgba(255,255,255,0.85)",
            }}
            loading="lazy"
          />
        );
      }
      return contentValue;
    }
    // For all others, treat as text/JSX
    return (
      <div
        style={{
          color: style.color,
          fontSize: contentType === "Quote" ? "1.17rem" : "1.13rem",
          fontWeight: 500,
          letterSpacing: 0.06,
          textAlign: "center",
          margin: "7px 0 0 0"
        }}
      >
        {contentValue}
      </div>
    );
  }

  return (
    <div
      className={`mv-content-card mv-content-card-${uniqueId}`}
      tabIndex={0}
      style={cardStyle}
      aria-label={contentType + " content card"}
    >
      {/* Style block for animation & hover, JS-generated unique class for scoping */}
      <style>
        {`
        @keyframes mvCardFadeIn {
          from {
            opacity: 0;
            transform: translateY(16px) scale(0.94);
          }
          to {
            opacity: 1;
            transform: translateY(0px) scale(1);
          }
        }
        .mv-content-card-${uniqueId}:hover, .mv-content-card-${uniqueId}:focus-visible {
          box-shadow: 0 6px 36px ${style.accentRing}, 0 2.5px 18px 0 ${style.accentRing}, var(--shadow);
          transform: scale(1.033) translateY(-3px) rotate(-0.6deg);
          z-index: 4;
        }
        `}
      </style>
      {/* Icon with vibrant background ring */}
      <div
        aria-label={contentType + " icon"}
        style={{
          fontSize: "2.1rem",
          marginBottom: 6,
          background: style.accentRing,
          borderRadius: "50%",
          padding: 9,
          marginTop: -12,
          marginLeft: "auto",
          marginRight: "auto",
          width: 48,
          height: 48,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 1.5px 7px " + style.accentRing
        }}
      >
        {style.icon}
      </div>
      {/* Label */}
      <div
        style={{
          color: style.color,
          fontSize: "1.155rem",
          letterSpacing: 1,
          fontWeight: 600,
          marginBottom: 3,
          textShadow: `0 1px 2px #fff4`
        }}
      >
        {style.label}
      </div>
      {/* Main content value - either text, meme image, GIF, or quote */}
      {renderContent()}
    </div>
  );
}

export default ContentCard;
