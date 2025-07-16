import "./AudioInterface.css";
import UploadPhoto from "../assets/UploadButton.png";
import PlayPhoto from "../assets/Play.png";
import AudioVis from "../assets/AudioVis.png";
import RecordingButton from "./RecordAudioBut";
import React, { useRef } from "react";
//Time to deploy

function AudioInterface() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadAudio = () => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      alert("Please select an audio file first.");
      return;
    }

    const formData = new FormData();
    formData.append("audio", file);

    fetch("http://10.0.0.133:5000/upload-audio", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.text())
      .then((msg) => console.log(msg))
      .catch((err) => console.error("Upload failed:", err));
  };

  return (
    <div className="AudioInterface">
      {/* Hidden input for audio file */}
      <input
        type="file"
        accept="audio/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        id="audio-upload"
      />

      {/* Upload Button */}
      <button
        className="RoundButton"
        onClick={() => {
          fileInputRef.current?.click(); // open file dialog
        }}
      >
        <img src={UploadPhoto} alt="Upload Audio" />
      </button>

      {/* Visualization */}
      <RecordingButton></RecordingButton>

      {/* Play Button */}
      <button className="RoundButton">
        <img
          id="play-button"
          src={PlayPhoto}
          alt="Play Audio"
          onClick={uploadAudio}
        />
      </button>
    </div>
  );
}

export default AudioInterface;
