"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { data } from "../data/data";
// import Rejects from "./Rejects";
import ProjectAllocation from "./ProjectAllocation";
import DataExport from "./DataExport";
import IdReconciliation from "./IdReconciliation";
import AddNewVendor from "./AddNewVendor";
import AddNewClient from "./AddNewClient";
import VendorSetup from "./VendorSetup";
import ClientSetup from "./ClientSetup";
import Form from "./Project";

const SidebarComplete = () => {
  const prevSelectedItemIdRef = useRef<number | null>(null);

  const [selectedItemId, setSelectedItemId] = useState<number>(1);
  useEffect(() => {
    // Update the previous state when selectedItemId changes
    prevSelectedItemIdRef.current = selectedItemId;
  }, [selectedItemId]);

  // const getSelectedItemId = (section: string): number => {
  //   switch (section) {
  //     case "Project Creation":
  //       return 1;
  //     case "Client Setup":
  //       return 2;
  //     case "Vendor Setup":
  //       return 3;
  //     case "Add New Client":
  //       return 4;
  //     case "Add New Vendor":
  //       return 5;
  //     case "Id Reconciliation":
  //       return 6;
  //     case "Data Export":
  //       return 7;
  //     case "Project Allocation":
  //       return 8;
  //     case "Reject":
  //       return 9;
  //     default:
  //       return 1;
  //   }
  // };
  return (
    <div className="">
      <div className="flex md:gap-4 lg:gap-6 ">
        <div className="bg-[rgb(255,255,255)] h-[100vh] sm:w-64 md:w-72 rounded-3xl pt-8 hidden sm:block  md:px-3 lg:px-0 ml-4 mt-12 overflow-x-hidden">
          {data.map((item) => (
            <div
              className={`cursor-pointer flex gap-2 md:gap-3 mb-3 items-center py-3 pl-2 mx-auto w-40 md:w-[11rem] lg:w-[13rem] md:pl-6 lg:pl-8   ${
                item.id === selectedItemId
                  ? "bg-[#392467] rounded-full text-white "
                  : ""
              }`}
              key={item.id}
              onClick={() => setSelectedItemId(item.id)}
            >
              <Image
                height={30}
                width={30}
                src={`/${item.img}`}
                alt="image-portfolio"
                className=""
              />
              <h3
                className={`text-[14px] text-gray-600 ${
                  item.id === selectedItemId ? " text-white" : ""
                }`}
              >
                {item.title}
              </h3>
            </div>
          ))}
        </div>
        <div className="w-full section">
          {selectedItemId === 1 && <Form />}
          {selectedItemId === 2 && <ClientSetup />}
          {selectedItemId === 3 && <VendorSetup />}
          {selectedItemId === 4 && <AddNewClient />}
          {selectedItemId === 5 && <AddNewVendor />}
          {selectedItemId === 6 && <IdReconciliation />}
          {selectedItemId === 7 && <DataExport />}
          {selectedItemId === 8 && <ProjectAllocation />}
        </div>
      </div>
    </div>
  );
};

export default SidebarComplete;
