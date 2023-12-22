import React, { useState, FormEvent, ChangeEvent } from "react";
import { countrys } from "../data/data";

interface FormData {
  projectCode: string;
  vendorCode: string;
  pause: string;
  scope: string;
  complete: string;
  terminate: string;
  overQuota: string;
}
const VendorSetup: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    projectCode: "",
    vendorCode: "",
    pause: "",
    scope: "",
    complete: "",
    terminate: "",
    overQuota: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log(formData); // Replace with actual submission logic
  };

  const [selectedVendor, setSelectedVendor] = useState<string | null>(null);
  const [isOpenVendor, setIsOpenVendor] = useState(false);
  const handleOptionVendor = (country: string) => {
    setSelectedVendor(country);
    setIsOpenVendor(false);
  };
  const handleToggleVendor = () => {
    setIsOpenVendor(!isOpenVendor);
  };
  const vendors = ["a", "b", "c", "d"];
  return (
    <main>
      <h2 className="text-2xl font-semibold text-[#000]">Vendor Setup</h2>
      <div className="section bg-white pl-5 pr-2 sm:pl-6 sm:pr-16 py-12 rounded-3xl mt-2 sm:mt-4  ">
        <form className="text-[15px] " onSubmit={handleSubmit}>
          <h2 className="mb-10">Enter the following details</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                className=" appearance-none  xl:min-w-[480px] font-light border border-gray-500 rounded-xl sm:w-full py-4 px-4 text-gray-700 leading-tight focus:outline-[#392467] focus:shadow-outline"
              />
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
                className=" appearance-none  xl:min-w-[480px] font-light border border-gray-500 rounded-xl sm:w-full py-4 px-4 text-gray-700 leading-tight focus:outline-[#392467] focus:shadow-outline"
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
                    className="inline-flex justify-center min-w-[16.7rem] sm:w-full  text-sm appearance-none  xl:min-w-[480px] border font-light border-gray-500 rounded-xl py-4 px-4 text-gray-700 leading-tight focus:outline-[#392467] focus:shadow-outline"
                  >
                    {selectedVendor ? selectedVendor : "Choose from dropdown"}
                  </button>
                </span>
              </div>

              {isOpenVendor && (
                <div className="absolute mt-2 sm:w-full rounded-3xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 overflow-y-auto max-h-60">
                  <div
                    className="py-1 w-full px-3 bg-white"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    {vendors.map((Vendor, index) => (
                      <div
                        key={index}
                        onClick={() => handleOptionVendor(Vendor)}
                        className="block px-4 py-4 text-sm text-gray-700 sm:w-full hover:bg-[#a367b1] hover:text-[#392467] font-semibold  text-left  my-2 rounded-xl"
                        role="menuitem"
                      >
                        {Vendor}
                      </div>
                    ))}
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
                type="text"
                id="scope"
                name="scope"
                value={formData.scope}
                onChange={handleChange}
                placeholder="Enter your Scope "
                className=" appearance-none  xl:min-w-[480px] font-light border border-gray-500 rounded-xl sm:w-full py-4 px-4 text-gray-700 leading-tight focus:outline-[#392467]focus:shadow-outline"
              />
            </div>
          </div>
          <div className="grid grid-cols-1">
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
                className=" appearance-none  xl:min-w-[480px] font-light border border-gray-500 rounded-xl sm:w-full py-4 px-4 text-gray-700 leading-tight focus:outline-[#392467]focus:shadow-outline"
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
                className=" appearance-none  xl:min-w-[480px] font-light border border-gray-500 rounded-xl sm:w-full py-4 px-4 text-gray-700 leading-tight focus:outline-[#392467]focus:shadow-outline"
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
                className=" appearance-none  xl:min-w-[480px] font-light border border-gray-500 rounded-xl sm:w-full py-4 px-4 text-gray-700 leading-tight focus:outline-[#392467]focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-500 font-medium mb-4">
                Quick Action *
              </label>
              <div className="mt-2">
                <label className="inline-flex items-center border border-gray-500 px-20 py-6 rounded-2xl">
                  <input
                    required
                    type="radio"
                    name="pause"
                    value="pauseVendor"
                    checked={formData.pause === "pauseVendor"}
                    onChange={handleChange}
                    className="form-radio radio-container  "
                  />
                  <span className="ml-2 text-gray-500">Pause Vendor</span>
                </label>
                <label className="inline-flex items-center  mt-2 sm:mt-0 sm:ml-4 border border-gray-500 px-20 py-6 rounded-2xl">
                  <input
                    type="radio"
                    name="pause"
                    value="pauseall"
                    checked={formData.pause === "pauseall"}
                    onChange={handleChange}
                    className="form-radio radio-container "
                  />
                  <span className="ml-2 text-gray-500">Pause All Vendor</span>
                </label>
              </div>
            </div>
          </div>

          {/* ... other fields in the same format ... */}

          <div className="flex items-center justify-center">
            <button
              onSubmit={handleSubmit}
              className="bg-[#000000] font-semibold text-[18px] w-[16.5rem] px-12 py-6 text-white rounded-lg mt-20"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default VendorSetup;
