import dynamic from "next/dynamic";

const PauseProjectComponent = dynamic(
  () => import("../../components/pauseprojects/PauseProjects"),
  { ssr: false }
);

const PausedProjects = () => {
  return (
    <div>
      <PauseProjectComponent />
    </div>
  );
};

export default PausedProjects;
