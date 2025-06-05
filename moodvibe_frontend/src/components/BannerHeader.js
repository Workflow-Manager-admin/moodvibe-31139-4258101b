import React from "react";
import "../App.css";

// PUBLIC_INTERFACE
/**
 * BannerHeader: Visually engaging themed header/banner for MoodVibe.
 * Displays the app name "Your Mood Meme Buddy" with vibrant, cheerful style and minimal vertical real estate.
 */
function BannerHeader() {
  // Banner uses a vibrant multicolor gradient and a playful font weight
  return (
    <header
      className="mv-banner-header"
      style={{
        width: "100%",
        maxWidth: 520,
        margin: "0 auto",
        background: "linear-gradient(90deg, var(--primary) 37%, var(--secondary) 65%, var(--accent) 97%)",
        color: "white",
        borderRadius: "0 0 19px 19px",
        boxShadow: "0 3px 18px -8px var(--primary), 0 1.5px 7px var(--accent)14",
        padding: "0",
        position: "relative",
        zIndex: 100,
      }}
      aria-label="App Banner"
      tabIndex={0}
    >
      <style>
        {`
          .mv-banner-header {
            min-height: 54px;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeDownHeader 0.74s cubic-bezier(.38,1.7,.34,1);
            font-family: 'Inter', 'Roboto', 'Arial', sans-serif;
            user-select: none;
            overflow: visible !important;
            margin-bottom: 0;
          }
          .mv-banner-title {
            font-size: 1.52rem;
            font-weight: 900;
            letter-spacing: 1.6px;
            color: #fff !important;
            /* Remove all text gradient and background clip styles for true white text */
            background: none !important;
            -webkit-background-clip: unset !important;
            -webkit-text-fill-color: #fff !important;
            background-clip: unset !important;
            text-fill-color: #fff !important;
            text-shadow: 0 2px 14px #222b, 0 3.5px 13px var(--primary)44, 0 0 2px #222b;
            padding: 0 0.4em;
            filter: brightness(1.15) drop-shadow(0 2px 8px var(--accent)22);
            transition: text-shadow 0.2s, filter 0.2s, color 0.2s;
          }
          .mv-banner-header:hover .mv-banner-title, .mv-banner-header:focus-visible .mv-banner-title {
            filter: brightness(1.30) drop-shadow(0 4px 10px var(--secondary)33);
            text-shadow: 0 5px 24px var(--primary)22, 0 1.5px 8px var(--accent)33;
          }
          @keyframes fadeDownHeader {
            from {
              opacity: 0; 
              transform: translateY(-24px) scale(.98);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
        `}
      </style>
      <span className="mv-banner-title" aria-label="Your Mood Meme Buddy">
        <span role="img" aria-label="rainbow" style={{ marginRight: 8, fontSize: "1.1em" }}>🌈</span>
        Your Mood Meme Buddy
        <span role="img" aria-label="party popper" style={{ marginLeft: 9, fontSize: "1em" }}>🎉</span>
      </span>
    </header>
  );
}
export default BannerHeader;
