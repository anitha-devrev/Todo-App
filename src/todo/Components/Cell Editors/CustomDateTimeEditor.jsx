import React, { useState, useContext } from "react";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";
import { DataContext } from "../DataProvider";

const CustomDateTimeEditor = ({ value, api, rowIndex }) => {
  const { editedTask, setEditedTask } = useContext(DataContext);
  const [dateValue, setDateValue] = useState(dayjs(value || null));

  const handleChange = (newDate) => {
    setDateValue(newDate);
    setEditedTask({
      ...editedTask,
      deadline: dayjs(newDate).format("MMM DD YYYY, h:mm a"),
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        fullWidth
        className="h-10 bg-transparent"
        value={dayjs(dateValue)}
        onChange={handleChange}
        disablePast={true}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
};

export default CustomDateTimeEditor;
