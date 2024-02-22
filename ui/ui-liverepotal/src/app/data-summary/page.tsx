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
  console.log(data);

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

  return (
    <div className="section">
      <h1 className="font-semibold text-2xl py-4 mt-10">Data Group Summary</h1>
      <h2 className="text-gray-600 pb-8">
        Infant Milk Formula in Spain - {projectKeyValue}
      </h2>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Status</th>
              {data?.map((item) => (
                <th className="px-4 py-2 text-left" key={item.vendor_code}>
                  {item.vendor_code}
                </th>
              ))}
              <th className="px-4 py-2 text-left">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-100">
              <td className="px-4 py-2 text-left">Complete</td>
              {data?.map((item) => (
                <td className="px-4 py-2 text-left" key={item.vendor_code}>
                  {item.complete_count}
                </td>
              ))}
              <td className="px-4 py-2 text-left">
                {data?.reduce((total, item) => total + item.complete_count, 0)}
              </td>
            </tr>
            <tr className="hover:bg-gray-100">
              <td className="px-4 py-2 text-left">Terminate</td>
              {data?.map((item) => (
                <td className="px-4 py-2 text-left" key={item.vendor_code}>
                  {item.client_terminate}
                </td>
              ))}
              <td className="px-4 py-2 text-left">
                {data?.reduce(
                  (total, item) => total + item.client_terminate,
                  0
                )}
              </td>
            </tr>
            <tr className="hover:bg-gray-100">
              <td className="px-4 py-2 text-left">Over-Quota</td>
              {data?.map((item) => (
                <td className="px-4 py-2 text-left" key={item.vendor_code}>
                  {item.over_quota_count}
                </td>
              ))}
              <td className="px-4 py-2 text-left">
                {data?.reduce(
                  (total, item) => total + item.over_quota_count,
                  0
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
