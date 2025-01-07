// import {HandIcon, Pencil1Icon, Pencil2Icon, RocketIcon} from "@radix-ui/react-icons";
import {Bot, Text, Handshake, PencilIcon, RocketIcon} from "lucide-react";

export const features = [
    {
        title: "Real-Time Interview Assistance",
        description: "Record interview questions in real-time with a simple press of a button. Seamlessly capture audio from any source, including meeting applications and browsers. ",
        icon: <Bot className="w-6 h-6"/>,
    },
    {
        title: "Instant AI-Generated Answers",
        description: "Get immediate, AI-generated answers based on your resume and job description. Receive detailed, relevant, and impressive responses to interview questions.",
        icon: <Text className="w-6 h-6"/>,
    },
    {
        title: "Enhanced Confidence",
        description: "Boost your confidence with real-time AI assistance. Receive instant feedback and answers during your interview, ensuring you respond with clarity and precision.",
        icon: <RocketIcon className="w-6 h-6"/>,
    },
];