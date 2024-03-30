import React, { useState, useEffect, useRef, useMemo, useContext } from "react";
import { DataContext } from "../Components/DataProvider";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "react-dropdown/style.css";
import "../styles/grid.css";
import { Dropdown } from "react-dropdown";
import { DateTimePicker } from "@mui/x-date-pickers";
import { DeleteOutline, Edit } from "@mui/icons-material";
import {
  Select,
  MenuItem,
  TextField,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";
import dayjs from "dayjs";

import Header from "../Components/Header";
import Grid from "../Components/Grid";
import ErrorWindow from "../Components/ErrorWindow";
import AddTask from "../Components/AddTask";

const TodoPage = () => {
  const { editStatus } = useContext(DataContext);
  const gridRef = useRef(null);
  const [hoveredRow, setHoveredRow] = useState(null);

  useEffect(() => {
    if (gridRef.current) {
      const gridApi = gridRef.current.api;
      const handleRowMouseOver = (event) => {
        setHoveredRow(event.node.rowIndex);
        console.log("Hovered row: ", hoveredRow);
      };
      const handleRowMouseOut = () => {
        setHoveredRow(null);
      };

      gridApi.addEventListener("rowMouseOver", handleRowMouseOver);
      gridApi.addEventListener("rowMouseOut", handleRowMouseOut);

      return () => {
        gridApi.removeEventListener("rowMouseOver", handleRowMouseOver);
        gridApi.removeEventListener("rowMouseOut", handleRowMouseOut);
      };
    }
  }, [gridRef]);
  return (
    <div className="flex flex-col justify-center align-middle h-500 w-800 grid-container min-h-screen bg-gradient-to-br from-blue-500 to-purple-500">
      <Header />
      <div className="flex flex-col justify-center items-center justify-evenly h-[600px] w-[900px] bg-white rounded-xl bg-opacity-20 shadow-xl">
        <AddTask />
        <Grid />
      </div>

      <ErrorWindow />
      {/*  */}
    </div>
  );
};

export default TodoPage;
