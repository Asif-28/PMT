import React, { useState, FormEvent, ChangeEvent } from "react";
import { countrys } from "../data/data";

interface FormData {
  projectCode: string;
  inputField: string;
  countryCode: string;
  scope: string;
  country: string;
  testLink: string;
  liveLink: string;
}
const ClientSetup: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    projectCode: "",
    inputField: "",
    countryCode: "",
    scope: "",
    country: "",
    testLink: "",
    liveLink: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log(formData); // Replace with actual submission logic
  };

  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [isOpenCountry, setIsOpenCountry] = useState(false);
  const handleOptionCountry = (country: string) => {
    setSelectedCountry(country);
    setIsOpenCountry(false);
  };
  const handleToggleCountry = () => {
    setIsOpenCountry(!isOpenCountry);
  };

  return (
    <main>
      <h2 className="text-2xl font-semibold text-[#000]">Client Setup</h2>
      <div className="section bg-white pl-5 pr-2 sm:pl-6 sm:pr-16 py-12 rounded-3xl mt-2 sm:mt-4  ">
        <form className="text-[14px] sm:text-[15px] " onSubmit={handleSubmit}>
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
                className=" appearance-none  xl:min-w-[480px] font-light border border-gray-500 rounded-xl sm:w-full py-4 px-4 text-gray-700 leading-tight focus:outline-[#392467] focus:shadow-outline"
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
                    className="inline-flex justify-center min-w-[15.5rem] sm:w-full  text-sm appearance-none  xl:min-w-[480px] border font-light border-gray-500 rounded-xl py-4 px-4 text-gray-700 leading-tight focus:outline-[#392467] focus:shadow-outline"
                  >
                    {selectedCountry ? selectedCountry : "INDIA"}
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
                    {countrys.map((country, index) => (
                      <div
                        key={index}
                        onClick={() => handleOptionCountry(country)}
                        className="block px-4 py-4 text-sm text-gray-700 sm:w-full hover:bg-[#a367b1] hover:text-[#392467] font-semibold  text-left  my-2 rounded-xl"
                        role="menuitem"
                      >
                        {country}
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
                className=" appearance-none  xl:min-w-[480px] font-light border border-gray-500 rounded-xl sm:w-full py-4 px-4 text-gray-700 leading-tight focus:outline-[#392467] focus:shadow-outline"
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
                className=" appearance-none  xl:min-w-[480px] font-light border border-gray-500 rounded-xl sm:w-full py-4 px-4 text-gray-700 leading-tight focus:outline-[#392467]focus:shadow-outline"
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
                className=" appearance-none  xl:min-w-[480px] font-light border border-gray-500 rounded-xl sm:w-full py-4 px-4 text-gray-700 leading-tight focus:outline-[#392467]focus:shadow-outline"
              />
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
    </main>
  );
};

export default ClientSetup;
