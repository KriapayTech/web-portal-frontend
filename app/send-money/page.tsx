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
    <div className="flex flex-col justify-center items-center   tracking-[-0.5] h-[80vh] lg:w-[75vw]  w-[100vw] px-5  lg:h-[70vh] relative  lg:px-0">
         <div className="absolute inset-0 bg-white  opacity-50 z-10"></div>
      <div className="absolute inset-0 bg-white  opacity-50 z-10"></div>
      <div className="absolute inset-0 bg-white  opacity-50 z-10"></div>
      <div className="flex flex-col z-20 justify-center items-center ">
        <p className="font-semibold text-lg mb-5 text-left items-start ">
          Send Money
        </p>
        <Select
          className="w-[90vw] sm:w-[70vw] mb-5  lg:w-[380px] text-sm text-black"
          size="lg"
          label="Select wallet to debit"
          labelPlacement="outside"
          classNames={{
            trigger: "h-[60px]",
            label: "pb-1 text-sm font-medium",
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

        <Select
          className="w-[90vw] sm:w-[70vw] mb-5  lg:w-[380px] text-sm text-black"
          size="lg"
          label="Beneficial Currency"
          labelPlacement="outside"
          classNames={{
            trigger: "h-[60px]",
            label: "pb-1 text-sm font-medium",
          }}
          variant="bordered"
          items={countries}
          selectedKeys={beneficialWallet ? [beneficialWallet.key] : []}
          onSelectionChange={(keys) => {
            const selectedKey = Array.from(keys)[0];

            const country = countries.find((c) => c.key === selectedKey);
            setBeneficialWallet(country || null);
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
              </div>
            </SelectItem>
          )}
        </Select>

        <Input
          label="Amount"
          labelPlacement="outside"
          placeholder="0.00"
          variant="bordered"
          startContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">LNS</span>
            </div>
          }
          className="w-[90vw] sm:w-[70vw]  lg:w-[380px]"
          classNames={{
            inputWrapper: "h-[50px]",
            label: "pb-1 text-sm font-medium",
          }}
          type="number"
          value={value}
          onValueChange={setValue}
        />

        <p className="text-sm font-medium py-4 text-left">
          NGN 115,000 will be deducted from your Naira wallet.
        </p>

        <Button
          className="w-[90vw] sm:w-[70vw]  lg:w-[390px] h-[45px] mt-10 rounded-md bg-[#0A3C43] text-white disabled:bg-gray-300"
          type="submit"
        >
          {"Next"}
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
