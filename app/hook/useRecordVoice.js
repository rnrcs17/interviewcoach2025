"use client";
import { useEffect, useState, useRef } from "react";
import { blobToBase64 } from "@/utils/blobToBase64";
import { createMediaStream } from "@/utils/createMediaStream";

export const useRecordVoice = () => {
  const [text, setText] = useState("");
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recording, setRecording] = useState(false);
  const isRecording = useRef(false);
  const chunks = useRef([]);

  const startRecording = () => {
    if (mediaRecorder) {
      isRecording.current = true;
      mediaRecorder.start();
      setRecording(true);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      isRecording.current = false;
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  const getText = async (base64data) => {
    try {
      const response = await fetch("/api/speechToText", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          audio: base64data,
        }),
      }).then((res) => res.json());
      const { text } = response;
      console.log("useRecordVocie hook res: ", text)
      setText(text);
    } catch (error) {
      console.log(error);
    }
  };

  const initialMediaRecorder = (stream) => {
    const mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.onstart = () => {
      createMediaStream(stream)
      chunks.current = [];
    };

    mediaRecorder.ondataavailable = (ev) => {
      chunks.current.push(ev.data);
    };

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(chunks.current, { type: "audio/wav" });
      blobToBase64(audioBlob, getText);
    };

    setMediaRecorder(mediaRecorder);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(initialMediaRecorder);
    }
  }, []);

  return { recording, startRecording, stopRecording, text, setText };
};