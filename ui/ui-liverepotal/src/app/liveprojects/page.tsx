// import LiveProjectComponent from "@/components/liveprojects/LiveProject";

import dynamic from "next/dynamic";

const LiveProjectComponent = dynamic(
  () => import("../../components/liveprojects/LiveProject"),
  { ssr: false }
);

const LiveProjects = () => {
  return (
    <div suppressHydrationWarning>
      <LiveProjectComponent />
    </div>
  );
};

export default LiveProjects;
