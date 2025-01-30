"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import React, { FormEvent, useRef, useState } from "react";
import { DatePicker } from "@heroui/date-picker";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { parseDate } from "@internationalized/date";
import axios from "axios";
import { Toast } from "primereact/toast";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setEmail } from "@/Redux/slices/userSlice";

type E164Number = string;
type FormData = {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: E164Number | string;
  dateOfbirth: string;
  countryOfResidence: string;
  defaultCurrency: string;
};

const Page = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    dateOfbirth: "",
    countryOfResidence: "Nigeria",
    defaultCurrency: "ngn",
  });
  const toast = useRef<Toast>(null);
  const router = useRouter();
  const [signInLoading, setSignInLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSignIn = (value: string, name: keyof FormData): void => {
    setFormData((prevData: FormData) => ({
      ...prevData,
      [name]: `${value}`,
    }));
  };
  const handleSignInSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSignInLoading(true);
    console.log(formData);

    try {
      const res = await axios.post(
        "https://app.kriapay.com/auth/signup",
        formData
      );
      console.log(res);
      if (res.data.success) {
        toast.current?.show({
          severity: "success",
          summary: "Success",
          detail: res.data.success,
          life: 3000,
        });
        dispatch(setEmail(formData.email));
        router.push("/signup/OTP");
        setFormData({
          firstName: "",
          lastName: "",
          phoneNumber: "",
          email: "",
          dateOfbirth: "",
          countryOfResidence: "Nigeria",
          defaultCurrency: "ngn",
        });
        setSignInLoading(false);
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
      setSignInLoading(false);
    }
  };

  return (
    <div className="flex h-screen ">
      {/* Left section with background */}
     <div className="bg-[#0A3C43] w-[30vw] relative overflow-hidden hidden lg:block">
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-[#0A3C43] opacity-50 z-10"></div>{" "}
            <div className="absolute inset-0 bg-[#0A3C43] opacity-50 z-10"></div>{" "}
            <div className="absolute inset-0 bg-[#0A3C43] opacity-50 z-10"></div>
            <div className="absolute inset-0 bg-[#0A3C43] opacity-50 z-10"></div>
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

      <div className="bg-white flex-1 tracking-[-0.5] lg:w-[70vw] w-[100vw] flex items-center lg:items-start lg:px-0 px-5  lg:pt-10 justify-center min-h-screen relative">
        <div className="absolute inset-0 bg-white  opacity-50 z-10"></div>
        <div className="absolute inset-0 bg-white  opacity-50 z-10"></div>
        <div className="absolute inset-0 bg-white  opacity-50 z-10"></div>
        <div className="flex flex-col z-20 ">
          <p className="text-[#0A3C43]  font-medium text-2xl  lg:px-0 leading-9">
            Seamlessly transfer money across African countries.
          </p>
          <p className="text-sm font-medium mb-5 mt-2">
            Input your details to get started{" "}
          </p>
          <form className="space-y-4" onSubmit={handleSignInSubmit}>
            <div className="space-y-1  ">
              <Label htmlFor="lastName" className="text-sm font-medium mb-5">
                Last name
              </Label>
              <input
                id="lastName"
                type="text"
                required
                name="lastName"
                value={formData.lastName}
                className="w-full text-sm px-4 py-2 outline-none border-b-2 border-black  focus:ring-0 "
                onChange={(e) => handleSignIn(e.target.value, "lastName")}
                placeholder="Enter your last name "
              />
            </div>{" "}
            <div className="space-y-1 ">
              <Label htmlFor="lastName" className="text-sm font-medium">
                First name
              </Label>
              <input
                id="firstName"
                type="text"
                required
                name="firstName"
                value={formData.firstName}
                className="w-full text-sm px-4 py-2 outline-none border-b-2 border-black  focus:ring-0 "
                onChange={(e) => handleSignIn(e.target.value, "firstName")}
                placeholder="Enter your First name "
              />
            </div>{" "}
            <div className="space-y-1  ">
              <Label htmlFor="lastName" className="text-sm font-medium mb-5">
                DOB
              </Label>
              <DatePicker
                className="bg-white border-b-2 border-black"
                variant="underlined"
                isRequired
                value={
                  formData.dateOfbirth && formData.dateOfbirth !== ""
                    ? parseDate(formData.dateOfbirth)
                    : null
                }
                //@ts-expect-error type error
                onChange={(value) => handleSignIn(value, "dateOfbirth")}
              />
            </div>
            <div className="space-y-1   ">
              <Label htmlFor="lastName" className="text-sm font-medium">
                Email
              </Label>
              <input
                id="email"
                type="email"
                required
                name="email"
                value={formData.email}
                className="w-full text-sm px-4 py-2 outline-none border-b-2 border-black  focus:ring-0 "
                onChange={(e) => handleSignIn(e.target.value, "email")}
                placeholder="johndoe@gmail.com"
              />
            </div>
            <div className="space-y-1 ">
              <Label htmlFor="lastName" className="text-sm font-medium mb-5">
                Phone Number
              </Label>
              <PhoneInput
                placeholder="Enter Phone Number"
                international
                withCountryCallingCode
                defaultCountry="US"
                value={formData.phoneNumber}
                //@ts-expect-error type error
                onChange={(value) => handleSignIn(value, "phoneNumber")}
                className="border-b-2 pb-2 border-black custom-phone-input "
              />
            </div>
            <div className=" pb-5">
              <Button
                disabled={
                  !formData.email ||
                  !formData.dateOfbirth ||
                  signInLoading ||
                  !formData.firstName ||
                  formData.firstName.length < 3 ||
                  formData.lastName.length < 3 ||
                  !formData.lastName ||
                  formData.phoneNumber.length < 10
                }
                className="w-full h-14 mt-2 rounded-md bg-[#0A3C43] text-white disabled:bg-gray-300"
                type="submit"
              >
                {signInLoading ? "Signing you up " : "Sign up"}
              </Button>
            </div>
          </form>
          <div className="absolute bottom-4 lg:bottom-7">
            <p className="font-medium text-sm mb-5 mt-4 ">
              Already have an account ?{" "}
              <Link href={"/login"}>
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
      <Toast ref={toast} />
    </div>
  );
};

export default Page;
