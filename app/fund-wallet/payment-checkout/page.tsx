"use client";
import { Button } from "@/components/ui/button";
import { PaystackButton } from "react-paystack";
import { setWallet } from "@/Redux/slices/transactionSlice";
import { RootState } from "@/Redux/store";
import {
  Avatar,
  Input,
  Select,
  SelectedItems,
  SelectItem,
} from "@heroui/react";
import axios from "axios";
import { ArrowUpDownIcon, CloudLightning } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

type Country = {
  key: string;
  label: string;
  flag: string;
};

export const countries = [
  { key: "nigeria", label: "Nigeria", flag: "/nigeriaflag.svg" },
  { key: "sierra-leone", label: "Sierra Leone", flag: "/sierraflag.svg" },
];

const page = () => {
  const { token, user } = useSelector((state: RootState) => state.user);
  const { wallet } = useSelector((state: RootState) => state.transaction);
  const [value, setValue] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY || "";

  return (
    <div className="flex flex-col text-left justify-center items-center mx-auto tracking-[-0.5] h-[100vh] lg:w-[75vw]  w-[100vw] px-5  lg:h-[60vh] relative  lg:px-0">
      <div className="absolute inset-0 bg-white  opacity-50 z-10"></div>
      <div className="absolute inset-0 bg-white  opacity-50 z-10"></div>
      <div className="absolute inset-0 bg-white  opacity-50 z-10"></div>
      <div className=" lg:text-left  z-20 flex flex-col items-start justify-center ">
        <p className="font-medium text-lg mb-3 ">Enter amount</p>

        <div className="bg-gray-200 flex justify-start  rounded-lg w-[90vw] sm:w-[70vw] h-[50px] lg:w-[380px]">
          {wallet === "nigeria" ? (
            <p className=" flex gap-4 ml-5 items-center">
              {" "}
              <Image
                src={"/nigeriaflag.svg"}
                alt="ngn logo"
                height={27}
                width={27}
                className=""
                priority
              />{" "}
              <span>Nigeria</span>
            </p>
          ) : (
            <p className=" flex gap-4 ml-5 items-center">
              {" "}
              <Image
                src={"/sierraflag.svg"}
                alt="ngn logo"
                height={27}
                width={27}
                className=""
                priority
              />{" "}
              <span>Sierra Leone</span>
            </p>
          )}
        </div>
        <p className="text-sm font-medium mt-10 mb-3">
          How much do you want to fund ?{" "}
        </p>
        <Input
          placeholder="0.00"
          startContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">₦</span>
            </div>
          }
          className="w-[90vw] sm:w-[70vw]  lg:w-96 h-[100px] "
          type="number"
          value={value}
          onValueChange={setValue}
        />
        <p className="font-medium text-sm text-green-500 flex items-center">
          {" "}
          <span className="text-black mr-1">Arrival time - </span>Instant
          <Image
            src={"/lightening.svg"}
            alt="lightening logo"
            height={12}
            width={12}
            className="ml-1"
            priority
          />
        </p>
        <p className="font-medium text-sm mt-2 text-green-500 flex items-center">
          {" "}
          <span className="text-black mr-1">Fee - </span> NGN 0
        </p>

        <PaystackButton
          className="w-[90vw] sm:w-[70vw]  lg:w-96 h-[45px] mt-10 rounded-md bg-[#0A3C43] text-white disabled:bg-gray-300"
          publicKey={publicKey} // Ensure it's always a string
          amount={Number(value) * 100}
          email={user!.email}
          onSuccess={(response) => {
            router.push(`/fund-wallet/payment-checkout/${response.reference}`);
          }}
          onClose={() => console.log("Closed")}
          text="Fund Now"
        />
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
  );
};

export default page;
