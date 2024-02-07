import { MenuProvider } from "@/context/MenuContext";
import { SearchProvider } from "@/context/SearchContext";
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
