"use client";
import React, { useEffect, useState } from "react";
import { Project } from "@/types/types";
import DropDown from "../utils/DropDown";
import Image from "next/image";
import axiosWrapper from "@/hooks/DataFetch";
import useUpdateProjectPauseClose from "@/hooks/UpdatePauseAndClose";
import withAuth from "../withAuth/withAuth";
import { useDataSummaryStore } from "@/store/DataSummary";
import { useRouter } from "next/navigation";

const ClosedProjectComponent: React.FC = () => {
  const [projectsdata, setProjectsData] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const res = useUpdateProjectPauseClose({ security: false });
  const router = useRouter();
  // console.log(res + " value");

  useEffect(() => {
    async function FetchData() {
      const status = "end";

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

  return (
    <div className="max-w-[1550px] mx-auto">
      <h1 className="text-3xl font-semibold text-center mt-20 mb-5">
        Close Projects
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
            </tr>
          </thead>

          <tbody className="bg-white divide-y-4 divide-gray-200 md:font-semibold">
            {projectsdata.map((project: any) => (
              <tr key={project.project_code} className="whitespace-nowrap">
                <td
                  onClick={() => handleSummary({ project })}
                  className="px-3 md:px-6 py-2 sm:py-4 cursor-pointer"
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

// export default withAuth(ClosedProjectComponent);
export default ClosedProjectComponent;
