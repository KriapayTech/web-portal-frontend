"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const page = ({ params }: { params: { id: number } }) => {
  const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY || "";
  const [status, setStatus] = useState("");
  const [amount, setAmount] = useState("");
  const verifyTransaction = async () => {
    try {
      const res = await axios.get(
        `https://api.paystack.co/transaction/verify/${params.id}`,
        {
          headers: {
            Authorization: `Bearer ${secretKey}`,
          },
        }
      );
      console.log(res);
      setStatus(res.data.data.status);
      setAmount((res.data.data.amount / 100).toString());
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data?.autherror);
      } else {
        console.log("Unexpected error:", error);
      }
    }
  };
  useEffect(() => {
    verifyTransaction();
  }, []);
  console.log(status);
  return (
    <div className="flex flex-col text-left justify-center items-center mx-auto tracking-[-0.5] h-[100vh] lg:w-[75vw]  w-[100vw] px-5  lg:h-[50vh] relative  lg:px-0">
      <div className="absolute inset-0 bg-white  opacity-50 z-10"></div>
      <div className="absolute inset-0 bg-white  opacity-50 z-10"></div>
      <div className="absolute inset-0 bg-white  opacity-50 z-10"></div>
      {status === "success" && (
        <div className=" lg:text-left text-center z-20 flex flex-col items-center justify-center ">
          <Image
            src={"/check.svg"}
            alt="hourglass logo"
            height={70}
            width={60}
            className=""
            priority
          />

          <p className=" font-medium mt-10 mb-3 text-lg ">
            <span className=" text-[#0A3C43] font-semibold">NGN {amount}</span>{" "}
            Successfully deposited
          </p>
          <p className="font-medium text-sm">
            You paid less to send more, enjoy more value for your money.
          </p>
          <Link href={"/"}>
            <Button
              className="w-[90vw] sm:w-[70vw]  lg:w-96 h-[45px] mt-32 rounded-md bg-[#0A3C43] text-white disabled:bg-gray-300"
              type="submit"
            >
              {"Continue"}
            </Button>
          </Link>
        </div>
      )}
      {status === "failed" && (
        <div className=" lg:text-left  z-20 flex flex-col items-center justify-center ">
          <Image
            src={"/failed.svg"}
            alt="hourglass logo"
            height={70}
            width={60}
            className=""
            priority
          />

          <p className=" font-medium mt-10 mb-3 text-lg ">
            <span className=" text-[#0A3C43] font-semibold">NGN {amount}</span>{" "}
            deposit failed
          </p>
          <p className="font-medium text-sm">
            Your last deposit failed, please try again
          </p>
          <Link href={"/fund-wallet"}>
            <Button
              className="w-[90vw] sm:w-[70vw]  lg:w-96 h-[45px] mt-32 rounded-md bg-[#0A3C43] text-white disabled:bg-gray-300"
              type="submit"
            >
              {"ContTry again"}
            </Button>
          </Link>
        </div>
      )}

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
