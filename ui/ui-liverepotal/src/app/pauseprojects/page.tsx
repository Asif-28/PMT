"use client";
import PauseProjectComponent from "@/components/pauseprojects/PauseProjects";
import axiosWrapper from "@/hooks/DataFetch";
import { useStatusStore } from "@/store/Status";
import { Project } from "@/types/types";
import React, { use, useEffect, useState } from "react";

const PausedProjects = () => {
  const [data, setdata] = useState<Project[]>([]);
  const useStatus = useStatusStore((state: any) => state.status);
  useEffect(() => {
    console.log(useStatus);
    async function FetchData() {
      const status = "paused";

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
      <PauseProjectComponent projectsdata={data} />
    </div>
  );
};

export default PausedProjects;
