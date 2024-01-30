"use client";
import Image from "next/image";
import React from "react";
import { useSearch } from "../../context/SearchContext";
import { data as sidebarData } from "../../data/data";
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

interface SearchContextProps {
  searchResult: number | undefined;
  setSearchResult: React.Dispatch<React.SetStateAction<number | undefined>>;
}

const SidebarComplete = () => {
  const { searchResult, setSearchResult }: SearchContextProps = useSearch();

  const handleItemClick = (itemId: number) => {
    setSearchResult(itemId);
  };

  return (
    <div className="max-w-[1500px] mx-auto">
      <div className="flex lg:gap-8">
        <div className="z-100 overflow-x-visible bg-[rgb(255,255,255)] h-[100vh] sm:w-64 md:w-[19rem] rounded-3xl pt-8 hidden sm:block md:px-3 lg:px-0 ml-4 mt-12">
          {sidebarData.map((item: SidebarItem) => (
            <div
              className={`cursor-pointer flex gap-2 md:gap-3 mb-3 items-center py-3 pl-2 mx-auto w-40 md:w-[11rem] lg:w-[13rem] md:pl-6 lg:pl-8 ${
                item.id === searchResult
                  ? "bg-[#392467] rounded-full text-white"
                  : ""
              }`}
              key={item.id}
              onClick={() => handleItemClick(item.id)}
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
                  item.id === searchResult ? "text-white" : ""
                }`}
              >
                {item.title}
              </h3>
            </div>
          ))}
        </div>
        <div className="w-full section">
          {searchResult === 1 && <Form />}
          {searchResult === 2 && <ClientSetup />}
          {searchResult === 3 && <VendorSetup />}
          {searchResult === 4 && <AddNewClient />}
          {searchResult === 5 && <AddNewVendor />}
          {searchResult === 6 && <IdReconciliation />}
          {searchResult === 7 && <DataExport />}
          {searchResult === 8 && <ProjectAllocation />}
        </div>
      </div>
    </div>
  );
};

export default SidebarComplete;
