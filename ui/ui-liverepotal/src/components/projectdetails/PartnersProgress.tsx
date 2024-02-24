"use client";
import React from "react";
import LinearWithValueLabel from "./ProgressBar";
import Image from "next/image";
import { useRouter } from "next/navigation";

const PartnersProgress = ({ value1, value2, value3, value4 }: any) => {
  const router = useRouter();
  const handleProjectSummary = () => {
    router.push("/data-summary");
  };
  return (
    <div className="flex flex-col">
      <div className="md:min-w-[30rem] max-w-[32rem] shadow-xl px-8 py-3 rounded-2xl bg-[#fff]">
        <div className="flex justify-between pt-4 pb-6 px-2">
          <h2 className="font-bold text-gray-950">Completed Sources</h2>
          <p className="text-sm">Today</p>
        </div>
        <div>
          <div className="mb-5">
            <h1 className="text-sm font-semibold mb-1">Partner 1</h1>
            <LinearWithValueLabel value={value1} />
          </div>
          <div className="mb-5">
            <h1 className="text-sm font-semibold mb-1">Partner 1</h1>
            <LinearWithValueLabel value={value2} />
          </div>
          <div className="mb-5">
            <h1 className="text-sm font-semibold mb-1">Partner 1</h1>
            <LinearWithValueLabel value={value3} />
          </div>
          <div className="mb-5">
            <h1 className="text-sm font-semibold mb-1">Partner 1</h1>
            <LinearWithValueLabel value={value4} />
          </div>
        </div>
      </div>
      {/* logo  */}
      <div className=" flex  items-center gap-5 my-8 ml-2">
        <Image src={`/Icon.png`} alt="icon" height={10} width={15} />
        <h3 className="text-gray-600">Performance</h3>
      </div>
      {/* logo end  */}
      <div className="md:min-w-[30rem] max-w-[32rem] shadow-xl px-8 py-3 rounded-2xl bg-[#fff]">
        <div
          onClick={handleProjectSummary}
          className="flex justify-between pt-4 pb-6 px-2 cursor-pointer"
        >
          <h2 className="font-bold text-gray-950">Data Summary</h2>
          <p className="text-sm">Overall</p>
        </div>
        <div>
          <div className="mb-5">
            <h1 className="text-sm font-semibold mb-1">Partner 1</h1>
            <LinearWithValueLabel value={value1} />
          </div>
          <div className="mb-5">
            <h1 className="text-sm font-semibold mb-1">Partner 1</h1>
            <LinearWithValueLabel value={value2} />
          </div>
          <div className="mb-5">
            <h1 className="text-sm font-semibold mb-1">Partner 1</h1>
            <LinearWithValueLabel value={value3} />
          </div>
          <div className="mb-5">
            <h1 className="text-sm font-semibold mb-1">Partner 1</h1>
            <LinearWithValueLabel value={value4} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnersProgress;
