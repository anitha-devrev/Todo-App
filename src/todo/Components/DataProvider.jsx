import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  createContext,
} from "react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { RichSelectModule } from "@ag-grid-enterprise/rich-select";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
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
ModuleRegistry.registerModules([ClientSideRowModelModule, RichSelectModule]);

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
  const [newTaskName, setNewTaskName] = useState("");
  const [newDeadLine, setNewDeadline] = useState("");
  const [newStatus, setNewStatus] = useState("");

  // useEffect(() => {
  //   const storedTodos = localStorage.getItem("todos");jjhjhh
  //   if (storedTodos) {
  //     setRowData(JSON.parse(storedTodos));
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem("todos", JSON.stringify(rowData));
  // }, [rowData]);

  const taskNameRenderer = (params) => {
    console.log("\nInside taskRenderer...");
    console.log("\nnew task...", newTask);
    newTask.task_name = params.value;

    if (editStatus) {
      console.log("\nafter updation new task...", newTask);
      return (
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
  // const taskNameRenderer = (params) => {
  //   const handleInputChange = (e) => {
  //     setEditingValue(e.target.value);
  //   };

  //   const handleInputBlur = () => {
  //     // Update the row data with the new task name
  //     const updatedData = { ...params.data, task_name: editingValue };
  //     params.api.applyTransaction({ update: [updatedData] });
  //   };

  //   return editStatus ? (
  //     <input
  //       type="text"
  //       value={editingValue}
  //       onChange={handleInputChange}
  //       onBlur={handleInputBlur}
  //       label="Task Name"
  //     />
  //   ) : (
  //     <p>{params.value}</p>
  //   );
  // };

  const deadlineRenderer = (params) => {
    console.log("\nInside deadlineRenderer...");
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
          {/* <DateTimeField
            label="Enter Deadlines"
            value={dayjs(newTask.deadline)} 
            onChange={handleDateChange}
            disablePast={true}
            renderInput={(params) => <TextField {...params} />} // Use TextField for rendering
          /> */}
          <DateTimePicker
            label="Select Deadline"
            value={dayjs(newDeadLine)}
            onChange={(newDate) =>
              setNewDeadline(dayjs(newDate).format("MMM DD YYYY, h:mm a"))
            }
            disablePast={true}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      );
    } else {
      return <p>{params.value}</p>;
    }
  };

  const statusRenderer = (params) => {
    console.log("\nInside statusRenderer..");
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
    if (rowIndex === hoveredRow) {
      return (
        <div className="flex justify-around items-center pt-2">
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
      cellEditor: "agTextCellEditor",

      cellRenderer: taskNameRenderer,
    },
    {
      headerName: "Deadline",
      field: "deadline",
      cellRenderer: deadlineRenderer,
      cellEditor: "agDateCellEditor",
    },
    {
      headerName: "Status",
      field: "status",
      cellRenderer: statusRenderer,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: ["Completed", "In-progress", "Pending"],
      },
      editable: true,
    },
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: actionsRenderer,
      cellRendererParams: { rowIndex: hoveredRow },
      filter: false,
      editable: false,
      sortable: false,
    },
  ];

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      editable: editStatus,
    }),
    []
  );

  const handleAddRow = () => {
    console.log("\nInside handle add row function ..");
    if (!newTaskName || !newDeadLine || !newStatus) {
      setDisplayAddRowError(true);
      return;
    }
    let newTodoItem = {
      task_name: newTaskName,
      deadline: newDeadLine,
      status: newStatus,
    };
    let updatedTodoArr = [...rowData];
    updatedTodoArr.push(newTodoItem);
    setRowData(updatedTodoArr);
    localStorage.setItem("todos", JSON.stringify(rowData));
    // setRowData([...rowData, { ...newTask }]);
    setNewTaskName("");
    setNewDeadline("");
    setNewStatus("");
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
  };

  const handleInputChange = (selectedValue, field) => {
    // const { value } = event.target;
    setNewTask({ ...newTask, [field]: selectedValue });
  };
  const handleTextBoxInputChange = (event, field) => {
    const { value } = event.target;
    // setNewTask({ ...newTask, [field]: value });
    setNewTask((prevState) => ({ ...prevState, [field]: value }));
  };
  const handleDateChange = (dateValue) => {
    const formattedDate = dayjs(dateValue).format("MMM DD YYYY, h:mm a");
    setNewDeadline(formattedDate);
    // setNewTask({ ...newTask, deadline: formattedDate });
  };
  return (
    <DataContext.Provider
      value={{
        rowData,
        setRowData,
        newTask,
        setNewTask,
        newTaskName,
        setNewTaskName,
        newDeadLine,
        setNewDeadline,
        newStatus,
        setNewStatus,
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
