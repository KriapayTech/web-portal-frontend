"use client";
import { Bell } from "lucide-react";
import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <header className=" py-8 px-5 relative w-[75vw] border-b-[1px] border-gray-400">
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
