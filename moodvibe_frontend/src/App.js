import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import MoodSelector from './components/MoodSelector';
import ContentFeed from './components/ContentFeed';
import TabNavigation from './components/TabNavigation';
import BottomBar from './components/BottomBar';

/**
 * ProfilePage Component
 * Simple cheerful page to show the user's (mock) profile info.
 * Layout and theming match MoodVibe's vibrant feel.
 */
// PUBLIC_INTERFACE
function ProfilePage() {
  return (
    <div
      style={{
        margin: "0 auto",
        width: "100%",
        maxWidth: 520,
        padding: "38px 0 100px 0",
        minHeight: "68vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "var(--bg-secondary)",
        borderRadius: 24,
        boxShadow: "var(--shadow)",
        marginTop: 38,
      }}
    >
      <div
        style={{
          background: "linear-gradient(91deg, var(--primary) 70%, var(--secondary) 100%)",
          borderRadius: "50%",
          width: 106,
          height: 106,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 24,
          marginTop: -54,
          boxShadow: "0 2px 28px var(--accent)22",
          border: "6px solid #fff",
        }}
      >
        <span aria-label="user" style={{ fontSize: 62 }}>🧑‍🎤</span>
      </div>
      <h2 style={{
        color: "var(--primary)",
        fontSize: "2.1rem",
        margin: "0 0 10px 0",
        fontWeight: 800,
        letterSpacing: 1,
        textShadow: "0 2px 18px #fff7"
      }}>
        Your Profile
      </h2>
      <div style={{ fontSize: "1.05rem", color: "var(--text-secondary)", marginBottom: 22 }}>
        {" "}
        Vibrant MoodVibe user<br />
        <span style={{ color: "var(--accent)", fontWeight: 600 }}>Mood explorer</span>
      </div>
      <div
        style={{
          border: "2px solid var(--accent)",
          borderRadius: 13,
          background: "#fff",
          margin: "8px 0 0 0",
          boxShadow: "0 1.5px 9px var(--secondary)18, var(--shadow)",
          padding: 16,
          minWidth: 210,
          textAlign: "left"
        }}
      >
        <b style={{ color: "var(--secondary)" }}>Username:</b> <span style={{ color: "var(--text-color)" }}>demo_user</span>
        <br />
        <b style={{ color: "var(--secondary)" }}>Mood saved:</b> <span style={{ color: "var(--primary)" }}>Feeling Vibrant!</span>
      </div>
      <div style={{ marginTop: 33, fontSize: "1rem", color: "var(--secondary)" }}>
        🎉 Cheers to positivity!
      </div>
    </div>
  );
}

/**
 * InnerApp handles routes/layout so we keep StrictMode + Router separated for strict React compatibility.
 */
function InnerApp() {
  // Mood state managed at the top level
  const [mood, setMood] = useState("");
  // selectedTab determines visible content in the feed
  const [selectedTab, setSelectedTab] = useState("Memes");

  // Route navigation helper for BottomBar
  const navigate = useNavigate();

  // PUBLIC_INTERFACE
  // Callback for switching tabs
  const handleTabChange = (tab) => setSelectedTab(tab);

  // Handle navigation for the bottom bar
  const handleBottomNav = (key) => {
    if (key === "profile") {
      navigate('/profile');
    } else if (key === "home") {
      navigate('/');
    }
    // (settings reserved for future)
  };

  // Main layout (theme and padding retained for bottom bar position)
  return (
    <div className="app" style={{ paddingBottom: 74 }}>
      <Routes>
        <Route
          path="/"
          element={
            <>
              {/* Mood Selector Area (Top) */}
              <div className="mood-selector-area">
                <MoodSelector mood={mood} setMood={setMood} />
              </div>
              {/* Tab Navigation */}
              <div className="tabs-area">
                <TabNavigation selectedTab={selectedTab} onTabChange={handleTabChange} />
              </div>
              {/* Content Feed */}
              <div className="content-feed-area">
                <ContentFeed mood={mood} selectedTab={selectedTab} />
              </div>
            </>
          }
        />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
      {/* Bottom Bar fixed to bottom, keep outside of routes for persistence */}
      <BottomBar onNav={handleBottomNav} />
    </div>
  );
}

// PUBLIC_INTERFACE
function App() {
  return (
    <Router>
      <InnerApp />
    </Router>
  );
}

export default App;
