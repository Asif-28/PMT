"use client";

import axiosWrapper from "@/hooks/DataFetch";
import { useDataSummaryStore } from "@/store/DataSummary";
import { useEffect, useState } from "react";

export default function BasicTable() {
  const dataSummary = useDataSummaryStore((state: any) => state.dataSummary);

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
        const response = await axiosWrapper("/project_summary", "get", {
          project_code: projectKeyValue,
        });
        console.log(response);
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
        Infant Milk Formula in Spain - AZ190_IMFI_0823
      </h2>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">IO%</th>
              <th className="px-4 py-2 text-left">EL%</th>
              <th className="px-4 py-2 text-left">RK%</th>
              <th className="px-4 py-2 text-left">CT%</th>
              <th className="px-4 py-2 text-left">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-100">
              <td className="px-4 py-2 text-left">
                {dataSummary.project_code}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
