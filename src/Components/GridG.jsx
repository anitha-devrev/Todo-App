import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const GridG = () => {
  const [rowData, setRowData] = useState([]);
  const [newTask, setNewTask] = useState({ task_name: '', deadline: '', status: '' });

  const handleAddRow = () => {
    setRowData([...rowData, newTask]);
    setNewTask({ task_name: '', deadline: '', status: '' });
  };

  const handleDeleteRow = (index) => {
    const updatedRows = rowData.filter((_, i) => i !== index);
    setRowData(updatedRows);
  };

  const handleEditRow = (index) => {
    // Logic to edit row
  };

  const handleInputChange = (event, field) => {
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

  const actionsRenderer = ({ rowIndex }) => (
    <div>
      <button onClick={() => handleEditRow(rowIndex)}>Edit</button>
      <button onClick={() => handleDeleteRow(rowIndex)}>Delete</button>
    </div>
  );

  const columnDefs = [
    { headerName: 'Task Name', field: 'task_name', cellRenderer: taskNameRenderer },
    { headerName: 'Deadline', field: 'deadline', cellRenderer: deadlineRenderer },
    { headerName: 'Status', field: 'status', cellRenderer: statusRenderer },
    { headerName: 'Actions', cellRenderer: actionsRenderer },
  ];

  return (
    <div className="ag-theme-alpine border-red-600" style={{ height: '400px', width: '600px' }}>
      <AgGridReact
        columnDefs={columnDefs}
        rowData={rowData}
      />
      <h className='text-2xl'>Tailwind test</h>
      <div className='border-red-100'>
        <input
          type="text"
          value={newTask.task_name}
          onChange={(e) => handleInputChange(e, 'task_name')}
          placeholder="Enter Task Name"
        />
        <input
          type="text"
          value={newTask.deadline}
          onChange={(e) => handleInputChange(e, 'deadline')}
          placeholder="Enter Deadline"
        />
        <input
          type="text"
          value={newTask.status}
          onChange={(e) => handleInputChange(e, 'status')}
          placeholder="Enter Status"
        />
        <button onClick={handleAddRow}>Add Row</button>
      </div>
    </div>
  );
};

export default GridG;

