"use client";

import axiosWrapper from "@/hooks/DataFetch";
import { useDataSummaryStore } from "@/store/DataSummary";
import { useEffect, useState } from "react";

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
export default function BasicTable() {
  const dataSummary = useDataSummaryStore((state: any) => state.dataSummary);
  const [data, setData] = useState<VendorStats[]>();

  const [isLocalStorageSet, setIsLocalStorageSet] = useState(false);
  const [projectKeyValue, setProjectKeyValue] = useState(null);

  // Store dataSummary in local storage on component mount
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

  // Fetch data using projectKeyValue
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
      <h1 className="font-semibold text-2xl py-4 mt-10">Data Group Summary</h1>
      <h2 className="text-[#64748B] pb-8">
        Infant Milk Formula in Spain - {projectKeyValue}
      </h2>
      <div className="flex items-center gap-2  md:gap-24 my-7 md:my-12 md:ml-8 ml-2 ">
        <div className="border-l-2 md:border-l-4 h-12">
          <p className="text-[#64748B] text-[.98rem] ml-2">Complete</p>
          <p className="text-xl font-medium ml-2">{completeCount}</p>
        </div>
        <div className="border-l-2 md:border-l-4 h-12">
          <p className="text-[#64748B] text-[.98rem] ml-2">Terminates</p>
          <p className="text-xl font-medium ml-2">{totalTerminate}</p>
        </div>
        <div className="border-l-2 md:border-l-4 h-12">
          <p className="text-[#64748B] text-[.98rem] ml-2">Clicks</p>
          <p className="text-xl font-medium ml-2">{totalClicks}</p>
        </div>
        <div className="border-l-2 md:border-l-4 h-12">
          <p className="text-[#64748B] text-[.98rem] ml-2">IR%</p>
          <p className="text-xl font-medium ml-2">{totalIR.toFixed(3)}%</p>
        </div>
      </div>

      <div className="container mx-auto px-2 sm:px-6 lg:px-8">
        <table className="table-auto w-full border-collapse border h-full">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left border">Status</th>
              {data?.map((item) => (
                <th
                  className="px-4 py-2 text-left border"
                  key={item.vendor_code}
                >
                  {item.vendor_code}
                </th>
              ))}
              <th className="px-4 py-2 text-left border">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-100">
              <td className="px-4 py-2 text-left border">Client Terminate</td>
              {data?.map((item) => (
                <td
                  className="px-4 py-2 text-left border"
                  key={item.vendor_code}
                >
                  {item.client_terminate}
                </td>
              ))}
              <td className="px-4 py-2 text-left border">
                {data?.reduce(
                  (total, item) => total + item.client_terminate,
                  0
                )}
              </td>
            </tr>
            <tr className="hover:bg-gray-100">
              <td className="px-4 py-2 text-left border">DFP Terminate</td>
              {data?.map((item) => (
                <td
                  className="px-4 py-2 text-left border"
                  key={item.vendor_code}
                >
                  {item.DFP_terminate}
                </td>
              ))}
              <td className="px-4 py-2 text-left border">
                {data?.reduce((total, item) => total + item.DFP_terminate, 0)}
              </td>
            </tr>
            <tr className="hover:bg-gray-100">
              <td className="px-4 py-2 text-left border">Complete Count</td>
              {data?.map((item) => (
                <td
                  className="px-4 py-2 text-left border"
                  key={item.vendor_code}
                >
                  {item.complete_count}
                </td>
              ))}
              <td className="px-4 py-2 text-left border">
                {data?.reduce((total, item) => total + item.complete_count, 0)}
              </td>
            </tr>
            <tr className="hover:bg-gray-100">
              <td className="px-4 py-2 text-left border">Insurvey Count</td>
              {data?.map((item) => (
                <td
                  className="px-4 py-2 text-left border"
                  key={item.vendor_code}
                >
                  {item.insurvey_count}
                </td>
              ))}
              <td className="px-4 py-2 text-left border">
                {data?.reduce((total, item) => total + item.insurvey_count, 0)}
              </td>
            </tr>
            <tr className="hover:bg-gray-100">
              <td className="px-4 py-2 text-left border">Rejected Count</td>
              {data?.map((item) => (
                <td
                  className="px-4 py-2 text-left border"
                  key={item.vendor_code}
                >
                  {item.rejected_count}
                </td>
              ))}
              <td className="px-4 py-2 text-left border">
                {data?.reduce((total, item) => total + item.rejected_count, 0)}
              </td>
            </tr>
            <tr className="hover:bg-gray-100">
              <td className="px-4 py-2 text-left border">Over-Quota Count</td>
              {data?.map((item) => (
                <td
                  className="px-4 py-2 text-left border"
                  key={item.vendor_code}
                >
                  {item.over_quota_count}
                </td>
              ))}
              <td className="px-4 py-2 text-left border">
                {data?.reduce(
                  (total, item) => total + item.over_quota_count,
                  0
                )}
              </td>
            </tr>
            <tr className="hover:bg-gray-100">
              <td className="px-4 py-2 text-left border">Total Hits</td>
              {data?.map((item) => (
                <td
                  className="px-4 py-2 text-left border"
                  key={item.vendor_code}
                >
                  {item.Total_hits}
                </td>
              ))}
              <td className="px-4 py-2 text-left border">
                {data?.reduce((total, item) => total + item.Total_hits, 0)}
              </td>
            </tr>
            <tr className="hover:bg-gray-100">
              <td className="px-4 py-2 text-left border">Avg Duration</td>
              {data?.map((item) => (
                <td
                  className="px-4 py-2 text-left border"
                  key={item.vendor_code}
                >
                  {item.avg_duration}
                </td>
              ))}
              <td className="px-4 py-2 text-left border">
                {data?.reduce((total, item) => total + item.avg_duration, 0)}
              </td>
            </tr>

            {/* IR*/}
            <tr className="hover:bg-gray-100">
              <td className="px-4 py-2 text-left border">IR%</td>
              {data?.map((item) => (
                <td
                  className="px-4 py-2 text-left border"
                  key={item.vendor_code}
                >
                  {((item.complete_count / item.Total_hits) * 100).toFixed(2)}%
                </td>
              ))}
              <td className="px-4 py-2 text-left border">
                {data && data.length > 0
                  ? (
                      (data.reduce(
                        (total, item) => total + (item?.complete_count || 0),
                        0
                      ) /
                        data.reduce(
                          (total, item) => total + (item?.Total_hits || 0),
                          0
                        )) *
                      100
                    ).toFixed(3)
                  : "N/A"}
                %
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
