import React, { useState, useEffect, useRef, useMemo } from "react";
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
import Table from "../Components/Table";
import ErrorWindow from "../Components/ErrorWindow";
import AddTask from "../Components/AddTask";

const TodoPage = () => {
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
    <div className="mt-10 flex flex-col h-500 w-800 grid-container">
      <Header />
      <Table />
      <AddTask />
      <ErrorWindow />
      <div>
        <br></br>
        {console.log("\nhovered row : ", hoveredRow)} Hovered row: {hoveredRow}
      </div>
    </div>
  );
};

export default TodoPage;
