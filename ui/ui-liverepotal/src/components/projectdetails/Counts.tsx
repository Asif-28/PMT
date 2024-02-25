"use client";
import React, { useEffect, useState } from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useDataSummaryStore } from "@/store/DataSummary";
import axiosWrapper from "@/hooks/DataFetch";

interface VendorStats {
  vendor_code: string;
  client_terminate: number;
  DFP_terminate: number;
  complete_count: number;
  insurvey_count: number;
  rejected_count: number;
  over_quota_count: number;
  Total_hits: number;
  avg_duration: number;
}

const Counts = () => {
  // const calculatePercentageChange = (today: number, yesterday: number) => {
  //   const change = today - yesterday;
  //   const percentageChange = (change / yesterday) * 100;

  //   return percentageChange.toFixed(2);
  // };
  // const percentageChange = calculatePercentageChange(
  //   todayCount,
  //   yesterdayCount
  // );
  // const percentageChangeTotalCount = parseFloat(
  //   calculatePercentageChange(totalCount, yesterdayTotalCount)
  // );
  // const percentageChangeTarget = parseFloat(
  //   calculatePercentageChange(todaysTarget, yesterdaysTarget)
  // );
  // const percentageChangeValue = parseFloat(percentageChange);
  const dataSummary = useDataSummaryStore((state: any) => state.dataSummary);
  const [data, setData] = useState<VendorStats[]>();
  const [isLocalStorageSet, setIsLocalStorageSet] = useState(false);
  const [projectKeyValue, setProjectKeyValue] = useState(null);

  useEffect(() => {
    if (dataSummary != "" && !isLocalStorageSet) {
      localStorage.setItem("dataSummary", JSON.stringify(dataSummary));
      setIsLocalStorageSet(true);
    }
  }, [dataSummary, isLocalStorageSet]);

  // Retrieve dataSummary from local storage on component mount
  useEffect(() => {
    if (!isLocalStorageSet) {
      const storedDataSummary = localStorage.getItem("dataSummary");
      if (storedDataSummary) {
        const parsedDataSummary = JSON.parse(storedDataSummary);
        setProjectKeyValue(parsedDataSummary);
        setIsLocalStorageSet(true);
      }
    }
  }, [isLocalStorageSet]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axiosWrapper<VendorStats[]>(
          "/project_summary",
          "get",
          {
            project_code: projectKeyValue,
          }
        );
        // console.log(response);
        setData(response);
        return response;
      } catch (error) {
        return { props: { error } };
      }
    }

    if (projectKeyValue != null) {
      fetchData();
    }
  }, [projectKeyValue]);

  const [completeCount, setCompleteCount] = useState<number>(0);
  const [totalTerminate, setTotalTerminate] = useState<number>(0);
  const [totalClicks, setTotalClicks] = useState<number>(0);
  const [totalIR, setTotalIR] = useState<number>(0);
  // Update additional states when data changes
  useEffect(() => {
    if (data) {
      setCompleteCount(
        data.reduce((total, item) => total + item.complete_count, 0)
      );
      setTotalTerminate(
        data.reduce((total, item) => total + item.client_terminate, 0)
      );
      setTotalClicks(data.reduce((total, item) => total + item.Total_hits, 0));
      setTotalIR(
        (data.reduce((total, item) => total + (item?.complete_count || 0), 0) /
          data.reduce((total, item) => total + (item?.Total_hits || 0), 0)) *
          100
      );
    }
  }, [data]);
  return (
    <div className="section">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
        <div className="border shadow-md px-5 py-3 max-w-[300px] rounded-2xl bg-[#fff]">
          <h3 className="text-[#71717A] uppercase font-medium  mb-4 text-sm">
            Today&apos;s Count
          </h3>
          <div className="flex justify-between">
            <p className="font-bold">{completeCount}</p>
            {/* {percentageChangeValue >= 0 ? (
              <p className="text-[14px] text-green-600">
                +{percentageChangeValue}%{" "}
                <ArrowUpwardIcon sx={{ fontSize: "1rem" }} />
              </p>
            ) : (
              <p className="text-[14px] text-red-600">
                {percentageChangeValue}%{" "}
                <ArrowDownwardIcon sx={{ fontSize: "1rem" }} />
              </p>
            )} */}
          </div>
        </div>
        <div className="border shadow-md px-5 py-3 max-w-[300px] rounded-2xl bg-[#fff]">
          <h3 className="text-[#71717A] uppercase font-medium  mb-4 text-sm">
            Total Count
          </h3>
          <div className="flex justify-between">
            <p className="font-bold">{totalClicks} </p>
            {/* {percentageChangeTotalCount >= 0 ? (
              <p className="text-[14px] text-green-600">
                +{percentageChangeTotalCount}%{" "}
                <ArrowUpwardIcon sx={{ fontSize: "1rem" }} />
              </p>
            ) : (
              <p className="text-[14px] text-red-600">
                {percentageChangeTotalCount}%{" "}
                <ArrowDownwardIcon sx={{ fontSize: "1rem" }} />
              </p>
            )} */}
          </div>
        </div>
        <div className="border shadow-md px-5 py-3 max-w-[300px] rounded-2xl bg-[#fff]">
          <h3 className="text-[#71717A] uppercase font-medium  mb-4 text-sm">
            Target
          </h3>
          <div className="flex justify-between">
            <p className="font-bold">{}</p>
            {/* {percentageChangeTarget >= 0 ? (
              <p className="text-[14px] text-green-600">
                +{percentageChangeTarget}%{" "}
                <ArrowUpwardIcon sx={{ fontSize: "1rem" }} />
              </p>
            ) : (
              <p className="text-[14px] text-red-600">
                {percentageChangeTarget}%{" "}
                <ArrowDownwardIcon sx={{ fontSize: "1rem" }} />
              </p>
            )} */}
          </div>
        </div>
        <div className="border shadow-md px-5 py-3 max-w-[300px] rounded-2xl bg-[#fff]">
          <h3 className="text-[#71717A] uppercase font-medium  mb-4 text-sm">
            IR%
          </h3>
          <div className="flex justify-between">
            <p className="font-bold">{totalIR.toFixed(3)}% </p>
            {/* <p className=" text-[14px] text-green-500">
              +36% <ArrowUpwardIcon sx={{ fontSize: "1rem" }} />
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Counts;
