"use client";
import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const DropDown = ({ value1, value2 }: any) => {
  const [checkStatus, setcheckStatus] = React.useState("");
  const handleChange = (event: SelectChangeEvent) => {
    setcheckStatus(event.target.value as string);
  };
  console.log(checkStatus);
  return (
    <div>
      <Box sx={{ maxWidth: 150 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Status</InputLabel>
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
  );
};

export default DropDown;
