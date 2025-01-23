import { RootState } from "@/Redux/store";
import { Children } from "@/typings";
import React, { ReactNode } from "react";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }: Children) => {
  const user = useSelector((state: RootState) => state.user.user);
  return <div>ProtectedRoute</div>;
};

export default ProtectedRoute;
