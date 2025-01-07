"use server";

import OpenAI from "openai";
import { useState } from "react";

async function transcript(prevState: any, formData: FormData) {
  // const [text, setText] = useState("");
  const id = Math.random().toString(36);
  const file = formData.get("audio") as File;
  if (file.size === 0) {
    return {
      response: "No audio file provided",
    };
  }
  const arrayBuffer = await file.arrayBuffer();
  const audio = new Uint8Array(arrayBuffer);


  // const response = await fetch("/api/speechToText", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     audio: file,
  //   }),
  // }).then((res) => res.json());
  
  // const { text } = response;
  // console.log("transcript.ts res: ", text)
      // setText(text);



  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
  });

  const result = await openai.audio.transcriptions.create({
    file: file,
    model: "whisper-1",
    language: "en",
  });

  console.log("result of audio: ", result);

  return { response: result.text };
}

export default transcript;
