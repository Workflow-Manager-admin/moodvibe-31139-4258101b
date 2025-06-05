import React, { useState } from 'react';
import './App.css';

// React Router v6+ imports (if missing, ensure installed)
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

import MoodSelector from './components/MoodSelector';
import ContentFeed from './components/ContentFeed';
import TabNavigation from './components/TabNavigation';
import BottomBar from './components/BottomBar';
import BannerHeader from './components/BannerHeader';
import Settings from './components/Settings';

import Profile from './components/Profile';

// Util for fetching/storing user info in localStorage
function getStoredUser() {
  const raw = localStorage.getItem("moodvibe_userprofile");
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
function setStoredUser(user) {
  localStorage.setItem("moodvibe_userprofile", JSON.stringify(user));
}

// PUBLIC_INTERFACE
/**
 * ProfilePage: Enhanced lively profile page.
 */
function ProfilePage({ user, onUserChange }) {
  // Profile expects user object and edit handler (passed from App)
  return (
    <Profile user={user} onUserChange={onUserChange} />
  );
}

/**
 * InnerApp: Contains the routed layout for MoodVibe.
 */
function InnerApp() {
  // USER PROFILE STATE
  const [user, setUser] = useState(() => {
    // Try to load from localStorage; fallback if not, to defaults:
    const stored = getStoredUser();
    return (
      stored || {
        name: "Cheerful Explorer",
        birthday: "",
        mood: "",
      }
    );
  });
  const [mood, setMood] = useState(user.mood || "");
  const [selectedTab, setSelectedTab] = useState("Memes");

  const navigate = useNavigate();

  // Reactively save user to localStorage whenever it changes
  React.useEffect(() => {
    setStoredUser(user);
  }, [user]);

  // PUBLIC_INTERFACE
  const handleTabChange = (tab) => setSelectedTab(tab);

  // Handler for updates from Profile component (updates user info)
  const handleUserChange = (updated) => {
    const merged = { ...user, ...updated };
    setUser(merged);
    if (updated.mood) setMood(updated.mood);
  };

  // Navigation for bottom bar (routes home or profile)
  const handleBottomNav = (key) => {
    if (key === "profile") {
      navigate('/profile');
    } else if (key === "home") {
      navigate('/');
    }
    // settings goes here later
  };

  // Main themed app container
  // BIRTHDAY CELEBRATION detector
  const todayStr = new Date().toISOString().slice(5, 10); // MM-DD
  const isBirthday = user.birthday && user.birthday.slice(5, 10) === todayStr;

  // Birthday popup state: dismissed flag in state + session/localStorage
  // Show popup only if: today is birthday, not yet dismissed today (key should be 'moodvibe_birthday_popup_<yyyy-mm-dd>')
  const [birthdayPopupDismissed, setBirthdayPopupDismissed] = React.useState(false);

  React.useEffect(() => {
    // Birthday popup is only open if today is birthday and not already dismissed today
    if (isBirthday) {
      const popupKey = "moodvibe_birthday_popup_" + todayStr;
      const dismissed = localStorage.getItem(popupKey) === "dismissed";
      setBirthdayPopupDismissed(!!dismissed);
    } else {
      setBirthdayPopupDismissed(false);
    }
  }, [isBirthday, todayStr]);

  const handleDismissBirthday = React.useCallback(() => {
    const popupKey = "moodvibe_birthday_popup_" + todayStr;
    localStorage.setItem(popupKey, "dismissed");
    setBirthdayPopupDismissed(true);
  }, [todayStr]);

  // Confetti SVG helper (CSS lightweight, no dependencies)
  function ConfettiBlast() {
    // 12 colorful confetti elements with css animation
    return (
      <div style={{
        position: "absolute",
        left: 0, top: 0, width: "100%", height: "100%", zIndex: 2,
        pointerEvents: "none", overflow: "visible",
      }} aria-hidden="true">
        {[...Array(22)].map((_, i) => (
          <span
            key={i}
            style={{
              position: "absolute",
              left: `${5 + Math.random()*90}%`,
              top: `${(i%7)*12+5}%`,
              width: 10 + Math.random()*7, height: 10 + Math.random()*8,
              background: [
                "#FFB347", "#FF6F91", "#6EC6FF", "#8ac926",
                "#f9ca24", "#FF79C6", "#FFF1EA", "#FFEB3B"
              ][i%8],
              opacity: 0.82 + Math.random()*0.14,
              borderRadius: "50%",
              boxShadow: "0 1px 9px #fff8",
              animation: `mvConfettiDrop 1.33s ${0.03*i}s cubic-bezier(.28,1.2,.22,1.06) both`,
              transform: `scale(${1-(i%4)*0.09}) rotate(${Math.random()*360}deg)`,
              filter: "blur(.2px)"
            }}
          >
            <span style={{
              opacity: 0, fontSize: 0
            }}>🎊</span>
          </span>
        ))}
        <style>{`
          @keyframes mvConfettiDrop {
            from { 
              opacity: .09; 
              transform: scale(.5) translateY(-38px);
            }
            70% {
              opacity: .9;
            }
            to {
              opacity: 1;
              transform: scale(1) translateY(49px);
            }
          }
        `}</style>
      </div>
    );
  }

  // Public: Birthday Popup component
  function BirthdayPopup({ userName, onDismiss }) {
    return (
      <div
        className="mv-birthday-popup"
        role="dialog"
        aria-modal="true"
        aria-label="Birthday wish"
        tabIndex={0}
        style={{
          position: "fixed",
          left: 0, right: 0, top: 0, bottom: 0,
          zIndex: 1010,
          background: "rgba(255,111,145,0.13)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          minWidth: "100vw",
        }}
      >
        <div
          style={{
            position: "relative",
            background: "linear-gradient(120deg, #FFF7D6 83%, #FFE3F8 100%)",
            border: "4.2px solid var(--primary)",
            borderRadius: 24,
            boxShadow: "0 10px 48px #ffb34755, 0 2px 26px var(--secondary)17, var(--shadow)",
            padding: "40px 36px 32px 36px",
            minWidth: 330,
            maxWidth: "90vw",
            minHeight: 188,
            textAlign: "center",
            color: "var(--accent)",
            fontWeight: 900,
            fontSize: "1.67rem",
            letterSpacing: ".035em",
            animation: "mvCardFadeIn 0.82s cubic-bezier(.19,1.5,.29,1)",
            overflow: "visible"
          }}
        >
          <ConfettiBlast />
          <span style={{ fontSize: "2.75em", verticalAlign: "-0.4em" }} role="img" aria-label="birthday cake">
            🎂
          </span>
          <br />
          <div style={{ margin: "0 0 10px 0", letterSpacing: "0.01em", color: "var(--primary)" }}>
            Happy Birthday,&nbsp;
            <span style={{
              color: "var(--accent)",
              textShadow: "0 2.5px 9px #fff5,0 3px 11px var(--secondary)22"
            }}>{userName || "MoodViber"}</span>!
          </div>
          <span style={{ fontSize: "1.77em", color: "var(--accent)", filter:"saturate(1.1)", lineHeight: "1.2", marginBottom: 5 }}>
            <span role="img" aria-label="cheer">🎉</span>
            <span role="img" aria-label="sparkle">✨</span>
            <span role="img" aria-label="smile">😄</span> &nbsp;
            Sending MoodVibe happiness!
            &nbsp;<span role="img" aria-label="confetti ball">🎊</span>
            <span role="img" aria-label="balloon">🎈</span>
          </span>
          <br />
          <button
            className="btn"
            style={{
              marginTop: 26,
              background: "linear-gradient(90deg, var(--accent) 70%, var(--secondary) 98%)",
              color: "#fff",
              fontWeight: 800,
              fontSize: "1.12em",
              borderRadius: 9,
              boxShadow: "0 2px 12px #ffb34755",
              border: "none",
              padding: "10.5px 24px",
              cursor: "pointer"
            }}
            onClick={onDismiss}
            autoFocus
            tabIndex={0}
          >
            <span role="img" aria-label="close">❌</span> Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app" style={{ paddingBottom: 74 }}>
      <BannerHeader />
      {isBirthday && !birthdayPopupDismissed && (
        <BirthdayPopup userName={user.name} onDismiss={handleDismissBirthday} />
      )}
      <Routes>
        <Route
          path="/"
          element={
            <>
              {/* Mood selector still sets general app mood */}
              <div className="mood-selector-area">
                <MoodSelector mood={mood} setMood={setMood} />
              </div>
              <div className="tabs-area">
                <TabNavigation selectedTab={selectedTab} onTabChange={handleTabChange} />
              </div>
              {/* Birthday celebration banner on home page after popup is dismissed */}
              {isBirthday && birthdayPopupDismissed && (
                <div style={{
                  fontSize: "1.32rem",
                  background: "var(--gradient-multicolor)",
                  padding: "16px 18px 10px 18px",
                  borderRadius: 19,
                  margin: "13px auto 7px auto",
                  maxWidth: 400,
                  boxShadow: "0 2px 18px #ffb34733",
                  textAlign: "center",
                  color: "var(--accent)",
                  fontWeight: 800,
                  letterSpacing: "0.05em",
                  animation: "mvCardFadeIn 0.6s cubic-bezier(.19,1.5,.29,1)",
                }}>
                  <span role="img" aria-label="birthday cake" style={{ fontSize: "1.7em", verticalAlign: "-0.25em" }}>🎂</span>
                  &nbsp;Happy Birthday, {user.name || "MoodViber"}!&nbsp;
                  <span role="img" aria-label="party popper">🎉</span>
                </div>
              )}
              <div className="content-feed-area">
                <ContentFeed mood={mood} selectedTab={selectedTab} />
              </div>
            </>
          }
        />
        <Route
          path="/profile"
          element={<ProfilePage user={user} onUserChange={handleUserChange} />}
        />
        <Route path="/settings" element={<Settings />} />
      </Routes>
      <BottomBar onNav={handleBottomNav} />
    </div>
  );
}

// PUBLIC_INTERFACE
function App() {
  // Top-level router provider
  return (
    <BrowserRouter>
      <InnerApp />
    </BrowserRouter>
  );
}

export default App;
