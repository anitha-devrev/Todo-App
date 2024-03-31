import React, { useContext } from "react";
import { DataContext } from "./DataProvider";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "../styles/grid.css";

const Grid = () => {
  const {
    gridRef,
    columnDefs,
    defaultColDef,
    rowData,
    setRowData,
    hoveredRow,
    setHoveredRow,
  } = useContext(DataContext);

  const gridOptions = {
    stopEditingWhenCellsLoseFocus: false,
  };
  return (
    <div
      className="ag-theme-alpine h-96 w-[800px] custom-rounded shadow-xl"
      // style={{
      //   height: "400px",
      //   width: "800px",
      //   backgroundColor: "black",
      //   important: "true",
      // }}
    >
      <AgGridReact
        ref={gridRef}
        columnDefs={columnDefs}
        rowData={rowData}
        // rowClassRules={{
        //   "hovered-row": (params) => params.rowIndex === hoveredRow,
        // }}
        onCellMouseOver={(event) => {
          setHoveredRow(event.node.rowIndex);
          console.log("Hovered row: ", hoveredRow);
        }}
        onCellMouseOut={() => setHoveredRow(null)}
        defaultColDef={defaultColDef}
        // rowStyle={{ height: "200px" }}
        editType="fullRow"
        gridOptions={gridOptions}
        suppressClickEdit
        suppressMovableColumns
      />
    </div>
  );
};

export default Grid;
