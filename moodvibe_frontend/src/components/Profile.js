import React, { useState } from "react";
import "../App.css";

/**
 * Profile
 * Brightly themed MoodVibe user profile component.
 * Shows avatar, username, and mood history stub.
 * Props (future): user { name, avatar, moods, ... }
 * Ready for integration with real user data.
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
    <div
      style={{
        margin: "0 auto",
        width: "100%",
        maxWidth: 480,
        padding: "38px 0 110px 0",
        minHeight: "68vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "var(--bg-secondary)",
        borderRadius: 24,
        boxShadow: "var(--shadow)",
        marginTop: 38,
      }}
      className="mv-profile-container"
    >
      <div
        style={{
          background: "linear-gradient(91deg, var(--primary) 68%, var(--secondary) 100%)",
          borderRadius: "50%",
          width: 108,
          height: 108,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 26,
          marginTop: -54,
          boxShadow: "0 4px 32px var(--accent)33",
          border: "7px solid #fff",
        }}
        aria-label="User avatar"
      >
        <span style={{ fontSize: 64, lineHeight: 1 }}>{profile.avatar}</span>
      </div>
      <h2
        style={{
          color: "var(--primary)",
          fontSize: "2.05rem",
          margin: "0 0 7px 0",
          fontWeight: 800,
          letterSpacing: 1,
          textShadow: "0 2px 18px #fff6",
        }}
      >
        {profile.name}
      </h2>
      <div style={{
        fontSize: "1.08rem",
        color: "var(--text-secondary)",
        marginBottom: 19,
        fontWeight: 500,
      }}>
        MoodVibe Explorer &mdash; spreading good vibes!
      </div>
      <div
        style={{
          border: "2.5px solid var(--accent)",
          borderRadius: 13,
          background: "#fff",
          margin: "7px 0 0 0",
          boxShadow: "0 1.5px 9px var(--secondary)15, var(--shadow)",
          padding: 17,
          minWidth: 232,
          textAlign: "left",
          fontSize: "1.11rem"
        }}
      >
        <b style={{ color: "var(--secondary)" }}>Username:</b>{" "}
        <span style={{ color: "var(--text-color)", fontWeight: 600 }}>
          {profile.name.toLowerCase().replace(/\s/g, "_")}
        </span>
        <br />
        <b style={{ color: "var(--secondary)" }}>Latest mood:</b>{" "}
        <span style={{ color: "var(--primary)", fontWeight: 700 }}>
          {profile.moods[0]?.mood} {profile.moods[0]?.emoji}
        </span>
      </div>
      <div
        style={{
          marginTop: 34,
          width: "90%",
          maxWidth: 320,
        }}
      >
        <div
          style={{
            fontWeight: 700,
            color: "var(--accent)",
            fontSize: "1.09rem",
            letterSpacing: 0.7,
            marginBottom: 10,
            textAlign: "center"
          }}
        >
          Mood History
        </div>
        <ul
          style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            gap: 5,
          }}
        >
          {profile.moods.map((entry, idx) => (
            <li
              key={idx}
              style={{
                background: "linear-gradient(87deg, var(--secondary)11 60%, var(--accent)07 100%)",
                borderRadius: 9,
                padding: "7px 13px",
                marginBottom: 0,
                display: "flex",
                alignItems: "center",
                gap: 8,
                color: "var(--secondary)",
                fontSize: "1rem",
                fontWeight: 500,
                boxShadow: "0 0.8px 3px var(--secondary)11"
              }}
            >
              <span style={{
                fontSize: "1.25em"
              }}>{entry.emoji}</span>
              <span style={{ flex: 1 }}>
                {entry.mood}
                <span style={{
                  color: "var(--text-secondary)",
                  fontSize: "0.92em",
                  fontWeight: 400,
                  marginLeft: 8
                }}>
                  {entry.time}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div style={{
        marginTop: 38,
        fontSize: "1.14rem",
        color: "var(--primary)",
        textShadow: "0 1.5px 4px var(--primary)33"
      }}>
        🎉 Keep glowing with MoodVibe!
      </div>
    </div>
  );
}

export default Profile;
