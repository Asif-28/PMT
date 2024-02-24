import { MyView } from "@/components/linechart/LineChart";
import Counts from "@/components/projectdetails/Counts";
import Notification from "@/components/projectdetails/Notification";
import PartnersProgress from "@/components/projectdetails/PartnersProgress";
import SearchBar from "@/components/projectdetails/Search";
import TimeZones from "@/components/projectdetails/TimeZones";
import React from "react";

const page = () => {
  return (
    <div className="bg-gray-100 pb-14">
      <SearchBar />
      <h3 className="my-14 section">
        <span className="font-bold text-base text-gray-950">Hey Gaurav -</span>
        <span className="text-gray-500">
          here&apos;s what&apos;s happening with your project today
        </span>
      </h3>
      <Counts />
      <div className="section flex justify-between mt-20 gap-6 relative">
        <MyView />
        <PartnersProgress value1={10} value2={8} value3={89} value4={35} />
        <div className="absolute top-[32rem]">
          <TimeZones />
        </div>
      </div>
      <Notification />
    </div>
  );
};

export default page;
