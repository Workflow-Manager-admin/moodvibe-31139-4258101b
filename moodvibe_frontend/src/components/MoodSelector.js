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
    // Placeholder: simulate async call & detected mood
    setTimeout(() => {
      const detected = "Happy"; // Stubbed detected mood
      setMood(detected);
      setCustomMood("");
      setDetectionState("detected");
      setTimeout(() => setDetectionState("idle"), 1200);
    }, 1200);
  };

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 16,
      justifyContent: "center",
      flexWrap: "wrap"
    }}>
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
      />
      <button
        type="button"
        className="btn"
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
