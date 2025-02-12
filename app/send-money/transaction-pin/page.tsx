"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/Redux/store";
import {
  Input,
  InputOtp,
  Select,
  SelectedItems,
  SelectItem,
} from "@heroui/react";
import { Button } from "@/components/ui/button";

const page = () => {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state: RootState) => state.user);

  return (
    <div className="flex flex-col justify-center items-center   tracking-[-0.5] h-[80vh] lg:w-[75vw]  w-[100vw] px-5  lg:h-[70vh] relative  lg:px-0">
      <div className="absolute inset-0 bg-white  opacity-50 z-10"></div>
      <div className="absolute inset-0 bg-white  opacity-50 z-10"></div>
      <div className="absolute inset-0 bg-white  opacity-50 z-10"></div>
      <div className="flex flex-col z-20 justify-center items-center text-center ">
        <p className="font-semibold text-lg mb-5 text-left items-start ">
          Enter transaction pin
        </p>
        <p className="font-medium text-sm mb-5 text-left items-start">
          Enter your 4 digit transaction pin
        </p>

        <InputOtp
          length={4}
          variant="flat"
          value={""}
          // onValueChange={setOtp}
          className=""
          classNames={{
            input:'w-[70px]'
          }}
          size="lg"
          width={900}
        />

        <Button
          className="w-[90vw] sm:w-[70vw]  lg:w-[390px] h-[45px] mt-10 rounded-md bg-[#0A3C43] text-white disabled:bg-gray-300"
          type="submit"
        >
          Verify
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
