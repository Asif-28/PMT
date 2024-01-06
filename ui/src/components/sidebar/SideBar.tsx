"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useSearch } from "../context/SearchContext";
import { data as sidebarData } from "../data/data";
import ProjectAllocation from "./ProjectAllocation";
import DataExport from "./DataExport";
import IdReconciliation from "./IdReconciliation";
import AddNewVendor from "./AddNewVendor";
import AddNewClient from "./AddNewClient";
import VendorSetup from "./VendorSetup";
import ClientSetup from "./ClientSetup";
import Form from "./Project";

interface SidebarItem {
  id: number;
  img: string;
  title: string;
}

interface SearchHookReturnValue {
  searchResult: number | undefined;
}

interface SearchContextProps {
  searchResult: number | undefined;
  setSearchResult: React.Dispatch<React.SetStateAction<number | undefined>>;
}

const SidebarComplete = () => {
  const prevSelectedItemIdRef = useRef<number | null>(null);
  const { searchResult }: SearchContextProps = useSearch();

  const [selectedItemId, setSelectedItemId] = useState<number>(1);

  useEffect(() => {
    prevSelectedItemIdRef.current = selectedItemId;

    if (searchResult !== undefined) {
      setSelectedItemId(searchResult);
    }
  }, [searchResult]);

  return (
    <div className="max-w-[1500px] mx-auto">
      <div className="flex md:gap-3 lg:gap-6 ">
        <div className="bg-[rgb(255,255,255)] h-[100vh] sm:w-64 md:w-72 rounded-3xl pt-8 hidden sm:block  md:px-3 lg:px-0 ml-4 mt-12 overflow-x-hidden">
          {sidebarData.map((item: SidebarItem) => (
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
