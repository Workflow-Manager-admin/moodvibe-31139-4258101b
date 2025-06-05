import React, { useEffect, useState } from "react";
import "../App.css";

/**
 * Settings
 * Theme-changing UI for MoodVibe. Allows switching between vibrant color palettes: Light, Dark, and Alternate.
 * Instantly previews/apply themes using CSS variables.
 * UI is cheerful, visually vibrant, and aligned with the MoodVibe aesthetic.
 */

// Theme palette presets for dynamic CSS variable application
const THEME_PRESETS = [
  {
    key: "light",
    label: "Light",
    emoji: "🌞",
    colors: {
      "--primary": "#FFB347",
      "--secondary": "#6EC6FF",
      "--accent": "#FF6F91",
      "--bg": "#ffffff",
      "--bg-secondary": "#f8fbff",
      "--text-color": "#2d2d2d",
      "--text-secondary": "#6c757d",
      "--border-color": "#ececec",
      "--success": "#8ac926",
    },
    desc: "Bright & cheerful",
  },
  {
    key: "dark",
    label: "Dark",
    emoji: "🌚",
    colors: {
      "--primary": "#E87A41",
      "--secondary": "#3aaadd",
      "--accent": "#FF79C6",
      "--bg": "#1A1A1A",
      "--bg-secondary": "#24182a",
      "--text-color": "#fff",
      "--text-secondary": "rgba(255,255,255,0.7)",
      "--border-color": "#22223a",
      "--success": "#5ff462",
    },
    desc: "Low light & cozy",
  },
  {
    key: "alt",
    label: "VibeShift",
    emoji: "🌈",
    colors: {
      "--primary": "#8e44ad",
      "--secondary": "#e17055",
      "--accent": "#f9ca24",
      "--bg": "#fbfcfe",
      "--bg-secondary": "#ecebff",
      "--text-color": "#2c0555",
      "--text-secondary": "#ac3fa9",
      "--border-color": "#d0b7ee",
      "--success": "#41ebc2",
    },
    desc: "Playfully vibrant",
  },
];

