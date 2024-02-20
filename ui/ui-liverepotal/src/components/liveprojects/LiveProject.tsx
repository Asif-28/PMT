"use client";
import React, { useEffect } from "react";
import { ProjectsProps } from "@/types/types";
import DropDown from "../utils/DropDown";
import Image from "next/image";
import { useStatusStore } from "@/store/Status";
import axiosWrapper from "@/hooks/DataFetch";
import axios from "axios";
import Cookies from "js-cookie";
import { useProjectCodeStore } from "@/store/ProjectCode";

const LiveProjectComponent: React.FC<ProjectsProps> = ({
  liveprojects,
}: ProjectsProps) => {
  // console.log(liveprojects.length);
  const useStatus = useStatusStore((state: any) => state.status);
  const useProjectCode = useProjectCodeStore(
    (state: any) => state.project_code
  );
  // console.log(useStatus);
  console.log(useProjectCode);

  useEffect(() => {
    const value = localStorage.getItem("Authorization");
    const postData = async () => {
      const url = "http://localhost:8000/project/update";
      const params = {
        project_code: useProjectCode,
        status: useStatus,
        security_check: true,
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

        console.log("Response:", response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    postData();
  }, [useStatus, useProjectCode]);
  return (
    <div className="max-w-[1550px] mx-auto">
      <h1 className="text-3xl font-semibold text-center mt-20 mb-5">
        Live Projects
      </h1>
      {liveprojects.length != 0 ? (
        <table className="w-full divide-y divide-gray-200 text-center">
          <thead className="bg-[#5C2081] text-[#fff] h-16">
            <tr className="text-center">
              <th
                scope="col"
                className="px-3 sm:px-6 py-2 sm:py-3  font-medium uppercase tracking-wider"
              >
                Project Name
              </th>
              <th
                scope="col"
                className="px-3 sm:px-6 py-2 sm:py-3  font-medium uppercase tracking-wider"
              >
                IR%
              </th>
              <th
                scope="col"
                className="px-3 sm:px-6 py-2 sm:py-3  font-medium uppercase tracking-wider"
              >
                LOI
              </th>
              <th
                scope="col"
                className="px-3 sm:px-6 py-2 sm:py-3  font-medium uppercase tracking-wider"
              >
                Scope
              </th>
              <th
                scope="col"
                className="px-3 sm:px-6 py-2 sm:py-3 font-medium uppercase tracking-wider"
              >
                Achieved
              </th>
              <th
                scope="col"
                className="px-3 sm:px-6 py-2 sm:py-3 font-medium uppercase tracking-wider"
              >
                Remaining
              </th>
              <th
                scope="col"
                className="px-3 sm:px-6 py-2 sm:py-3 font-medium uppercase tracking-wider"
              >
                Project Status
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y-4 divide-gray-200">
            {liveprojects.map((project: any) => (
              <tr key={project.project_code} className="whitespace-nowrap">
                <td className="px-3 md:px-6 py-2 sm:py-4">
                  {project.project_name}
                </td>
                <td className="px-3 md:px-6 py-2 sm:py-4">
                  {(project.count / project.total) * 100}%
                </td>
                <td className="px-3 md:px-6 py-2 sm:py-4">{project.loi}</td>
                <td className="px-3 md:px-6 py-2 sm:py-4">{project.scope}</td>
                <td className="px-3 md:px-6 py-2 sm:py-4">{project.count}</td>
                <td className="px-3 md:px-6 py-2 sm:py-4">
                  {project.total - project.count}
                </td>
                <td className="px-3 md:px-6 py-2 sm:py-4">
                  <DropDown
                    value1="end"
                    value2="paused"
                    status={project.status}
                    project_code={project.project_code}
                  ></DropDown>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className=" flex justify-center items-center">
          <Image src={`/loader.svg`} height={100} width={100} alt="" />
        </div>
      )}
    </div>
  );
};

export default LiveProjectComponent;
