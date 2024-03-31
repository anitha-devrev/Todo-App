import React, { useState, useContext } from "react";
import {
  Select,
  MenuItem,
  TextField,
  InputLabel,
  FormControl,
} from "@mui/material";
import { DataContext } from "./DataProvider";

const CustomSelectEditor = ({ value }) => {
  const { editedTask, setEditedTask, options } = useContext(DataContext);
  const [newStatus, setNewStatus] = useState(value || "");

  const handleChange = (newStat) => {
    setNewStatus(newStat);
    setEditedTask({
      ...editedTask,
      status: newStat,
    });
  };

  return (
    <FormControl required sx={{ minWidth: 195 }}>
      {/* <InputLabel id="demo-simple-select-label">Task Status</InputLabel> */}
      <Select
        labelId="task-status"
        id="task-status"
        value={newStatus}
        //   label="Task Status"
        onChange={(e) => handleChange(e.target.value)}
      >
        <MenuItem value={options[0]}>{options[0]}</MenuItem>
        <MenuItem value={options[1]}>{options[1]}</MenuItem>
        <MenuItem value={options[2]}>{options[2]}</MenuItem>
      </Select>
    </FormControl>
  );
};

export default CustomSelectEditor;
