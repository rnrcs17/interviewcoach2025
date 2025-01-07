"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import useUser from "@/app/hook/useUser";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { protectedPaths } from "@/lib/constant";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Profile() {
  const { isFetching, data } = useUser();
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();

  if (isFetching) {
    return <></>;
  }

  const handleLogout = async () => {
    const supabase = supabaseBrowser();
    queryClient.clear();
    await supabase.auth.signOut();
    router.refresh();

    // if (protectedPaths.includes(pathname)) {
    //   router.replace("/auth?next=" + pathname);
    // }
  };

  return (
    <div>
      {!data?.id ? (
        <Link href="/auth" className="animate-fade">
          <Button>SignIn</Button>
        </Link>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <>
              {data?.image_url ? (
                <Image
                  src={data.image_url || ""}
                  alt={data.display_name || ""}
                  width={40}
                  height={40}
                  className="rounded-full animate-fade ring-2 ring-pp cursor-pointer"
                />
              ) : (
                <div className="h-[40px] w-[40px] flex items-center justify-center bg-gray-800 ring-2 ring-pp rounded-full text-2xl font-bold cursor-pointer">
                  <h1>{data.email[0].toUpperCase()}</h1>
                </div>
              )}
            </>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>{data.display_name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href="/dashboard"><DropdownMenuItem className="cursor-pointer">Dashboard</DropdownMenuItem></Link>
            <Link href="/profile"><DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem></Link>
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}
