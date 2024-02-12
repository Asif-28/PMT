import Image from "next/image";
import React from "react";

const Complete = () => {
  return (
    <div className="section">
      <div className="flex-col md:flex-row flex justify-center items-center gap-6 md:gap-0  h-[100vh]">
        <div className="text-[#7221B1] w-[80%] text-center md:text-left md:w-[55%]">
          <h1 className="text-2xl md:text-3xl font-bold pb-6">
            Thank You For Participating.
          </h1>
          <h3 className="text-xl md:text-2xl font-bold mx-auto">
            That&apos;s all for today, please visit www.Puffulle.com to explore
            more rewarding Surveys.
          </h3>
        </div>
        <div className="hidden md:block">
          <Image src={`/complete.svg`} height={300} width={300} alt="" />
        </div>
        <div className="md:hidden">
          <Image src={`/complete.svg`} height={200} width={200} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Complete;
