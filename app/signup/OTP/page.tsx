"use client";
import { Button } from "@/components/ui/button";

import Image from "next/image";

import React, { useRef, useState } from "react";

import "react-phone-number-input/style.css";

import { InputOtp } from "@heroui/react";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/store";
import axios from "axios";
import { Toast } from "primereact/toast";
import { useRouter } from "next/navigation";

const Page = () => {
  const [otp, setOtp] = useState("");
  const { email } = useSelector((state: RootState) => state.user);
  const [OTPLoading, setOTPLoading] = useState(false);
  const [disableResend, setDisableResend] = useState(false);
  const toast = useRef<Toast>(null);
  const router = useRouter();
  const obscureEmail = (email: string) => {
    const [localPart, domain] = email.split("@"); // Split the email into local part and domain
    const visiblePart = localPart.slice(0, 4); // Get the first 4 characters
    const obscuredPart = "*".repeat(localPart.length - 4); // Asterisk the rest of the local part
    return `${visiblePart}${obscuredPart}@${domain}`; // Combine the visible part, asterisks, and domain
  };
  const obscuredEmail = obscureEmail(email);
  const handleOTP = async () => {
    setOTPLoading(true);
    try {
      const res = await axios.patch(
        "https://app.kriapay.com/auth/verify-account-otp",
        {
          email: email,
          otp: otp,
        }
      );
      console.log(res);
      if (res.data.success) {
        toast.current?.show({
          severity: "success",
          summary: "Success",
          detail: res.data.success,
          life: 3000,
        });
        router.push("/signup/create-password");

        // setOTPLoading(false);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data?.error);
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: error.response?.data?.error || "An unexpected error occurred",
          life: 3000,
        });
      } else {
        console.log("Unexpected error:", error);
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: "An unexpected error occurred",
          life: 3000,
        });
      }
      setOTPLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setDisableResend(true);
    try {
      const res = await axios.patch("https://app.kriapay.com/auth/resend-otp", {
        email: email,
      });
      console.log(res);
      if (res.data.success) {
        toast.current?.show({
          severity: "success",
          summary: "Success",
          detail: res.data?.success || "An unexpected error occurred",
          life: 3000,
        });
        setTimeout(() => {
          setDisableResend(false);
        }, 15000);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data?.error);
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: error.response?.data?.error || "An unexpected error occurred",
          life: 3000,
        });
        setDisableResend(false);
      } else {
        console.log("Unexpected error:", error);
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: "An unexpected error occurred",
          life: 3000,
        });
        setDisableResend(false);
      }
    }
  };
  return (
    <div className="flex h-screen ">
      <Toast ref={toast} />
      {/* Left section with background */}
      <div className="bg-[#0A3C43] w-[30vw] relative overflow-hidden lg:flex flex-col hidden justify-between">
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#0A3C43] opacity-50 z-10"></div>{" "}
        <div className="absolute inset-0 bg-[#0A3C43] opacity-50 z-10"></div>{" "}
        <div className="relative mt-10 mx-auto z-20">
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
          width={380}
          className="mx-auto"
          priority
        />
      </div>

      <div className="flex relative items-center w-[100vw] lg:w-[70vw] tracking-[-0.5]  px-5 justify-center h-screen flex-1">
        <div className="absolute inset-0 bg-white  opacity-50 z-10"></div>
        <div className="absolute inset-0 bg-white  opacity-50 z-10"></div>
        <div className="absolute inset-0 bg-white  opacity-50 z-10"></div>
        <div className="flex-col flex lg:justify-start lg:items-start justify-center items-center z-20">
          <p className="text-lg text-center lg:text-left font-medium mb-20 ">
            A 6 digit code has been sent to your email {obscuredEmail}
          </p>
          <p className="mb-10 text-left font-semibold">Enter code</p>
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
            <span
              onClick={handleResendOTP}
              className={`${
                disableResend
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-green-500 cursor-pointer"
              }  `}
            >
              Resend
            </span>{" "}
          </p>
          <Button
            onClick={handleOTP}
            disabled={otp.length < 6 || OTPLoading}
            className=" h-[50px]  w-[90vw] lg:w-full  sm:w-[70vw] mt-20 rounded-md bg-[#0A3C43] text-white disabled:bg-gray-300"
            type="submit"
          >
            {OTPLoading ? "Verifying OTP" : "Verify"}
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

export default Page;
