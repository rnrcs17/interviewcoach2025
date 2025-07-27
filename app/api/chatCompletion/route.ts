import { NextResponse } from "next/server";
import * as dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { rc, jd, question } = await req.json();
    console.log("rc, jd, question: ", rc,jd, question)
    const response = await openai.chat.completions.create({
      model: "gpt-4.1-nano",
      messages: [
        {
          role: "system",
          content: "You're being interviewed for the role described below. Act as the candidate. Answer each question naturally, as if speaking in a real interview — concise, confident, and human. Use the provided resume as context. If needed, craft a strong, realistic response that aligns with the resume and job description — avoid clichés or vague answers. Keep responses conversational and under 100 words — aim for 2-5 impactful sentences.",
        },
        {
          role: "user",
          content: `Your resume Content: ${rc} \nJob Description: ${jd} \nQuestion: ${question}`,
        },
      ],
    });

    return NextResponse.json(response.choices[0].message.content);
  } catch (error) {
    console.error("Error processing chat:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}