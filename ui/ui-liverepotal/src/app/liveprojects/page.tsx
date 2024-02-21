"use client";
import LiveProjectComponent from "@/components/liveprojects/LiveProject";
import React, { useEffect, useState } from "react";

import axiosWrapper from "../../hooks/DataFetch";

import { Project } from "@/types/types";
import { useStatusStore } from "@/store/Status";

const LiveProjects = () => {
  const [data, setdata] = useState<Project[]>([]);
  const useStatus = useStatusStore((state: any) => state.status);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    console.log(refresh);
    async function FetchData() {
      const status = "live";

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
  }, [refresh]);
  return (
    <div>
      <LiveProjectComponent projectsdata={data} setRefresh={setRefresh} />
    </div>
  );
};

export default LiveProjects;
