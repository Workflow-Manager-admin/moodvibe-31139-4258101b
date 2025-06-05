import React, { useState } from 'react';
import './App.css';
import MoodSelector from './components/MoodSelector';
import ContentFeed from './components/ContentFeed';

/**
 * MoodVibe Main App Container
 * Scaffolds: Mood Selector, Content Feed, Tabs, Bottom Bar.
 * Holds the state for detected/user-selected mood.
 */
// PUBLIC_INTERFACE
function App() {
  // Mood state managed at the top level
  const [mood, setMood] = useState("");

  return (
    <div className="app">
      {/* Mood Selector Area (Top) */}
      <div className="mood-selector-area">
        {/* MoodSelector UI with lifted state */}
        <MoodSelector mood={mood} setMood={setMood} />
      </div>

      {/* Content Feed (Center) */}
      <div className="content-feed-area">
        <div className="content-feed-placeholder">
          {/* Placeholder for Dynamic Content Feed */}
          {mood
            ? <>Content Feed Placeholder<br/>(memes, jokes, GIFs, quotes for <span style={{color: "var(--primary)", fontWeight: 600}}>{mood}</span>)</>
            : <>Content Feed Placeholder<br/>(Memes, Jokes, GIFs, Quotes tailored to your mood)</>
          }
        </div>
      </div>

      {/* Tab Navigation (Above Bottom) */}
      <div className="tabs-area">
        <div className="tabs-placeholder">
          {/* Placeholder for Tab Navigation */}
          Tabs Placeholder (Memes | Jokes | GIFs | Quotes)
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bottom-bar">
        <div className="bottom-bar-placeholder">
          {/* Placeholder for Bottom Bar Controls */}
          Bottom Bar Placeholder (Profile | Settings)
        </div>
      </div>
    </div>
  );
}

export default App;