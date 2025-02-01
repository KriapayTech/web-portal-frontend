"use client";
import { setUser } from "@/Redux/slices/userSlice";
import { RootState } from "@/Redux/store";
import axios from "axios";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import { Toast } from "primereact/toast";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const toast = useRef<Toast>(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const { token } = useSelector((state: RootState) => state.user);
  const fetchUser = async () => {
    try {
      const res = await axios.get(
        "https://app.kriapay.com/get-profile-details",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
      if (res.data.success) {
        dispatch(setUser(res.data.success));
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data?.autherror);
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail:
            error.response?.data?.autherror || "An unexpected error occurred",
          life: 3000,
        });
        dispatch(setUser(null));
        router.push("/login");
      } else {
        console.log("Unexpected error:", error);
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: "An unexpected error occurred",
          life: 3000,
        });
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  const pathname = usePathname();
  const isHeaderExcluded =
    pathname.includes("/login") ||
    pathname.includes("/signup") ||
    pathname.includes("/reset-password");

  if (isHeaderExcluded) {
    return null;
  }

  return (
    <header className=" py-8  relative w-[75vw] border-b-[1px] border-gray-400">
      <Toast ref={toast} />
      <div className="flex justify-between px-20">
        {" "}
        <p className="text-2xl font-medium">Hi, </p>
        <div className="flex items-center gap-2 text-sm">
          <Image
            src={"/bell.svg"}
            alt="Bell logo"
            height={21}
            width={21}
            className=""
            priority
          />{" "}
          Notification
        </div>
      </div>
    </header>
  );
};

export default Header;
