"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { cn } from "@/lib/utils";
import { ArrowRightIcon, KeyRound } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const params = useSearchParams();
  const next = params.get("next") || "";
  const handleLoginWithOAuth = (provider: "google") => {
    setLoading(true);
    const supabase = supabaseBrowser();
    supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: location.origin + "/auth/callback?next=" + next,
      },
    });
  };
  return (
    <>
      <div className="relative md:mt-24 mx-auto w-full max-w-4xl pt-4 text-center">
        {/* <div className="justify-center hidden md:flex">
          <div className="flex flex-row items-center justify-center gap-5 p-1 text-xs bg-card/60 backdrop-blur-lg rounded-md border border-border">
            <Badge className="font-semibold">New</Badge>
            <h5>Announce your new feature here</h5>
            <Link href="/" className="flex flex-row items-center">
              View all features
              <ArrowRightIcon className="w-6 h-6 ml-2" />
            </Link>
          </div>
        </div> */}
        <h1 className="md:text-5xl my-4 font-extrabold text-4xl md:leading-tight">
          AI Coach is waiting for you
        </h1>
        <p className="mx-auto my-4 text-lg w-full max-w-xl text-center font-medium leading-relaxed tracking-wide">
          Get ready, record, and succeed in interviews.
        </p>
        <div className="flex items-center justify-center w-full mt-20">
          <div className="w-96 rounded-md border p-5 space-y-5 relative bg-black">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Login</h1>
              {/* <p className="text-balance text-muted-foreground"></p> */}
            </div>
            <Button
              className="w-full flex items-center gap-2"
              onClick={() => handleLoginWithOAuth("google")}
            >
              <FcGoogle /> Login with Google{" "}
              <AiOutlineLoading3Quarters
                className={cn("animate-spin", loading ? "block" : "hidden")}
              />
            </Button>
          </div>
        </div>

        <div className="absolute top-0 -z-10 max-h-full max-w-screen-lg w-full h-full blur-2xl">
          <div className="absolute top-24 left-24 w-56 h-56 bg-violet-600 rounded-full mix-blend-multiply opacity-70 animate-blob filter blur-3xl"></div>
          <div className="absolute hidden md:block bottom-2 right-1/4 w-56 h-56 bg-sky-600 rounded-full mix-blend-multiply opacity-70 animate-blob delay-1000 filter blur-3xl"></div>
          <div className="absolute hidden md:block bottom-1/4 left-1/3 w-56 h-56 bg-pink-600 rounded-full mix-blend-multiply opacity-70 animate-blob delay-500 filter blur-3xl"></div>
        </div>
      </div>
    </>
  );
}

//  supabase
//  XOfOyUEvnG71wPky
