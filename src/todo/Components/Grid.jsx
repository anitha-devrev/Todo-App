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
    onCellValueChanged,
  } = useContext(DataContext);

  const gridOptions = {
    stopEditingWhenCellsLoseFocus: false,
    reactiveCustomComponents: true,
    rowStyle: { background: "transparent" },
  };
  return (
    <div className="ag-theme-alpine h-96 w-[800px] custom-rounded shadow-xl">
      <AgGridReact
        ref={gridRef}
        columnDefs={columnDefs}
        rowData={rowData}
        onCellMouseOver={(event) => {
          setHoveredRow(event.node.rowIndex);
          console.log("Hovered row: ", hoveredRow);
        }}
        onCellMouseOut={() => setHoveredRow(null)}
        defaultColDef={defaultColDef}
        editType="fullRow"
        gridOptions={gridOptions}
        onCellValueChanged={onCellValueChanged}
        rowHeight={50}
        suppressClickEdit
        suppressMovableColumns
      />
    </div>
  );
};

export default Grid;
