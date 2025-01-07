"use client";
import { cn } from "@/lib/utils";
import { Mic, MicOff } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export const mimeType = "audio/webm";

function recorder({ uploadAudio }: { uploadAudio: (blob: Blob) => void }) {
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const { pending } = useFormStatus();
  const [permissioon, setPermission] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);

  useEffect(() => {
    getMicrophonePermission();
  }, []);
  const getMicrophonePermission = async () => {
    if ("MediaRecorder" in window) {
      try {
        const steamData = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
        setPermission(true);
        setStream(steamData);
      } catch (err: any) {
        console.log("microphone access error");
      }
    } else {
      console.log("MediaRecorder API is not supported in the browser");
    }
  };

  const startRecording = async () => {
    if (stream === null || pending) return;
    setRecordingStatus("active");

    //create a new meadia recorder instance using the stream
    const media = new MediaRecorder(stream, { mimeType });
    mediaRecorder.current = media;
    mediaRecorder.current.start();
    let localAudioChunks: Blob[] = [];
    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === "undefined") return;
      if (event.data.size === 0) return;
      localAudioChunks.push(event.data);
    };
    setAudioChunks(localAudioChunks);
  };

  const stopRecording = async () => {
    if (mediaRecorder.current === null || pending) return;
    setRecordingStatus("inactive");
    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: mimeType });
      uploadAudio(audioBlob);
      setAudioChunks([]);
    };
  };

  return (
    <div className="flex items-center justify-center text-white">
      {!permissioon ? (
        <button onClick={getMicrophonePermission}>Get Microphone</button>
      ) : (
        <>
          {pending && (
            <span className="inline-flex items-center justify-center rounded-full bg-gray-900 px-4 py-4 text-gray-50 transition-colors hover:bg-gray-900/90 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus:ring-gray-300">
              <MicOff className="h-12 w-10" />
              {/* <AiOutlineLoading3Quarters
              className={cn("h-12 w-10 animate-spin", pending ? "block" : "hidden")}
            /> */}
            </span>
          )}
          {permissioon && recordingStatus === "inactive" && !pending && (
            <span
              onClick={startRecording}
              className="inline-flex items-center justify-center rounded-full bg-gray-900 px-4 py-4 text-gray-50 transition-colors hover:bg-gray-900/90 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus:ring-gray-300"
            >
              <MicOff className="h-12 w-10" />
            </span>
          )}
          {recordingStatus === "active" && (
            <span
              onClick={stopRecording}
              className="inline-flex items-center justify-center rounded-full bg-gray-900 px-4 py-4 text-gray-50 transition-colors hover:bg-gray-900/90 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus:ring-gray-300"
            >
              <Mic className="h-12 w-10" />
            </span>
          )}
        </>
      )}
    </div>
  );
}

export default recorder;
