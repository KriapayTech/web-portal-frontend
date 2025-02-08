"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setEmail } from "@/Redux/slices/userSlice";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Toast } from "primereact/toast";
import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import { useDispatch } from "react-redux";

const Page = () => {
  const [formData, setFormData] = useState({ email: "" });
  const toast = useRef<Toast>(null);
  const router = useRouter();
  const [resetPasswordLoading, setResetPasswordLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSignIn = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Update form data
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Validate inputs
  };
  const handleResetPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setResetPasswordLoading(true);

    try {
      const res = await axios.post(
        "https://app.kriapay.com/auth/forgot-password",
        formData
      );
      console.log(res);
      if (res.data.user) {
        dispatch(setEmail(formData.email));
        setFormData({
          email: "",
        });
        router.push("/reset-password/OTP");
        setResetPasswordLoading(false);
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
      setResetPasswordLoading(false);
    }
  };
  return (
    <div className="flex h-screen ">
      <Toast ref={toast} />
      {/* Left section with background */}
      <div className="bg-[#0A3C43] w-[30vw] relative overflow-hidden hidden lg:block">
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#0A3C43] opacity-50 z-10"></div>{" "}
        <div className="absolute inset-0 bg-[#0A3C43] opacity-50 z-10"></div>{" "}
        <div className="absolute inset-0 bg-[#0A3C43] opacity-20 z-10"></div>
        <div className="relative mt-10 ml-10 z-20"></div>
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
        <div className="absolute bottom-20 left-0 w-full flex items-center justify-center flex-col mb-5 z-20">
          <Image
            src={"/krialogo.svg"}
            alt="Kria logo"
            height={100}
            width={100}
            priority
          />
          <p className="text-sm w-[323px] mt-10 font-medium text-center text-white">
            Your money deserves better. Send money internationally with the
            lowest transaction fees.
          </p>
        </div>
      </div>

      <div className="bg-white flex-1 flex items-center w-[100vw] lg:w-[70vw]  px-5  lg:px-0  lg:pt-10 justify-center min-h-screen relative">
        <div className="absolute inset-0 bg-white  opacity-50 z-10"></div>
        <div className="absolute inset-0 bg-white  opacity-50 z-10"></div>
        <div className="absolute inset-0 bg-white  opacity-50 z-10"></div>
        <div className="flex flex-col z-20 ">
          <p className="text-[#0A3C43] font-medium text-2xl mb-5  lg:px-0 leading-9">
            Reset your password,
          </p>
          <p className="text-sm font-medium mb-5">
            Kindly put in your email address to receive your otp.
          </p>
          <form className="space-y-4 mt-4 " onSubmit={handleResetPassword}>
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                className="lg:w-96 w-[90vw] sm:w-[70vw] h-14 rounded-lg text-lg outline-none border-[1px] border-black focus:border-none focus:outline-none"
                onChange={handleSignIn}
                placeholder="johndoe@gmail.com"
              />
            </div>

            <div className="lg:pt-10 pt-8">
              <Button
                disabled={!formData.email || resetPasswordLoading}
                className="lg:w-96 w-[90vw] sm:w-[70vw] h-14 mt-5 rounded-md bg-[#0A3C43] text-white disabled:bg-gray-300"
                type="submit"
              >
                {resetPasswordLoading ? "Loading... " : "Next"}
              </Button>
            </div>
          </form>
        </div>
        <Image
          src={"/hourglass.svg"}
          alt="hourglass logo"
          height={500}
          width={500}
          className="absolute top-0 lg:hidden -left-8 z-0"
          priority
        />

        <Image
          src={"/hourglass2.svg"}
          alt="hourglass logo"
          height={400}
          width={400}
          className="absolute bottom-10 right-0 lg:hidden z-0"
          priority
        />
      </div>
    </div>
  );
};

export default Page;
