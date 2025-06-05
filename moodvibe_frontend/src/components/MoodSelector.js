import React, { useState } from "react";
import "../App.css";

/**
 * MoodSelector Component
 * Allows user to choose or type their mood and optionally use Kavia AI detection (placeholder).
 * UI uses vibrant theme colors per design.
 *
 * Props:
 *   mood: The current mood value (string)
 *   setMood: Function to update the mood in parent state
 */
 // PUBLIC_INTERFACE
function MoodSelector({ mood, setMood }) {
  // We use a fixed set and allow free text as fallback
  const moodOptions = [
    "Happy",
    "Excited",
    "Sad",
    "Bored",
    "Motivated",
    "Tired",
    "Anxious",
    "Calm"
  ];
  const [customMood, setCustomMood] = useState("");
  const [detectionState, setDetectionState] = useState("idle");
  const [aiBtnAnim, setAiBtnAnim] = useState(false);

  // Handler for dropdown or custom text change
  const handleMoodChange = (event) => {
    const value = event.target.value;
    setCustomMood(""); // reset custom input if using dropdown
    setMood(value);
  };

  const handleCustomMoodChange = (event) => {
    setCustomMood(event.target.value);
    setMood(event.target.value);
  };

  // Stub for AI detection
  const handleDetectMood = () => {
    setDetectionState("detecting");
    setAiBtnAnim(true);
    // Placeholder: simulate async call & detected mood
    setTimeout(() => {
      const detected = "Happy"; // Stubbed detected mood
      setMood(detected);
      setCustomMood("");
      setDetectionState("detected");
      setAiBtnAnim(false);
      setTimeout(() => setDetectionState("idle"), 1200);
    }, 1200);
  };

  return (
    <div
      className="mv-mood-selector-outer"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        justifyContent: "center",
        flexWrap: "wrap",
        position: "relative"
      }}
    >
      <style>
        {`
          /* MoodSelector Animation: Glow on AI detect, subtle pop/select for input/select */
          .mv-mood-selector-outer select,
          .mv-mood-selector-outer input[type="text"] {
            transition: box-shadow 0.19s cubic-bezier(.39,1.4,.23,1), border 0.13s;
          }
          .mv-mood-selector-outer select:focus,
          .mv-mood-selector-outer input[type="text"]:focus {
            box-shadow: 0 0 0 2.7px var(--secondary)88, 0 1.5px 7px var(--accent)44;
            border: 2.5px solid var(--secondary);
          }
          .mv-mood-selector-aibtn {
            transition: filter 0.18s, box-shadow 0.21s, background 0.19s, transform 0.13s;
            will-change: box-shadow, background, filter, transform;
          }
          .mv-mood-selector-aibtn-detecting {
            animation: moodBtnShimmer 1.35s infinite linear;
            box-shadow: 0 0 8px 4px var(--accent), 0 0 14px 10px var(--primary)44;
            filter: brightness(1.15) saturate(1.14);
            outline: 2.2px solid var(--accent);
          }
          .mv-mood-selector-aibtn-detected {
            animation: moodGlow 1.05s 1 cubic-bezier(.53,1.8,.27,1);
            box-shadow: 0 0 19px 9px var(--success)99, 0 0 46px 22px var(--secondary)11;
            filter: brightness(1.26) saturate(1.23);
            outline: 2.8px solid var(--success);
            background: linear-gradient(91deg, var(--success) 66%, var(--secondary) 100%);
          }
          @keyframes moodGlow {
            0% { box-shadow: 0 0 1px 1px var(--success)00; }
            50% { box-shadow: 0 0 28px 18px var(--success)99, 0 0 46px 22px var(--secondary)11; }
            100% { box-shadow: 0 0 19px 9px var(--success)99, 0 0 46px 22px var(--secondary)11; }
          }
          @keyframes moodBtnShimmer {
            from { filter: brightness(1.18) saturate(1.24) drop-shadow(0 0 7.5px var(--accent)); }
            50% { filter: brightness(1.35) saturate(1.42) drop-shadow(0 0 22px var(--accent)); }
            to { filter: brightness(1.19) saturate(1.15) drop-shadow(0 0 7px var(--accent)); }
          }
        `}
      </style>
      <label htmlFor="mood-select" style={{
        fontWeight: 500,
        marginRight: 8,
        fontSize: "1.12rem",
        color: "var(--bg)"
      }}>
        Choose your mood:
      </label>
      <select
        id="mood-select"
        className="vibrant-border"
        style={{
          padding: "7px 15px",
          borderRadius: 9,
          fontSize: "1rem",
          fontWeight: 500,
          background: "var(--bg-secondary)",
          color: "var(--accent)"
        }}
        value={moodOptions.includes(mood) ? mood : ""}
        onChange={handleMoodChange}
      >
        <option value="">(Select…)</option>
        {moodOptions.map(opt => (
          <option value={opt} key={opt}>{opt}</option>
        ))}
      </select>
      <span style={{ color: "var(--bg)", fontWeight: 400, fontSize: "0.95rem" }}>
        or
      </span>
      <input
        type="text"
        placeholder="Type your mood"
        className="vibrant-border"
        style={{
          padding: "7px 12px",
          borderRadius: 9,
          fontSize: "1rem",
          minWidth: 120,
          outline: "none",
          color: "var(--secondary)"
        }}
        value={customMood}
        onChange={handleCustomMoodChange}
        aria-label="Custom mood input"
      />
      <button
        type="button"
        className={
          "btn mv-mood-selector-aibtn" +
          (detectionState === "detecting" ? " mv-mood-selector-aibtn-detecting" : "") +
          (detectionState === "detected" ? " mv-mood-selector-aibtn-detected" : "")
        }
        disabled={detectionState === "detecting"}
        style={{
          marginLeft: 10,
          background: "linear-gradient(90deg, var(--accent) 60%, var(--secondary) 100%)",
          color: "white",
          fontWeight: 600,
          borderRadius: 8,
          boxShadow: "0 1.5px 7px rgba(255,111,145,0.10)",
          padding: "8px 18px",
          fontSize: "1rem",
          border: "none",
          cursor: detectionState === "detecting" ? "not-allowed" : "pointer",
          transition: "background 0.2s"
        }}
        onClick={handleDetectMood}
        aria-label="AI Detect Mood"
      >
        {detectionState === "detecting"
          ? "Detecting…"
          : detectionState === "detected"
          ? "Detected!"
          : "AI Detect"}
      </button>
    </div>
  );
}

export default MoodSelector;
