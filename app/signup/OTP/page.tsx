"use client";
import { Button } from "@/components/ui/button";

import Image from "next/image";

import React, { useState } from "react";

import "react-phone-number-input/style.css";

import { InputOtp } from "@heroui/react";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/store";
import axios from "axios";

const page = () => {
  const [otp, setOtp] = useState("");
  const { email } = useSelector((state: RootState) => state.user);
  console.log(email);
  const handleOTP = async() => {
 try {
  const res = await axios.post(
    "https://app.kriapay.com/auth/verify-account-otp",
    formData
  );
 } catch (error) {
  
 }
  };
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
          src={"/mailbox.svg"}
          alt="hourglass logo"
          height={400}
          width={400}
          className="mx-auto"
          priority
        />
      </div>

      <div className="flex relative items-center justify-center h-screen flex-1">
        <div className="absolute inset-0 bg-white  opacity-50 z-10"></div>
        <div className="absolute inset-0 bg-white  opacity-50 z-10"></div>
        <div className="absolute inset-0 bg-white  opacity-50 z-10"></div>
        <div className="flex-col flex lg:justify-start lg:items-start justify-center items-center z-20">
          <p className="text-sm text-center lg:text-left font-medium mb-20 w-[400px]">
            A 6 digit code has been sent to your email
          </p>
          <p className="mb-10 text-left">Enter code</p>
          <InputOtp
            length={6}
            variant="flat"
            value={otp}
            onValueChange={setOtp}
            className=""
            size="lg"
            width={200}
          />
          <p className="mt-10 text-sm">
            Didn’t receive any code?{" "}
            <span className="text-green-500">Resend</span>{" "}
          </p>
          <Button
            onClick={handleOTP}
            disabled={otp.length < 6}
            className="w-full h-14 mt-20 rounded-md bg-[#0A3C43] text-white disabled:bg-gray-300"
            type="submit"
          >
            Verify
          </Button>
        </div>
        <Image
          src={"/mailbox.svg"}
          alt="hourglass logo"
          height={300}
          width={300}
          className="absolute bottom-0 lg:hidden -left-20 z-0"
          priority
        />
      </div>
    </div>
  );
};

export default page;
