import React, { useEffect, useState } from "react";
import { useDebounce } from "./Debounce";
import { ProjectCodeStore } from "@/store/ProjectCode";
import axios from "axios";

interface ApiResponse {
  project_code: string;
  input_field: string;
  country: string;
  country_code: string;
  scope: number;
  test_link: string;
  live_link: string;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const UseClientListData = () => {
  const [apiClientData, setApiClientData] = useState<ApiResponse[] | null>(
    null
  );
  const ProjectCode = ProjectCodeStore((state: any) => state.ProjectCode);
  const debouncedSearch = useDebounce(ProjectCode.ProjectCode);
  const [loadingData, setLoadingData] = useState<boolean>(false); // Start loading as false

  useEffect(() => {
    async function getAllList() {
      try {
        setLoadingData(true); // Set loading to true before fetching data

        const response = await axios.get(`${baseUrl}project_client/list`);

        const data: ApiResponse[] = response.data;

        // Filter data based on the entered projectCode
        const filteredData = data.filter((item) => {
          return item.project_code === ProjectCode.ProjectCode;
        });

        setApiClientData(filteredData);
        console.log(filteredData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoadingData(false); // Set loading to false in all cases
      }
    }

    getAllList();
  }, [debouncedSearch]);

  return { apiClientData, loadingData };
};

export default UseClientListData;
