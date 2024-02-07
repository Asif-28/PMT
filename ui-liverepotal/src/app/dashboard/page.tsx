import { MyView } from "@/components/linechart/LineChart";
import Counts from "@/components/projectdetails/Counts";
import PartnersProgress from "@/components/projectdetails/PartnersProgress";
import SearchBar from "@/components/projectdetails/Search";
import React from "react";

const page = () => {
  return (
    <div className="bg-gray-100">
      <SearchBar />
      <h3 className="my-14 section">
        <span className="font-bold text-base text-gray-950">Hey Gaurav -</span>
        <span className="text-gray-500">
          here&apos;s what&apos;s happening with your project today
        </span>
      </h3>
      <Counts
        todayCount={194}
        yesterdayCount={100}
        totalCount={133}
        yesterdayTotalCount={144}
        todaysTarget={200}
        yesterdaysTarget={500}
      />
      <div className="section flex justify-between mt-16 gap-6">
        <MyView />
        <PartnersProgress value1={10} value2={8} value3={89} value4={35} />
      </div>
    </div>
  );
};

export default page;
