import { MenuProvider } from "@/components/context/MenuContext";
import Header from "@/components/header/Header";
import Form from "@/components/sidebar/Project";
import Sidebar from "@/components/sidebar/Sidebar";

export default function Home() {
  return (
    <main>
      <MenuProvider>
        <Header />
        <Sidebar />
      </MenuProvider>

      {/* <Form /> */}
    </main>
  );
}
