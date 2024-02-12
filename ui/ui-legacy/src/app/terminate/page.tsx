import Image from "next/image";
import React from "react";

const Terminate = () => {
  return (
    <div>
      {" "}
      <div className="section">
        <div className="flex flex-col justify-center items-center gap-6 md:gap-12  h-[100vh]">
          <div className="">
            <Image src={`/terminate.svg`} height={300} width={300} alt="" />
          </div>
          <div className="text-[#7221B1]">
            <h1 className=" text-2xl md:text-3xl font-bold pb-6 w-[80%] mx-auto text-center">
              Thank you for your interest! While this survey may not be a match
              today, your opinions matter.
            </h1>
            <h3 className="text-base md:text-xl font-bold text-center mx-auto w-[80%]">
              Explore more opportunities to share your insights on the Puffulle
              panel page. Your next survey adventure awaits!
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terminate;
