// "use client";
import { useEffect, useState } from "react";
import useUser from "./useUser";

interface SubscriptionTime {
  created_at: Date | null;
  start_at: Date | null;
  end_at: Date | null;
  isSubscriptionValid: boolean;
}

export default function useSubscriptionTime(): SubscriptionTime {
  const [subscriptionTime, setSubscriptionTime] = useState<SubscriptionTime>({
    created_at: null,
    start_at: null,
    end_at: null,
    isSubscriptionValid: false,
  });

  const { data: user } = useUser();

  useEffect(() => {
    const calculateEndAt = () => {
      if (user?.subscriptions?.end_at) {
        return new Date(user.subscriptions.end_at);
      }
      if (user?.subscriptions?.created_at) {
        const startDate = new Date(user.subscriptions.created_at);
        startDate.setMinutes(startDate.getMinutes() + 10);
        return startDate;
      }
      return null;
    };

    const created_at = user?.created_at ? new Date(user?.created_at) : null;
    const start_at = user?.subscriptions?.start_at ? new Date(user?.subscriptions?.start_at) : null;
    const end_at = calculateEndAt();

    const isSubscriptionValid = () => {
      if (user?.subscriptions?.plan_type) {
        // paid user
        return end_at ? end_at > new Date() : false;
      } else {
        // free trial user
        return created_at && end_at ? end_at > new Date() : false;
      }
    };

    setSubscriptionTime({
      created_at,
      start_at,
      end_at,
      isSubscriptionValid: isSubscriptionValid(),
    });
  }, [user]);

  return subscriptionTime;
}
