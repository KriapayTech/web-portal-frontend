"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import React, { ChangeEvent, useState } from "react";
import { DatePicker } from "@heroui/date-picker";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const Page = () => {
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    password: "",
    phoneNumber: "",
    dateOfBirth: "",
  });
  const handleSignIn = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Update form data
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Validate inputs
  };
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
          <p className="text-3xl font-medium text-white">
            Pay less to send more.
          </p>
          <p className="text-sm w-[323px] mt-10 font-medium text-center text-white">
            Your money deserves better. Send money internationally with the
            lowest transaction fees.
          </p>
        </div>
      </div>

      <div className="bg-white flex-1 flex items-center lg:items-start lg:px-0  lg:pt-10 justify-center min-h-screen relative">
        <div className="absolute inset-0 bg-white  opacity-50 z-10"></div>
        <div className="absolute inset-0 bg-white  opacity-50 z-10"></div>
        <div className="absolute inset-0 bg-white  opacity-50 z-10"></div>
        <div className="flex flex-col z-20 ">
          <p className="text-[#0A3C43]  font-medium text-2xl  lg:px-0 leading-9">
            Seamlessly transfer money across African countries...
          </p>
          <p className="text-sm font-medium mb-5 mt-2">
            Input your details to get started{" "}
          </p>
          <form className="space-y-4  ">
            <div className="space-y-1 h-14 mb-5 ">
              <Label htmlFor="lastName" className="text-sm font-medium mb-5">
                Last name
              </Label>
              <input
                id="lastName"
                type="text"
                name="lastName"
                value={formData.lastName}
                className="w-full text-sm px-4 py-2 outline-none border-b-2 border-black  focus:ring-0 "
                onChange={handleSignIn}
                placeholder="Enter your last name "
              />
            </div>{" "}
            <div className="space-y-1 h-14 pt-1 ">
              <Label htmlFor="lastName" className="text-sm font-medium">
                First name
              </Label>
              <input
                id="firstName"
                type="text"
                name="firstName"
                value={formData.firstName}
                className="w-full text-sm px-4 py-2 outline-none border-b-2 border-black  focus:ring-0 "
                onChange={handleSignIn}
                placeholder="Enter your First name "
              />
            </div>{" "}
            <div className="space-y-1 h-14 pt-3 ">
              <Label htmlFor="lastName" className="text-sm font-medium mb-5">
                DOB
              </Label>
              <DatePicker
                className="bg-white border-b-2 border-black"
                variant="underlined"
                // onChange={handleSignIn}
              />
            </div>{" "}
            <div className="space-y-1 h-14 pt-5 ">
              <Label htmlFor="lastName" className="text-sm font-medium mb-5">
                Phone Number
              </Label>
              <PhoneInput
                placeholder="Enter Phone Number"
                international
                withCountryCallingCode
                defaultCountry="US"
                value={formData.phoneNumber}
                onChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    phoneNumber: value || "", // Fallback to an empty string if undefined
                  }))
                }
                className="border-b-2 pb-2 border-black custom-phone-input "
              />
            </div>
            <div className="lg:pt-10 pt-2 pb-5">
              <Button
                className="w-full h-14 mt-5 rounded-md bg-[#0A3C43] text-white"
                type="submit"
              >
                Sign up
              </Button>
            </div>
          </form>
          <div className="absolute bottom-0 sm:bottom-4 lg:bottom-7">
            <p className="font-medium text-sm mb-5 ">
              Already have an account ?{" "}
              <Link href={"/signup"}>
                {" "}
                <span className="text-green-600">Log in </span>
              </Link>
            </p>{" "}
            <p className="font-medium text-sm pr-8">
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
