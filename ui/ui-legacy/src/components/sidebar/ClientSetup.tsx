import React, { useState, FormEvent, ChangeEvent } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Link from "next/link";
import { ProjectCodeStore } from "@/store/ProjectCode";
import UseProjectCodeList from "../../hooks/ProjectCodeList";
import UseClientListData from "../../hooks/ClientList";
import { ClientFormData as FormData } from "../../utils/types";
import { countries } from "../../data/data";
import Cookies from "js-cookie";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
axios.defaults.headers.post["X-CSRFToken"] = Cookies.get("csrftoken");
const authorizationToken = localStorage.getItem("Authorization");

const ClientSetup: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    inputField: "",
    countryCode: "",
    scope: 0,
    testLink: "",
    liveLink: "",
    checkcountry: false,
    checkQuota: false,
  });

  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [isOpenCountry, setIsOpenCountry] = useState(false);

  const [showClients, setShowClients] = useState<boolean>(false);
  const [suggestedProjectCode, setSuggestedProjectCode] = useState<string[]>(
    []
  );

  //Use the Client  Project Code Store

  const ProjectCode = ProjectCodeStore((state: any) => state.ProjectCode);
  const updateProjectCode = ProjectCodeStore(
    (state: any) => state.updateProjectCode
  );

  //Use the custom hook for the calling the project code list
  const { list, loading } = UseProjectCodeList(ProjectCode);

  // call the custom hook to get the list of the client of a particular project code
  const { apiClientData, loadingData } = UseClientListData();
  //  Filter the list of project_code from the api and input to show the list of available  projectcode
  const filterProjectCodes = (enteredCode: string) => {
    const filteredCodesSet = new Set<string>();

    list?.forEach((item: any) => {
      if (item.project_code.includes(enteredCode)) {
        filteredCodesSet.add(item.project_code);
      }
    });

    const filteredCodes = Array.from(filteredCodesSet);

    setSuggestedProjectCode(enteredCode ? filteredCodes : []);
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    if (name === "projectCode" && suggestedProjectCode.includes(value)) {
      // Do not update projectCode if it's in the suggestedProjectCode list
      return;
    }

    setFormData({ ...formData, [name]: value });

    if (name === "projectCode") {
      updateProjectCode({ ProjectCode: value });

      // Call the function to filter project codes when projectCode is being changed
      filterProjectCodes(value);
    }
  };

  const handleOptionCountry = (country: string) => {
    const selectedCountryObject = countries.find((c) => c.name === country);

    if (selectedCountryObject) {
      setSelectedCountry(country);
      setFormData((prevFormData) => ({
        ...prevFormData,
        countryCode: selectedCountryObject.code,
      }));
      setIsOpenCountry(false);
    }
  };

  const handleToggleCountry = () => {
    setIsOpenCountry(!isOpenCountry);
  };

  const handleCheckCountryClick = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      checkcountry: !prevFormData.checkcountry,
    }));
  };
  const handleCheckQuotaClick = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      checkQuota: !prevFormData.checkQuota,
    }));
  };
  const validateForm = () => {
    // Check if any field is empty
    if (
      !ProjectCode.ProjectCode ||
      !formData.inputField ||
      !formData.scope ||
      !formData.liveLink ||
      !formData.testLink ||
      !formData.countryCode ||
      !selectedCountry
    ) {
      toast.error("Fill the necessary fields");
      return false;
    }
    return true;
  };
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const {
      // projectCode,
      inputField,
      countryCode,
      scope,
      testLink,
      liveLink,
      checkcountry,
      checkQuota,
    } = formData;

    try {
      if (validateForm()) {
        const { data } = await axios.post(
          `${baseUrl}project_client/create`,
          {
            project_code: ProjectCode.ProjectCode,
            input_field: inputField,
            country: selectedCountry,
            country_code: countryCode,
            scope: scope,
            test_link: testLink,
            live_link: liveLink,
            country_pause: checkcountry,
            check_quota: checkQuota,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: authorizationToken,
              // "X-CSRFToken": value,
            },
            withCredentials: true,
          }
        );
        toast.success("Client Created Successfully");
        if (data.status_code === 200) {
          setFormData({
            inputField: "",
            countryCode: "",
            scope: 0,
            testLink: "",
            liveLink: "",
            checkcountry: false,
            checkQuota: false,
          });
          setSelectedCountry(null);
          updateProjectCode({ ProjectCode: "" });
        }
      }
      // Handle form submission logic here
    } catch (error: any) {
      {
        error.message === "Request failed with status code 400"
          ? toast.error(error.response.data.detail)
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
      <h2 className="text-2xl font-semibold text-[#000]">Client Setup</h2>
      <div className="section bg-white pl-5 pr-2 sm:pl-6 sm:pr-16 py-12 rounded-3xl mt-2 sm:mt-4  ">
        <form className="text-[14px] sm:text-[15px] " onSubmit={handleSubmit}>
          <h2 className="mb-10">Enter the following details</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="mb-4 relative">
              <label
                htmlFor="projectCode"
                className="block text-gray-500 font-medium mb-4 "
              >
                Project Code *
              </label>
              <input
                required
                type="text"
                id="projectCode"
                name="projectCode"
                autoComplete="off"
                value={ProjectCode.ProjectCode}
                onChange={handleChange}
                placeholder="Enter your project Code "
                className=" appearance-none font-light border border-gray-500 rounded-xl w-full py-4 px-4 text-gray-700 leading-tight focus:outline-[#392467] focus:shadow-outline"
              />

              {ProjectCode.ProjectCode && (
                <>
                  {loading ? (
                    <div className="absolute z-50 bg-white shadow-lg my-2 px-4 py-3 text-base text-gray-700 w-full font-semibold text-left rounded-xl  h-48 md:h-60  mt-2 sm:w-full ring-1 ring-black ring-opacity-5 max-h-60">
                      <h3 className="text-center text-gray-900 font-semibold">
                        Loading...
                      </h3>
                    </div>
                  ) : (
                    <>
                      {suggestedProjectCode.length > 0 && (
                        <div className="absolute z-50 mt-2 sm:w-full rounded-3xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 overflow-y-auto max-h-60 w-full">
                          <div
                            className="py-1 w-full px-3 bg-white"
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="options-menu"
                          >
                            {suggestedProjectCode.map((code, index) => (
                              <div
                                key={index}
                                onClick={() => {
                                  updateProjectCode({ ProjectCode: code });

                                  setSuggestedProjectCode([]); // Clear the suggestion list
                                }}
                                className="block px-4 py-4 text-sm text-gray-700 w-full hover:bg-[#a367b1] hover:text-[#392467] font-semibold  text-left  my-2 rounded-xl"
                                role="menuitem"
                              >
                                {code}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="inputField"
                className="block text-gray-500 font-medium mb-4"
              >
                Input Field *
              </label>
              <input
                required
                type="text"
                id="inputField"
                name="inputField"
                value={formData.inputField}
                onChange={handleChange}
                placeholder="Enter your Input Field"
                className=" appearance-none font-light border border-gray-500 rounded-xl w-full py-4 px-4 text-gray-700 leading-tight focus:outline-[#392467] focus:shadow-outline"
              />
            </div>

            <div className="relative inline-block text-left z-30">
              <label
                htmlFor="country"
                className="block text-gray-500 font-medium mb-4"
              >
                Country *
              </label>
              <div>
                <span className="rounded-md shadow-sm">
                  <button
                    onClick={handleToggleCountry}
                    type="button"
                    className="inline-flex justify-center w-full  text-sm appearance-none border font-light border-gray-500 rounded-xl py-4 px-4 text-gray-700 leading-tight focus:outline-[#392467] focus:shadow-outline"
                  >
                    {selectedCountry ? selectedCountry : "Select a Country"}
                  </button>
                </span>
              </div>

              {isOpenCountry && (
                <div className="absolute mt-2 sm:w-full rounded-3xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 overflow-y-auto max-h-60">
                  <div
                    className="py-1 w-full px-3 bg-white"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    {countries.map((country, index) => (
                      <div
                        key={index}
                        onClick={() => handleOptionCountry(country.name)}
                        className="block px-4 py-4 text-sm text-gray-700 w-full hover:bg-[#a367b1] hover:text-[#392467] font-semibold  text-left  my-2 rounded-xl"
                        role="menuitem"
                      >
                        {country.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="countryCode"
                className="block text-gray-500 font-medium mb-4"
              >
                Country Code *
              </label>
              <input
                required
                type="text"
                id="countryCode"
                name="countryCode"
                value={formData.countryCode}
                onChange={handleChange}
                placeholder="Enter your Country Code"
                className=" appearance-none font-light border border-gray-500 rounded-xl w-full py-4 px-4 text-gray-700 leading-tight focus:outline-[#392467] focus:shadow-outline"
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
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div className="mb-4">
              <label
                htmlFor="testLink"
                className="block text-gray-500 font-medium mb-4"
              >
                Test Link *
              </label>
              <input
                required
                type="text"
                id="testLink"
                name="testLink"
                value={formData.testLink}
                onChange={handleChange}
                placeholder="Enter your test Link "
                className=" appearance-none font-light border border-gray-500 rounded-xl w-full py-4 px-4 text-gray-700 leading-tight focus:outline-[#392467]focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="liveLink"
                className="block text-gray-500 font-medium mb-4"
              >
                Live Link *
              </label>
              <input
                required
                type="text"
                id="liveLink"
                name="liveLink"
                value={formData.liveLink}
                onChange={handleChange}
                placeholder="Enter your live Link "
                className=" appearance-none font-light border border-gray-500 rounded-xl w-full py-4 px-4 text-gray-700 leading-tight focus:outline-[#392467]focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-500 font-medium mb-4">
                Quick Action *
              </label>
              <div className="mt-2 md:flex gap-3">
                <div
                  onClick={handleCheckCountryClick}
                  className={`${
                    formData.checkcountry === true
                      ? "bg-[#a367b1] text-[#392467]"
                      : "bg-white text-gray-500"
                  } border border-gray-500 w-48 px-10 py-5 mt-2 rounded-2xl flex items-center justify-center cursor-pointer`}
                >
                  Country Pause
                </div>
                <div
                  onClick={handleCheckQuotaClick}
                  className={`${
                    formData.checkQuota === true
                      ? "bg-[#a367b1] text-[#392467]"
                      : "bg-white text-gray-500"
                  } border border-gray-500 w-48 px-10 py-5 mt-2 rounded-2xl flex items-center justify-center cursor-pointer`}
                >
                  Quota Stop
                </div>
              </div>
            </div>
          </div>

          {/* ... other fields in the same format ... */}

          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-[#000000] font-semibold text-base sm:text-[18px] w-[12rem] sm:w-[16.5rem] px-10 py-4 sm:px-16 sm:py-6 text-white rounded-lg mt-10 sm:mt-20"
            >
              Add
            </button>
          </div>
        </form>
      </div>

      <div className="pb-12">
        <button
          onClick={() => setShowClients(!showClients)}
          className="bg-[#000000] font-semibold text-base sm:text-[18px] w-[12rem] sm:w-[16.5rem] px-10 py-4 sm:px-16 sm:py-6 text-white rounded-lg mt-10 sm:mt-20"
        >
          {showClients && ProjectCode.ProjectCode
            ? "Hide Clients"
            : "Show Clients"}
        </button>
      </div>

      {showClients && ProjectCode.ProjectCode ? (
        loadingData ? (
          // If loading is true, show loading state
          <div className="text-2xl mx-auto ">Loading...</div>
        ) : (
          <>
            {/* For The Desktop Screen view  */}
            <div className="bg-[#fff] px-8 py-6 rounded-3xl mt-6 hidden md:block ">
              <table className="table-auto w-full">
                <thead>
                  <tr>
                    <th className="px-4 py-4">Input</th>
                    <th className="px-4 py-4">Country</th>
                    <th className="px-4 py-4">Country Code</th>
                    <th className="px-4 py-4">Scope</th>
                    <th className="px-4 py-4">Test Link</th>
                    <th className="px-4 py-4">Live Link</th>
                  </tr>
                </thead>

                <tbody>
                  {apiClientData?.map((item) => (
                    <tr
                      key={item.project_code}
                      className="border-b border-gray-200 "
                    >
                      <td className="px-4 text-center py-6">
                        {item.input_field}
                      </td>
                      <td className="px-4 text-center py-6">{item.country}</td>
                      <td className="px-4 text-center py-6">
                        {item.country_code}
                      </td>
                      <td className="px-4 text-center py-6">{item.scope}</td>
                      <td className="px-4 text-center py-6 cursor-pointer">
                        <Link href={item.test_link}>Link</Link>
                      </td>
                      <td className="px-4 text-center py-6 cursor-pointer">
                        <Link href={item.live_link}>Link</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Mobile View */}
            <div className="bg-[#fff] px-2 py-4 rounded-3xl mt-4 md:hidden ">
              <div className="flex items-center justify-between mb-4"></div>

              <table className="table-auto w-full">
                <thead>
                  <tr>
                    <th className="px-2 py-3 text-center">Input</th>
                    <th className="px-2 py-3 text-center">Country</th>
                    <th className="px-2 py-3 text-center">Country Code</th>
                  </tr>
                </thead>
                <tbody>
                  {apiClientData?.map((item) => (
                    <tr
                      key={item.project_code}
                      className="border-b border-gray-200 "
                    >
                      <td className="px-3 text-center py-5">
                        {item.input_field}
                      </td>
                      <td className="px-3 text-center py-5">{item.country}</td>
                      <td className="px-3 text-center py-5">
                        {item.country_code}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <table className="table-auto w-full mt-8 ">
                <thead>
                  <tr>
                    <th className="px-2 py-3 text-center">Scope</th>
                    <th className="px-2 py-3 text-center">Test Link</th>
                    <th className="px-2 py-3 text-center">Live Link</th>
                  </tr>
                </thead>
                <tbody>
                  {apiClientData?.map((item) => (
                    <tr
                      key={item.project_code}
                      className="border-b border-gray-200 "
                    >
                      <td className="px-3 text-center py-5">{item.scope}</td>
                      <td className="px-3 text-center py-5">
                        <Link href={item.test_link}>Link </Link>
                      </td>
                      <td className="px-3 text-center py-5">
                        <Link href={item.live_link}>Link</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )
      ) : null}
    </main>
  );
};

export default ClientSetup;
