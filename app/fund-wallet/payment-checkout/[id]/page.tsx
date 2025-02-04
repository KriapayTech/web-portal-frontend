'use client'
import axios from "axios";
import React, { useEffect } from "react";

const page = ({ params }: { params: { id: number } }) => {
  const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY || "";
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
      if (res.data.status === 'success') {
        
      }
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
  return <div>page</div>;
};

export default page;
