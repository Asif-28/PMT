import axios from "axios";
import React, { useState, FormEvent, ChangeEvent } from "react";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

interface FormData {
  projectCode: string;
  qcRemarks: string;
  id: (string | null)[];
}

axios.defaults.headers.post["X-CSRFToken"] = Cookies.get("csrftoken");

const IdReconciliation: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    projectCode: "",
    qcRemarks: "",
    id: [null],
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === "id") {
      // Split the input into an array of strings using commas
      const idArray = event.target.value
        .split(",")
        .map((value) => value.trim());
      setFormData({ ...formData, [event.target.name]: idArray });
    } else {
      setFormData({ ...formData, [event.target.name]: event.target.value });
    }
  };

  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [selectedReasonDisplay, setSelectedReasonDisplay] = useState<
    string | null
  >(null);

  const [isOpenReason, setIsOpenReason] = useState(false);
  const handleOptionReason = (reason: string) => {
    setSelectedReasonDisplay(reason);
    if (reason === "In Survey") {
      setSelectedReason("insurvey");
    } else if (reason === "Complete") {
      setSelectedReason("complete");
    } else if (reason === "Terminate") {
      setSelectedReason("terminate");
    } else if (reason === "Over Quota") {
      setSelectedReason("overquota");
    } else if (reason === "Rejected") {
      setSelectedReason("rejected");
    }
    setIsOpenReason(false);
  };
  const handleToggleReason = () => {
    setIsOpenReason(!isOpenReason);
  };
  const reasons = [
    "insurvey",
    "complete",
    "terminate",
    "overquota",
    "rejected",
  ];
  const reasonDisplay = [
    "In Survey",
    "Complete",
    "Terminate",
    "Over Quota",
    "Rejected",
  ];

  const validateForm = () => {
    // Check if any field is empty
    if (!formData.projectCode || !formData.id || !selectedReason) {
      toast.error("Fill the necessary fields");
      return false;
    }
    return true;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const { projectCode, id, qcRemarks } = formData;
    try {
      if (validateForm()) {
        const { data } = await axios.post(
          `${baseUrl}id_reconciliation/update`,
          {
            status: selectedReason,
            project_code: projectCode,
            ids: id,
            qc_remarks: qcRemarks,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        toast.success("Submitted Successfully");
        if (data.status_code === 200) {
          setFormData({
            projectCode: "",
            qcRemarks: "",
            id: [null],
          });
          setSelectedReason(null);
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
      <h2 className="text-2xl font-semibold text-[#000] ">ID Reconciliation</h2>
      <div className=" bg-white pl-5 pr-2 sm:pl-6 sm:pr-16 py-12 rounded-3xl mt-2 sm:mt-4  ">
        <form className="text-[14px] sm:text-[15px] " onSubmit={handleSubmit}>
          <h2 className="mb-10">Enter the following details</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
                className=" appearance-none   font-light border border-gray-500 rounded-xl w-full py-4 px-4 text-gray-700 leading-tight focus:outline-[#392467] focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="id"
                className="block text-gray-500 font-medium mb-4"
              >
                Paste the ID, to change the status *
              </label>
              <input
                required
                type="text"
                id="id"
                name="id"
                value={formData.id.join(",")} // Join array into comma-separated string
                onChange={handleChange}
                placeholder="Paste ID (comma-separated)"
                className="appearance-none font-light border border-gray-500 rounded-xl w-full py-4 px-4 text-gray-700 leading-tight focus:outline-[#392467] focus:shadow-outline"
              />
            </div>

            <div className="relative inline-block text-left z-30">
              <label
                htmlFor="reason"
                className="block text-gray-500 font-medium mb-4"
              >
                Reason *
              </label>
              <div>
                <span className="rounded-md shadow-sm">
                  <button
                    onClick={handleToggleReason}
                    type="button"
                    className="inline-flex justify-center w-full  text-sm appearance-none  xl:min-w-[480px] border font-light border-gray-500 rounded-xl py-4 px-4 text-gray-700 leading-tight focus:outline-[#392467] focus:shadow-outline"
                  >
                    {selectedReason
                      ? selectedReasonDisplay
                      : "Choose from dropdown"}
                  </button>
                </span>
              </div>

              {isOpenReason && (
                <div className="absolute mt-2 sm:w-full rounded-3xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 overflow-y-auto max-h-60">
                  <div
                    className="py-1 w-full px-3 bg-white"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    {reasonDisplay.map((reason, index) => (
                      <div
                        key={index}
                        onClick={() => handleOptionReason(reason)}
                        className="block px-4 py-4 text-sm text-gray-700 sm:w-full hover:bg-[#a367b1] hover:text-[#392467] font-semibold  text-left  my-2 rounded-xl"
                        role="menuitem"
                      >
                        {reason}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="qcRemarks"
                className="block text-gray-500 font-medium mb-4"
              >
                QC Remarks
              </label>
              <input
                type="text"
                id="qcRemarks"
                name="qcRemarks"
                value={formData.qcRemarks}
                onChange={handleChange}
                placeholder="Enter Remarks "
                className=" appearance-none  xl:min-w-[480px] font-light border border-gray-500 rounded-xl w-full py-4 px-4 text-gray-700 leading-tight focus:outline-[#392467] focus:shadow-outline"
              />
            </div>
          </div>

          <div className="flex items-center justify-center">
            <button
              onSubmit={handleSubmit}
              className="bg-[#000000] font-semibold text-base sm:text-[18px] w-[12rem] sm:w-[16.5rem] px-10 py-4 sm:px-16 sm:py-6 text-white rounded-lg mt-10 sm:mt-20"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default IdReconciliation;
