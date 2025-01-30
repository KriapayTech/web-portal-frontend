import {
  Book,
  CreditCard,
  Handshake,
  House,
  LayoutDashboard,
  UserPen,
  Wallet,
} from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

const Sidebar = () => {
  const pathname = usePathname();
    const isHeaderExcluded =
      pathname.includes("/login") ||
      pathname.includes("/signup") ||
      pathname.includes("/reset-password");
  
    if (isHeaderExcluded) {
      return null;
    }
  return (
    <div className="bg-[#0A3C43] w-1/4 relative overflow-hidden hidden lg:block h-screen">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#0A3C43] opacity-50 z-10"></div>{" "}
      <div className="absolute inset-0 bg-[#0A3C43] opacity-50 z-10"></div>{" "}
      <div className="absolute inset-0 bg-[#0A3C43] opacity-20 z-10"></div>
      <div className="relative mt-10 ml-10 z-20">
        <Image
          src={"/krialogo.svg"}
          alt="Kria logo"
          height={100}
          width={100}
          priority
        />
      </div>
      <Image
        src={"/hourglass.svg"}
        alt="hourglass logo"
        height={500}
        width={500}
        className="absolute top-0 left-0 z-0"
        priority
      />{" "}
      <Image
        src={"/hourglass2.svg"}
        alt="hourglass logo"
        height={400}
        width={400}
        className="absolute bottom-0 -right-20 z-0"
        priority
      />
      <div className="absolute mt-12 w-full flex ml-10 gap-10 flex-col z-20">
        <div className=" text-white font-medium text-base flex items-center gap-3">
          {" "}
          <House /> Dashboard
        </div>
        <div className="   text-white font-medium text-base flex items-center gap-3">
          <Wallet /> Wallets
        </div>
        <div className=" text-white font-medium text-base flex items-center gap-3">
          <Book /> My Transactions
        </div>
        <div className=" text-white font-medium text-base flex items-center gap-3">
          <CreditCard /> Virtual Card
        </div>
        <div className=" text-white font-medium text-base flex items-center gap-3">
          {" "}
          <Handshake />
          Terms
        </div>
        <div className=" text-white font-medium text-base flex items-center gap-3">
          {" "}
          <UserPen />
          Profile
        </div>
      </div>
      <div className="absolute bottom-0 ml-10 left-0  flex items-center justify-center flex-col mb-5 z-20">
        {" "}
        <p className="font-medium text-sm pr-8 text-white">
          {" "}
          © 2024 Kria Technologies Ltd. All rights reserved.{" "}
          <span className="text-green-600 underline">
            Terms & Conditions Privacy Policies
          </span>
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
