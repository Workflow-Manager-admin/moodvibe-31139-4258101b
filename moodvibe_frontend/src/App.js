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
  // selectedTab determines visible content in the feed
  const [selectedTab, setSelectedTab] = useState("Memes");

  // PUBLIC_INTERFACE
  // Callback for switching tabs
  const handleTabChange = (tab) => setSelectedTab(tab);

  // Render ContentFeed showing only content for the selected tab
  function renderFilteredContentFeed() {
    return (
      <ContentFeed mood={mood} selectedTab={selectedTab} />
    );
  }

  // To prevent content from being hidden behind the fixed BottomBar,
  // add padding-bottom to the main container equal (or slightly larger) to BottomBar's height.
  // BottomBar is fixed, so we ensure the main content doesn't overlap.
  return (
    <div className="app" style={{ paddingBottom: 74 }}>
      {/* Mood Selector Area (Top) */}
      <div className="mood-selector-area">
        {/* MoodSelector UI */}
        <MoodSelector mood={mood} setMood={setMood} />
      </div>
      {/* Tab Navigation */}
      <div className="tabs-area">
        <TabNavigation selectedTab={selectedTab} onTabChange={handleTabChange} />
      </div>
      {/* Content Feed */}
      <div className="content-feed-area">
        {renderFilteredContentFeed()}
      </div>
      {/* Bottom Bar fixed to bottom */}
      <BottomBar />
    </div>
  );
}

export default App;