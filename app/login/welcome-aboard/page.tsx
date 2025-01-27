"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div className="flex h-screen ">
      {/* Left section with background */}
      <div className="bg-[#0A3C43] w-1/3 relative overflow-hidden hidden lg:block">
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
        <div className="absolute bottom-20 left-0 w-full flex items-center justify-center flex-col mb-5 z-20">
          <p className="text-3xl font-medium text-white">Setup complete.</p>
          <p className="text-sm w-[323px] mt-10 font-medium text-center text-white">
            Your money deserves better. Send money internationally with the
            lowest transaction fees.
          </p>
        </div>
      </div>

      <div className="bg-white flex-1 flex items-center  px-8  lg:px-0  lg:pt-28 justify-center min-h-screen relative">
        <div className="absolute inset-0 bg-white  opacity-50 z-10"></div>
        <div className="absolute inset-0 bg-white  opacity-50 z-10"></div>
        <div className="absolute inset-0 bg-white  opacity-50 z-10"></div>
        <div className="flex flex-col z-20 ">
          <p className="text-[#0A3C43] font-medium text-2xl  lg:px-0 leading-9">
            Welcome aboard,
          </p>
          <p className="text-sm font-medium mt-2">
            Let’s get you signed in with your new credentials
          </p>
          <Link href={"/login"}>
            <Button
              className="w-96 h-14 mt-52 lg:mt-20 rounded-md bg-[#0A3C43] text-white"
              type="submit"
            >
              Sign in to get started
            </Button>
          </Link>

          <div className="absolute bottom-5">
            <p className="font-medium text-sm pr-4">
              {" "}
              © 2024 Kria Technologies Ltd. All rights reserved.{" "}
              <span className="text-green-600 underline">
                Terms & Conditions Privacy Policies
              </span>
            </p>
          </div>
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
