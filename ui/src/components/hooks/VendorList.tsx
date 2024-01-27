import React, { useEffect, useState } from "react";
import { useDebounce } from "./Debounce";
import axios from "axios";
import { VendorProjectCodeStore } from "@/store/VendorProjectCode";

interface ApiResponse {
  project_code: string;
  vendor_code: string;
  scope: number;
  complete: string;
  terminate: string;
  over_quota: string;
  pause_vendor: boolean;
  vendor_name: string;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const UseVendorListData = () => {
  const [apiVendorData, setApiVendorData] = useState<ApiResponse[] | null>(
    null
  );
  const VendorProjectCode = VendorProjectCodeStore(
    (state: any) => state.VendorProjectCode
  );
  const debouncedSearch = useDebounce(VendorProjectCode.ProjectCode);
  const [loadingData, setLoadingData] = useState<boolean>(false); // Start loading as false

  useEffect(() => {
    async function getAllList() {
      try {
        setLoadingData(true); // Set loading to true before fetching data

        const response = await axios.get(`${baseUrl}project_vendor/list`);

        const data: ApiResponse[] = response.data;

        // Filter data based on the entered projectCode
        const filteredData = data.filter((item) => {
          return item.project_code === VendorProjectCode.ProjectCode;
        });

        setApiVendorData(filteredData);
        console.log(filteredData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoadingData(false); // Set loading to false in all cases
      }
    }

    getAllList();
  }, [debouncedSearch]);

  return { apiVendorData, loadingData };
};

export default UseVendorListData;
