import { MenuProvider } from "@/components/context/MenuContext";
import Header from "@/components/header/Header";
import SidebarComplete from "@/components/sidebar";

export default function Home() {
  return (
    <main>
      <MenuProvider>
        <Header />
        <SidebarComplete />
      </MenuProvider>
    </main>
  );
}
