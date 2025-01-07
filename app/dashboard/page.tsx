"use client";
import React from "react";
import useUser from "../hook/useUser";
import Price from "@/components/subscription/price";
import CoachContent from "./components/coach";
import ExpiredBanner from "@/components/expired-banner";
import useSubscriptionTime from "../hook/useSubscriptionTime";

export default function Page() {
  const { data: user, isLoading } = useUser();
  const { start_at, end_at, isSubscriptionValid } = useSubscriptionTime();
  if (isLoading) {
    return <></>;
  }

  // const isSubscriptionValid = () => {
  //   if (user?.subscriptions?.plan_type) {
  //     // paid user
  //     return !user?.subscriptions?.end_at
  //       ? false
  //       : new Date(user.subscriptions.end_at) > new Date();
  //   } else {
  //     // free trial user
  //     return start_at && end_at ? end_at > new Date() : false;
  //   }
  // };

  const isActive = !user?.subscriptions?.end_at
    ? false
    : new Date(user.subscriptions.end_at) > new Date();

  return (
    <div>
      {true ? (
        <CoachContent />
      ) : (
        <main className="container mx-auto mt-10">
          <ExpiredBanner />
          <h1 className="text-center text-2xl font-bold mt-20">
            You need to subscribe to continue.
          </h1>
          <div className="container mx-auto text-center">
            <div className="py-14">
              <h2 className="text-4xl font-extrabold my-4 text-foreground">
                Pricing Plans
              </h2>
              <p className="mx-auto my-4 text-sm w-full max-w-md bg-transparent text-center font-medium leading-relaxed tracking-wide text-muted-foreground">
                Choose a plan that works best for you.
              </p>
              <Price />
            </div>
          </div>
        </main>
      )}
    </div>
  );
}
