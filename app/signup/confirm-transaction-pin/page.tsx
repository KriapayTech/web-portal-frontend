"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useState } from "react";
import "react-phone-number-input/style.css";
import { InputOtp } from "@heroui/react";

const page = () => {
  const [transactionalPin, setTransactionalPin] = useState("");
  return (
    <div className="flex   h-screen ">
      {/* Left section with background */}
      <div className="bg-[#0A3C43] w-1/3 relative overflow-hidden lg:flex flex-col hidden justify-between">
        {/* Dark overlay */}

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
          src={"/shield.svg"}
          alt="shield "
          height={200}
          width={200}
          className="absolute bottom-10 left-0"
          priority
        />
      </div>

      <div className="flex relative items-center justify-center h-screen flex-1">
        <div className="flex-col flex lg:justify-start lg:items-start justify-center items-center z-20">
          <p className="text-sm text-center lg:text-left font-medium mb-20 w-[400px]">
            Confirm your 4 digit transaction pin to your wallet
          </p>
          <p className="mb-10 text-left">Enter Pin</p>
          <InputOtp
            length={4}
            variant="flat"
            className=""
            value={transactionalPin}
            onValueChange={setTransactionalPin}
            size="lg"
            width={200}
          />

          <Button
            className="w-full h-14 mt-20 rounded-md bg-[#0A3C43] text-white"
            type="submit"
          >
            Verify
          </Button>
        </div>
        <Image
          src={"/shield.svg"}
          alt="hourglass logo"
          height={150}
          width={150}
          className="absolute left-0 bottom-10 lg:hidden  z-0"
          priority
        />
      </div>
    </div>
  );
};

export default page;
