"use client";
import { Button } from "@/components/ui/button";

import Image from "next/image";

import React, { useRef, useState } from "react";

import "react-phone-number-input/style.css";
import { InputOtp } from "@heroui/react";
import { Toast } from "primereact/toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { RootState } from "@/Redux/store";
import { useSelector } from "react-redux";

const Page = () => {
  const [transactionalPin, setTransactionalPin] = useState("");
  const [pinLoading, setPinLoading] = useState(false);
  const { email } = useSelector((state: RootState) => state.user);
  const toast = useRef<Toast>(null);
  const router = useRouter();
  const handleTransactionalPin = async () => {
    setPinLoading(true);
    try {
      const res = await axios.patch("https://app.kriapay.com/auth/create-pin", {
        email: email,
        pin: transactionalPin,
      });
      console.log(res);
      if (res.data.success) {
        toast.current?.show({
          severity: "success",
          summary: "Success",
          detail: res.data.success,
          life: 3000,
        });
        router.push("/login/welcome-aboard");

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
      setPinLoading(false);
    }
  };
  return (
    <div className="flex   h-screen ">
      <Toast ref={toast} />
      {/* Left section with background */}
      <div className="bg-[#0A3C43] w-[30vw] relative overflow-hidden lg:flex flex-col hidden justify-between">
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

      <div className="flex relative items-center tracking-[-0.5] w-[100vw] lg:w-[70vw] px-4 justify-center h-screen flex-1">
        <div className="absolute inset-0 bg-white  opacity-50 z-10"></div>
        <div className="flex-col flex lg:justify-start lg:items-start justify-center items-center  z-20">
          <p className="text-lg text-center lg:text-left  font-medium mb-10">
            Create a 4 digit transaction pin to your wallet
          </p>
          <p className="mb-10 font-semibold text-left">Enter Pin</p>
          <InputOtp
            length={4}
            variant="flat"
            value={transactionalPin}
            onValueChange={setTransactionalPin}
            className=""
            size="lg"
            width={200}
          />

          <Button
            onClick={handleTransactionalPin}
            disabled={transactionalPin.length < 4 || pinLoading}
            className="w-full h-[50px] mt-20 rounded-md bg-[#0A3C43] text-white disabled:bg-gray-300"
            type="submit"
          >
            {pinLoading ? "Creating Pin" : "Verify"}
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

export default Page;
