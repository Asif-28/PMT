"use client";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const DropDown = ({ value1, value2, status }: any) => {
  const [checkStatus, setcheckStatus] = React.useState("");
  const handleChange = (event: SelectChangeEvent) => {
    setcheckStatus(event.target.value as string);
  };

  return (
    <div className=" flex items-center justify-center gap-4 w-full">
      <div className="w-28">
        <Box sx={{ maxWidth: 100 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">{status}</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={checkStatus}
              label="Status"
              onChange={handleChange}
            >
              <MenuItem value={value1}>{value1}</MenuItem>
              <MenuItem value={value2}>{value2}</MenuItem>
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
