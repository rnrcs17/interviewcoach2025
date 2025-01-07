import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <div className="flex justify-center items-center">
        <h1 className="text-5xl font-bold mt-20">Oops!</h1>
      </div>
      <div className="flex justify-center items-center">
        <h1 className="text-xl font-bold mt-10">
        The page you're looking for could not be found. 
        </h1>
      </div>
      <div className="flex items-center justify-center w-full mt-10">
      {/* <Link href="/" className="animate-fade">
          <Button className="" variant="outline">Go back home</Button>
        </Link> */}
        <Link
          className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-6 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
          href="/"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}
