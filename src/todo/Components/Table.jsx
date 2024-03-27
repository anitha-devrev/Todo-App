import React, { useContext } from "react";
import { DataContext } from "./DataProvider";
import { AgGridReact } from "ag-grid-react";

const Table = () => {
  const {
    columnDefs,
    defaultColDef,
    rowData,
    setRowData,
    hoveredRow,
    setHoveredRow,
  } = useContext(DataContext);

  return (
    <div
      className="ag-theme-alpine"
      style={{ height: "400px", width: "800px" }}
    >
      <AgGridReact
        columnDefs={columnDefs}
        rowData={rowData}
        rowClassRules={{
          "hovered-row": (params) => params.rowIndex === hoveredRow,
        }}
        onCellMouseOver={(event) => {
          setHoveredRow(event.node.rowIndex);
          console.log("Hovered row: ", hoveredRow);
        }}
        onCellMouseOut={() => setHoveredRow(null)}
        defaultColDef={defaultColDef}
      />
    </div>
  );
};

export default Table;
