import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  createContext,
} from "react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import "react-dropdown/style.css";
import "../styles/grid.css";
import Dropdown from "react-dropdown";
import { DateTimePicker } from "@mui/x-date-pickers";
import { DeleteOutline, Edit, Save } from "@mui/icons-material";
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

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [rowData, setRowData] = useState([]);
  const [newTask, setNewTask] = useState({
    task_name: "",
    deadline: "",
    status: "",
  });
  const [hoveredRow, setHoveredRow] = useState(null);
  const [displayAddRowError, setDisplayAddRowError] = useState(false);
  const [editStatus, setEditStatus] = useState(false);
  const options = ["Completed", "In-progress", "Pending"];

  const taskNameRenderer = (params) => {
    console.log("\nInside taskRenderer...");
    newTask.task_name = params.value;
    if (editStatus) {
      return (
        // <input
        //   type="text"
        //   value={params.value}
        //   onChange={(e) => handleTextBoxInputChange(e, "task_name")}
        //   label="Task Name"
        // />

        <input
          type="text"
          value={newTask.task_name}
          onChange={(e) =>
            setNewTask({ ...newTask, task_name: e.target.value })
          }
          label="Task Name"
        />
      );
    } else {
      return <p>{params.value}</p>;
    }
  };

  const deadlineRenderer = (params) => {
    console.log("\nInside taskRenderer...");
    newTask.deadline = params.value;
    if (editStatus) {
      return (
        // <input
        //   type="text"
        //   value={params.value}
        //   onChange={(e) => handleInputChange(e, "deadline")}
        //   label="Deadline"
        // />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimeField
            label="Enter Deadlines"
            value={dayjs(newTask.deadline)} /*buggy*/
            onChange={handleDateChange}
            disablePast={true}
            renderInput={(params) => <TextField {...params} />} // Use TextField for rendering
          />
        </LocalizationProvider>
      );
    } else {
      return <p>{params.value}</p>;
    }
  };

  const statusRenderer = (params) => {
    newTask.status = params.value;
    if (editStatus) {
      return (
        <Dropdown
          className="mt-1"
          options={options}
          onChange={(e) => handleInputChange(e.value, "status")}
          value={newTask.status}
          placeholder="Select status"
        />
      );
    } else {
      return <p>{params.value}</p>;
    }
  };

  const actionsRenderer = ({ rowIndex, node }) => {
    console.log("\nin actionsRenderer.. \nrowIndex = ", rowIndex);
    if (rowIndex === hoveredRow && !node.group) {
      return (
        <div className="flex flex-row justify-between w-20 ml-7">
          <Edit
            className="hover:text-blue-600 cursor-pointer"
            onClick={() => handleEditRow(rowData, rowIndex)}
          />
          <DeleteOutline
            className="hover:text-red-600 cursor-pointer"
            onClick={() => handleDeleteRow(rowIndex)}
          />
          <Save
            className="hover:text-green-600 cursor-pointer"
            onClick={() => handleSaveRow(rowIndex)}
          />
        </div>
      );
    }
    return <div></div>;
  };

  const columnDefs = [
    {
      headerName: "Task Name",
      field: "task_name",
      cellRenderer: taskNameRenderer,
    },
    {
      headerName: "Deadline",
      field: "deadline",
      cellRenderer: deadlineRenderer,
    },
    { headerName: "Status", field: "status", cellRenderer: statusRenderer },
    {
      headerName: "Edit/Delete",
      field: "actions",
      cellRenderer: actionsRenderer,
      cellRendererParams: { rowIndex: hoveredRow },
      filter: false,
    },
  ];

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
    }),
    []
  );

  const handleAddRow = () => {
    if (!newTask.task_name || !newTask.deadline || !newTask.status) {
      setDisplayAddRowError(true);
      return;
    }

    setRowData([...rowData, newTask]);
    setNewTask({ task_name: "", deadline: "", status: "" });
    setDisplayAddRowError(false);
  };

  const handleDeleteRow = (index) => {
    const updatedRows = rowData.filter((_, i) => i !== index);
    setRowData(updatedRows);
  };

  const handleSaveRow = (params) => {
    const editedTaskName = params.value;
    const rowIndex = rowData.findIndex((row) => row === params.data);

    const updatedRowData = [...rowData];
    updatedRowData[rowIndex] = {
      ...updatedRowData[rowIndex],
      task_name: editedTaskName,
    };
    setRowData(updatedRowData);
    setEditStatus(false);
  };

  const handleEditRow = (rowData, rowIndex) => {
    console.log("\n edit is clicked");
    setEditStatus(true);
    if (!Array.isArray(rowData)) {
      console.error("rowData is not an array.");
      return;
    }
    // const updateRowData = rowData.map((row, index) => {
    //   console.log("\n Inside Update Row data");
    //   if (index === rowIndex) {
    //     console.log("\n Inside if(inndex === rowIndex)...");
    //     return {
    //       // ...row,
    //       task_name: (
    //         <TextField
    //           required
    //           id="outlined-required"
    //           value={newTask.task_name}
    //           onChange={(e) => handleTextBoxInputChange(e, "task_name")}
    //           label="Task Name"
    //           defaultValue=""
    //         />
    //       ),
    //       deadline: (
    //         <DateTimePicker
    //           renderInput={(props) => <input {...props} />}
    //           defaultValue={new Date(row.deadline)}
    //         />
    //       ),
    //       status: (
    //         <Dropdown
    //           className="mt-1"
    //           options={options}
    //           onChange={(e) => handleInputChange(e.value, "status")}
    //           value={newTask.status}
    //           placeholder="Select status"
    //         />
    //       ),
    //       actions: <Edit onClick={() => handleEditRow(rowData, rowIndex)} />,
    //     };
    //   }
    //   return row;
    // });

    // return updateRowData;
  };

  const handleInputChange = (selectedValue, field) => {
    // const { value } = event.target;
    setNewTask({ ...newTask, [field]: selectedValue });
  };
  const handleTextBoxInputChange = (event, field) => {
    const { value } = event.target;
    setNewTask({ ...newTask, [field]: value });
  };
  const handleDateChange = (dateValue) => {
    const formattedDate = dayjs(dateValue).format("MMM DD YYYY, h:mm a");
    setNewTask({ ...newTask, deadline: formattedDate });
  };
  return (
    <DataContext.Provider
      value={{
        rowData,
        setRowData,
        newTask,
        setNewTask,
        hoveredRow,
        setHoveredRow,
        displayAddRowError,
        setDisplayAddRowError,
        editStatus,
        setEditStatus,
        options,
        taskNameRenderer,
        deadlineRenderer,
        statusRenderer,
        actionsRenderer,
        columnDefs,
        defaultColDef,
        handleAddRow,
        handleInputChange,
        handleDeleteRow,
        handleEditRow,
        handleTextBoxInputChange,
        handleDateChange,
        handleSaveRow,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
