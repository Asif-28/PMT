import React, { useState, FormEvent, ChangeEvent } from "react";

interface FormData {
  clientName: string;
  clientProjectManager: string;
  email: string;
}
const AddNewClient: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    clientName: "",
    clientProjectManager: "",
    email: "",
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
                placeholder="Enter your client name "
                className=" appearance-none  xl:min-w-[480px] font-light border border-gray-500 rounded-xl sm:w-full py-4 px-4 text-gray-700 leading-tight focus:outline-[#392467] focus:shadow-outline"
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
                placeholder="Enter your Input Field"
                className=" appearance-none  xl:min-w-[480px] font-light border border-gray-500 rounded-xl sm:w-full py-4 px-4 text-gray-700 leading-tight focus:outline-[#392467] focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-500 font-medium mb-4"
              >
                Email Id *
              </label>
              <input
                required
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your Enamil address "
                className=" appearance-none  xl:min-w-[480px] font-light border border-gray-500 rounded-xl sm:w-full py-4 px-4 text-gray-700 leading-tight focus:outline-[#392467]focus:shadow-outline"
              />
            </div>
          </div>

          {/* ... other fields in the same format ... */}

          <div className="flex items-center justify-center">
            <button
              onSubmit={handleSubmit}
              className="bg-[#000000] font-semibold text-[18px] w-[10rem] sm:w-[16.5rem] px-10 py-4 sm:px-16 sm:py-6 text-white rounded-lg mt-10 sm:mt-20"
            >
              Add Client
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default AddNewClient;
