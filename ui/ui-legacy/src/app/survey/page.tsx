import Header from "@/components/header/Header";
import SidebarComplete from "@/components/sidebar/SideBar";
import { MenuProvider } from "@/context/MenuContext";
import { SearchProvider } from "@/context/SearchContext";
import React from "react";

const Survey = () => {
  return (
    <div>
      <MenuProvider>
        <SearchProvider>
          <Header />
          <SidebarComplete />
        </SearchProvider>
      </MenuProvider>
    </div>
  );
};

export default Survey;
