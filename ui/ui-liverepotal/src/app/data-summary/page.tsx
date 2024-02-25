import dynamic from "next/dynamic";
import React from "react";

const DataSummaryComp = dynamic(
  () => import("../../components/data-summary/DataSummary"),
  { ssr: false }
);

const DataSummary = () => {
  return (
    <div>
      <DataSummaryComp />
    </div>
  );
};

export default DataSummary;
