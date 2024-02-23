"use client";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Project } from "@/types/types";
import DropDown from "../utils/DropDown";
import Image from "next/image";
import useUpdateProject from "@/hooks/UpdateProjectLive";
import axiosWrapper from "@/hooks/DataFetch";
import { redirect, useRouter } from "next/navigation";
import { useDataSummaryStore } from "@/store/DataSummary";
import Cookies from "js-cookie";

const LiveProjectComponent: React.FC = () => {
  // useLayoutEffect(() => {
  //   const cookie = Cookies.get("X-API-KEY");
  //   if (cookie) {
  //     redirect("/");
  //   } else {
  //     redirect("/login");
  //   }
  // }, []);

  const [projectsdata, setProjectsData] = useState<Project[]>([]);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [toggleState, setToggleState] = useState<{ [key: string]: boolean }>(
    {}
  );
  const res = useUpdateProject();
  useEffect(() => {
    async function FetchData() {
      const status = "live";

      try {
        const response = await axiosWrapper<Project[]>("/projects", "get", {
          status,
        });
        setProjectsData(response);
        setLoading(false);
        return response;
      } catch (error) {
        return { props: { error } };
      }
    }
    FetchData();
  }, [res]);

  const dataSummary = useDataSummaryStore((state: any) => state.dataSummary);
  const updateDataSummary = useDataSummaryStore(
    (state: any) => state.setDataSummary
  );
  console.log(dataSummary);

  const handleSummary = ({ project }: any) => {
    updateDataSummary(project.project_code);
    router.push("/data-summary");
  };

  useEffect(() => {
    const storedToggleValue = localStorage.getItem("toggleValue");

    if (storedToggleValue) {
      const parsedToggleValue = JSON.parse(storedToggleValue);
      setToggleState(parsedToggleValue);
    }
  }, []);

  const handleToggle = (projectCode: string) => {
    setToggleState((prevState) => {
      const newState = {
        ...prevState,
        [projectCode]: !prevState[projectCode] || false,
      };
      // Update localStorage
      localStorage.setItem("toggleValue", JSON.stringify(newState));
      return newState;
    });
  };

  return (
    <div className="max-w-[1550px] mx-auto">
      <h1 className="text-3xl font-semibold text-center mt-20 mb-5">
        Live Projects
      </h1>
      {projectsdata.length != 0 ? (
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
              <th
                scope="col"
                className="px-3 sm:px-6 py-2 sm:py-3 font-medium uppercase tracking-wider"
              >
                Security Check
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y-4 divide-gray-200">
            {projectsdata?.map((project: any) => (
              <tr
                key={project.project_code}
                className="whitespace-nowrap cursor-pointer"
              >
                <td
                  onClick={() => handleSummary({ project })}
                  className="px-3 md:px-6 py-2 sm:py-4"
                >
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
                    value3="live"
                    status={project.status}
                    project_code={project.project_code}
                  ></DropDown>
                </td>
                <td className="px-3 md:px-6 py-2 sm:py-4">
                  <div className="flex justify-center">
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={toggleState[project.project_code] || false}
                      onChange={() => handleToggle(project.project_code)}
                      id={`toggle-${project.project_code}`}
                    />
                    <label
                      htmlFor={`toggle-${project.project_code}`}
                      className={`cursor-pointer relative w-10 h-4 rounded-full ${
                        toggleState[project.project_code]
                          ? "bg-[#5C2081]"
                          : "bg-gray-400"
                      }`}
                    >
                      <div
                        className={`toggle__dot absolute w-6 h-6 bg-slate-100 rounded-full shadow inset-y-0 -top-1 left-0 transform ${
                          toggleState[project.project_code]
                            ? "translate-x-full"
                            : "translate-x-0"
                        } transition-transform duration-300 ease-in-out`}
                      ></div>
                    </label>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className=" flex justify-center items-center">
          {loading === true && (
            <Image src={`/loader.svg`} height={100} width={100} alt="" />
          )}
          {loading === false && <h1>No Records</h1>}
        </div>
      )}
    </div>
  );
};

export default LiveProjectComponent;
