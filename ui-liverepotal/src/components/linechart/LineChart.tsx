"use client";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { faker } from "@faker-js/faker";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Partner Completes Chart (Last 10 Days)",
    },
  },
};

const daysToShow = 10;
const labels = Array.from({ length: daysToShow }, (_, i) => `Day ${i + 1}`);

export const data = {
  labels,
  datasets: [
    {
      label: "Partner 1",
      data: labels.map(() => faker.number.int({ min: 0, max: 100 })),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Partner 2",
      data: labels.map(() => faker.number.int({ min: 0, max: 100 })),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
    // Add more partners as needed
  ],
};

export function MyView() {
  return (
    <div className="w-full">
      <Line options={options} data={data} />
    </div>
  );
}
