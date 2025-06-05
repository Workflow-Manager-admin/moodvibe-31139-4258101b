import React, { useState, useMemo } from "react";
import "../App.css";

/**
 * Profile (Ultra-vivid MoodVibe Edition!)
 * — Enhanced for editing Username, Birthday, and Mood, with vibrant emoji/thumbs-up visuals!
 * — Data updates call onUserChange to persist, are saved in localStorage at top-level.
 */
// PUBLIC_INTERFACE
function Profile({ user, onUserChange }) {
  // Only fields: name, birthday (YYYY-MM-DD), mood (string)
  const moodChoices = [
    { mood: "Happy", emoji: "😄" },
    { mood: "Excited", emoji: "🤩" },
    { mood: "Motivated", emoji: "💪" },
    { mood: "Bored", emoji: "😐" },
    { mood: "Tired", emoji: "😴" },
    { mood: "Anxious", emoji: "😬" },
    { mood: "Calm", emoji: "🧘" },
    { mood: "Sad", emoji: "😢" },
    { mood: "Thrilled", emoji: "😃" },
    { mood: "Chill", emoji: "😎" },
    { mood: "Vibing", emoji: "🟣" },
    { mood: "🤖 AI", emoji: "🤖" }
  ];

  // Editable state (local form)
  const [edit, setEdit] = useState({
    name: user?.name || "",
    birthday: user?.birthday || "",
    mood: user?.mood || "",
  });
  const [savedNotif, setSavedNotif] = useState("");
  const [justSavedAuto, setJustSavedAuto] = useState(false);

  // today check for birthday effect
  const todayStr = new Date().toISOString().slice(5, 10); // MM-DD
  const isBirthday = Boolean(edit.birthday && edit.birthday.slice(5, 10) === todayStr);

  // Most recently selected mood for display in history (minimal demo logic)
  const moodObj = useMemo(
    () => moodChoices.find(m => m.mood === edit.mood) || { mood: edit.mood || "?", emoji: "🎭" },
    [edit.mood]
  );
  const moodHistory = useMemo(
    () =>
      [edit.mood ? { mood: edit.mood, time: "Today", emoji: moodObj.emoji } : null]
      .filter(Boolean),
    [edit.mood, moodObj.emoji]
  );

  // Helper for localStorage persistence (synchronous, fun UX: 🎉)
  const persistProfile = (data, sticky) => {
    try {
      window.localStorage.setItem("moodvibe_userprofile", JSON.stringify(data));
      if (sticky) {
        setSavedNotif("Saved! 🎉");
        setJustSavedAuto(true);
        setTimeout(() => {
          setSavedNotif("");
          setJustSavedAuto(false);
        }, 1100);
      }
    } catch {}
  };

  // Save handler: triggers onUserChange upward and shows a little celebration
  function handleSave(e) {
    e.preventDefault();
    if (edit.name.trim()) {
      onUserChange({ ...edit });
      persistProfile({ ...edit }, true);
      setSavedNotif("Profile saved! 👍");
      setTimeout(() => setSavedNotif(""), 1500);
    }
  }

  // Handler for controlled updates — update local state, parent, and localStorage
  function handleFieldChange(field, value) {
    setEdit(prev => {
      const next = { ...prev, [field]: value };
      // Push up to parent immediately (for unified app state)
      onUserChange(next);
      persistProfile(next, false);
      return next;
    });
  }

  // Emoji options for sticker visuals
  const stickers = [
    { className: "mv-profile-sticker mv-profile-sticker1", emoji: "👍", style: { fontSize: "2.2em", top:28 } },
    { className: "mv-profile-sticker mv-profile-sticker2", emoji: "✨", style: {} },
    { className: "mv-profile-sticker mv-profile-sticker3", emoji: "🎉", style: {} },
    { className: "mv-profile-sticker", emoji: "🥳", style: { top: "70%", right: "12%", fontSize: "1.3em" } }
  ];

  // Avatar emoji (first letter as fallback, or user name, or default)
  function getAvatarEmoji() {
    // Find recognisable emoji for mood, else art-palette, else fallback
    if (moodObj.emoji && moodObj.emoji !== "🎭") return moodObj.emoji;
    return "🧑‍🎨";
  }

  // PUBLIC_INTERFACE
  return (
    <div className="mv-profile-container mv-profile-vibrant" style={{ overflow: "visible" }}>
      {/* Emojis/Stickers */}
      {stickers.map((s, i) => (
        <span key={i} className={s.className} aria-hidden="true" style={s.style}>
          {s.emoji}
        </span>
      ))}

      {/* Vibrant Avatar + Confetti */}
      <div
        className="mv-profile-avatar-gradient"
        aria-label="User avatar"
        tabIndex={0}
        style={{ position: "relative", marginTop: -70 }}
      >
        <span
          style={{
            position: "absolute",
            top: "-21px",
            left: "-26px",
            fontSize: "2.2rem",
            opacity: 0.7,
            transform: "rotate(-14deg)",
            filter: "blur(.2px) brightness(1.13)",
            pointerEvents: "none"
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
            fontSize: "4.95rem",
            filter: "drop-shadow(0 4px 18px #fff9)",
          }}
        >
          {getAvatarEmoji()}
        </span>
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

      {/* Profile form: Vibrant card with input fields */}
      <form
        onSubmit={handleSave}
        style={{
          margin: "18px 0 0 0",
          background: "linear-gradient(90deg, #FFF7FB 41%, #FFF1EA 100%)",
          borderRadius: 22,
          minWidth: 220,
          maxWidth: 340,
          fontSize: "1.19rem",
          fontWeight: 600,
          padding: "19px 16px 15px 16px",
          boxShadow: "0 2.5px 12px var(--secondary)10, var(--shadow)",
          border: "2px solid var(--primary)"
        }}
        className="vibrant-border"
        autoComplete="off"
      >
        {/* Username (Required) */}
        <label htmlFor="username" style={{ color: "var(--secondary)", fontWeight: 800, fontSize: "1.01em", display: "block" }}>
          Username
          <span role="img" aria-label="wave" style={{ marginLeft: 7 }}>👋</span>
        </label>
        <div style={{display: "flex", alignItems: "center", gap: 7}}>
          <input
            id="username"
            name="username"
            maxLength={18}
            required
            autoFocus
            className="vibrant-border"
            style={{
              background: "#fff",
              color: "var(--accent)",
              padding: "7px 12px",
              borderRadius: 8,
              fontWeight: 700,
              fontSize: "1.12em",
              border: "2px solid var(--secondary)",
              marginTop: 6,
              marginBottom: 15,
              width: "95%"
            }}
            value={edit.name}
            onChange={e => handleFieldChange("name", e.target.value)}
            placeholder="Enter your nickname…"
          />
          {edit.name && <span role="img" aria-label="user" style={{fontSize:"1.41em",marginLeft:-6}}>⭐️</span>}
        </div>
        {/* Birthday */}
        <label htmlFor="birthday" style={{ color: "var(--secondary)", fontWeight: 800, fontSize: "1.01em", display: "block" }}>
          Birthday
          <span role="img" aria-label="birthday cake" style={{ marginLeft: 6 }}>🎂</span>
        </label>
        <div style={{display: "flex", alignItems: "center", gap: 8}}>
          <input
            id="birthday"
            name="birthday"
            type="date"
            className="vibrant-border"
            style={{
              padding: "7px 10px",
              borderRadius: 8,
              fontWeight: 600,
              fontSize: "1.04em",
              border: "2px solid var(--primary)",
              marginTop: 6,
              marginBottom: 15,
              color: "#e87a41",
              width: "auto"
            }}
            value={edit.birthday || ""}
            onChange={e => handleFieldChange("birthday", e.target.value)}
          />
          {edit.birthday && (
            <span role="img" aria-label="calendar" style={{fontSize:"1.35em",marginLeft: 0, marginTop:2,marginBottom:10}}>🗓️</span>
          )}
        </div>
        {/* Live birthday greeting */}
        {isBirthday && (
          <div style={{
            marginBottom: 10,
            fontWeight: 800,
            color: "var(--accent)",
            background: "linear-gradient(89deg, #fffbe1 73%, #fff2f7 100%)",
            borderRadius: 13,
            padding: "9px 12px",
            fontSize: "1.03em",
            boxShadow: "0 2px 9px rgba(255,179,71,0.16)",
            textAlign: "center",
            letterSpacing: ".02em",
            animation: "moodchipPulse 1.3s infinite alternate cubic-bezier(.48,1.2,.25,1.2)"
          }}>
            <span role="img" aria-label="party">🎉</span> Happy Birthday! <span role="img" aria-label="thumbs up">👍</span>
          </div>
        )}

        {/* Mood selector */}
        <label htmlFor="mood" style={{ color: "var(--secondary)", fontWeight: 800, fontSize: "1.01em", display: "block" }}>
          Current mood
          <span role="img" aria-label="lightning" style={{ marginLeft: 6 }}>⚡️</span>
        </label>
        <div style={{display: "flex", alignItems: "center", gap:7}}>
          <select
            id="mood"
            name="mood"
            className="vibrant-border"
            style={{
              padding: "7px 15px",
              borderRadius: 8,
              fontWeight: 700,
              fontSize: "1.12em",
              border: "2px solid var(--accent)",
              marginTop: 7,
              marginBottom: 8,
              color: "var(--primary)",
              width: "100%"
            }}
            value={edit.mood}
            onChange={e => handleFieldChange("mood", e.target.value)}
          >
            <option value="">Select…</option>
            {moodChoices.map(opt =>
              <option key={opt.mood} value={opt.mood}>
                {opt.emoji} {opt.mood}
              </option>
            )}
          </select>
          {!!edit.mood && <span className="mv-profile-moodemoji" style={{marginBottom:6}}>{moodObj.emoji}</span>}
        </div>
        {edit.mood && (
          <span className="mv-profile-moodchip"
            style={{
              marginTop: 2,
              marginBottom: 7,
              display: "inline-flex",
              alignItems: "center"
            }}>
            <span className="mv-profile-moodemoji">{moodObj.emoji}</span>
            <span className="mv-profile-moodtext">{edit.mood}</span>
          </span>
        )}

        {/* Save button */}
        <button
          type="submit"
          className="btn btn-large"
          style={{
            background: "linear-gradient(90deg, var(--primary), var(--accent) 98%)",
            color: "#fff",
            fontWeight: 700,
            marginTop: 22,
            fontSize: "1.09em",
            borderRadius: 8,
            border: "none",
            boxShadow: "0 2px 8px #ffb34744"
          }}>
          <span role="img" aria-label="save" style={{ marginRight: 6 }}>💾</span>
          Save Profile
        </button>
        {savedNotif && (
          <span style={{
            display: "block",
            marginTop: 10,
            fontWeight: 600,
            color: justSavedAuto ? "var(--secondary)" : "var(--success)",
            fontSize: "1.07em",
            letterSpacing: ".04em",
            textShadow: justSavedAuto 
              ? "0 1.5px 8px var(--secondary)18" 
              : "0 1.5px 7px #8ac92644",
            transition: "opacity 0.21s",
            background: justSavedAuto
              ? "linear-gradient(90deg, #eef8fa 51%, #fff5e4 100%)"
              : "none",
            borderRadius: justSavedAuto ? 11 : 0,
            padding: justSavedAuto ? "4px 12px 4px 12px" : "0",
            boxShadow: justSavedAuto
              ? "0 1px 8px #6ec6ff44"
              : "none",
          }}>
            {savedNotif} <span role="img" aria-label="thumbs up">👍</span>
          </span>
        )}
      </form>

      {/* MOOD HISTORY — optional/histogram */}
      <div className="mv-profile-history-block"
        style={{
          marginTop: 37,
          paddingBottom: 19,
          background: "linear-gradient(92deg, #fff1fa 42%, #ffe7f0 100%)",
        }}>
        <div className="mv-profile-history-title" style={{ gap: 8, fontSize: "1.18em" }}>
          <span role="img" aria-label="star sparkle">💫</span>
          Mood
          <span style={{ margin: "0 5px" }}>|</span>
          History <span role="img" aria-label="clock" style={{ fontSize: "1em", opacity: 0.7, marginLeft: 2 }}>⏰</span>
        </div>
        <ul className="mv-profile-moodlist">
          {!moodHistory.length && (
            <li className="mv-profile-moodlist-item" style={{ opacity: 0.62 }}>
              <span className="mv-profile-history-emoji">🤔</span>
              <span className="mv-profile-history-mood">No mood selected yet</span>
            </li>
          )}
          {moodHistory.map((entry, idx) => (
            <li
              className="mv-profile-moodlist-item"
              key={entry.mood + idx}
              tabIndex={0}
              style={{
                animation: "fadeInMoodCard .53s cubic-bezier(.28,1.18,.32,1) both",
                animationDelay: `${0.09 + 0.10 * idx}s`
              }}
            >
              <span className="mv-profile-history-emoji" role="img" aria-label={entry.mood + " mood"}>
                {entry.emoji}
              </span>
              <span className="mv-profile-history-mood">{entry.mood}</span>
              <span className="mv-profile-history-time" style={{ marginLeft: 7 }}>
                {entry.time}
              </span>
              {idx === 0 && (
                <span className="mv-profile-history-crown" title="Current mood">
                  👑
                </span>
              )}
            </li>
          ))}
        </ul>
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

      {/* Footer - playful, on-theme */}
      <div className="mv-profile-footer-cheer"
        style={{
          marginTop: 42,
          fontSize: "1.17rem",
          letterSpacing: ".07em",
        }}>
        <span role="img" aria-label="celebrate" style={{ marginRight: 6 }}>🥳</span>
        Stay radiant with
        <span className="mv-profile-moodvibe" style={{ margin: "0 9px", color: "var(--accent)", fontWeight: 900, fontSize: "1.13em" }}>
          MoodVibe
        </span>
        <span role="img" aria-label="sparkle">✨</span>
        <span
          role="img"
          aria-label="star"
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
