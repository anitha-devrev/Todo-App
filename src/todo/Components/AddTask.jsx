import React, { useContext, useState } from "react";
import { DataContext } from "./DataProvider";
import Dropdown from "react-dropdown";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimeField, DateTimePicker } from "@mui/x-date-pickers";

import {
  Select,
  MenuItem,
  TextField,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";
import dayjs from "dayjs";

const AddTask = () => {
  const {
    newTaskName,
    setNewTaskName,
    newDeadline,
    setNewDeadline,
    newStatus,
    setNewStatus,
    options,
    handleAddRow,
  } = useContext(DataContext);

  return (
    <div
      id="add-task"
      className="w-[800px] rounded-lg p-5 flex flex-row justify-between items-center bg-white bg-opacity-40 shadow-xl"
    >
      <TextField
        required
        id="outlined-required"
        value={newTaskName}
        onChange={(e) => setNewTaskName(e.target.value)}
        label="Task Name"
        defaultValue=""
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          label="Select Deadline"
          value={newDeadline}
          onChange={(newDate) =>
            setNewDeadline(dayjs(newDate).format("MMM DD YYYY, h:mm a"))
          }
          disablePast={true}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <FormControl required sx={{ m: 1, minWidth: 150 }}>
        <InputLabel id="demo-simple-select-label">Task Status</InputLabel>
        <Select
          labelId="task-status"
          id="task-status"
          value={newStatus}
          label="Task Status"
          onChange={(e) => setNewStatus(e.target.value)}
        >
          <MenuItem value={options[0]}>{options[0]}</MenuItem>
          <MenuItem value={options[1]}>{options[1]}</MenuItem>
          <MenuItem value={options[2]}>{options[2]}</MenuItem>
        </Select>
      </FormControl>

      <button
        className="border border-pink-500 rounded-lg p-3 text-pink-500 hover:bg-pink-500 hover:text-white h-[57px]"
        onClick={handleAddRow}
      >
        Add Task
      </button>
    </div>
  );
};

export default AddTask;
{
  /* <DateTimeField
          label="Enter Deadlines"
          value={dayjs(newDeadline)} 
          onChange={(dateValue) =>
            setNewDeadline(dayjs(dateValue).format("MMM DD YYYY, h:mm a"))
          }
          disablePast={true}
          defaultValue={MM/DD/YYYY HH:MM AM}
          renderInput={(params) => <TextField {...params} />}
        /> */
}
