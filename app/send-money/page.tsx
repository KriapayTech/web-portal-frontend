"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/Redux/store";
import { Select, SelectedItems, SelectItem } from "@heroui/react";

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
  const dispatch = useDispatch();
  const { token, user } = useSelector((state: RootState) => state.user);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(
    user?.defaultCurrency === "ngn" ? countries[0] : countries[1]
  );
  return (
    <div className="flex flex-col justify-center items-center mx-auto tracking-[-0.5] h-[100vh] lg:w-[75vw]  w-[100vw] px-5  lg:h-[50vh] relative  lg:px-0">
      <div className="flex flex-col justify-center items-center ">
        <p className="font-semibold text-lg">Send Money</p>
        <Select
          className="w-[90vw] sm:w-[70vw]  lg:w-[380px] text-sm text-black"
          size="lg"
          classNames={{
            trigger: "h-[60px]",
          }}
          variant="bordered"
          items={countries}
          selectedKeys={selectedCountry ? [selectedCountry.key] : []}
          onSelectionChange={(keys) => {
            const selectedKey = Array.from(keys)[0];

            const country = countries.find((c) => c.key === selectedKey);
            setSelectedCountry(country || null);
          }}
          renderValue={(items: SelectedItems<Country>) => {
            return items.map((item) => (
              <div key={item.key} className="flex gap-10 items-center relative">
                <div className="flex items-center gap-2 py-2">
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
                <div className="bg-gray-300 font-semibold text-sm px-5  flex items-center justify-center rounded-full absolute right-0  h-[30px] overflow-hidden whitespace-nowrap">
                  <p className="truncate max-w-[140px] overflow-hidden whitespace-nowrap">
                    {" "}
                    Balance 200,000
                  </p>
                </div>
              </div>
            ));
          }}
        >
          {(country) => (
            <SelectItem>
              <div className="flex gap-10 relative ">
                <div className="flex items-center gap-3">
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
                <div className="bg-gray-300 font-semibold text-sm px-5  flex items-center justify-center rounded-full absolute right-0  h-[30px] overflow-hidden whitespace-nowrap">
                  <p className="truncate max-w-[140px] overflow-hidden whitespace-nowrap">
                    {" "}
                    Balance 200,000
                  </p>
                </div>
              </div>
            </SelectItem>
          )}
        </Select>
      </div>
    </div>
  );
};

export default page;
