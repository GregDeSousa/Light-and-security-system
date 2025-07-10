import "./AudioInterface.css";
import UploadPhoto from "../assets/UploadButton.png"; // Ensure the path is correct
import PlayPhoto from "../assets/Play.png"; // Ensure the path is correct
import AudioVis from "../assets/AudioVis.png"; // Ensure the path is correct
import React, { useState } from "react";

function AudioInterface() {
  return (
    <div className="AudioInterface">
      <button className="RoundButton">
        <img src={UploadPhoto}></img>
      </button>
      <div className="AudioPlayback">
        <img id="audio-icon" src={AudioVis} alt="Audio Icon"></img>
      </div>
      <button className="RoundButton">
        <img id="play-button" src={PlayPhoto}></img>
      </button>
    </div>
  );
}

export default AudioInterface;
