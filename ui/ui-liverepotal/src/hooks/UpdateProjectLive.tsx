import { useEffect, useState } from "react";
import axios from "axios";
import { useStatusStore } from "@/store/Status";
import { useProjectCodeStore } from "@/store/ProjectCode";

const useUpdateProject = ({ security }: any) => {
  const useStatus = useStatusStore((state: any) => state.status);
  const useProjectCode = useProjectCodeStore(
    (state: any) => state.project_code
  );
  const [res, setRes] = useState(null);

  useEffect(() => {
    const updateProject = async () => {
      const value = localStorage.getItem("Authorization");

      // Check if both useProjectCode and useStatus are selected
      if (useProjectCode && useStatus) {
        const url = "http://localhost:8000/project/update";
        const params = {
          project_code: useProjectCode,
          status: useStatus,
          security_check: security,
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

          // console.log("Response:", response.status);
          setRes(response);
        } catch (error) {
          console.error("Error:", error);
        }
      }
    };

    updateProject();
  }, [useProjectCode, useStatus]);

  return res; // If you need to expose these values in the component using this hook
};

export default useUpdateProject;
