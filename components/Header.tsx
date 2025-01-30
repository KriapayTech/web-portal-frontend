"use client";
import { Bell } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

const Header = () => {
  const pathname = usePathname();
  const isHeaderExcluded =
    pathname.includes("/login") ||
    pathname.includes("/signup") ||
    pathname.includes("/reset-password");

  if (isHeaderExcluded) {
    return null;
  }
  return (
    <header className=" py-8  relative w-[75vw] border-b-[1px] border-gray-400">
      <div className="flex justify-between px-20">
        {" "}
        <p className="text-2xl font-medium">Hi, Vincent</p>
        <div className="flex items-center gap-2 text-sm">
          <Image
            src={"/bell.svg"}
            alt="Bell logo"
            height={21}
            width={21}
            className=""
            priority
          />{" "}
          Notification
        </div>
      </div>
    </header>
  );
};

export default Header;
