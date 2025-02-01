"use client";
import { setToken, setUser } from "@/Redux/slices/userSlice";
import { RootState } from "@/Redux/store";
import { Skeleton } from "@heroui/react";
import axios from "axios";
import { Menu } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Toast } from "primereact/toast";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const toast = useRef<Toast>(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const { token, user } = useSelector((state: RootState) => state.user);
  const [localUser, setLocalUser] = useState(user);
  const fetchUser = async () => {
    if (!token) return;
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
        setLocalUser(res.data.success);
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
      } else {
        console.log("Unexpected error:", error);
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: "An unexpected error occurred",
          life: 3000,
        });
        dispatch(setUser(null));
      }
    }
  };
  const logout = () => {
    dispatch(setUser(null));
    setLocalUser(null);
    dispatch(setToken(""));
  };

  useEffect(() => {
    fetchUser();
  }, [token]);
  useEffect(() => {
    setLocalUser(user); // Sync local state when Redux state updates
  }, [user]);
  const pathname = usePathname();
  const isHeaderExcluded =
    pathname.includes("/login") ||
    pathname.includes("/signup") ||
    pathname.includes("/reset-password");

  if (isHeaderExcluded) {
    return null;
  }

  return (
    <header className=" ">
      <Toast ref={toast} />
      <div className=" justify-between px-20  py-8  relative hidden lg:flex w-[75vw] border-b-[1px] border-gray-400 ">
        {" "}
        <p className="text-2xl font-medium flex justify-center items-center gap-2">
          Hi,{" "}
          {localUser?.firstName === "" ? (
            <Skeleton className="h-[20px] w-[200px] rounded-lg" />
          ) : (
            localUser?.firstName
          )}{" "}
        </p>
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
      <div className=" lg:hidden flex  gap-5 pt-8 items-center px-5">
        <Menu className="w-[40px] h-[30px]" />
        <Image
          src={"/logo.svg"}
          alt="Kria logo"
          height={24}
          width={85}
          priority
          className="h-[24px] w-[85px]"
        />
      </div>
    
      {/* <button onClick={logout}>Log out</button> */}
    </header>
  );
};

export default Header;
