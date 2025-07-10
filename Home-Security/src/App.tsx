import { useState } from "react";
import reactLogo from "./assets/react.svg";
import LiveFeed from "./components/LiveFeed";
import SwitchingTerminal from "./components/SwitchingTerminal";
import TimeDisplay from "./components/TimeDisplay";
import AudioInterface from "./components/AudioInterface";
import EventBar from "./components/EventBar";

import "./App.css";
import StatusBar from "./components/StatusBar";

function App() {
  return (
    <>
      <div className="App">
        <div className="PanelStatus">
          <EventBar />
          <SwitchingTerminal />
          <StatusBar />
        </div>
        <div className="FeedAndSettings">
          <TimeDisplay />
          <LiveFeed />
          <AudioInterface />
        </div>
      </div>
    </>
  );
}

export default App;
