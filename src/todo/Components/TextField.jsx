import React from "react";

const TextField = () => {
  return (
    <div>
      <TextField
        required
        id="outlined-required"
        value={newTask.task_name}
        onChange={(e) => handleTextBoxInputChange(e, "task_name")}
        label="Task Name"
        defaultValue=""
      />
    </div>
  );
};

export default TextField;
