/*import React, { useState, useCallback, useContext } from "react";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";
import { DataContext } from "./DataProvider";

const CustomDateTimeEditor = ({ value, api, context }) => {
  const { newDeadline, setNewDeadline } = useContext(DataContext);
  const [dateValue, setDateValue] = useState(value || null); // Initial value

  // Callback function to update value in ag-Grid
  const getValue = useCallback(() => {
    return dateValue;
  }, [dateValue]);

  // Handle value change
  const handleChange = (newValue) => {
    setDateValue(newValue);
    api.stopEditing(); // Stop editing once a value is selected
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        label="Select Deadline"
        value={dayjs(newDeadline)}
        onChange={(newDate) =>
          setNewDeadline(dayjs(newDate).format("MMM DD YYYY, h:mm a"))
        }
        disablePast={true}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
};

export default CustomDateTimeEditor;*/
/*
import React, { useState, useCallback, useContext } from "react";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";
import { DataContext } from "./DataProvider";

const CustomDateTimeEditor = ({ value, api, rowIndex }) => {
  const { rowData, setRowData } = useContext(DataContext);
  const { newDeadLine, setNewDeadline } = useContext(DataContext);
  const [dateValue, setDateValue] = useState(value || null); // Initial value

  // Callback function to update value in ag-Grid
  const getValue = useCallback(() => {
    return dateValue;
  }, [dateValue]);

  // Handle value change
  const handleChange = (newDate) => {
    setNewDeadline(dayjs(newDate).format("MMM DD YYYY, h:mm a"));
    setDateValue(newDate);
    const updatedRowData = [...rowData];

    updatedRowData[rowIndex] = {
      ...updatedRowData[rowIndex],
      deadline: newDeadLine,
    };
    setRowData(updatedRowData);
    api.stopEditing(); // Stop editing once a value is selected
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        label="Select Deadline"
        value={dayjs(newDeadLine)}
        onChange={handleChange}
        disablePast={true}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
};

export default CustomDateTimeEditor;*/

import React, { useState, useCallback, useContext } from "react";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";
import { DataContext } from "./DataProvider";

const CustomDateTimeEditor = ({ value, api, rowIndex }) => {
  //   const rowIndex = getRowIndex();
  const { rowData, setRowData } = useContext(DataContext); // Access rowData and setRowData from DataContext
  const { newDeadLine, setNewDeadline } = useContext(DataContext);
  const { editedTask, setEditedTask } = useContext(DataContext);
  const [dateValue, setDateValue] = useState(dayjs(value || null)); // Initial value
  //   const localData = JSON.parse(localStorage.getItem("todos"));
  // Handle value change
  //   const handleChange = (newValue) => {
  //     setDateValue(newValue);
  //     setNewDeadline(newValue);
  //     // const updatedRowData = [...rowData];

  //     // updatedRowData[rowIndex] = {
  //     //   ...updatedRowData[rowIndex],
  //     //   deadline: dayjs(newValue).format("MMM DD YYYY, h:mm a"),
  //     // };
  //     // setRowData(updatedRowData);

  //     api.stopEditing();
  //   };
  //   console.log("\nvalue : ", value);
  //   console.log("\n,Deadline from local storage: ", localData[rowIndex].deadline);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        label="Select Deadline"
        value={dayjs(dateValue)}
        onChange={(newDate) => {
          setDateValue(newDate);
          setEditedTask({
            ...editedTask,
            deadline: dayjs(newDate).format("MMM DD YYYY, h:mm a"),
          });
        }}
        disablePast={true}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
};

export default CustomDateTimeEditor;
