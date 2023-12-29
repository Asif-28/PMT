import React, { useState, FormEvent, ChangeEvent } from "react";

interface FormData {
  vendorName: string;
  vendorEmail: string;
}
const AddNewVendor: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    vendorName: "",
    vendorEmail: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log(formData); // Replace with actual submission logic
  };

  return (
    <main className="section">
      <h2 className="text-2xl font-semibold text-[#000] ">Add New Vendor</h2>
      <div className=" bg-white pl-5 pr-2 sm:pl-6 sm:pr-16 py-12 rounded-3xl mt-2 sm:mt-4  ">
        <form className=" text-[14px] sm:text-[15px] " onSubmit={handleSubmit}>
          <h2 className="mb-10">Enter the following details</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="mb-4">
              <label
                htmlFor="vendorName"
                className="block text-gray-500 font-medium mb-4"
              >
                Vendor Name *
              </label>
              <input
                required
                type="text"
                id="vendorName"
                name="vendorName"
                value={formData.vendorName}
                onChange={handleChange}
                placeholder="Enter Vendor Name "
                className=" appearance-none  xl:min-w-[480px] font-light border border-gray-500 rounded-xl sm:w-full py-4 px-4 text-gray-700 leading-tight focus:outline-[#392467] focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="vendorEmail"
                className="block text-gray-500 font-medium mb-4"
              >
                Vendor Email Id *
              </label>
              <input
                required
                type="text"
                id="vendorEmail"
                name="vendorEmail"
                value={formData.vendorEmail}
                onChange={handleChange}
                placeholder="Enter Vendor Email address "
                className=" appearance-none  xl:min-w-[480px] font-light border border-gray-500 rounded-xl sm:w-full py-4 px-4 text-gray-700 leading-tight focus:outline-[#392467] focus:shadow-outline"
              />
            </div>
          </div>

          {/* ... other fields in the same format ... */}

          <div className="flex items-center justify-center">
            <button
              onSubmit={handleSubmit}
              className="bg-[#000000] font-semibold text-base sm:text-[18px] w-[12rem] sm:w-[16.5rem] px-10 py-4 sm:px-16 sm:py-6 text-white rounded-lg mt-10 sm:mt-20"
            >
              Add Vendor
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default AddNewVendor;
