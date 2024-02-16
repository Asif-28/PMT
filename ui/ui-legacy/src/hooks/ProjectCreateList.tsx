import React, { useEffect, useState } from "react";
import axios from "axios";

interface ApiResponse {
  project_name: string;
  project_code: string;
  project_manager: string;
  client_name: string;
  client_project_manager: string;
  incidence_rate: string;
  loi: string;
  target: string;
  target_description: string;
  status: string;
  online: string;
  methodology: string;
  billing_comments: string;
  security_check: boolean; // Adjusted type to boolean for consistency
  scope: number;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const UseProjectCreateList = () => {
  const [apiCreateProjectList, setApiCreateProjectList] = useState<
    ApiResponse[] | []
  >([]);

  const [loadingData, setLoadingData] = useState<boolean>(false); // Start loading as false
  const authorizationToken = localStorage.getItem("Authorization");

  useEffect(() => {
    async function getAllList() {
      try {
        setLoadingData(true); // Set loading to true before fetching data

        const response = await axios.get(`${baseUrl}project/list`, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: authorizationToken,
          },
        });

        const data: ApiResponse[] = response.data;

        setApiCreateProjectList(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoadingData(false); // Set loading to false in all cases
      }
    }

    getAllList();
  }, []);

  return { apiCreateProjectList, loadingData };
};

export default UseProjectCreateList;
