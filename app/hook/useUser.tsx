// "use client";

import { supabaseBrowser } from "@/lib/supabase/browser";
import { useQuery } from "@tanstack/react-query";

const initUser = {
  created_at: "",
  display_name: "",
  email: "",
  id: "",
  image_url: "",
  subscriptions: {
    created_at: "",
    customer_id: "",
    email: "",
    plan_type: "",
    start_at: "",
    end_at: "",
    subscription_id: "",
  },
};

export default function useUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const supabase = await supabaseBrowser();

      const { data } = await supabase.auth.getSession();

      if (data.session?.user) {
        // fetch user profile info
        const { data: user } = await supabase
          .from("profiles")
          .select("*, subscriptions(*)")
          .eq("id", data.session.user.id)
          .single();
        return user;
      }
      return initUser;
    },
  });
}
