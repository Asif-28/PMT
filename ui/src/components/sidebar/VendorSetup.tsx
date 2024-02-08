import axios from "axios";
import Link from "next/link";
import React, { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { VendorProjectCodeStore } from "@/store/VendorProjectCode";
import UseProjectCodeList from "../../hooks/ProjectCodeList";
import UseVendorListData from "../../hooks/VendorList";
import { VendorFormData as FormData } from "../../utils/types";
import { VendorListApiResponse } from "../../utils/types";

const VendorSetup: React.FC = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const [formData, setFormData] = useState<FormData>({
    vendorCode: "",
    pauseVendor: false,
    scope: 0,
    complete: "",
    terminate: "",
    overQuota: "",
  });

  const [selectedVendor, setSelectedVendor] = useState<string | null>(null);
  const [isOpenVendor, setIsOpenVendor] = useState<boolean>(false);
  const [loadingVendor, setLoadingVendor] = useState<boolean>(true);
  const [suggestedProjectCode, setSuggestedProjectCode] = useState<string[]>(
    []
  );
  const [vendors, setVendors] = useState<VendorListApiResponse[] | null>(null);
  const [showVendors, setShowVendors] = useState<boolean>(false);

  // Use the store created for the vendor project code
  const VendorProjectCode = VendorProjectCodeStore(
    (state: any) => state.VendorProjectCode
  );
  const updateVendorProjectCode = VendorProjectCodeStore(
    (state: any) => state.updateVendorProjectCode
  );

  // use the custom hook to call the list of vendors data
  const { apiVendorData, loadingData } = UseVendorListData();

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
      updateVendorProjectCode({ ProjectCode: value });

      filterProjectCodes(value);
    }
  };

  const { list, loading } = UseProjectCodeList(VendorProjectCode);

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

  const handleOptionVendor = (i: string) => {
    setSelectedVendor(i);
    setIsOpenVendor(false);
  };
  const handleToggleVendor = () => {
    setIsOpenVendor(!isOpenVendor);
  };

  const validateForm = () => {
    // Check if any field is empty
    if (
      !VendorProjectCode.ProjectCode ||
      !formData.vendorCode ||
      !formData.scope ||
      !formData.complete ||
      !formData.terminate ||
      !formData.overQuota
    ) {
      toast.error("Fill the necessary fields");
      return false;
    }
    return true;
  };
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    event.preventDefault();
    const { vendorCode, pauseVendor, scope, complete, terminate, overQuota } =
      formData;
    try {
      if (validateForm()) {
        const { data } = await axios.post(
          `${baseUrl}project_vendor/create`,
          {
            project_code: VendorProjectCode.ProjectCode,
            vendor_code: vendorCode,
            scope: scope,
            complete: complete,
            terminate: terminate,
            over_quota: overQuota,
            pause_vendor: pauseVendor,
            vendor_name: selectedVendor,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        toast.success("Vendor Created Successfully");
        if (data.status_code === 200) {
          setFormData({
            vendorCode: "",
            pauseVendor: false,
            scope: 0,
            complete: "",
            terminate: "",
            overQuota: "",
          });
          updateVendorProjectCode({ ProjectCode: "" });
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
  // fetch all the vendor list
  useEffect(() => {
    async function getAllVendors() {
      try {
        const vendorListResponse = await fetch(
          "http://127.0.0.1:8000/vendor/list",
          {
            method: "GET",
          }
        );
        const vendorListData = await vendorListResponse.json();
        setVendors(vendorListData);
        setLoadingVendor(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getAllVendors();
  }, []);

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
      <h2 className="text-2xl font-semibold text-[#000] ">Vendor Setup</h2>
      <div className="section bg-white pl-5 pr-2 sm:pl-6 sm:pr-16 py-12 rounded-3xl mt-2 sm:mt-4  ">
        <form className="text-[14px] sm:text-[15px] " onSubmit={handleSubmit}>
          <h2 className="mb-10">Enter the following details</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="mb-4 relative">
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
                autoComplete="off"
                value={VendorProjectCode.ProjectCode}
                onChange={handleChange}
                placeholder="Enter your project Code "
                className=" appearance-none font-light border border-gray-500 rounded-xl w-full py-4 px-4 text-gray-700 leading-tight focus:outline-[#392467] focus:shadow-outline"
              />
              {VendorProjectCode.ProjectCode && (
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
                        <div className="absolute z-50 mt-2 sm:w-full rounded-3xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 overflow-y-auto max-h-60">
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
                                  updateVendorProjectCode({
                                    ProjectCode: code,
                                  });

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
                htmlFor="vendorCode"
                className="block text-gray-500 font-medium mb-4"
              >
                Vendor Code *
              </label>
              <input
                required
                type="text"
                id="vendorCode"
                name="vendorCode"
                value={formData.vendorCode}
                onChange={handleChange}
                placeholder="Enter your Input Field"
                className=" appearance-none font-light border border-gray-500 rounded-xl w-full py-4 px-4 text-gray-700 leading-tight focus:outline-[#392467] focus:shadow-outline"
              />
            </div>
            <div className="relative inline-block text-left z-30">
              <label
                htmlFor="selectVendor"
                className="block text-gray-500 font-medium mb-4"
              >
                Select Vendor *
              </label>
              <div>
                <span className="rounded-md shadow-sm">
                  <button
                    onClick={handleToggleVendor}
                    type="button"
                    className="inline-flex justify-center min-w-[15.5rem] w-full  text-sm appearance-none border font-light border-gray-500 rounded-xl py-4 px-4 text-gray-700 leading-tight focus:outline-[#392467] focus:shadow-outline"
                  >
                    {selectedVendor ? selectedVendor : "Choose from dropdown"}
                  </button>
                </span>
              </div>

              {isOpenVendor && (
                <div className="absolute mt-2 w-full rounded-3xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 overflow-y-auto max-h-60">
                  <div
                    className="py-1 w-full px-3 bg-white"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    {loadingVendor ? (
                      // Show loading state if loading is true
                      <div className="block px-4 py-4 text-sm text-gray-700 w-full my-2 rounded-xl">
                        Loading...
                      </div>
                    ) : (
                      // Show the options if loading is false
                      vendors?.map((vendor) => (
                        <div
                          key={vendor.id}
                          onClick={() => handleOptionVendor(vendor.name)}
                          className="block px-4 py-4 text-sm text-gray-700 w-full hover:bg-[#a367b1] hover:text-[#392467] font-semibold text-left my-2 rounded-xl"
                          role="menuitem"
                        >
                          {vendor.name}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
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
                htmlFor="complete"
                className="block text-gray-500 font-medium mb-4"
              >
                Complete *
              </label>
              <input
                required
                type="text"
                id="complete"
                name="complete"
                value={formData.complete}
                onChange={handleChange}
                placeholder="Enter your status "
                className=" appearance-none font-light border border-gray-500 rounded-xl w-full py-4 px-4 text-gray-700 leading-tight focus:outline-[#392467]focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="liveLink"
                className="block text-gray-500 font-medium mb-4"
              >
                Terminate *
              </label>
              <input
                required
                type="text"
                id="terminate"
                name="terminate"
                value={formData.terminate}
                onChange={handleChange}
                placeholder="Enter your status"
                className=" appearance-none font-light border border-gray-500 rounded-xl w-full py-4 px-4 text-gray-700 leading-tight focus:outline-[#392467]focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="overQuota"
                className="block text-gray-500 font-medium mb-4"
              >
                Over Quota*
              </label>
              <input
                required
                type="text"
                id="overQuota"
                name="overQuota"
                value={formData.overQuota}
                onChange={handleChange}
                placeholder="Enter your status"
                className=" appearance-none font-light border border-gray-500 rounded-xl w-full py-4 px-4 text-gray-700 leading-tight focus:outline-[#392467]focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-500 font-medium mb-4">
                Quick Action *
              </label>
              <div className="mt-2 sm:flex gap-3">
                <div
                  onClick={() =>
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      pauseVendor: !prevFormData.pauseVendor,
                    }))
                  }
                  className={`${
                    formData.pauseVendor === true
                      ? "bg-[#a367b1] text-[#392467]"
                      : "bg-white text-gray-500"
                  } border border-gray-500 w-52 px-10 py-5 mt-2 rounded-2xl flex items-center justify-center cursor-pointer`}
                >
                  Pause Vendor
                </div>
              </div>
            </div>
          </div>

          {/* ... other fields in the same format ... */}

          <div className="flex items-center justify-center">
            <button
              onSubmit={handleSubmit}
              className="bg-[#000000] font-semibold text-base sm:text-[18px] w-[12rem] sm:w-[16.5rem] px-10 py-4 sm:px-16 sm:py-6 text-white rounded-lg mt-10 sm:mt-20"
            >
              Add
            </button>
          </div>
        </form>
      </div>

      <div className="pb-12">
        <button
          onClick={() => setShowVendors(!showVendors)}
          className="bg-[#000000] font-semibold text-base sm:text-[18px] w-[12rem] sm:w-[16.5rem] px-10 py-4 sm:px-16 sm:py-6 text-white rounded-lg mt-10 sm:mt-20"
        >
          {showVendors && VendorProjectCode.ProjectCode
            ? "Hide Vendors"
            : "Show Vendors"}
        </button>
      </div>

      {showVendors && VendorProjectCode.ProjectCode ? (
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
                    <th className="px-4 py-4">Vendor Name</th>
                    <th className="px-4 py-4">Vendor Code</th>
                    <th className="px-4 py-4">Scope</th>
                    <th className="px-4 py-4">Complete</th>
                    <th className="px-4 py-4">Terminate</th>
                    <th className="px-4 py-4">Over Quota</th>
                  </tr>
                </thead>

                <tbody>
                  {apiVendorData?.map((item) => (
                    <tr
                      key={item.project_code}
                      className="border-b border-gray-200 "
                    >
                      <td className="px-4 text-center py-6">
                        {item.vendor_code}
                      </td>
                      <td className="px-4 text-center py-6">
                        {item.vendor_name}
                      </td>
                      <td className="px-4 text-center py-6">{item.scope}</td>
                      <td className="px-4 text-center py-6">
                        <Link href={item.complete}>Link</Link>
                      </td>
                      <td className="px-4 text-center py-6">
                        <Link href={item.terminate}>Link</Link>
                      </td>
                      <td className="px-4 text-center py-6">
                        <Link href={item.over_quota}>Link</Link>
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
                    <th className="px-2 py-3 text-center">Vendor Name</th>
                    <th className="px-2 py-3 text-center">Vendor Code </th>
                    <th className="px-2 py-3 text-center">Scope</th>
                  </tr>
                </thead>
                <tbody>
                  {apiVendorData?.map((item) => (
                    <tr
                      key={item.project_code}
                      className="border-b border-gray-200 "
                    >
                      <td className="px-3 text-center py-5">
                        {item.vendor_name}
                      </td>
                      <td className="px-3 text-center py-5">
                        {item.vendor_code}
                      </td>
                      <td className="px-3 text-center py-5">{item.scope}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <table className="table-auto w-full mt-8 ">
                <thead>
                  <tr>
                    <th className="px-2 py-3 text-center">Complete</th>
                    <th className="px-2 py-3 text-center">Terminate</th>
                    <th className="px-2 py-3 text-center">Over Quota</th>
                  </tr>
                </thead>
                <tbody>
                  {apiVendorData?.map((item) => (
                    <tr
                      key={item.project_code}
                      className="border-b border-gray-200 "
                    >
                      <td className="px-3 text-center py-5">
                        <Link href={item.complete}>Link </Link>
                      </td>
                      <td className="px-3 text-center py-5">
                        <Link href={item.terminate}>Link </Link>
                      </td>
                      <td className="px-3 text-center py-5">
                        <Link href={item.over_quota}>Link</Link>
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

export default VendorSetup;
