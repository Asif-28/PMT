"use client";
import ClosedProjectComponent from "@/components/closeproject/CloseProject";
import axiosWrapper from "@/hooks/DataFetch";
import { useStatusStore } from "@/store/Status";
import { Project } from "@/types/types";
import React, { useEffect, useState } from "react";

const ClosedProjects = () => {
  const [data, setdata] = useState<Project[]>([]);
  const useStatus = useStatusStore((state: any) => state.status);

  useEffect(() => {
    async function FetchData() {
      const status = "end";

      try {
        const response = await axiosWrapper<Project[]>("/projects", "get", {
          status,
        });
        setdata(response);
        return response;
      } catch (error) {
        return { props: { error } };
      }
    }
    FetchData();
  }, [useStatus]);
  return (
    <div>
      <ClosedProjectComponent projectsdata={data} />
    </div>
  );
};

export default ClosedProjects;
