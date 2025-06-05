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

  // Future: show toast, celebration popup, etc, if isBirthday

  return (
    <div className="app" style={{ paddingBottom: 74 }}>
      <BannerHeader />
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
              {/* Birthday celebration on home page */}
              {isBirthday && (
                <div style={{
                  fontSize: "1.33rem",
                  background: "var(--gradient-multicolor)",
                  padding: "22px 24px 13px 24px",
                  borderRadius: 23,
                  margin: "14px auto 5px auto",
                  maxWidth: 380,
                  boxShadow: "0 2px 18px #ffb34733",
                  textAlign: "center",
                  color: "var(--accent)",
                  fontWeight: 800,
                  letterSpacing: "0.06em",
                  animation: "mvCardFadeIn 0.82s cubic-bezier(.19,1.5,.29,1)",
                }}>
                  <span role="img" aria-label="birthday cake" style={{ fontSize: "2.2em", verticalAlign: "-0.25em" }}>🎂</span>
                  &nbsp;Happy Birthday, {user.name || "MoodViber"}!&nbsp;
                  <span role="img" aria-label="party popper">🎉</span><span role="img" aria-label="thumbs up">👍</span>
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
