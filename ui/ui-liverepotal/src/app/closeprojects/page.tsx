import dynamic from "next/dynamic";

const ClosedProjectComponent = dynamic(
  () => import("../../components/closeproject/CloseProject"),
  { ssr: false }
);

const ClosedProjects = () => {
  return (
    <div>
      <ClosedProjectComponent />
    </div>
  );
};

export default ClosedProjects;
