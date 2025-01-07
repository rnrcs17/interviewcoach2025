import { CircleCheckIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 px-4 text-center mt-20">
      <div className="bg-green-100 p-4 dark:bg-green-900/20">
        <CircleCheckIcon className="h-16 w-16 text-green-500 dark:text-green-400" />
      </div>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Good to go!</h1>
        <p className="max-w-[500px] text-gray-500 dark:text-gray-400">
          Thank you for your purchase. Your order has been successfully
          processed.
        </p>
      </div>
      <Link
        className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
        href="/"
      >
        Go to Dashboard
      </Link>
    </div>
  );
}
