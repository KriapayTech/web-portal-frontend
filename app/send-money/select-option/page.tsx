"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/Redux/store";
import { Input, Select, SelectedItems, SelectItem } from "@heroui/react";
import { Button } from "@/components/ui/button";

type Country = {
  key: string;
  label: string;
  flag: string;
};

export const countries = [
  { key: "nigeria", label: "Naira", flag: "/nigeriaflag.svg" },
  { key: "sierra-leone", label: "Leones", flag: "/sierraflag.svg" },
];

const page = () => {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state: RootState) => state.user);
  const [value, setValue] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(
    user?.defaultCurrency === "ngn" ? countries[0] : countries[1]
  );
  const [beneficialWallet, setBeneficialWallet] = useState<Country | null>(
    user?.defaultCurrency === "ngn" ? countries[1] : countries[0]
  );
  return (
    <div className="flex flex-col justify-center items-center   tracking-[-0.5] h-[80vh] lg:w-[75vw]  w-[100vw] px-5  lg:h-[50vh] relative  lg:px-0">
      <div className="absolute inset-0 bg-white  opacity-50 z-10"></div>
      <div className="absolute inset-0 bg-white  opacity-50 z-10"></div>
      <div className="absolute inset-0 bg-white  opacity-50 z-10"></div>
      <div className="flex flex-col z-20 justify-center ">
        <p className="font-semibold text-lg mb-5 text-left items-start ">
          Transfer to
        </p>
        <p className="font-medium text-sm mb-2 text-left items-start">
          Select transfer option
        </p>

        <div className="w-[90vw] sm:w-[70vw] border-2 border-black  lg:w-[390px] h-[72px] flex mb-5   gap-5 rounded-lg">
          <Image
            src={"/bankLogo.svg"}
            alt="bank logo"
            height={25}
            width={25}
            className=" mb-5 ml-3 "
            priority
          />{" "}
          <div className="flex flex-col gap-1 mt-3 ">
            <p className="font-semibold text-sm">Bank</p>{" "}
            <p className="font-normal text-xs text-gray-500">
              Add Money using a credit/ Debit card{" "}
            </p>
          </div>
        </div>
        <div className="w-[90vw] sm:w-[70vw] border-2 border-black  lg:w-[390px] h-[72px] flex   gap-5 rounded-lg">
          <Image
            src={"/bankLogo.svg"}
            alt="bank logo"
            height={25}
            width={25}
            className=" mb-5 ml-3 "
            priority
          />{" "}
          <div className="flex flex-col gap-1 mt-3 ">
            <p className="font-semibold text-sm">Wallet</p>{" "}
            <p className="font-normal text-xs text-gray-500">
              Select bank from the list
            </p>
          </div>
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
  );
};

export default page;
