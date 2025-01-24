"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import React, { useState } from "react";

const page = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const handleSignIn = (e: any) => {
    const { name, value } = e.target;
    // Update form data
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Validate inputs
  };
  return (
    <div className="flex h-screen ">
      {/* Left section with background */}
      <div className="bg-[#0A3C43] w-1/3 relative overflow-hidden">
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
        <div className="flex items-center justify-center flex-col mt-96 relative z-20">
          <p className="text-3xl font-medium text-white">
            Pay less to send more.
          </p>
          <p className="text-sm w-[323px] mt-10 font-medium text-center text-white">
            Your money deserves better. Send money internationally with the
            lowest transaction fees.
          </p>
        </div>
      </div>

      <div className="bg-white flex-1 flex  pt-28 justify-center min-h-screen relative">
        <div className="flex flex-col">
          <p className="text-[#0A3C43] font-medium text-2xl">Hello,</p>
          <p className="text-sm font-medium mb-5">Sign in to get started</p>
          <form className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                className="w-96 h-14 rounded-lg text-lg outline-none border-[1px] border-black focus:border-none focus:outline-none"
                onChange={handleSignIn}
                placeholder="johndoe@gmail.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="current">Password</Label>
              <Input
                id="current"
                type="password"
                name="password"
                className="w-96 h-14 rounded-lg  outline-none border-[1px] border-black focus:border-none focus:outline-none"
                value={formData.password}
                onChange={handleSignIn}
              />
            </div>
            <p className="font-medium text-sm">
              Forgot Password ?{" "}
              <span className="text-green-600 mt-10 mb-5">Reset Here</span>
            </p>
            <Button
              className="w-96 h-14 rounded-md bg-[#0A3C43] text-white"
              type="submit"
            >
              Login
            </Button>
          </form>
          <div className="absolute bottom-5">
          <p className="font-medium text-sm mb-2 ">
            New here? <span className="text-green-600">Create account</span>
          </p>{" "}
          <p className="font-medium text-sm">
            {" "}
            © 2024 Kria Technologies Ltd. All rights reserved.
            <span className="text-green-600">
              Terms & Conditions Privacy Policies
            </span>
          </p>
          </div>
        
        </div>
      </div>
    </div>
  );
};

export default page;
