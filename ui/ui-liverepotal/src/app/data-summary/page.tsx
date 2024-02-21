"use client";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Project } from "@/types/types";

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function BasicTable(project: any) {
  return (
    <div className="section">
      <h1 className="font-semibold text-2xl py-4 mt-10">Data Group Summary</h1>
      <h2 className="text-gray-600 pb-8">
        Infant Milk Formula in Spain - AZ190_IMFI_0823
      </h2>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">IO%</th>
              <th className="px-4 py-2 text-left">EL%</th>
              <th className="px-4 py-2 text-left">RK%</th>
              <th className="px-4 py-2 text-left">CT%</th>
              <th className="px-4 py-2 text-left">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-100">
              {/* <td className="px-4 py-2 text-left"></td> */}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
