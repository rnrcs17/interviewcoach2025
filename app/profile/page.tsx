"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon } from "lucide-react";
import React, { useState } from "react";
import useUser from "../hook/useUser";
import useSubscriptionTime from "../hook/useSubscriptionTime";
import ExpiredBanner from "@/components/expired-banner";
import Profile from "@/components/Profile";
import Image from "next/image";

export default function Page() {
  const { data: user } = useUser();
  const { created_at, start_at, end_at, isSubscriptionValid } =
    useSubscriptionTime();

  const isFreeTrial = user?.subscriptions?.plan_type === null;
  const planType = () => {
    return !user?.subscriptions?.plan_type
      ? "Free Trial"
      : user?.subscriptions?.plan_type === 1
      ? "24-Hour Pass"
      : "Monthly Pass";
  };

  return (
    <div>
      <main className="container mx-auto mt-10">
        {/* <ExpiredBanner /> */}
        <div className="flex items-center gap-4 mt-5">
          <Image
            src={user?.image_url || ""}
            alt={user?.display_name || ""}
            width={40}
            height={40}
            className="rounded-full animate-fade ring-2 ring-pp"
          />
          <div className="space-y-1">
            <h3 className="text-medium font-bold">{user?.display_name}</h3>
            <p className="text-lg text-gray-500 dark:text-gray-400">
              {user?.email}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center w-full">
                <CardTitle>Subscription</CardTitle>
                {isSubscriptionValid ? (
                  <span className="bg-green-300 text-black px-2 py-1 rounded text-xs">
                    Active
                  </span>
                ) : (
                  <span className="bg-red-400 text-black px-2 py-1 rounded text-xs">
                    Expired
                  </span>
                )}
              </div>
            </CardHeader>
            <CardContent className="grid gap-4">
              {/* <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-gray-500 dark:text-gray-400">
                  Email
                </span>
                <span className="text-medium">{user?.email}</span>
              </div> */}
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-gray-500 dark:text-gray-400">
                  Plan
                </span>
                <span className="text-medium">{planType()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-gray-500 dark:text-gray-400">
                  Started on
                </span>
                {isFreeTrial ? (
                  <span className="text-medium">
                    {created_at?.toLocaleDateString()} @{" "}
                    {created_at?.toLocaleTimeString()}
                    {/* {startDate.toLocaleTimeString()} */}
                  </span>
                ) : (
                  <span className="text-medium">
                    {start_at?.toLocaleDateString()} @{" "}
                    {start_at?.toLocaleTimeString()}
                    {/* {startDate.toLocaleTimeString()} */}
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-gray-500 dark:text-gray-400">
                  {isSubscriptionValid ? "Expires on" : "Expired on"}
                </span>
                <span className="text-medium">
                  {end_at?.toLocaleDateString()} @{" "}
                  {end_at?.toLocaleTimeString()}
                </span>
              </div>
            </CardContent>
            
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Billing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <div>
                  <span className="font-bold">Payment Method: </span>
                  Visa **** 1234
                </div>
                <div>
                  <span className="font-bold">Next Payment: </span>
                  $10.00 on June 15, 2025
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Joined</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-gray-500 dark:text-gray-400">
                  Date
                </span>
                <span className="text-medium">
                  {created_at?.toLocaleDateString()} @{" "}
                  {created_at?.toLocaleTimeString()}
                  {/* {startDate.toLocaleTimeString()} */}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
