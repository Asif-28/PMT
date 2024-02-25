import dynamic from "next/dynamic";
import React from "react";

const Dashboard = dynamic(
  () => import("../../components/dashboard/Dashboard"),
  { ssr: false }
);

const DashboardPage = () => {
  return (
    <div>
      <Dashboard />
    </div>
  );
};

export default DashboardPage;
