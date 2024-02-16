import axios from "axios";
import React, { useState, FormEvent, ChangeEvent } from "react";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";

interface FormData {
  clientName: string;
  clientProjectManager: string;
  email: string;
}

axios.defaults.headers.post["X-CSRFToken"] = Cookies.get("csrftoken");

const AddNewClient: React.FC = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const authorizationToken = localStorage.getItem("Authorization");

  const [formData, setFormData] = useState<FormData>({
    clientName: "",
    clientProjectManager: "",
    email: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const validateForm = () => {
    // Check if any field is empty
    if (
      !formData.clientName ||
      !formData.clientProjectManager ||
      !formData.email
    ) {
      toast.error("Fill the necessary fields");
      return false;
    }
    return true;
  };
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const { clientName, clientProjectManager, email } = formData;

    // Handle form submission logic here
    console.log(formData); // Replace with actual submission logic
    try {
      if (validateForm()) {
        const { data } = await axios.post(
          `${baseUrl}client/create`,
          {
            name: clientName,
            project_manager: clientProjectManager,
            email: email,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: authorizationToken,
            },
            withCredentials: true,
          }
        );
        // console.log(data.level, "success");
        toast.success("Client Created Successfully");
        if (data.status_code === 200) {
          setFormData({
            clientName: "",
            clientProjectManager: "",
            email: "",
          });
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
      <h2 className="text-2xl font-semibold text-[#000]">Add New Client</h2>
      <div className=" bg-white pl-5 pr-2 sm:pl-6 sm:pr-16 py-12 rounded-3xl mt-2 sm:mt-4  ">
        <form className="text-[14px] sm:text-[15px] " onSubmit={handleSubmit}>
          <h2 className="mb-10">Enter the following details</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
                className=" appearance-none  xl:min-w-[480px] font-light border border-gray-500 rounded-xl w-full py-4 px-4 text-gray-700 leading-tight focus:outline-[#392467] focus:shadow-outline"
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
                className=" appearance-none  xl:min-w-[480px] font-light border border-gray-500 rounded-xl w-full py-4 px-4 text-gray-700 leading-tight focus:outline-[#392467] focus:shadow-outline"
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
                placeholder="Enter your Email address "
                className=" appearance-none  xl:min-w-[480px] font-light border border-gray-500 rounded-xl w-full py-4 px-4 text-gray-700 leading-tight focus:outline-[#392467]focus:shadow-outline"
              />
            </div>
          </div>

          {/* ... other fields in the same format ... */}

          <div className="flex items-center justify-center">
            <button
              onSubmit={handleSubmit}
              className="bg-[#000000] font-semibold text-base sm:text-[18px] w-[12rem] sm:w-[16.5rem] px-10 py-4 sm:px-16 sm:py-6 text-white rounded-lg mt-10 sm:mt-20"
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
