import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="flex w-screen h-screen">
      <div className="bg-[#0A3C43] w-1/3">
        <div className="mt-10 ml-10">
          <Image
            src={"/krialogo.svg"}
            alt="Kria logo"
            height={100}
            width={100}
          />
        </div>
        <div className="flex items-center justify-center flex-col mt-52">
          <p>Pay less to send more.</p>
          <p>
            Your money deserves better. Send money internationally with the
            lowest transaction fees.
          </p>
        </div>
      </div>
      <div className="bg-white"></div>
    </div>
  );
};

export default page;
