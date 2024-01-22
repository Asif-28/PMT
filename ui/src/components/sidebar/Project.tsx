"use client";
import React, { useState } from "react";
import "../../app/globals.css";
import { useRouter } from "next/navigation";
import axios from "axios";
import { projectStatusList } from "../data/data";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { options } from "../data/data";
interface FormData {
  projectName: string;
  projectCode: string;
  projectManager: string;
  clientName: string;
  clientProjectManager: string;
  incidenceRate: string;
  loi: string;
  scope: number;
  targetDescription: string;
  onlineOffline: string;
  billingComments: string;
  securityCheck: boolean;
}

const Form: React.FC = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    projectName: "",
    projectCode: "",
    projectManager: "",
    clientName: "",
    clientProjectManager: "",
    incidenceRate: "",
    loi: "",
    scope: 0,
    targetDescription: "",
    onlineOffline: "",
    billingComments: "",
    securityCheck: false,
  });

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<String | null>(null);
  const [methodology, setMethodology] = useState<String>("");
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [isOpenStatus, setIsOpenStatus] = useState(false);

  const handleChange = (event: any) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: any) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleDivClick = (divName: any) => {
    setMethodology(divName);
  };

  const handleOptionProjectStatus = (i: string) => {
    setSelectedStatus(i);
    setIsOpenStatus(false);
  };
  const handleToggleProjectStatus = () => {
    setIsOpenStatus(!isOpenStatus);
  };
  const handleCheckSecurityClick = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      securityCheck: !prevFormData.securityCheck,
    }));
  };
  const validateForm = () => {
    // Check if any field is empty
    if (
      !formData.projectName ||
      !formData.projectCode ||
      !formData.projectManager ||
      !formData.clientProjectManager ||
      !formData.incidenceRate ||
      !formData.loi ||
      !formData.scope ||
      !selectedOption ||
      !formData.targetDescription ||
      !selectedStatus ||
      !formData.onlineOffline ||
      !formData.billingComments
    ) {
      toast.error("Input all the fields");

      return false;
    }
    const incidenceRateRegex = /^[0-9]+$/;
    const loiRegex = /^[0-9]+$/;
    if (
      !incidenceRateRegex.test(formData.incidenceRate) ||
      !loiRegex.test(formData.loi)
    ) {
      toast.error(
        "Incidence rate and loi should contain positive numbers only"
      );
      return false;
    }
    // Check if incidenceRate is a number in the range 1-100
    const incidenceRate = parseFloat(formData.incidenceRate);
    if (isNaN(incidenceRate) || incidenceRate < 1 || incidenceRate > 100) {
      toast.error("Please enter a valid incidence rate between 1 and 100");
      return false;
    }

    // Check if loi is a positive number
    const loi = parseFloat(formData.loi);
    if (isNaN(loi) || loi <= 0) {
      toast.error("Please enter a valid loi ");

      return false;
    }

    return true;
  };
  // console.log(formData.securityCheck);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const {
      projectName,
      projectCode,
      projectManager,
      clientName,
      clientProjectManager,
      incidenceRate,
      loi,
      scope,
      targetDescription,
      onlineOffline,
      billingComments,
      securityCheck,
    } = formData;
    try {
      if (validateForm()) {
        const { data } = await axios.post(
          `${baseUrl}project/create`,
          {
            project_name: projectName,
            project_code: projectCode,
            project_manager: projectManager,
            client_name: clientName,
            client_project_manager: clientProjectManager,
            incidence_rate: incidenceRate,
            loi: loi,
            scope: scope,
            target: selectedOption,
            target_description: targetDescription,
            status: selectedStatus,
            online: onlineOffline,
            methodology: methodology,
            billing_comments: billingComments,
            security_check: securityCheck,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        // console.log(data.level);
        toast.success("Project Created Successfully");
        if (data.status_code === 200) {
          setFormData({
            projectName: "",
            projectCode: "",
            projectManager: "",
            clientName: "",
            clientProjectManager: "",
            incidenceRate: "",
            loi: "",
            scope: 0,
            targetDescription: "",
            onlineOffline: "",
            billingComments: "",
            securityCheck: false,
          });
          setSelectedStatus(null);
          setMethodology("");
          setSelectedOption(null);
        }
      }
      // Handle form submission logic here
    } catch (error: any) {
      {
        error.message === "Request failed with status code 400"
          ? toast.error("Enter Unique Project Key")
          : toast.error("Error in Submitting");
      }
    }
  };

  return (
    <main className="section">
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <h2 className="text-2xl font-semibold text-[#000]">Project Creation</h2>
      <div className=" bg-white pl-5 pr-2 sm:pl-6 sm:pr-16 py-12 rounded-3xl mt-2 sm:mt-4  ">
        <form className="text-[14px] sm:text-[15px]" onSubmit={handleSubmit}>
          <h2 className="mb-10">Enter the following details</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="mb-4">
              <label
                htmlFor="projectName"
                className="block text-gray-500 font-medium mb-4"
              >
                Project Name *
              </label>
              <input
                required
                type="text"
                id="projectName"
                name="projectName"
                value={formData.projectName}
                onChange={handleChange}
                placeholder="Enter your project Name "
                className=" appearance-none font-light border border-gray-500 rounded-xl w-full py-4 px-4 text-gray-700 leading-tight focus:outline-[#392467] focus:shadow-outline"
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
                required
                type="text"
                id="projectCode"
                name="projectCode"
                value={formData.projectCode}
                onChange={handleChange}
                placeholder="Enter your project Code "
                className=" appearance-none font-light border border-gray-500 rounded-xl w-full py-4 px-4 text-gray-700 leading-tight focus:outline-[#392467] focus:shadow-outline"
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
                required
                type="text"
                id="projectManager"
                name="projectManager"
                value={formData.projectManager}
                onChange={handleChange}
                placeholder="Enter your project Manager "
                className=" appearance-none font-light border border-gray-500 rounded-xl w-full py-4 px-4 text-gray-700 leading-tight focus:outline-[#392467] focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="clientName"
                className="block text-gray-500 font-medium mb-4"
              >
                Client Name *
              </label>
              <input
                required
                type="text"
                id="clientName"
                name="clientName"
                value={formData.clientName}
                onChange={handleChange}
                placeholder="Enter your project Name "
                className=" appearance-none font-light border border-gray-500 rounded-xl w-full py-4 px-4 text-gray-700 leading-tight focus:outline-[#392467] focus:shadow-outline"
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
                required
                type="text"
                id="clientProjectManager"
                name="clientProjectManager"
                value={formData.clientProjectManager}
                onChange={handleChange}
                placeholder="Enter your Client Project Manager "
                className=" appearance-none font-light border border-gray-500 rounded-xl w-full py-4 px-4 text-gray-700 leading-tight focus:outline-[#392467]focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="clientProjectManager"
                className="block text-gray-500 font-medium mb-4"
              >
                Incidence Rate *
              </label>
              <input
                required
                type="text"
                id="incidenceRate"
                name="incidenceRate"
                // min="0"
                // max="100"
                // step="1"
                value={formData.incidenceRate}
                onChange={handleChange}
                placeholder="Enter your Incidence Rate "
                className=" appearance-none font-light border border-gray-500 rounded-xl w-full py-4 px-4 text-gray-700 leading-tight focus:outline-[#392467]focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="loi"
                className="block text-gray-500 font-medium mb-4"
              >
                LOI*
              </label>
              <input
                required
                type="text"
                id="loi"
                name="loi"
                value={formData.loi}
                onChange={handleChange}
                placeholder="Enter your LOI "
                className=" appearance-none font-light border border-gray-500 rounded-xl w-full py-4 px-4 text-gray-700 leading-tight focus:outline-[#392467]focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="scope"
                className="block text-gray-500 font-medium mb-4"
              >
                Scope *
              </label>
              <input
                required
                type="number"
                id="scope"
                name="scope"
                min={0}
                value={formData.scope}
                onChange={handleChange}
                placeholder="Enter your Scope "
                className=" appearance-none font-light border border-gray-500 rounded-xl w-full py-4 px-4 text-gray-700 leading-tight focus:outline-[#392467]focus:shadow-outline"
              />
            </div>

            <div className="relative inline-block text-left z-40 mb-4">
              <label
                htmlFor="target"
                className="block text-gray-500 font-medium mb-4"
              >
                Target *
              </label>
              <div>
                <span className="rounded-md shadow-sm">
                  <button
                    onClick={handleToggle}
                    type="button"
                    className=" bg-white inline-flex justify-center w-full  text-sm appearance-none border font-light border-gray-500 rounded-xl py-4 px-4 text-gray-700 leading-tight focus:outline-[#392467] focus:shadow-outline"
                  >
                    {selectedOption ? selectedOption : "B2B"}
                  </button>
                </span>
              </div>

              {isOpen && (
                <div className=" absolute  mt-2 w-full rounded-3xl shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div
                    className="py-1 w-full px-3 bg-white "
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    {options.map((option, index) => (
                      <div
                        key={index}
                        onClick={() => handleOptionClick(option)}
                        className="block px-4 py-4 text-sm text-gray-700 w-full hover:bg-[#a367b1] hover:text-[#392467] font-semibold  text-left  my-2 rounded-xl"
                        role="menuitem"
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="relative inline-block text-left z-40 mb-4">
              <label
                htmlFor="selectVendor"
                className="block text-gray-500 font-medium mb-4"
              >
                Project Status *
              </label>
              <div>
                <span className="rounded-md shadow-sm">
                  <button
                    onClick={handleToggleProjectStatus}
                    type="button"
                    className="inline-flex justify-center  w-full  text-sm appearance-none border font-light border-gray-500 rounded-xl py-4 px-4 text-gray-700 leading-tight focus:outline-[#392467] focus:shadow-outline"
                  >
                    {selectedStatus ? selectedStatus : "Choose from dropdown"}
                  </button>
                </span>
              </div>

              {isOpenStatus && (
                <div className="absolute mt-2 w-full rounded-3xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 overflow-y-auto max-h-60">
                  <div
                    className="py-1 w-full px-3 bg-white"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    {projectStatusList.map((list, index) => (
                      <div
                        key={index}
                        onClick={() => handleOptionProjectStatus(list)}
                        className="block px-4 py-4 text-sm text-gray-700 w-full hover:bg-[#a367b1] hover:text-[#392467] font-semibold  text-left  my-2 rounded-xl"
                        role="menuitem"
                      >
                        {list}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="targetDescription"
                className="block text-gray-500 font-medium mb-4"
              >
                Target Description *
              </label>
              <textarea
                required
                id="targetDescription"
                name="targetDescription"
                value={formData.targetDescription}
                onChange={handleChange}
                placeholder="Target Description "
                className=" appearance-none font-light h-40 border border-gray-500 rounded-xl w-full py-4 px-4 text-gray-700 leading-tight focus:outline-[#392467] focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-500 font-medium mb-4">
                Methodology
              </label>
              <div className="mt-2">
                <label className="inline-flex items-center border border-gray-500 px-[3.8rem] py-5 lg:px-20  lg:py-6 rounded-2xl lg:ml-1">
                  <input
                    required
                    type="radio"
                    name="onlineOffline"
                    value="online"
                    checked={formData.onlineOffline === "online"}
                    onChange={handleChange}
                    className="form-radio radio-container  "
                  />
                  <span className="ml-2">Online</span>
                </label>
                <label className="inline-flex items-center  mt-2 xl:mt-0 lg:ml-1 xl:ml-4 border border-gray-500 px-[3.8rem] py-5 lg:px-20  lg:py-6 rounded-2xl">
                  <input
                    type="radio"
                    name="onlineOffline"
                    value="offline"
                    checked={formData.onlineOffline === "offline"}
                    onChange={handleChange}
                    className="form-radio radio-container "
                  />
                  <span className="ml-2">Offline</span>
                </label>
              </div>
              {formData.onlineOffline === "offline" && (
                <div className="flex flex-col justify-start items-start sm:flex-row gap-2 sm:items-center cursor-pointer  ">
                  <div
                    onClick={() => handleDivClick("CATI")}
                    className={`${
                      methodology === "CATI"
                        ? "bg-[#a367b1] text-[#392467]"
                        : "bg-white text-gray-500"
                    } border border-gray-500 w-36 px-10 py-5 mt-2 rounded-2xl flex items-center justify-center cursor-pointer`}
                  >
                    CATI
                  </div>
                  <div
                    onClick={() => handleDivClick("Recruitment")}
                    className={`${
                      methodology === "Recruitment"
                        ? "bg-[#a367b1] text-[#392467]"
                        : "bg-white text-gray-500"
                    } border border-gray-500 w-36 px-10 py-5 mt-2 rounded-2xl flex items-center justify-center cursor-pointer`}
                  >
                    Recruitment
                  </div>
                  <div
                    onClick={() => handleDivClick("IGD/IDI")}
                    className={`${
                      methodology === "IGD/IDI"
                        ? "bg-[#a367b1] text-[#392467]"
                        : "bg-white text-gray-500"
                    } border border-gray-500 w-36 px-10 py-5 mt-2 rounded-2xl flex items-center justify-center cursor-pointer`}
                  >
                    IGD/IDI
                  </div>
                </div>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="billingComments"
                className="block text-gray-500 font-medium mb-4"
              >
                Billing Comments *
              </label>
              <input
                required
                type="text"
                id="billingComments"
                name="billingComments"
                value={formData.billingComments}
                onChange={handleChange}
                placeholder="Enter your billing comments"
                className=" appearance-none font-light border border-gray-500 rounded-xl w-full py-4 px-4 text-gray-700 leading-tight focus:outline-[#392467] focus:shadow-outline"
              />
            </div>
            <div className="mb-4 mt-6 ">
              <div
                onClick={handleCheckSecurityClick}
                className={`${
                  formData.securityCheck === true
                    ? "bg-[#a367b1] text-[#392467]"
                    : "bg-white text-gray-500"
                } border border-gray-500 w-48 px-10 py-5 mt-2 rounded-2xl flex items-center justify-center cursor-pointer `}
              >
                Security Check
              </div>
            </div>
          </div>

          {/* ... other fields in the same format ... */}

          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-[#000000] font-semibold text-base sm:text-[18px] w-[12rem] sm:w-[16.5rem] px-10 py-4 sm:px-16 sm:py-6 text-white rounded-lg mt-10 sm:mt-20"
            >
              Create Project
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Form;
