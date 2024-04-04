import React, { useState, useContext } from "react";
import {
  Select,
  MenuItem,
  TextField,
  InputLabel,
  FormControl,
} from "@mui/material";
import { DataContext } from "../DataProvider";

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
    <FormControl fullWidth required sx={{ minWidth: 195 }}>
      <Select
        labelId="task-status"
        id="task-status"
        value={newStatus}
        className="bg-transparent"
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
