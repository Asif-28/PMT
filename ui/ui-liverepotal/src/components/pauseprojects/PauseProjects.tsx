import React from "react";
import { ProjectsProps } from "@/types/types";
import DropDown from "../utils/DropDown";

const PauseProjectComponent: React.FC<ProjectsProps> = ({
  projects,
}: ProjectsProps) => {
  return (
    <div className="max-w-[1550px] mx-auto">
      <h1 className="text-3xl font-semibold text-center mt-20 mb-5">
        Pause Projects
      </h1>
      <table className="w-full divide-y divide-gray-200">
        <thead className="bg-[#5C2081] text-[#fff] h-16">
          <tr className="">
            <th
              scope="col"
              className="px-14 py-3 text-left  font-medium uppercase tracking-wider"
            >
              Project Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left  font-medium uppercase tracking-wider"
            >
              IR%
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left  font-medium uppercase tracking-wider"
            >
              LOI
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left  font-medium uppercase tracking-wider"
            >
              Scope
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left font-medium uppercase tracking-wider"
            >
              Achieved
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left font-medium uppercase tracking-wider"
            >
              Remaining
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left font-medium uppercase tracking-wider"
            >
              Project Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y-4 divide-gray-200">
          {projects.map((project) => (
            <tr key={project.name} className="whitespace-nowrap">
              <td className="px-14 py-4">{project.name}</td>
              <td className="px-6 py-4">{project.ir}</td>
              <td className="px-6 py-4">{project.loi}</td>
              <td className="px-10 py-4">{project.scope}</td>
              <td className="px-12 py-4">{project.achieved}</td>
              <td className="px-14 py-4">{project.remaining}</td>
              <td className="px-8 py-4">
                <DropDown value1="Live" value2="Close" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PauseProjectComponent;
