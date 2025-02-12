"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/Redux/store";
import { Input, Select, SelectedItems, SelectItem } from "@heroui/react";
import { Button } from "@/components/ui/button";

const page = () => {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state: RootState) => state.user);

  return (
    <div className="flex flex-col justify-center items-center   tracking-[-0.5] h-[80vh] lg:w-[75vw]  w-[100vw] px-5  lg:h-[70vh] relative  lg:px-0">
      <div className="absolute inset-0 bg-white  opacity-50 z-10"></div>
      <div className="absolute inset-0 bg-white  opacity-50 z-10"></div>
      <div className="absolute inset-0 bg-white  opacity-50 z-10"></div>
      <div className="flex flex-col z-20 justify-center items-center ">
        <p className="font-semibold text-lg mb-5 text-left items-start ">
          Review Transaction
        </p>
        <div className="w-[90vw] sm:w-[70vw]   h-[104px] lg:w-[380px] rounded-lg flex justify-between items-center px-3  bg-gray-300">
          <div>
            {" "}
            <p className="text-xs  font-medium">From</p>{" "}
            <p className="text-base mt-3  font-medium">Emmanuel</p>{" "}
            <p className="text-xs text-gray-500  font-medium">Naira Wallet</p>{" "}
          </div>
          <div className="h-[36px] w-[100px] rounded-md text-[15px] flex items-center justify-center  font-bold text-center bg-black text-white">
            LNS 75,000{" "}
          </div>
          <div className="text-right items-end">
            {" "}
            <p className="text-xs  font-medium">To</p>{" "}
            <p className="text-base mt-3  font-medium">0123456789</p>{" "}
            <p className="text-xs text-gray-500  font-medium">
              Recipient Name{" "}
            </p>{" "}
          </div>
        </div>

        <div className="flex font-medium text-sm justify-between w-[90vw] sm:w-[70vw] border-b-2 border-gray-200 mt-5  py-5 lg:w-[380px] ">
          <p>Bank</p> <p>Bank of Sierra Leone</p>
        </div>
        <div className="flex justify-between font-medium text-sm w-[90vw] sm:w-[70vw] border-b-2 border-gray-200   py-5 lg:w-[380px] ">
          <p>Commision</p> <p>NGN 20.56</p>
        </div>
        <div className="flex justify-between font-medium text-sm w-[90vw] sm:w-[70vw]  py-5 lg:w-[380px] ">
          <p>Total Debit</p> <p>NGN 115,000</p>
        </div>

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
