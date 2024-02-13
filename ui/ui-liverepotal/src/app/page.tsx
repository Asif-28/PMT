import LiveProjectComponent from "@/components/liveprojects/LiveProject";
import LiveProjects from "./liveprojects/page";
import Header from "@/components/header/Header";

export default function Home() {
  return (
    <main>
      <Header />
      <LiveProjects />
    </main>
  );
}
