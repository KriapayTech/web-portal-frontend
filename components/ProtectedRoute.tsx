"use client";
import { RootState } from "@/Redux/store";
import { Children } from "@/typings";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }: Children) => {
  const { user, loading } = useSelector((state: RootState) => state.user);
  const pathName = usePathname();
  const router = useRouter();

  
    useEffect(() => {
      if (!loading && !user) {
        // Only redirect if the user is NOT on login or signup
        if (!pathName.includes("/login") && !pathName.includes("/signup") && !pathName.includes("/reset-password")) {
          router.push("/login");
        }
      }
    }, [user, pathName, loading, router]);

 

  if (
    !user &&
    !pathName.includes("/login") &&
    !user &&
    !pathName.includes("/signup") &&  !user &&
    !pathName.includes("/reset-password")
  ) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
