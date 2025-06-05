import React, { useState } from 'react';
import './App.css';
import MoodSelector from './components/MoodSelector';
import ContentFeed from './components/ContentFeed';
import TabNavigation from './components/TabNavigation';
import BottomBar from './components/BottomBar';

/**
 * MoodVibe Main App Container
 * Scaffolds: Mood Selector, Content Feed, Tabs, Bottom Bar.
 * Holds the state for detected/user-selected mood and active content tab.
 */
// PUBLIC_INTERFACE
function App() {
  // Mood state managed at the top level
  const [mood, setMood] = useState("");
  // NEW: selectedTab for Memes | Jokes | GIFs | Quotes
  const [selectedTab, setSelectedTab] = useState("Memes");

  // Handler for switching tabs with animated feedback
  const handleTabChange = (tab) => setSelectedTab(tab);

  /** Render a filtered ContentFeed so only the selected tab's content is visible */
  function renderFilteredContentFeed() {
    return (
      <ContentFeed mood={mood} selectedTab={selectedTab} />
    );
  }

  return (
    <div className="app">
      {/* Mood Selector Area (Top) */}
      <div className="mood-selector-area">
        {/* MoodSelector UI with lifted state */}
        <MoodSelector mood={mood} setMood={setMood} />
      </div>

      {/* Tab Navigation */}
      <div className="tabs-area">
        {/* Animated, themed TabNavigation - above content feed for better UX on mobile */}
        <TabNavigation selectedTab={selectedTab} onTabChange={handleTabChange} />
      </div>

      {/* Content Feed (Center) - only show selected type */}
      <div className="content-feed-area">
        {/* Vibrant Content Feed, filtered by selected tab */}
        {renderFilteredContentFeed()}
      </div>

      {/* Bottom Bar */}
      <BottomBar />
    </div>
  );
}

export default App;