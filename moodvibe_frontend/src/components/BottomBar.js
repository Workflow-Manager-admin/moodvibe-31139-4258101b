import React from "react";
import "../App.css";
import { useNavigate, useLocation, Link } from "react-router-dom";

/**
 * BottomBar
 * Fixed, vibrant bottom navigation bar for MoodVibe.
 * Features: Profile, Home, and Settings actions as icon buttons.
 * - App theme color gradients.
 * - Clear animated feedback on active/hover/focus.
 *
 * This refactored version uses react-router-dom's navigation (Link) for SPA routing,
 * removes legacy local state for "Profile",
 * and highlights based on the current route. UI theme and structure is preserved.
 */
// PUBLIC_INTERFACE
function BottomBar({ onNav }) {
  // Use router location for highlighting the active nav
  const location = useLocation();

  // Determine active key by route path (including Settings)
  let routeActive = "home";
  if (location.pathname === "/profile") {
    routeActive = "profile";
  } else if (location.pathname === "/settings") {
    routeActive = "settings";
  } else if (location.pathname === "/" || location.pathname === "") {
    routeActive = "home";
  }

  // Button definitions with SVG icons (including Settings SPA navigation)
  const navItems = [
    {
      key: "profile",
      label: "Profile",
      icon: (
        <svg
          width="26"
          height="26"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="9" r="4" />
          <path d="M4 19c0-3 4-5 8-5s8 2 8 5" />
        </svg>
      ),
      path: "/profile",
    },
    {
      key: "home",
      label: "Home",
      icon: (
        <svg
          width="26"
          height="26"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.1"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <path d="M4 12L12 4l8 8" />
          <path d="M5 12v7a2 2 0 002 2h2.6a1 1 0 001-1v-3.8a1 1 0 011-1h1.8a1 1 0 011 1V20a1 1 0 001 1H17a2 2 0 002-2v-7" />
        </svg>
      ),
      path: "/",
    },
    {
      key: "settings",
      label: "Settings",
      icon: (
        <svg
          width="26"
          height="26"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="3.2" />
          <path d="M19.4 15a1.79 1.79 0 00.7 2.1 2 2 0 01-2.7 2.7 1.8 1.8 0 00-2.1-.7 1.8 1.8 0 00-1.1 1.7V22a2 2 0 01-4 0v-.2a1.8 1.8 0 00-1.1-1.7 1.8 1.8 0 00-2.1.7A2 2 0 013.9 17.1a1.8 1.8 0 00.7-2.1 1.8 1.8 0 00-1.7-1.1H2a2 2 0 010-4h.1a1.8 1.8 0 001.7-1.1 1.8 1.8 0 00-.7-2.1A2 2 0 014.9 4.9a1.8 1.8 0 002.1.7A1.8 1.8 0 008.1 3.9V3a2 2 0 014 0v.1a1.8 1.8 0 001.1 1.7 1.8 1.8 0 002.1-.7A2 2 0 0120.1 6.9a1.8 1.8 0 00-.7 2.1c.21.46.21.98 0 1.43a1.8 1.8 0 001.7 1.12H22a2 2 0 010 4h-.2a1.75 1.75 0 00-1.7 1.12z" />
        </svg>
      ),
      path: "/settings",
    },
  ];

  const barStyle = {
    width: "100%",
    minHeight: 58,
    background: "linear-gradient(90deg, var(--accent) 70%, var(--secondary) 95%)",
    boxShadow: "0 -2px 10px rgba(255,111,145,0.09)",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    position: "fixed",
    bottom: 0,
    left: 0,
    zIndex: 10,
    padding: "0 4vw",
    userSelect: "none",
    maxWidth: 500,
    margin: "0 auto",
    right: 0,
  };

  const btnStyle = (isActive) => ({
    flex: 1,
    border: "none",
    background: "none",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: isActive ? "var(--primary)" : "#fff",
    opacity: isActive ? 1 : 0.86,
    fontWeight: isActive ? 700 : 500,
    fontSize: "0.99rem",
    position: "relative",
    outline: "none",
    transition: "color 0.18s, opacity 0.16s, filter 0.19s",
    cursor: "pointer",
    padding: "0 0",
    minWidth: 56,
    height: 52,
    borderRadius: 13,
    boxShadow: isActive
      ? "0 1.5px 8px var(--primary), 0 0.5px 1px #fff6"
      : "none",
    background: isActive
      ? "rgba(255,255,255,0.09)"
      : "transparent",
    textDecoration: "none",
  });

  return (
    <nav className="bottom-bar" style={barStyle} aria-label="App bottom navigation">
      <style>
        {`
        .bottom-bar-navbtn {
          transition: color 0.16s, background 0.18s, filter 0.16s, transform 0.15s cubic-bezier(.35,1.3,.44,1), box-shadow 0.19s;
          will-change: background, filter, transform, box-shadow;
        }
        .bottom-bar-navbtn:focus-visible {
          outline: 2px solid var(--accent);
          background: rgba(110,198,255,0.15) !important;
          box-shadow: 0 0 4px 2px var(--accent)22, 0 1.5px 7px var(--primary)33;
        }
        .bottom-bar-navbtn:hover:not([aria-current="true"]),
        .bottom-bar-navbtn:active:not([aria-current="true"]) {
          color: var(--secondary);
          background: rgba(255,255,255,0.14);
          filter: brightness(1.08);
          transform: scale(1.06);
          z-index: 2;
        }
        .bottom-bar-navbtn[aria-current="true"] {
          color: var(--primary);
          background: rgba(255,179,71,0.13);
          box-shadow: 0 1.5px 7px var(--primary)33, 0 0.5px 1px #ffd88a22;
          transform: scale(1.03);
        }
        .bottom-bar-navbtn:active {
          filter: brightness(0.96);
          transform: scale(0.98);
        }
        .bottom-bar-navbtn span[role="img"], .bottom-bar-navbtn svg {
          transition: filter 0.15s, transform 0.13s;
        }
        `}
      </style>
      {navItems.map((item) => {
        const isActive = (routeActive === item.key);
        // For all navigation, use <Link> for SPA including Settings
        return (
          <Link
            to={item.path}
            key={item.key}
            className="bottom-bar-navbtn"
            aria-label={item.label}
            aria-current={isActive ? "true" : undefined}
            tabIndex={0}
            style={btnStyle(isActive)}
            onClick={() => { if (onNav) onNav(item.key); }}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: isActive
                  ? "rgba(255,179,71,0.22)"
                  : "rgba(255,255,255,0.11)",
                marginBottom: 5,
                boxShadow: isActive
                  ? "0 0 0 2px var(--primary)"
                  : "",
                transition: "background 0.18s, box-shadow 0.16s",
                color: isActive ? "var(--primary)" : "#fff",
              }}
            >
              {item.icon}
            </span>
            <span
              style={{
                fontSize: "0.99rem",
                marginTop: 1,
                letterSpacing: 0.7,
                color: isActive ? "var(--primary)" : "#fff",
                fontWeight: isActive ? 700 : 500,
                textShadow: isActive
                  ? "0 1px 3px #fff2"
                  : "0 1px 3px #3333",
                transition: "color 0.18s"
              }}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}

export default BottomBar;
