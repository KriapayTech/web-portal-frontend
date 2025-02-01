"use client";
import { Button } from "@/components/ui/button";
import { Avatar, Select, SelectedItems, SelectItem } from "@heroui/react";
import { ArrowUpDownIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

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
  return (
    <div className="flex flex-col justify-center items-center mx-auto tracking-[-0.5] h-[100vh] lg:w-[75vw]  w-[100vw] px-5  lg:h-[50vh] relative  lg:px-0">
      <div className="absolute inset-0 bg-white  opacity-50 z-10"></div>
      <div className="absolute inset-0 bg-white  opacity-50 z-10"></div>
      <div className="absolute inset-0 bg-white  opacity-50 z-10"></div>
      <div className=" lg:text-left  z-20 flex flex-col items-center justify-center ">
        <p className="font-medium text-lg mb-3 ">Add Wallet</p>
        <p className="text-sm font-normal  mb-5">
          Add from our selected wallets{" "}
        </p>

        <Select
          className="w-[90vw] sm:w-[70vw] h-[50px] lg:w-[380px] text-sm text-black"
          label="Select wallet type"
          size="lg"
          items={countries}
          renderValue={(items: SelectedItems<Country>) => {
            return items.map((item) => (
              <div key={item.key} className="flex items-center gap-2 py-2">
                <Image
                  src={item.data!.flag}
                  alt={item.data!.label}
                  height={27}
                  width={27}
                  className="rounded-full my-10"
                  priority
                />

                <div className="flex flex-col">
                  <span>{item.data?.label}</span>
                </div>
              </div>
            ));
          }}
        >
          {(country) => (
            <SelectItem>
              <div className="flex gap-3 items-center">
                <Image
                  src={country.flag}
                  alt="ngn logo"
                  height={27}
                  width={27}
                  priority
                  className="rounded-full"
                />{" "}
                {country.label}
              </div>
            </SelectItem>
          )}
        </Select>
        <Button
          className="w-[90vw] sm:w-[70vw]  lg:w-96 h-[45px] mt-32 rounded-md bg-[#0A3C43] text-white disabled:bg-gray-300"
          type="submit"
        >
          {"Select"}
        </Button>
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
