"use client";
import { RootState } from "@/Redux/store";
import Image from "next/image";
import { useSelector } from "react-redux";

export default function Home() {
  const count = useSelector((state: RootState) => state.counter.value);

  return <div className="bg-blue-900">{count}</div>;
}
