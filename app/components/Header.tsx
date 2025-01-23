"use client";
import React from "react";
import { useDispatch } from "react-redux";
import { increment } from "@/Redux/slices/userSlice";

const Header = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <button onClick={() => dispatch(increment())}>ADD</button>
    </div>
  );
};

export default Header;
