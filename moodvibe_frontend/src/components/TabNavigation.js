import React from "react";
import "../App.css";

/**
 * TabNavigation
 * Lively, themed navigation tabs for MoodVibe (Memes | Jokes | GIFs | Quotes).
 * Controlled via selectedTab and onTabChange props.
 * Upbeat, colorful theme with animated feedback for selected tab.
 * 
 * Props:
 *   selectedTab (string): active tab ("Memes", "Jokes", "GIFs", or "Quotes")
 *   onTabChange (fn): callback when tab is switched (tabName => void)
 */
// PUBLIC_INTERFACE
function TabNavigation({ selectedTab, onTabChange }) {
  const tabs = [
    { label: "Memes", emoji: "😄", color: "var(--primary)" },
    { label: "Jokes", emoji: "😂", color: "var(--secondary)" },
    { label: "GIFs",  emoji: "🎬", color: "var(--accent)" },
    { label: "Quotes", emoji: "📝", color: "#8ac926" },
  ];

  // Inline component styles for vibrant appearance and animated feedback
  const tabBarStyle = {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "5px 6px",
    background: "#fff",
    borderRadius: 20,
    boxShadow: "var(--shadow)",
    position: "relative",
    minHeight: 52,
    gap: 6,
    zIndex: 1,
  };

  const tabStyle = (active, color) => ({
    flex: 1,
    minWidth: 70,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1rem",
    fontWeight: 600,
    color: active ? color : "var(--text-secondary)",
    background: active
      ? `linear-gradient(104deg, ${color}33 75%, #ffffff22 100%)`
      : "transparent",
    border: "none",
    borderRadius: 13,
    margin: "4px 0",
    padding: active ? "12px 2px 8px 2px" : "10px 2px 7px 2px",
    cursor: "pointer",
    boxShadow: active
      ? `0 2px 12px 0 ${color}33, 0 1px 7px 0 ${color}22`
      : "none",
    outline: "none",
    position: "relative",
    transition: "background 0.18s, color 0.18s, box-shadow 0.18s, transform 0.19s cubic-bezier(.38,1.6,.44,1)",
    transform: active ? "scale(1.07)" : "scale(1)",
    zIndex: 2,
  });

  // Animated underline for currently selected tab (using absolutely positioned span)
  const activeIdx = tabs.findIndex(tab => tab.label === selectedTab);

  // Calculate the left and width for animated underline for 4 equal-width tabs:
  // left = (100/4 * index)%
  const underlineWidth = `${100 / tabs.length}%`;
  const underlineLeft = `${(100 / tabs.length) * (activeIdx >= 0 ? activeIdx : 0)}%`;
  const underlineColor = tabs[activeIdx]?.color || "var(--primary)";

  return (
    <div className="tab-bar" style={tabBarStyle}>
      {/* Animated active underline (rounded color block) */}
      <span
        className="tab-animated-underline"
        style={{
          position: "absolute",
          left: underlineLeft,
          bottom: 5,
          width: underlineWidth,
          height: 8,
          borderRadius: 11,
          background: `linear-gradient(94deg, ${underlineColor}88 75%, #fff8 100%)`,
          boxShadow: `0 1.5px 7px ${underlineColor}33`,
          zIndex: 1,
          transition: "left 0.21s cubic-bezier(.37,1.7,.22,1), background 0.17s",
          pointerEvents: "none",
        }}
        aria-hidden="true"
      />
      {tabs.map(tab => {
        const active = tab.label === selectedTab;
        return (
          <button
            key={tab.label}
            type="button"
            style={tabStyle(active, tab.color)}
            aria-selected={active}
            tabIndex={0}
            className={`tab-btn${active ? " tab-active" : ""}`}
            onClick={() => onTabChange(tab.label)}
          >
            <span
              style={{
                fontSize: "1.45rem",
                marginBottom: 1,
                textShadow: active
                  ? `0 2px 8px ${tab.color}33, 0 0.5px 2px #fff8`
                  : "none",
                filter: active ? "brightness(1.14)" : "none",
                transition: "filter 0.18s, text-shadow 0.17s",
              }}
              aria-hidden="true"
            >
              {tab.emoji}
            </span>
            <span
              style={{
                fontWeight: 700,
                letterSpacing: 0.7,
                textTransform: "uppercase",
                fontSize: "0.99rem",
                margin: 0,
              }}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
      {/* CSS keyframes for wiggle animation on selection */}
      <style>
        {`
          .tab-btn:active:not(.tab-active) {
            transform: scale(0.96);
            filter: brightness(1.06);
          }
          .tab-active {
            animation: tabPop 0.23s cubic-bezier(.37,1.8,.22,1);
          }
          @keyframes tabPop {
            0% { transform: scale(1); }
            50% { transform: scale(1.11) rotate(-1deg);}
            85% { transform: scale(0.99) rotate(1deg);}
            100% { transform: scale(1); }
          }
        `}
      </style>
    </div>
  );
}

export default TabNavigation;
