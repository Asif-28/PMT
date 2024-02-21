"use client";
import React, { use, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useStatusStore } from "@/store/Status";
import { useProjectCodeStore } from "@/store/ProjectCode";

const DropDown = ({ value1, value2, value3, status, project_code }: any) => {
  const [statusValue, setStatusValue] = useState(status);
  const useStatus = useStatusStore((state: any) => state.status);
  const updataStatus = useStatusStore((state: any) => state.setStatus);
  const useProjectCode = useProjectCodeStore(
    (state: any) => state.project_code
  );
  const updataProjectCode = useProjectCodeStore(
    (state: any) => state.setProjectCode
  );

  const handleChange = (event: SelectChangeEvent) => {
    setStatusValue(event.target.value as string);

    updataStatus(event.target.value as string);
    setTimeout(() => {
      updataProjectCode(project_code);
    }, 100);
  };

  return (
    <div className=" flex items-center justify-center gap-2 sm:gap-3 w-full">
      <div className="w-28">
        <Box sx={{ maxWidth: 100 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">{status}</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={statusValue}
              label="Status"
              onChange={handleChange}
            >
              <MenuItem value={value1}>{value1}</MenuItem>
              <MenuItem value={value2}>{value2}</MenuItem>
              <MenuItem value={value3}>{value3}</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>

      <div>
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </span>
      </div>
    </div>
  );
};

export default DropDown;
