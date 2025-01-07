import { NextResponse } from "next/server";
import fs from "fs";
import * as dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: { json: () => any; }) {
  const body = await req.json();
  // const base64Audio = body.audio;
  // const audio = Buffer.from(base64Audio, "base64");
  // const filePath = "tmp/input.wav";

  try {
    // fs.writeFileSync(filePath, audio);
    // const readStream = fs.createReadStream(filePath);
    const data = await openai.audio.transcriptions.create({
      file: body.audio,
      model: "whisper-1",
      language: "en"
    });
    // Remove the file after use
    // fs.unlinkSync(filePath);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error processing audio:", error);
    return NextResponse.error();
  }
}