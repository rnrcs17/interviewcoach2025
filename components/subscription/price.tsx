"use client";

import { CircleCheck } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";
import Checkout from "./checkout";
import Link from "next/dist/client/link";
import { Button } from "../ui/button";
import useUser from "@/app/hook/useUser";
import useSubscriptionTime from "@/app/hook/useSubscriptionTime";

export default function Price() {
  const { data } = useUser();
  const { isSubscriptionValid } = useSubscriptionTime();
  const isLoggedIn = data?.id;
  const prices = [
    {
      title: "Free Trial",
      description: "No credit card required.",
      benefits: ["Full access to the app", "Something else"],
      amount: 0,
      priceId: "",
      isOneTimePayment: true,
    },
    {
      title: "24-Hour Pass",
      description: "Access the app for 24 hours.",
      benefits: ["Full access to the app", "Something else"],
      amount: "2",
      priceId: "price_1PIfICCbnxyrbIiJOA7Mxbrb",
      isOneTimePayment: true,
    },
    {
      title: "Monthly Pass",
      description: "Access the app for an entire month.",
      benefits: ["Full access to the app", "Something else"],
      amount: "10",
      priceId: "price_1PIfIYCbnxyrbIiJGdUzEo9j",
      isOneTimePayment: false,
    },
  ];
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 ">
        {prices.map((price, index) => {
          const isOneDayPass = index === 1;
          const isFreePass = index === 0;
          return (
            <div
              key={index}
              className={cn("border rounded-md p-5 space-y-5", {
                "ring-2 ring-pp": isOneDayPass,
                "opacity-50 disabled":
                  isLoggedIn && !isSubscriptionValid && isFreePass,
              })}
            >
              <div className="space-y-3">
                <h1 className="text-2xl font-bold">
                  <span>{price.title}</span>
                </h1>

                <h1 className="text-3xl font-bold">${price.amount}</h1>
                <p className="text-sm text-gray-400">{price.description}</p>
              </div>
              <div className="space-y-3">
                {price.benefits.map((benefit, index) => {
                  return (
                    <div key={index} className="flex items-center gap-2">
                      <CircleCheck className="text-pp" />
                      <h1 className="text-sm text-gray-400">{benefit}</h1>
                    </div>
                  );
                })}
              </div>
              {isFreePass ? (
                !data?.id ? (
                  <Link href="/auth" className="flex">
                    <Button className="w-full items-center gap-2">
                      SignIn
                    </Button>
                  </Link>
                ) : isSubscriptionValid ? (
                  <Link href="/dashboard" className="flex">
                    <Button className="w-full items-center gap-2">
                      Dashboard
                    </Button>
                  </Link>
                ) : (
                  <Button className="w-full items-center gap-2" disabled>
                    Expired
                  </Button>
                )
              ) : (
                <Checkout
                  priceId={price.priceId}
                  isOneTimePayment={price.isOneTimePayment}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
