"use client";
import React, { useState } from "react";

const Form = () => {
  const [formData, setFormData] = useState({
    projectName: "",
    projectCode: "",
    projectManager: "",
    clientProjectManager: "",
    incidenceRate: "",
    loi: "",
    scope: "",
    target: "",
    targetDescription: "",
    onlineOffline: "",
    billingComments: "",
  });

  const handleChange = (event: any) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log(formData); // Replace with actual submission logic
  };

  return (
    <main>
      <h2 className="text-2xl font-semibold text-[#000]">Project Creation</h2>
      <div className="section bg-white pl-10 pr-16 py-12 rounded-3xl mt-4">
        <form className="text-[15px]" onSubmit={handleSubmit}>
          <h2 className="mb-10">Enter the following details</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="mb-4">
              <label
                htmlFor="projectName"
                className="block text-gray-500 font-medium mb-4"
              >
                Project Name *
              </label>
              <input
                type="text"
                id="projectName"
                name="projectName"
                value={formData.projectName}
                onChange={handleChange}
                placeholder="Enter your project Name "
                className=" appearance-none  xl:min-w-[480px] font-light border border-gray-500 rounded-xl w-full py-4 px-4 text-gray-700 leading-tight focus:outline-blue-900 focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="projectCode"
                className="block text-gray-500 font-medium mb-4"
              >
                Project Code *
              </label>
              <input
                type="text"
                id="projectCode"
                name="projectCode"
                value={formData.projectCode}
                onChange={handleChange}
                placeholder="Enter your project Code "
                className=" appearance-none  xl:min-w-[480px] font-light border border-gray-500 rounded-xl w-full py-4 px-4 text-gray-700 leading-tight focus:outline-blue-900 focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="projectManager"
                className="block text-gray-500 font-medium mb-4"
              >
                Project Manager *
              </label>
              <input
                type="text"
                id="projectManager"
                name="projectManager"
                value={formData.projectManager}
                onChange={handleChange}
                placeholder="Enter your project Manager "
                className=" appearance-none  xl:min-w-[480px] font-light border border-gray-500 rounded-xl w-full py-4 px-4 text-gray-700 leading-tight focus:outline-blue-900 focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="clientProjectManager"
                className="block text-gray-500 font-medium mb-4"
              >
                Client Project Manager *
              </label>
              <input
                type="text"
                id="clientProjectManager"
                name="clientProjectManager"
                value={formData.clientProjectManager}
                onChange={handleChange}
                placeholder="Enter your Client Project Manager "
                className=" appearance-none  xl:min-w-[480px] font-light border border-gray-500 rounded-xl w-full py-4 px-4 text-gray-700 leading-tight focus:outline-blue-900 focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor=" incidenceRate"
                className="block text-gray-500 font-medium mb-4"
              >
                Incidence Rate *
              </label>
              <input
                type="text"
                id=" incidenceRate"
                name=" incidenceRate"
                value={formData.incidenceRate}
                onChange={handleChange}
                placeholder="Enter your Incidence Rate "
                className=" appearance-none  xl:min-w-[480px] font-light border border-gray-500 rounded-xl w-full py-4 px-4 text-gray-700 leading-tight focus:outline-blue-900 focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor=" loi"
                className="block text-gray-500 font-medium mb-4"
              >
                LOI *
              </label>
              <input
                type="text"
                id=" loi"
                name=" loi"
                value={formData.loi}
                onChange={handleChange}
                placeholder="Enter your LOI "
                className=" appearance-none  xl:min-w-[480px] font-light border border-gray-500 rounded-xl w-full py-4 px-4 text-gray-700 leading-tight focus:outline-blue-900 focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor=" scope"
                className="block text-gray-500 font-medium mb-4"
              >
                Scope *
              </label>
              <input
                type="text"
                id=" scope"
                name=" scope"
                value={formData.scope}
                onChange={handleChange}
                placeholder="Enter your Scope"
                className=" appearance-none  xl:min-w-[480px] border font-light border-gray-500 rounded-xl w-full py-4 px-4 text-gray-700 leading-tight focus:outline-blue-900 focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="target"
                className="block text-gray-500 font-medium mb-4"
              >
                Target
              </label>
              <select
                id="target"
                name="target"
                value={formData.target}
                onChange={handleChange}
                className="
      bg-white
      appearance-none  xl:min-w-[480px] font-semibold border border-gray-500 rounded-xl w-full py-4 px-4 text-gray-700 leading-tight focus:outline-blue-900 focus:shadow-outline
    "
              >
                <option className="" value="">
                  B2B
                </option>
                <option value="a">A</option>
                <option value="b">B</option>
                <option value="c">C</option>
              </select>
            </div>
          </div>

          {/* ... other fields in the same format ... */}

          <div className="mb-4">
            <label
              htmlFor="targetDescription"
              className="block text-gray-500 font-medium mb-4"
            >
              Target Description *
            </label>
            <textarea
              id="targetDescription"
              name="targetDescription"
              value={formData.targetDescription}
              onChange={handleChange}
              placeholder="Enter your LOI "
              className=" appearance-none font-light  xl:max-w-[480px] h-40 border border-gray-500 rounded-xl w-full py-4 px-4 text-gray-700 leading-tight focus:outline-blue-900 focus:shadow-outline"
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="mb-4">
              <label className="block text-gray-500 font-medium mb-4">
                Methodology
              </label>
              <div className="mt-2">
                <label className="inline-flex items-center border border-gray-500 px-20 py-6 rounded-2xl">
                  <input
                    type="radio"
                    name="onlineOffline"
                    value="online"
                    checked={formData.onlineOffline === "online"}
                    onChange={handleChange}
                    className="form-radio border "
                  />
                  <span className="ml-2">Online</span>
                </label>
                <label className="inline-flex items-center ml-4 border border-gray-500 px-20 py-6 rounded-2xl">
                  <input
                    type="radio"
                    name="onlineOffline"
                    value="offline"
                    checked={formData.onlineOffline === "offline"}
                    onChange={handleChange}
                    className="form-radio"
                  />
                  <span className="ml-2">Offline</span>
                </label>
              </div>
              <div className="flex gap-2 items-center ">
                <div className="border border-gray-500 w-36 px-10 py-5 mt-2 rounded-2xl">
                  CATI
                </div>
                <div className="border border-gray-500 w-36 px-10 py-5 mt-2 rounded-2xl">
                  Recruitment
                </div>
                <div className="border border-gray-500 w-36 px-10 py-5 mt-2 rounded-2xl">
                  IGD/IDI
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="billingComments"
                className="block text-gray-500 font-medium mb-4"
              >
                Billing Comments *
              </label>
              <input
                type="text"
                id="billingComments"
                name="billingComments"
                value={formData.billingComments}
                onChange={handleChange}
                placeholder="Enter your billing comments"
                className=" appearance-none  xl:min-w-[480px] font-light border border-gray-500 rounded-xl w-full py-4 px-4 text-gray-700 leading-tight focus:outline-blue-900 focus:shadow-outline"
              />
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button className="bg-[#000000] font-semibold text-[18px] w-[16.5rem] px-12 py-6 text-white rounded-lg mt-20">
              Create Project
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Form;
