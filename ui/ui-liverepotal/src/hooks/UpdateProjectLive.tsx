import { useEffect, useState } from "react";
import axios from "axios";
import { useStatusStore } from "@/store/Status";
import { useProjectCodeStore } from "@/store/ProjectCode";

interface ApiResponse {
  data: any;
  status: number;
}

const useUpdateProject = () => {
  const [security_check, setSecurityCheck] = useState(false);
  const useStatus = useStatusStore((state: any) => state.status);
  const useProjectCode = useProjectCodeStore(
    (state: any) => state.project_code
  );
  const [res, setRes] = useState<ApiResponse | null>(null);
  // console.log(security_check);

  useEffect(() => {
    const updateProject = async () => {
      const value = localStorage.getItem("Authorization");

      // Check if both useProjectCode and useStatus are selected
      if (useProjectCode && useStatus) {
        // Fetching the localStorage toggleValue
        const toggleValueString = localStorage.getItem("toggleValue");
        const toggleValue = toggleValueString
          ? JSON.parse(toggleValueString)
          : {};

        // Check if useProjectCode matches with any key in toggleValue
        if (toggleValue[useProjectCode] !== undefined) {
          // Use the updated value of security_check
          setSecurityCheck(toggleValue[useProjectCode]);
        }
        console.log(toggleValue[useProjectCode]);

        const url = "http://localhost:8000/project/update";
        const params = {
          project_code: useProjectCode,
          status: useStatus,
          security_check: toggleValue[useProjectCode] ? true : false,
        };
        const headers = {
          accept: "application/json",
          Authorization: value,
        };

        try {
          const response = await axios.post(url, null, {
            params,
            headers,
          });

          setRes(response);
        } catch (error) {
          console.error("Error:", error);
        }
      }
    };

    updateProject();
  }, [useProjectCode, useStatus]);

  return res;
};

export default useUpdateProject;
