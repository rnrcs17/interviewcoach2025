import { cn } from "@/lib/utils";
import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function loading() {
  return (
    <div className="flex items-center justify-center">
      <AiOutlineLoading3Quarters
        className="animate-spin text-4xl mt-20"
      />
    </div>
  );
}
