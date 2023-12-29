import { MenuProvider } from "@/components/context/MenuContext";
import Header from "@/components/header/Header";

export default function Home() {
  return (
    <main>
      <MenuProvider>
        <Header />
      </MenuProvider>
    </main>
  );
}
