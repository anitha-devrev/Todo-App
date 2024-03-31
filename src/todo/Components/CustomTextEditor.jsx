import React, { useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import { DataContext } from "./DataProvider";

const CustomTextEditor = ({ value }) => {
  const { editedTask, setEditedTask } = useContext(DataContext);
  const [newTaskName, setNewTaskName] = useState(value || "");

  const handleChange = (newName) => {
    setNewTaskName(newName);
    setEditedTask({
      ...editedTask,
      task_name: newName,
    });
  };

  return (
    <TextField
      required
      id="outlined-required"
      value={newTaskName}
      onChange={(e) => handleChange(e.target.value)}
      //   label="Task Name"
      defaultValue=""
    />
  );
};

export default CustomTextEditor;
