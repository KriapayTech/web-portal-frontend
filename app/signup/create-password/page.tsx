"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Eye, EyeClosed } from "lucide-react";
import Image from "next/image";
import React, { useState, ChangeEvent, useRef } from "react";
import { Toast } from "primereact/toast";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/store";

const PasswordCreationPage: React.FC = () => {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [passwordLoading, setPassowrdLoading] = useState(false);
  const toast = useRef<Toast>(null);
  const router = useRouter();
  const { email } = useSelector((state: RootState) => state.user);

  // Validation Criteria
  const validations: { label: string; test: (pw: string) => boolean }[] = [
    { label: "At least 8 characters", test: (pw) => pw.length >= 8 },
    { label: "Contains uppercase letter", test: (pw) => /[A-Z]/.test(pw) },
    { label: "Contains lowercase letter", test: (pw) => /[a-z]/.test(pw) },
    { label: "Includes a number", test: (pw) => /\d/.test(pw) },
    {
      label: "Includes at least one special character ‘@#+$’",
      test: (pw) => /[!@#$%^&*(),.?":{}|<>]/.test(pw),
    },
  ];

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: ChangeEvent<HTMLInputElement>
  ): void => {
    setConfirmPassword(e.target.value);
  };

  const handlePasswordSubmit = async () => {
    setPassowrdLoading(true);
    try {
      const res = await axios.patch(
        "https://app.kriapay.com/auth/create-password",
        {
          email: email,
          password: password,
          confirmPassword: confirmPassword,
        }
      );
      console.log(res);
      if (res.data.success) {
        toast.current?.show({
          severity: "success",
          summary: "Success",
          detail: res.data.success,
          life: 3000,
        });
        router.push("/signup/create-transaction-pin");
        // setPassowrdLoading(false);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data?.error);
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: error.response?.data?.error || "An unexpected error occurred",
          life: 3000,
        });
      } else {
        console.log("Unexpected error:", error);
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: "An unexpected error occurred",
          life: 3000,
        });
      }
      setPassowrdLoading(false);
    }
  };
  return (
    <div className="flex h-screen">
      <Toast ref={toast} />
      <div className="bg-[#0A3C43] w-[30vw] relative overflow-hidden lg:flex flex-col hidden justify-between">
        {/* Dark overlay */}

        <div className="relative mt-10 mx-auto z-20">
          <Image
            src={"/krialogo.svg"}
            alt="Kria logo"
            height={100}
            width={100}
            priority
          />
        </div>

        <Image
          src={"/shield.svg"}
          alt="hourglass logo"
          height={200}
          width={200}
          className="absolute  bottom-0"
          priority
        />
      </div>
      <div className="flex flex-col lg:w-[70vw] w-[100vw] flex-1 items-center tracking-[-0.5] justify-center min-h-screen ">
        <div className="bg-white   p-6 w-full max-w-[600px]">
          <h2 className="text-base font-medium mb-6 text-left">
            Create a unique password to secure your acoount
          </h2>

          {/* Password Field */}
          <div className="mb-4 mt-10">
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
            >
              Create Password
            </label>
            <div className="relative">
              <input
                type={isVisible ? "text" : "password"}
                id="password"
                value={password}
                onChange={handlePasswordChange}
                className="w-full px-4 py-2 border-b-2 border-black  focus:outline-none focus:ring-0"
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="absolute right-3 top-2 text-gray-600"
                onClick={() => setIsVisible(!isVisible)}
              >
                {isVisible ? (
                  <EyeClosed className="size-[13px]" />
                ) : (
                  <Eye className="size-[13px]" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium mb-1"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className="w-full px-4 py-2 border-b-2 border-black  focus:outline-none focus:ring-0"
              placeholder="Re-enter your password"
            />
            {password && confirmPassword && password !== confirmPassword && (
              <p className="text-red-500 text-sm mt-2">
                Passwords do not match.
              </p>
            )}
          </div>

          {/* Password Validation */}
          <div className="mb-4">
            <p className="text-sm font-medium mb-2">Password must include:</p>
            <ul>
              {validations.map((validation, index) => (
                <li
                  key={index}
                  className={`flex items-center mb-1 text-sm ${
                    validation.test(password)
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  <span className="mr-2">
                    {validation.test(password) ? "✔" : "✖"}
                  </span>
                  {validation.label}
                </li>
              ))}
            </ul>
          </div>
          <p className="font-medium text-sm mt-20">
            {" "}
            © 2024 Kria Technologies Ltd. All rights reserved.{" "}
            <span className="text-green-600 underline">
              Terms & Conditions Privacy Policies
            </span>
          </p>
          {/* Submit Button */}
          <Button
            onClick={handlePasswordSubmit}
            className="w-full h-[50px] mt-5 rounded-md bg-[#0A3C43] text-white disabled:bg-gray-300"
            disabled={
              !password ||
              passwordLoading ||
              password !== confirmPassword ||
              !validations.every((validation) => validation.test(password))
            }
          >
            {passwordLoading ? "Loading..." : "Next"}
          </Button>
        </div>
        <Image
          src={"/shield.svg"}
          alt="hourglass logo"
          height={200}
          width={200}
          className="absolute bottom-10 lg:hidden left-0 z-0"
          priority
        />
      </div>
    </div>
  );
};

export default PasswordCreationPage;
