"use client"
import React from "react";
import Profile from "./Profile";
import Link from "next/link";
import { navLinks } from "@/data/navLinks";
import { usePathname } from "next/navigation";
import useUser from "@/app/hook/useUser";

export default function Navbar() {  
  const pathName = usePathname();
  const isHomePage = pathName === "/";
  const { data: user, isLoading } = useUser();
  return (
    <nav className="py-4 bg-background/30 backdrop-blur-sm mt-2">
      <div className="container flex flex-row justify-between items-center">
        <Link href="/">
          <h1 className="text-3xl font-bold">
            Interview Co<span className="text-pp">𐌀</span>ch
          </h1>
          {/* {user ? "yes" : "no"} */}
        </Link>
        {/* {!isHomePage && ( */}
          <ul className="md:flex flex-row justify-between gap-8 hidden">
            {navLinks.map((link) => (
              <li key={link.title}>
                <Link href={link.href}>{link.title}</Link>
              </li>
            ))}
          </ul>
        {/* )} */}

        <div className="flex flex-row justify-end space-x-2">
          {/* <ThemeChanger /> */}
          {/* <Profile /> */}
        </div>
      </div>
    </nav>
  );
}
