import { NextResponse } from "next/server";
import * as dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    console.log("prompt: ", prompt);
    const response = await openai.chat.completions.create({
      model: "gpt-4.1-nano",
      messages: prompt,
    });

    return NextResponse.json(response.choices[0].message.content);
  } catch (error) {
    console.error("Error processing chat:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
