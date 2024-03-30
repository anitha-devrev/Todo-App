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
    newTask,
    setNewtask,
    newTaskName,
    setNewTaskName,
    newDeadline,
    setNewDeadline,
    newStatus,
    setNewStatus,
    task_name,
    deadline,
    handleTextBoxInputChange,
    handleDateChange,
    handleInputChange,
    options,
    handleAddRow,
  } = useContext(DataContext);

  return (
    <div
      id="add-task"
      className="w-[800px] border-2 border-sky-500 mt-5 rounded-lg p-5 flex flex-row justify-between items-center bg-white bg-opacity-40"
    >
      {/* <input className='h-10 border rounded-lg pl-3'
          type="text"
          value={newTask.task_name}
          onChange={(e) => handleTextBoxInputChange(e, 'task_name')}
          placeholder="Enter Task Name"
        /> */}
      <TextField
        required
        id="outlined-required"
        value={newTaskName}
        onChange={(e) => setNewTaskName(e.target.value)}
        label="Task Name"
        defaultValue=""
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {/* <DateTimeField
          label="Enter Deadlines"
          value={dayjs(newDeadline)} 
          onChange={(dateValue) =>
            setNewDeadline(dayjs(dateValue).format("MMM DD YYYY, h:mm a"))
          }
          disablePast={true}
          defaultValue={MM/DD/YYYY HH:MM AM}
          renderInput={(params) => <TextField {...params} />}
        /> */}
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
      {/* <input className='h-10 border rounded-lg pl-3'
          type="text"
          value={newTask.deadline}
          onChange={(e) => handleTextBoxInputChange(e, 'deadline')}
          placeholder="Enter Deadline"
        /> */}
      <Dropdown
        // className="mt-1"
        options={options}
        onChange={(e) => setNewStatus(e.value)}
        value={newStatus}
        placeholder="Select status"
      />
      {/* <FormControl required sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-label">Task Status</InputLabel>
          <Select
            labelId="task-status"
            id="task-status"
            value={newTask.status}
            label="Task Status"
            onChange={(e) => handleTextBoxInputChange(e.value, 'status')}
          >
          <MenuItem value={options[0]}>{options[0]}</MenuItem>
          <MenuItem value={options[1]}>{options[1]}</MenuItem>
          <MenuItem value={options[2]}>{options[2]}</MenuItem>
          </Select>
        </FormControl> */}

      <button
        className="border border-sky-500 rounded-lg p-3 text-sky-800 hover:bg-sky-500 hover:text-white"
        onClick={handleAddRow}
      >
        Add Task
      </button>
    </div>
  );
};

export default AddTask;