// PUBLIC_INTERFACE
function Settings() {
  // Store theme selection (default: light)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("moodvibe_theme") || "light";
  });

  // Apply (or preview) theme as CSS vars on :root
  const applyTheme = (themeKey) => {
    const preset = THEME_PRESETS.find(t => t.key === themeKey) || THEME_PRESETS[0];
    Object.entries(preset.colors).forEach(([cssVar, value]) => {
      document.documentElement.style.setProperty(cssVar, value);
    });
  };

  // Apply the currently-selected theme
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // Sets theme, applies and persists
  const handleThemeChange = (themeKey) => {
    setTheme(themeKey);
    localStorage.setItem("moodvibe_theme", themeKey);
  };

  // For a live hover preview (without commit)
  const handlePreviewTheme = (themeKey) => {
    applyTheme(themeKey);
  };
  const handleEndPreview = () => {
    // Re-apply selected theme after leaving preview
    applyTheme(theme);
  };

  // Visually vibrant cards for each palette option
  const themeCardStyle = (isActive, colorVars) => ({
    border: isActive ? "3px solid var(--accent)" : "2px solid var(--border-color)",
    background: `linear-gradient(107deg, ${colorVars["--primary"]}18 60%, ${colorVars["--secondary"]}1e 100%)`,
    borderRadius: 18,
    boxShadow: isActive
      ? `0 5px 22px ${colorVars["--accent"]}22, 0 2px 9px ${colorVars["--primary"]}33`
      : "0 1px 7px #aeafb122",
    minWidth: 140,
    padding: "21px 18px 18px 18px",
    margin: "8px 12px",
    transition: "box-shadow 0.22s, border 0.18s, background 0.22s, transform 0.18s",
    cursor: "pointer",
    outline: isActive ? `2.5px solid ${colorVars["--accent"]}` : "none",
    opacity: isActive ? 1 : 0.86,
    position: "relative",
    filter: isActive ? "brightness(1.12) drop-shadow(0 2px 5px #ecf2ff)" : "none",
    zIndex: isActive ? 3 : 1,
    userSelect: "none",
    transform: isActive ? "scale(1.028)" : "scale(1.0)",
  });

  return (
    <div style={{
      width: "100%",
      maxWidth: 480,
      minHeight: "64vh",
      background: "var(--bg-secondary)",
      margin: "0 auto",
      marginTop: 32,
      borderRadius: 21,
      boxShadow: "var(--shadow), 0 2px 8px var(--primary)10",
      padding: "36px 0 100px 0",
    }}>
      <div style={{
        fontSize: "2rem",
        fontWeight: 800,
        color: "var(--primary)",
        textAlign: "center",
        marginBottom: 11,
        letterSpacing: 1.4,
        textShadow: "0 2px 14px var(--secondary)18, 0 1.5px 7px var(--accent)12",
      }}>
        <span role="img" aria-label="settings" style={{fontSize:"1.33em", marginRight: 9}}>⚙️</span>
        Theme Settings
      </div>
      <div style={{
        color: "var(--text-secondary)",
        fontWeight: 500,
        fontSize: "1.09rem",
        textAlign: "center",
        marginBottom: 23,
        letterSpacing: 0.4,
      }}>
        Instantly preview and select your vibe.
      </div>
      <div style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: "18px 10px",
        marginBottom: 17,
      }}>
        {THEME_PRESETS.map(opt => {
          const isActive = theme === opt.key;
          return (
            <button
              key={opt.key}
              type="button"
              aria-current={isActive ? "true" : undefined}
              aria-label={opt.label + " theme"}
              tabIndex={0}
              className="settings-theme-card"
              onClick={() => handleThemeChange(opt.key)}
              onMouseEnter={() => handlePreviewTheme(opt.key)}
              onFocus={() => handlePreviewTheme(opt.key)}
              onMouseLeave={handleEndPreview}
              onBlur={handleEndPreview}
              style={themeCardStyle(isActive, opt.colors)}
            >
              <span style={{
                fontSize: "2.5rem",
                display: "block",
                marginBottom: 6,
                textShadow: `0 2px 8px ${opt.colors["--secondary"]}33`,
                filter: isActive ? "brightness(1.15)" : "none",
                transition: "filter 0.18s"
              }}>{opt.emoji}</span>
              <span style={{
                fontWeight: 700,
                color: opt.colors["--primary"],
                fontSize: "1.11rem",
                letterSpacing: 0.8,
                marginBottom: 2,
                textShadow: `0 1px 4px ${opt.colors["--secondary"]}22, 0 1px 2px #fff2`,
              }}>
                {opt.label}
              </span>
              <div style={{
                color: opt.colors["--accent"],
                fontSize: "0.98rem",
                fontWeight: 500,
                marginBottom: 5,
              }}>
                {opt.desc}
              </div>
              <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 5,
                margin: "7px 0 0 0",
              }}>
                {/* Mini color swatches */}
                {["--primary", "--secondary", "--accent"].map((v, idx) => (
                  <span key={v}
                    style={{
                      display: "inline-block",
                      width: 18,
                      height: 18,
                      borderRadius: "50%",
                      margin: "0 2px",
                      background: opt.colors[v],
                      border: "2.5px solid #fff",
                      boxShadow: "0 0 0 2px #fff8",
                    }}
                  ></span>
                ))}
              </div>
              {isActive && (
                <div style={{
                  position: "absolute",
                  top: 9, right: 12,
                  fontSize: "1.1em",
                  color: opt.colors["--success"] || "#8ac926",
                  fontWeight: 900,
                  textShadow: `0 2px 7px ${opt.colors["--success"]}11`,
                  pointerEvents: "none",
                  filter: "drop-shadow(0 2px 10px #cdfbda77)",
                }}>
                  ✓
                </div>
              )}
            </button>
          );
        })}
      </div>
      <div style={{
        color: "var(--text-secondary)",
        fontSize: "0.99rem",
        textAlign: "center",
        marginTop: 30,
      }}>
        <span role="img" aria-label="info">💡</span> Your choice is remembered on this device.<br />
        Enjoy MoodVibe in your favorite style!
      </div>
      {/* Style for great animation on selection/hover */}
      <style>
        {`
        .settings-theme-card {
          transition: box-shadow 0.21s, border 0.19s, background 0.21s, filter 0.16s, transform 0.17s;
          will-change: box-shadow, background, border, filter, transform;
        }
        .settings-theme-card:active:not([aria-current="true"]),
        .settings-theme-card:focus-visible:not([aria-current="true"]) {
          transform: scale(0.98);
          filter: brightness(1.07);
          box-shadow: 0 2px 16px #5ff46232, 0 1px 7px #E87A4133;
        }
        .settings-theme-card[aria-current="true"] {
          filter: brightness(1.11) drop-shadow(0 2px 6px var(--success));
        }
        `}
      </style>
    </div>
  );
}

export default Settings;
