import React, { useContext } from "react";
import { DataContext } from "./DataProvider";
import Dropdown from "react-dropdown";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimeField } from "@mui/x-date-pickers/DateTimeField";
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
      className="w-80 border-2 border-sky-500 mt-5 rounded-lg p-5 flex flex-row justify-between"
      style={{
        width: "800px",
      }}
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
        value={newTask.task_name}
        onChange={(e) => handleTextBoxInputChange(e, "task_name")}
        label="Task Name"
        defaultValue=""
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimeField
          label="Enter Deadlines"
          value={dayjs(newTask.deadline)} /*buggy*/
          onChange={handleDateChange}
          disablePast={true}
          renderInput={(params) => <TextField {...params} />} // Use TextField for rendering
        />
      </LocalizationProvider>
      {/* <input className='h-10 border rounded-lg pl-3'
          type="text"
          value={newTask.deadline}
          onChange={(e) => handleTextBoxInputChange(e, 'deadline')}
          placeholder="Enter Deadline"
        /> */}
      <Dropdown
        className="mt-1"
        options={options}
        onChange={(e) => handleInputChange(e.value, "status")}
        value={newTask.status}
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
