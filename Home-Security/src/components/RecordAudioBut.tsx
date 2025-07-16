import React, { useEffect } from "react";
import { useVoiceVisualizer, VoiceVisualizer } from "react-voice-visualizer";
import "./AudioInterface.css"; // Your styles
import "./RecordingAudioBut.css";

const RecordingButton = () => {
  const recorderControls = useVoiceVisualizer({
    onStartRecording: () => {
      console.log("🎙️ Recording started");
    },
    onStopRecording: () => {
      console.log("🛑 Recording stopped");
    },
    onPausedRecording: () => {
      console.log("⏸️ Recording paused");
    },
    onResumedRecording: () => {
      console.log("▶️ Recording resumed");
    },
    onClearCanvas: () => {
      console.log("🧹 Canvas cleared");
    },
    onStartAudioPlayback: () => {
      console.log("🔊 Playback started");
    },
    onPausedAudioPlayback: () => {
      console.log("⏸️ Playback paused");
    },
    onResumedAudioPlayback: () => {
      console.log("▶️ Playback resumed");
    },
    onEndAudioPlayback: () => {
      console.log("🛑 Playback ended");
    },
    onErrorPlayingAudio: (error) => {
      console.error("❌ Error playing audio:", error);
    },
    shouldHandleBeforeUnload: false, // optional, defaults to true
  });
  const {
    error,
    startRecording,
    stopRecording,
    isRecordingInProgress,
    isAvailableRecordedAudio,
    recordedBlob,
    // audioRef is still available here if you need it for other purposes
  } = recorderControls;

  useEffect(() => {
    if (isAvailableRecordedAudio && recordedBlob) {
      console.log("Uploading audio...");

      const formData = new FormData();
      formData.append("audio", recordedBlob, "recording.webm");

      fetch("http://10.0.0.133:5000/upload-audio", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.text())
        .then((msg) => console.log("✅ Upload success:", msg))
        .catch((err) => console.error("❌ Upload failed:", err));
    }
  }, [isAvailableRecordedAudio, recordedBlob]);

  useEffect(() => {
    if (error) {
      console.error("Voice Visualizer error:", error);
    }
  }, [error]);

  useEffect(() => {
    if (recorderControls.audioRef?.current) {
      console.log(
        "Audio element ref attached:",
        recorderControls.audioRef.current
      );
    }
  }, [recorderControls.audioRef]);

  const handleToggleRecording = () => {
    console.log("heeeey");
    if (isRecordingInProgress) {
      stopRecording();
    } else {
      try {
        startRecording();
        console.log("Recording started");
      } catch (e) {
        console.error("startRecording failed", e);
      }
    }
  };

  if (error) {
    return (
      <div className="error-message">
        <p>Microphone access was denied.</p>
        <p>
          Please allow microphone access in your browser settings to continue.
        </p>
      </div>
    );
  }

  return (
    <div className="audio-container">
      <div className="AudioPlayback">
        {/* The ref prop has been removed from this component */}
        <VoiceVisualizer
          controls={recorderControls}
          isControlPanelShown={false}
          width={200}
          height={40}
          barWidth={3}
          gap={1}
          backgroundColor="transparent"
          mainBarColor="white"
          secondaryBarColor="#cccccc"
        />
      </div>

      <button onClick={handleToggleRecording} className="AudioPlayback">
        {isRecordingInProgress ? "Stop Recording" : "Start Recording"}
      </button>
    </div>
  );
};

export default RecordingButton;
