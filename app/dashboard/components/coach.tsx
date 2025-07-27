"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FileUpload from "@/components/file-upload";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CircleCheck } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { cn } from "@/lib/utils";
import UseRecorder, { mimeType } from "@/components/test/recorder";
import { useFormState } from "react-dom";
import transcript from "@/lib/actions/transcript";

const initialState = {
  response: "",
};

export default function CoachContent() {
  // resume, job description and audio
  const [originalFileName, setOriginalFileName] = useState<string | null>(null);
  const [resumeTextContent, setResumeTextContent] = useState<string | null>(
    null
  );
  const [jobDescription, setJobDescription] = useState<string>("");

  // for chat Completion
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  // new for testing speechToText
  const fileRef = useRef<HTMLInputElement | null>(null);
  const submitButtonRef = useRef<HTMLButtonElement | null>(null);
  const [state, formAction] = useFormState(transcript, initialState);
  const [message, setMessage] = useState("");

  const [initialPrompt, setInitialPrompt] = useState<
    { role: string; content: string }[]
  >([]);
  const [isInitialPrompt, setIsInitialPrompt] = useState(true);

  const handleUploadResponse = (response: any) => {
    setOriginalFileName(JSON.parse(response).originalFileName);
    setResumeTextContent(JSON.parse(response).parsedText);
    setMessage("Greet and introduce yourself.");
  };

  const handleJobDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setJobDescription(event.target.value);
  };

  const isJobDescriptionProvided = () => {
    return jobDescription.length > 20;
  };

  const isResumeProvided = () => {
    return resumeTextContent;
  };

  function getInitialPrompt (rc: string, jd: string, question: string) {
    return [
      {
        role: "system",
        content:
          "You're being interviewed for the role described below. Act as the candidate. Answer each question naturally, as if speaking in a real interview — concise, confident, and human. Use the provided resume as context. If needed, craft a strong, realistic response that aligns with the resume and job description — avoid clichés or vague answers. Keep responses conversational and under 100 words — aim for 2-5 impactful sentences.",
      },
      {
        role: "user",
        content: `Your resume Content: ${rc} \nJob Description: ${jd} \nQuestion: ${question}`,
      },
    ];
  };

  function addQuestionToPrompt(
    initialPrompt: { role: string; content: string }[],
    newQuestion: any
  ) {
    return [
      ...initialPrompt,
      {
        role: "user",
        content: `Question: ${newQuestion}`,
      },
    ];
  }

  function addResponseToPrompt(
    initialPrompt: { role: string; content: any }[],
    newResponse: any
  ) {
    return [
      ...initialPrompt,
      {
        role: "assistant",
        content: newResponse,
      },
    ];
  }

  const handleSubmit = async () => {
    setLoading(true);
    try {
      var data = {};

      if (isInitialPrompt) {
        setIsInitialPrompt(false);
        setInitialPrompt(
          getInitialPrompt(
            resumeTextContent ?? "",
            jobDescription ?? "",
            message
          )
        );
      } else {
        setInitialPrompt(addQuestionToPrompt(initialPrompt, message));
      }
      // data = {
      //   rc: resumeTextContent,
      //   jd: jobDescription,
      //   question: message,
      // };
      data = {
        prompt: initialPrompt,
      };
      console.log("data: ", data);
      const res = await fetch("/api/chatCompletion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      const responseData = await res.json();
      console.log("chat completion res: ", responseData);
      setResponse(responseData);
      addResponseToPrompt(initialPrompt, responseData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (state.response) {
      setMessage(state.response);
    }
  }, [state]);

  useEffect(() => {
    if (message) {
      console.log("Updated message: ", message);
      handleSubmit();
    }
  }, [message]);

  const uploadAudio = (blob: Blob) => {
    const file = new File([blob], "audio.webm", { type: mimeType });
    // set the file as the value of the hidden file input field
    if (fileRef.current) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      fileRef.current.files = dataTransfer.files;
      // simulate click and submit the form
      if (submitButtonRef.current) {
        submitButtonRef.current.click();
      }
    }
  };

  return (
    <div>
      <main className="container mx-auto">
        <Tabs defaultValue="ai-coach" className="w-full mt-5">
          <TabsList className="text-pp">
            {/* <TabsTrigger value="user-guide">User Guide</TabsTrigger> */}
            <TabsTrigger value="resume-jd">Resume/JD</TabsTrigger>
            <TabsTrigger value="ai-coach">AI Coach</TabsTrigger>
          </TabsList>
          {/* <TabsContent value="user-guide">
            <div className="mt-10">Info section</div>
          </TabsContent> */}
          <TabsContent value="resume-jd">
            <div className="mt-10">
              <Label htmlFor="message" className="text-xl flex items-center">
                1. Upload your resume
                {resumeTextContent && (
                  <>
                    <CircleCheck className="ml-2 text-pp" />{" "}
                    <span className="text-base ml-5">{originalFileName}</span>
                  </>
                )}
              </Label>
              <div className="mt-2">
                <FileUpload onUploadResponse={handleUploadResponse} />
              </div>

              <div className="grid w-full gap-1.5 mt-10">
                <Label htmlFor="message" className="text-xl flex items-center">
                  2. Job Description
                  {isJobDescriptionProvided() && (
                    <CircleCheck className="ml-2 text-pp" />
                  )}
                </Label>
                <Textarea
                  placeholder="Highlight key responsibilities, qualifications, and any other relevant details 🎯"
                  id="message"
                  className="mt-2"
                  value={jobDescription}
                  onChange={handleJobDescriptionChange}
                />
                <h1 className="text-xs">
                  {isJobDescriptionProvided()
                    ? ""
                    : "Please provide at least 20 characters."}
                </h1>
              </div>

              {resumeTextContent && (
                <div className="mt-10">
                  <h1>Filename: {originalFileName}</h1>
                  <h1 className="text-lg">Resume content:</h1>
                  <pre className="mt-5">{resumeTextContent}</pre>
                </div>
              )}
            </div>
          </TabsContent>
          <TabsContent value="ai-coach">
            <main
              className={cn(
                "flex flex-col gap-8 py-8",
                !isResumeProvided() ? "block" : "hidden"
              )}
            >
              <h1>
                Please upload your resume and the job description in the first
                tab to get started.
              </h1>
            </main>
            <main
              className={cn(
                "flex flex-col gap-8 py-8",
                isResumeProvided() ? "block" : "hidden"
              )}
            >
              <section>
                <div className="mb-4 text-2xl font-bold flex items-center space-x-2">
                  <span>Answer</span>
                  <AiOutlineLoading3Quarters
                    className={cn("animate-spin", loading ? "block" : "hidden")}
                  />
                  <CircleCheck
                    className={cn(
                      "ml-2 text-pp",
                      response && !loading ? "block" : "hidden"
                    )}
                  />
                </div>

                <div className="rounded-lg border border-pp p-4 shadow-smborder-gray-800 dark:bg-yellow-200">
                  {/* {loading && <p className="text-black">Loading...</p>} */}
                  <div className="text-black">
                    {/* Render gpt response data here */}
                    {response
                      ? response
                      : "This is where the answer text will be displayed."}
                  </div>
                </div>
              </section>
              <section>
                <div className="mb-4 mt-10 text-2xl font-bold flex items-center space-x-2">
                  <span>Question</span>
                </div>

                <div className="rounded-lg border border-pp p-4 shadow-smborder-gray-800 dark:bg-yellow-200">
                  <p className="text-black">
                    {/* Render microphone response data here */}
                    {message
                      ? message
                      : "This is where the question text will be displayed."}
                  </p>
                </div>
              </section>
              <section hidden>
                <div className="flex items-center justify-center mt-20">
                  {/* <Microphone onTextChange={setMicrophoneText} /> */}
                </div>
              </section>
              <section>
                <div className="flex items-center justify-center mt-20">
                  <form action={formAction} className="cursor-pointer">
                    {/* hidden fields */}
                    <input type="file" name="audio" hidden ref={fileRef} />
                    <button type="submit" hidden ref={submitButtonRef} />
                    <UseRecorder uploadAudio={uploadAudio} />
                    <div>{/* voice synth */}</div>
                  </form>
                </div>
              </section>
            </main>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

// export default CoachContent;
