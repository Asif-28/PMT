import LiveProjectComponent from "@/components/liveprojects/LiveProject";
import LiveProjects from "./liveprojects/page";
import Header from "@/components/header/Header";
import Login from "./login/page";
import dynamic from "next/dynamic";

const LoginPage = dynamic(() => import("../app/login/page"), { ssr: false });

export default function Home() {
  return (
    <main>
      {/* <Header /> */}
      {/* <LiveProjects /> */}
      <LoginPage />
    </main>
  );
}
