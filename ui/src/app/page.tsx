import { MenuProvider } from "@/components/context/MenuContext";
import { SearchProvider } from "@/components/context/SearchContext";
import Header from "@/components/header/Header";
import SidebarComplete from "@/components/sidebar/SideBar";

export default function Home() {
  return (
    <main>
      <MenuProvider>
        <SearchProvider>
          <Header />
          <SidebarComplete />
        </SearchProvider>
      </MenuProvider>
    </main>
  );
}
