"use client";
import LiveProjectComponent from "@/components/liveprojects/LiveProject";
import axios from "axios";
import React, { Suspense, useEffect, useState } from "react";
import Cookies from "js-cookie";
import Image from "next/image";
import { useAuthTokenStore } from "../../store/AuthToken";
import axiosWrapper from "../../hooks/DataFetch";
import { set } from "zod";
import { Project } from "@/types/types";
import { useStatusStore } from "@/store/Status";

const LiveProjects = () => {
  const [data, setdata] = useState<Project[]>([]);
  const useStatus = useStatusStore((state: any) => state.status);

  useEffect(() => {
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
  }, [useStatus]);
  return (
    <div>
      {/* <Suspense
        fallback={
          <div className="min-h-[100vh]">
            <Image src={`/loader.svg`} alt="loading" height={100} width={100} />
          </div>
        }
      >
      </Suspense> */}
      <LiveProjectComponent liveprojects={data} />
    </div>
  );
};

export default LiveProjects;
