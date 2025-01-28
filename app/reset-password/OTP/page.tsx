"use client";
import { Button } from "@/components/ui/button";

import Image from "next/image";

import React, { ChangeEvent, useRef, useState } from "react";

import "react-phone-number-input/style.css";

import { InputOtp } from "@heroui/react";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/store";
import axios from "axios";
import { Toast } from "primereact/toast";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Eye, EyeClosed } from "lucide-react";

const page = () => {
  const [otp, setOtp] = useState("");
  const { email } = useSelector((state: RootState) => state.user);
  const [password, setPassword] = useState("");
  const [OTPLoading, setOTPLoading] = useState(false);
  const toast = useRef<Toast>(null);
  const router = useRouter();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const validations: { label: string; test: (pw: string) => boolean }[] = [
    { label: "At least 8 characters", test: (pw) => pw.length >= 8 },
    { label: "Contains uppercase letter", test: (pw) => /[A-Z]/.test(pw) },
    { label: "Contains lowercase letter", test: (pw) => /[a-z]/.test(pw) },
    { label: "Includes a number", test: (pw) => /\d/.test(pw) },
    {
      label: "Includes at least one special character ‘@#+$’",
      test: (pw) => /[!@#$%^&*(),.?":{}|<>]/.test(pw),
    },
  ];
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPassword(value);
  };
  const handleOTP = async () => {
    setOTPLoading(true);
    try {
      const res = await axios.patch("https://app.kriapay.com/auth/login/otp", {
        email: email,
        otp: otp,
      });
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
  return (
    <div className="flex h-screen ">
      <Toast ref={toast} />
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
          <p className="text-sm text-center lg:text-left font-medium mb-5 w-[400px]">
            A 6 digit code has been sent to your email
          </p>
          <p className="mb-5 text-left">Enter code</p>
          <InputOtp
            length={6}
            variant="flat"
            value={otp}
            onValueChange={setOtp}
            className=""
            size="lg"
            width={200}
          />
          <p className="mb-5 text-left">Enter new pasword</p>
          <div className="relative">
            <Input
              id="current"
              type={isVisible ? "text" : "password"}
              name="password"
              className="w-96 h-14 rounded-lg  outline-none border-[1px] border-black focus:border-none focus:outline-none"
              value={password}
              onChange={handlePasswordChange}
            />
            <button
              type="button"
              className="absolute right-3 top-5 text-gray-600"
              onClick={() => setIsVisible(!isVisible)}
            >
              {isVisible ? <EyeClosed /> : <Eye />}
            </button>
          </div>

          <div className="mb-4 mt-5">
            <p className="text-sm font-medium mb-2">Password must include:</p>
            <ul>
              {validations.map((validation, index) => (
                <li
                  key={index}
                  className={`flex items-center mb-1 text-sm ${
                    validation.test(password)
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  <span className="mr-2">
                    {validation.test(password) ? "✔" : "✖"}
                  </span>
                  {validation.label}
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-10 text-sm">
            Didn’t receive any code?{" "}
            <span onClick={handleOTP} className="text-green-500">
              Resend
            </span>{" "}
          </p>
          <Button
            // onClick={handleOTP}
            onClick={() => console.log(password, otp)}
            disabled={
              otp.length < 6 ||
              OTPLoading ||
              !validations.every((validation) => validation.test(password)) ||
              !password
            }
            className="w-full h-14 mt-10 rounded-md bg-[#0A3C43] text-white disabled:bg-gray-300"
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

export default page;
