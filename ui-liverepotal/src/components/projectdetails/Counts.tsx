import React from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const Counts = ({
  todayCount,
  yesterdayCount,
  totalCount,
  yesterdayTotalCount,
  todaysTarget,
  yesterdaysTarget,
  irPercentage,
  yesterdayIRPercentage,
}: any) => {
  const calculatePercentageChange = (today: number, yesterday: number) => {
    const change = today - yesterday;
    const percentageChange = (change / yesterday) * 100;

    return percentageChange.toFixed(2);
  };
  const percentageChange = calculatePercentageChange(
    todayCount,
    yesterdayCount
  );
  const percentageChangeTotalCount = parseFloat(
    calculatePercentageChange(totalCount, yesterdayTotalCount)
  );
  const percentageChangeTarget = parseFloat(
    calculatePercentageChange(todaysTarget, yesterdaysTarget)
  );
  const percentageChangeValue = parseFloat(percentageChange);
  return (
    <div className="section">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
        <div className="border shadow-md px-5 py-3 max-w-[300px] rounded-2xl bg-[#fff]">
          <h3 className="text-[#71717A] uppercase font-medium  mb-4 text-sm">
            Today&apos;s Count
          </h3>
          <div className="flex justify-between">
            <p className="font-bold">{todayCount}</p>
            {percentageChangeValue >= 0 ? (
              <p className="text-[14px] text-green-600">
                +{percentageChangeValue}%{" "}
                <ArrowUpwardIcon sx={{ fontSize: "1rem" }} />
              </p>
            ) : (
              <p className="text-[14px] text-red-600">
                {percentageChangeValue}%{" "}
                <ArrowDownwardIcon sx={{ fontSize: "1rem" }} />
              </p>
            )}
          </div>
        </div>
        <div className="border shadow-md px-5 py-3 max-w-[300px] rounded-2xl bg-[#fff]">
          <h3 className="text-[#71717A] uppercase font-medium  mb-4 text-sm">
            Total Count
          </h3>
          <div className="flex justify-between">
            <p className="font-bold">{totalCount} </p>
            {percentageChangeTotalCount >= 0 ? (
              <p className="text-[14px] text-green-600">
                +{percentageChangeTotalCount}%{" "}
                <ArrowUpwardIcon sx={{ fontSize: "1rem" }} />
              </p>
            ) : (
              <p className="text-[14px] text-red-600">
                {percentageChangeTotalCount}%{" "}
                <ArrowDownwardIcon sx={{ fontSize: "1rem" }} />
              </p>
            )}
          </div>
        </div>
        <div className="border shadow-md px-5 py-3 max-w-[300px] rounded-2xl bg-[#fff]">
          <h3 className="text-[#71717A] uppercase font-medium  mb-4 text-sm">
            Target
          </h3>
          <div className="flex justify-between">
            <p className="font-bold">{todaysTarget}</p>
            {percentageChangeTarget >= 0 ? (
              <p className="text-[14px] text-green-600">
                +{percentageChangeTarget}%{" "}
                <ArrowUpwardIcon sx={{ fontSize: "1rem" }} />
              </p>
            ) : (
              <p className="text-[14px] text-red-600">
                {percentageChangeTarget}%{" "}
                <ArrowDownwardIcon sx={{ fontSize: "1rem" }} />
              </p>
            )}
          </div>
        </div>
        <div className="border shadow-md px-5 py-3 max-w-[300px] rounded-2xl bg-[#fff]">
          <h3 className="text-[#71717A] uppercase font-medium  mb-4 text-sm">
            IR%
          </h3>
          <div className="flex justify-between">
            <p className="font-bold">137 </p>
            <p className=" text-[14px] text-green-500">
              +36% <ArrowUpwardIcon sx={{ fontSize: "1rem" }} />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Counts;
