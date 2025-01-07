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
      model: "gpt-3.5-turbo-0125",
      messages: [
        {
          role: "system",
          content: "Imagine you're being interviewed for a job based on the following description. Your resume is also provided. You're the interviewee and will respond naturally, keeping answers brief yet impactful as interviewee would (strictly). Use conversational human English, limiting responses to 50-100 words, but aim for brevity.",
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