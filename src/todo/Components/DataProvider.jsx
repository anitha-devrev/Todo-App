import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  createContext,
  useCallback,
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
import CustomDateTimeEditor from "./CustomDateTimeEditor";
ModuleRegistry.registerModules([ClientSideRowModelModule, RichSelectModule]);

const DataContext = createContext();
const getLocalTodos = () => {
  const storedTodos = localStorage.getItem("todos");
  if (storedTodos) {
    return JSON.parse(storedTodos);
  }
  return [];
};

const DataProvider = ({ children }) => {
  const gridRef = useRef();
  const [rowData, setRowData] = useState(getLocalTodos);
  const [newTask, setNewTask] = useState({
    task_name: "",
    deadline: "",
    status: "",
  });
  // const [currentEditNode, setCurrentEditNode] = useState(-1);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [displayAddRowError, setDisplayAddRowError] = useState(false);
  const [editStatus, setEditStatus] = useState(false);
  const options = ["Completed", "In-progress", "Pending"];
  const [newTaskName, setNewTaskName] = useState("");
  const [newDeadLine, setNewDeadline] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [editedTask, setEditedTask] = useState({
    task_name: "",
    deadline: "",
    status: "",
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(rowData));
  }, [rowData]);

  const actionsRenderer = ({ rowIndex, api }) => {
    // const handleEditRow = () => {
    //   api.startEditingRow({ rowIndex: rowIndex });
    // };
    console.log("\nin actionsRenderer.. \nrowIndex = ", rowIndex);
    if (rowIndex === hoveredRow) {
      return (
        <div className="flex justify-around items-center pt-2">
          <Edit
            className="hover:text-blue-600 cursor-pointer"
            onClick={() => handleEditRow(rowIndex)}
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

      // cellRenderer: taskNameRenderer,
    },
    {
      headerName: "Deadline",
      field: "deadline",
      // cellRenderer: deadlineRenderer,
      cellEditor: CustomDateTimeEditor,
      cellEditorParams: { rowIndex: hoveredRow },
      // cellEditorParams: {
      //   getRowIndex: (params) => params.node.rowIndex, // Pass a function to get the rowIndex
      // },
    },
    {
      headerName: "Status",
      field: "status",
      // cellRenderer: statusRenderer,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: ["Completed", "In-progress", "Pending"],
      },
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
      editable: true,
      cellDataType: false,
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
    setNewTaskName("");
    setNewDeadline("");
    setNewStatus("");
    setNewTask({ task_name: "", deadline: "", status: "" });
    setDisplayAddRowError(false);
  };

  const handleDeleteRow = (index) => {
    const storedData = JSON.parse(localStorage.getItem("todos"));
    const updatedData = storedData.filter((row, i) => {
      return i !== index;
    });
    setRowData(updatedData);
  };

  const handleSaveRow = (index) => {
    // const editedTaskName = params.value;
    // const rowIndex = rowData.findIndex((row) => row === params.data);
    console.log("\nEdited Deadline: ", editedTask.deadline);
    const updatedRowData = [...rowData];
    updatedRowData[index] = {
      ...updatedRowData[index],
      deadline: editedTask.deadline,
    };
    setRowData(updatedRowData);
    setEditStatus(false);
  };

  // const handleEditRow = (rowData, rowIndex) => {
  //   console.log("\n edit is clicked");
  //   setEditStatus(true);
  //   if (!Array.isArray(rowData)) {
  //     console.error("rowData is not an array.");
  //     return;
  //   }
  // };
  const handleEditRow = useCallback((rowIndex) => {
    // setCurrentEditNode(rowIndex);
    gridRef.current.api.setFocusedCell(rowIndex, "task_name");
    gridRef.current.api.startEditingCell({
      rowIndex,
      colKey: "task_name",
    });
  }, []);

  // const handleInputChange = (selectedValue, field) => {
  //   // const { value } = event.target;
  //   setNewTask({ ...newTask, [field]: selectedValue });
  // };
  // const handleTextBoxInputChange = (event, field) => {
  //   const { value } = event.target;
  //   // setNewTask({ ...newTask, [field]: value });
  //   setNewTask((prevState) => ({ ...prevState, [field]: value }));
  // };
  // const handleDateChange = (dateValue) => {
  //   const formattedDate = dayjs(dateValue).format("MMM DD YYYY, h:mm a");
  //   setNewDeadline(formattedDate);
  //   // setNewTask({ ...newTask, deadline: formattedDate });
  // };
  return (
    <DataContext.Provider
      value={{
        gridRef,
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
        editedTask,
        setEditedTask,
        options,
        // taskNameRenderer,
        // deadlineRenderer,
        // statusRenderer,
        actionsRenderer,
        columnDefs,
        defaultColDef,
        handleAddRow,
        // handleInputChange,
        handleDeleteRow,
        // handleEditRow,
        // handleTextBoxInputChange,
        // handleDateChange,
        handleSaveRow,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };

// const taskNameRenderer = (params) => {
//   console.log("\nInside taskRenderer...");
//   console.log("\nnew task: ", newTask);

//   if (editStatus) {
//     console.log("\nafter updation new task...", newTask);
//     return (
//       <TextField
//         id="outlined-required"
//         value={editedTask.task_name}
//         onChange={(e) =>
//           setEditedTask({ ...editedTask, task_name: e.target.value })
//         }
//         label="Task Name"
//         defaultValue=""
//       />
//     );
//   } else {
//     return <p className="text-left">{params.value}</p>;
//   }
// };

// const deadlineRenderer = (params) => {
//   console.log("\nInside deadlineRenderer...");
//   newTask.deadline = params.value;
//   if (editStatus) {
//     return (
//       <LocalizationProvider dateAdapter={AdapterDayjs}>
//         {/* <DateTimeField
//           label="Enter Deadlines"
//           value={dayjs(newTask.deadline)}
//           onChange={handleDateChange}
//           disablePast={true}
//           renderInput={(params) => <TextField {...params} />} // Use TextField for rendering
//         /> */}
//         <DateTimePicker
//           label="Select Deadline"
//           value={dayjs(newDeadLine)}
//           onChange={(newDate) =>
//             setNewDeadline(dayjs(newDate).format("MMM DD YYYY, h:mm a"))
//           }
//           disablePast={true}
//           renderInput={(params) => <TextField {...params} />}
//         />
//       </LocalizationProvider>
//     );
//   } else {
//     return <p className="text-left">{params.value}</p>;
//   }
// };

// const statusRenderer = (params) => {
//   console.log("\nInside statusRenderer..");
//   newTask.status = params.value;
//   if (editStatus) {
//     return (
//       // <Dropdown
//       //   className="mt-1"
//       //   options={options}
//       //   onChange={(e) => handleInputChange(e.value, "status")}
//       //   value={newTask.status}
//       //   placeholder="Select status"
//       // />
//       <FormControl required sx={{ m: 1, minWidth: 130 }}>
//         <InputLabel id="demo-simple-select-label">Task Status</InputLabel>
//         <Select
//           labelId="task-status"
//           id="task-status"
//           value={newStatus}
//           label="Task Status"
//           onChange={(e) => setNewStatus(e.target.value)}
//         >
//           <MenuItem value={options[0]}>{options[0]}</MenuItem>
//           <MenuItem value={options[1]}>{options[1]}</MenuItem>
//           <MenuItem value={options[2]}>{options[2]}</MenuItem>
//         </Select>
//       </FormControl>
//     );
//   } else {
//     return <p className="text-left">{params.value}</p>;
//   }
// };
