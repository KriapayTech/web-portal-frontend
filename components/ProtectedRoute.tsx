"use client";
import { RootState } from "@/Redux/store";
import { Children } from "@/typings";
import { usePathname, useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }: Children) => {
  const { user, loading } = useSelector((state: RootState) => state.user);
  const pathName = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login");
      }
    }
  }, [user, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-4xl p-8 rounded-lg shadow-lg bg-white">
          {/* Header Section */}
          <div className="flex items-center mb-8">
            {/* Circle Skeleton */}
            <div className="mr-6">
              <div className="w-24 h-24 rounded-full bg-gray-200 animate-pulse duration-900"></div>
            </div>

            {/* Text Skeleton */}
            <div className="flex-1 space-y-4">
              <div className="w-72 h-6 bg-gray-200 animate-pulse duration-900 rounded"></div>
              <div className="w-48 h-6 bg-gray-200 animate-pulse duration-900 rounded"></div>
              <div className="w-64 h-4 bg-gray-200 animate-pulse duration-900 rounded"></div>
            </div>
          </div>

          {/* Content Section */}
          <div className="mb-8">
            <div className="w-full h-80 bg-gray-200 animate-pulse duration-900 rounded"></div>
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-between">
            <div className="w-32 h-12 bg-gray-200 animate-pulse duration-900 rounded"></div>
            <div className="w-32 h-12 bg-gray-200 animate-pulse duration-900 rounded"></div>
          </div>
        </div>
      </div>
    ); // Replace with a loading spinner or skeleton UI
  }

  if (
    !user &&
    !pathName.includes("/login") &&
    !user &&
    !pathName.includes("/signup")
  ) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
