"use client";
import React, { useState, useEffect } from "react";
import { Mic, MicOff } from "lucide-react";
import { useRecordVoice } from "@/app/hook/useRecordVoice";
import AudioVisualizer from "./AudioVisualizer";

const Microphone = ({ onTextChange }) => {
  const { startRecording, stopRecording, text, recording } = useRecordVoice();
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    if (text) {
      onTextChange(text);
    }
  }, [text, onTextChange]);

  const handleClick = () => {
    if (!isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
    setIsRecording((prevState) => !prevState);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Space") {
        handleClick();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isRecording]);

  return (
    <div>
      <button
        onClick={handleClick}
        className="border-none bg-transparent w-10 relative"
      >
        {recording ? (
          <span title="Recording...">
            {/* <Mic className="w-10 h-10" /> */}
            <span className="inline-flex items-center justify-center rounded-full bg-gray-900 px-4 py-4 text-gray-50 transition-colors hover:bg-gray-900/90 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus:ring-gray-300">
              <Mic className="h-12 w-10" />
            </span>
          </span>
        ) : (
          <span title="Not recording. Click to start recording.">
            {/* <MicOff className="w-10 h-10" /> */}
            <span className="inline-flex items-center justify-center rounded-full bg-gray-900 px-4 py-4 text-gray-50 transition-colors hover:bg-gray-900/90 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus:ring-gray-300">
              <MicOff className="h-12 w-10" />
            </span>
          </span>
        )}

        {/* {recording && <div>Recording...</div>} */}
      </button>
      <div className="mt-10">
      <AudioVisualizer isRecording={recording}/>
      </div>
    </div>
  );
};

export { Microphone };
