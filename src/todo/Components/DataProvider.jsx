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
import CustomTextEditor from "./CustomTextEditor";
import CustomSelectEditor from "./CustomSelectEditor";
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
  const updatedRowData = [...rowData];

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(rowData));
  }, [rowData]);

  const actionsRenderer = ({ rowIndex, api }) => {
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
      cellEditor: CustomTextEditor,
    },
    {
      headerName: "Deadline",
      field: "deadline",
      cellEditor: CustomDateTimeEditor,
      cellEditorParams: { rowIndex: hoveredRow },
    },
    {
      headerName: "Status",
      field: "status",
      cellEditor: CustomSelectEditor,
      // cellEditorParams: {
      //   values: ["Completed", "In-progress", "Pending"],
      // },
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
  const onCellValueChanged = (event) => {
    const newValue = event.newValue;
    const columnName = event.column.colId;
    const rowIndex = event.node.rowIndex;

    console.log("New value:", newValue);
    console.log("Column name:", columnName);
    console.log("Row index:", rowIndex);

    // setEditedTask((prevState) => ({
    //   ...prevState,
    //   [columnName]: newValue,
    // }));

    if (columnName === "task_name") {
      setEditedTask((prevState) => ({
        ...prevState,
        task_name: newValue,
      }));
    }
    if (columnName === "status") {
      setEditedTask((prevState) => ({
        ...prevState,
        status: newValue,
      }));
    }
  };
  const handleSaveRow = (index) => {
    console.log("\nEdited taskname: ", updatedRowData[index].task_name);
    console.log("\nEdited Deadline: ", updatedRowData[index].deadline);
    console.log("\nEdited status: ", updatedRowData[index].status);

    if (editedTask.task_name)
      updatedRowData[index] = {
        ...updatedRowData[index],
        task_name: editedTask.task_name,
      };
    if (editedTask.deadline)
      updatedRowData[index] = {
        ...updatedRowData[index],
        deadline: editedTask.deadline,
      };
    if (editedTask.status)
      updatedRowData[index] = {
        ...updatedRowData[index],
        status: editedTask.status,
      };
    setRowData(updatedRowData);
    setEditedTask({ task_name: "", deadline: "", status: "" });
    setEditStatus(false);
  };

  const handleEditRow = useCallback((rowIndex) => {
    gridRef.current.api.setFocusedCell(rowIndex, "task_name");
    gridRef.current.api.startEditingCell({
      rowIndex,
      colKey: "task_name",
    });
  }, []);

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
        actionsRenderer,
        columnDefs,
        defaultColDef,
        handleAddRow,
        handleDeleteRow,
        handleSaveRow,
        onCellValueChanged,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
