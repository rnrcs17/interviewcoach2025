import useSubscriptionTime from "@/app/hook/useSubscriptionTime";
import { CalendarIcon } from "lucide-react";
import React, { useState } from "react";
import { Button } from "./ui/button";

export default function ExpiredBanner() {
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const { end_at, isSubscriptionValid } = useSubscriptionTime();
  const handleClose = () => {
    setIsBannerVisible(false);
  };
  return (
    <>
      {!isSubscriptionValid && (
        <>
          {isBannerVisible && (
            <div className="flex items-center justify-between rounded-md bg-yellow-50 p-4 dark:bg-gray-800">
              <div className="flex items-center space-x-2">
                <CalendarIcon className="h-5 w-5 text-pp" />
                <div className="text-sm font-medium">
                  Your subscription expired on
                  <span className="font-bold text-pp">
                    {""} {end_at?.toLocaleDateString()}{" "}
                    <span className="text-white">@</span>{" "}
                    {end_at?.toLocaleTimeString()}
                  </span>
                </div>
              </div>
              <Button size="sm" variant="ghost" onClick={handleClose}>
                X
              </Button>
            </div>
          )}
        </>
      )}
    </>
  );
}
