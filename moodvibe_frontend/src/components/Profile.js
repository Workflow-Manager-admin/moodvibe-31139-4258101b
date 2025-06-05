import React, { useState } from "react";
import "../App.css";

/**
 * Profile (Ultra-vivid MoodVibe Edition!)
 * Joyously vibrant, avatar-centric, playful user profile—completely on-brand for MoodVibe.
 * Huge gradient avatar "card", expressive sticker/emoji clouds, bold type, animated badges, and fun themed accent touches.
 */
// PUBLIC_INTERFACE
function Profile({ user }) {
  // Demo fallback if no user data is passed
  const [demoUser] = useState({
    name: "Cheerful Explorer",
    avatar: "🧑‍🎨", // Emoji or string
    moods: [
      { mood: "Happy", time: "Today", emoji: "😄" },
      { mood: "Motivated", time: "Yesterday", emoji: "💪" },
      { mood: "Excited", time: "2 days ago", emoji: "🤩" },
    ],
  });

  const profile = user || demoUser;

  // PUBLIC_INTERFACE
  // Helper: playful sticker cloud collection (unique, animated, can vary in future)
  const stickers = [
    { className: "mv-profile-sticker mv-profile-sticker1", emoji: "✨", style: {} },
    { className: "mv-profile-sticker mv-profile-sticker2", emoji: "🎈", style: {} },
    { className: "mv-profile-sticker mv-profile-sticker3", emoji: "🌈", style: {} },
  ];

  // PUBLIC_INTERFACE
  return (
    <div className="mv-profile-container mv-profile-vibrant" style={{ overflow: "visible" }}>
      {/* Floating Sticker/Emoji Fun: Joyful and animated */}
      {stickers.map((s, i) => (
        <span key={i} className={s.className} aria-hidden="true" style={s.style}>
          {s.emoji}
        </span>
      ))}

      {/* Large Vibrant Avatar with Emoji Bubble */}
      <div
        className="mv-profile-avatar-gradient"
        aria-label="User avatar"
        tabIndex={0}
        style={{
          position: "relative",
          marginTop: -70,
        }}
      >
        {/* Fun confetti/star edge pop! */}
        <span
          style={{
            position: "absolute",
            top: "-21px",
            left: "-26px",
            fontSize: "2.2rem",
            opacity: 0.7,
            transform: "rotate(-14deg)",
            filter: "blur(.2px) brightness(1.13)",
            pointerEvents: "none",
          }}
          aria-hidden="true"
        >
          🎨
        </span>
        <span
          className="mv-profile-avatar-emoji"
          aria-label="avatar"
          role="img"
          style={{
            // Even larger avatar for playful vibe!
            fontSize: "4.95rem",
            filter: "drop-shadow(0 4px 18px #fff9)",
          }}
        >
          {profile.avatar}
        </span>
        {/* Star burst accent */}
        <span
          style={{
            position: "absolute",
            bottom: "-18px",
            right: "-16px",
            fontSize: "1.33rem",
            opacity: 0.74,
            transform: "rotate(9deg) scaleX(-1)",
            filter: "blur(.1px) brightness(1.06)",
            pointerEvents: "none",
          }}
          aria-hidden="true"
        >
          ✨
        </span>
      </div>

      {/* Username/title — bold, animated, in-your-face */}
      <h2 className="mv-profile-username" style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {profile.name}
        <span role="img" aria-label="crown" title="Mood Royalty" style={{ fontSize: "1.28em", filter: "drop-shadow(0 2px 8px #FFD70099)" }}>
          {profile.moods[0]?.mood === "Happy" ? "👑" : "🥇"}
        </span>
      </h2>

      {/* Subtitle/Description — expressive font, a touch of drama */}
      <div className="mv-profile-desc" style={{ fontSize: "1.15rem", fontWeight: 600, margin: "0 0 15px 0" }}>
        MoodVibe Explorer &mdash;
        <span className="mv-profile-desc-highlight" style={{ fontWeight: 700, color: "var(--accent)", marginLeft: 7 }}>
          spreading good vibes! <span role="img" aria-label="speaker">🔊</span>
        </span>
      </div>

      {/* USERNAME & Latest Mood — on a vibrant, gradient "card" */}
      <div className="mv-profile-userstats vibrant-border"
        tabIndex={0}
        style={{
          margin: "13px 0 0 0",
          background: "linear-gradient(90deg, #FFF7FB 41%, #FFF1EA 100%)",
          borderRadius: 22,
          minWidth: 220,
          maxWidth: 340,
          fontSize: "1.19rem",
          fontWeight: 600,
        }}
      >
        <b style={{ color: "var(--secondary)", fontWeight: 800, fontSize: "1.01em" }}>
          Username:
        </b>{" "}
        <span style={{ color: "var(--text-color)", fontWeight: 700, textTransform: "lowercase", marginRight: 9 }}>
          @{profile.name.toLowerCase().replace(/\s/g, "_")}
        </span>
        <br />
        <b style={{ color: "var(--secondary)", fontWeight: 800, fontSize: "1.01em" }}>
          Latest mood:
        </b>
        <span
          className="mv-profile-moodchip"
          style={{
            marginLeft: 9,
            animation: "moodchipPulse 2.8s infinite alternate cubic-bezier(.4,1.7,.4,1.1)" // emphasize animation
          }}
        >
          <span className="mv-profile-moodemoji" aria-label={profile.moods[0]?.mood + " emoji"}>
            {profile.moods[0]?.emoji}
          </span>
          <span className="mv-profile-moodtext">{profile.moods[0]?.mood}</span>
        </span>
      </div>

      {/* MOOD HISTORY — amusing icon header, animated list */}
      <div className="mv-profile-history-block"
        style={{
          marginTop: 37,
          paddingBottom: 22,
          background: "linear-gradient(92deg, #fff1fa 42%, #ffe7f0 100%)",
        }}
      >
        <div className="mv-profile-history-title" style={{ gap: 8, fontSize: "1.18em" }}>
          <span role="img" aria-label="star sparkle">💫</span>
          Mood History
          <span role="img" aria-label="clock" style={{ fontSize: "1em", opacity: 0.7, marginLeft: 5 }}>⏰</span>
        </div>
        <ul className="mv-profile-moodlist">
          {profile.moods.map((entry, idx) => (
            <li
              className="mv-profile-moodlist-item"
              key={idx}
              tabIndex={0}
              style={{
                animation: "fadeInMoodCard .53s cubic-bezier(.28,1.18,.32,1) both",
                animationDelay: `${0.07 + 0.10 * idx}s`
              }}
            >
              <span className="mv-profile-history-emoji" role="img" aria-label={entry.mood + " mood"}>
                {entry.emoji}
              </span>
              <span className="mv-profile-history-mood">{entry.mood}</span>
              <span className="mv-profile-history-time" style={{ marginLeft: 7 }}>
                {entry.time}
              </span>
              {/* Fun badge, special for newest mood */}
              {idx === 0 && (
                <span className="mv-profile-history-crown" title="Current top mood">
                  👑
                </span>
              )}
              {/* Add a surprise sticker: */}
              {idx === 1 && (
                <span
                  role="img"
                  aria-label="muscle badge"
                  style={{
                    fontSize: "1.36em",
                    marginLeft: 7,
                    filter: "drop-shadow(0 1.5px 7px #6ec6ff75)",
                    animation: "stickerBounce 1.6s infinite alternate cubic-bezier(.41,1.7,.38,1.25)",
                  }}
                  title="Motivated badge"
                >
                  💥
                </span>
              )}
            </li>
          ))}
        </ul>
        {/* List item fade-in keyframes */}
        <style>
          {`
            @keyframes fadeInMoodCard {
              from {opacity: 0; transform: translateY(18px) scale(.96);}
              to {opacity: 1; transform: translateY(0) scale(1);}
            }
            @keyframes stickerBounce {
              0% { transform: scale(1) translateY(0);}
              100% { transform: scale(1.13) translateY(-10px);}
            }
          `}
        </style>
      </div>

      {/* Joyful, on-theme, animated footer cheer */}
      <div className="mv-profile-footer-cheer"
        style={{
          marginTop: 44,
          fontSize: "1.25rem",
          letterSpacing: ".07em",
        }}
      >
        <span role="img" aria-label="party popper" style={{ marginRight: 5 }}>🎉</span>
        Keep glowing with
        <span className="mv-profile-moodvibe" style={{ margin: "0 6px", color: "var(--accent)", fontWeight: 900, fontSize: "1.17em"}}>
          MoodVibe
        </span>
        <span role="img" aria-label="star">✨</span>
        <span
          role="img"
          aria-label="dizzy"
          style={{
            marginLeft: 7,
            fontSize: "1.12em",
            verticalAlign: "middle",
            filter: "drop-shadow(0 3px 8px #fff7)",
            animation: "footerStarSpin 2.7s infinite linear"
          }}
        >💫</span>
        <style>
          {`
            @keyframes footerStarSpin {
              from { transform: rotate(0); }
              to { transform: rotate(359deg);}
            }
          `}
        </style>
      </div>
    </div>
  );
}

export default Profile;
