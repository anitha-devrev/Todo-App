import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import "../styles/grid.css";
// import DateTimePicker from "react-datetime-picker";

const GridNew = () => {
  const [rowData, setRowData] = useState([]);
  const [newTask, setNewTask] = useState({ task_name: '', deadline: '', status: '' });
  const [hoveredRow, setHoveredRow] = useState(-1); 

  const [displayAddRowError, setDisplayAddRowError]  = useState(false);
  const handleAddRow = () => {
    if (!newTask.task_name || !newTask.deadline || !newTask.status) {
        setDisplayAddRowError(true);
        return;
      }
  
      setRowData([...rowData, newTask]);
      setNewTask({ task_name: '', deadline: '', status: '' });
      setDisplayAddRowError(false); 
  };

  const handleDeleteRow = (index) => {
    const updatedRows = rowData.filter((_, i) => i !== index);
    setRowData(updatedRows);
  };

  const options = [
    'Completed', 'In-progress', 'Pending'
  ];
  const defaultOption = options[0];
  

  const handleInputChange = (selectedValue, field) => {
    // const { value } = event.target;
    setNewTask({ ...newTask, [field]: selectedValue });
  };
  const handleTextBoxInputChange = (event, field) => {
     const { value } = event.target;
    setNewTask({ ...newTask, [field]: value });
  };

  const taskNameRenderer = (params) => (
    <input
      type="text"
      value={params.value || ''}
      onChange={(e) => handleInputChange(e, 'task_name')}
    />
  );

  const deadlineRenderer = (params) => (
    <input
      type="text"
      value={params.value || ''}
      onChange={(e) => handleInputChange(e, 'deadline')}
    />
  );

  const statusRenderer = (params) => (
    <input
      type="text"
      value={params.value || ''}
      onChange={(e) => handleInputChange(e, 'status')}
    />
  );

  const actionsRenderer = ({ rowIndex }) => {
    if (rowIndex === hoveredRow) {
      return (
        <div>
          {/* <button onClick={() => handleEditRow(rowIndex)}>Edit</button> */}
          <button onClick={() => handleDeleteRow(rowIndex)}>Delete</button>
        </div>
      );
    }
    return null;
  };

  const columnDefs = [
    { headerName: 'Task Name', field: 'task_name', cellRenderer: taskNameRenderer },
    { headerName: 'Deadline', field: 'deadline', cellRenderer: deadlineRenderer },
    { headerName: 'Status', field: 'status', cellRenderer: statusRenderer },
    { headerName: 'Actions', cellRenderer: actionsRenderer },
  ];

  return (
    <div>
    <div className='text-5xl mt-10 bg-sky-700'>To-do-app</div>
    <div className="ag-theme-alpine grid-container" style={{ height: '400px', width: '600px' }}>
      
      <div></div>
      <AgGridReact
        columnDefs={columnDefs}
        rowData={rowData}
        rowClassRules={{
          'hovered-row': (params) => params.rowIndex === hoveredRow
        }}
        onRowMouseOver={(event) => setHoveredRow(event.node.rowIndex)}
        onRowMouseOut={() => setHoveredRow(-1)}
      />
      <div className = 'border-2 border-sky-500 mt-5 rounded-lg p-5 flex flex-row justify-between'>
        <input
          type="text"
          value={newTask.task_name}
          onChange={(e) => handleTextBoxInputChange(e, 'task_name')}
          placeholder="Enter Task Name"
        />
        <input
          type="text"
          value={newTask.deadline}
          onChange={(e) => handleTextBoxInputChange(e, 'deadline')}
          placeholder="Enter Deadline"
        />
        <Dropdown options={options} onChange={(e) => handleInputChange(e.value, 'status')} value={newTask.status} placeholder="Select status" />
        {/* <input
          type="dropdown"
          value={}
          onChange={}
          placeholder="Enter Status"
        /> */}
        <button onClick={handleAddRow}>Add Row</button>
      </div>

    </div>
    </div>
  );
};

export default GridNew;
