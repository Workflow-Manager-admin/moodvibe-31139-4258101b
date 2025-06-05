import React, { useState } from "react";
import "../App.css";

/**
 * Profile (Vibrant & Playful!)
 * Joyfully themed MoodVibe user profile component.
 * Enhanced with big gradients, sticker bursts, accent neon borders,
 * expressive emoji, and pulsing mood stats for a playful, cohesive experience.
 * UI leverages the app's color theme & fun details (stickers, sparkle, party emoji, etc).
 */
// PUBLIC_INTERFACE
function Profile({ user }) {
  // Demo data fallback if no user prop
  const [demoUser] = useState({
    name: "Cheerful Explorer",
    avatar: "🧑‍🎨", // Could be an emoji or URL
    moods: [
      { mood: "Happy", time: "Today", emoji: "😄" },
      { mood: "Motivated", time: "Yesterday", emoji: "💪" },
      { mood: "Excited", time: "2 days ago", emoji: "🤩" },
    ],
  });

  const profile = user || demoUser;

  return (
    <div className="mv-profile-container mv-profile-vibrant">
      {/* Sticker/Emoji Fun Bursts */}
      <span className="mv-profile-sticker mv-profile-sticker1" aria-hidden="true">✨</span>
      <span className="mv-profile-sticker mv-profile-sticker2" aria-hidden="true">🎈</span>
      <span className="mv-profile-sticker mv-profile-sticker3" aria-hidden="true">🌈</span>
      <div className="mv-profile-avatar-gradient" aria-label="User avatar">
        <span className="mv-profile-avatar-emoji" aria-label="avatar" role="img">{profile.avatar}</span>
      </div>
      <h2 className="mv-profile-username">{profile.name}</h2>
      <div className="mv-profile-desc">
        MoodVibe Explorer &mdash; <span className="mv-profile-desc-highlight">spreading good vibes! 🎵</span>
      </div>
      <div className="mv-profile-userstats vibrant-border">
        <b style={{ color: "var(--secondary)" }}>Username:</b>{" "}
        <span style={{ color: "var(--text-color)", fontWeight: 600 }}>
          {profile.name.toLowerCase().replace(/\s/g, "_")}
        </span>
        <br />
        <b style={{ color: "var(--secondary)" }}>Latest mood:</b>{" "}
        <span className="mv-profile-moodchip">
          <span className="mv-profile-moodemoji">{profile.moods[0]?.emoji}</span>
          <span className="mv-profile-moodtext">{profile.moods[0]?.mood}</span>
        </span>
      </div>
      <div className="mv-profile-history-block">
        <div className="mv-profile-history-title">
          <span role="img" aria-label="sparkle">💫</span> Mood History
        </div>
        <ul className="mv-profile-moodlist">
          {profile.moods.map((entry, idx) => (
            <li className="mv-profile-moodlist-item" key={idx}>
              <span className="mv-profile-history-emoji" role="img" aria-label={entry.mood + " mood"}>
                {entry.emoji}
              </span>
              <span className="mv-profile-history-mood">{entry.mood}</span>
              <span className="mv-profile-history-time">{entry.time}</span>
              {/* Fun extra sticker for top mood */}
              {idx === 0 && <span className="mv-profile-history-crown" title="Top mood">👑</span>}
            </li>
          ))}
        </ul>
      </div>
      <div className="mv-profile-footer-cheer">
        <span role="img" aria-label="party popper">🎉</span>
        {" "}
        Keep glowing with
        <span className="mv-profile-moodvibe"> MoodVibe</span>
        <span role="img" aria-label="star">✨</span>
      </div>
    </div>
  );
}

export default Profile;
