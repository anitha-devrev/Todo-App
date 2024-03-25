import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import "../styles/grid.css";
import DateTimePicker from "react-datetime-picker";
import Modal from "react-modal";

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
    <div className="ag-theme-alpine grid-container ml-200" style={{ height: '400px', width: '600px' }}>
      
      
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
        <input className='h-10 border rounded-lg pl-3'
          type="text"
          value={newTask.task_name}
          onChange={(e) => handleTextBoxInputChange(e, 'task_name')}
          placeholder="Enter Task Name"
        />
        <input className='h-10 border rounded-lg pl-3'
          type="text"
          value={newTask.deadline}
          onChange={(e) => handleTextBoxInputChange(e, 'deadline')}
          placeholder="Enter Deadline"
        />
        <Dropdown className='mt-1'
            options={options} 
            onChange={(e) => handleInputChange(e.value, 'status')} 
            value={newTask.status} 
            placeholder="Select status" 
        />
        
        <button className='border border-sky-500 rounded-lg p-3'
         onClick={handleAddRow}>Add Row</button>
      </div>
      <Modal
      isOpen={displayAddRowError}
      onRequestClose={() => setDisplayAddRowError(false)}
    //   className='border-2 border-sky-500 mt-5 rounded-lg p-5'
      style={{
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '300px', 
            padding: '20px', 
            textAlign: 'center',
            // border: '1px solid brown',
            background: 'linear-gradient(to right,red, brown)'
        }
      }}
      >
        <div className='flex justify-end'>
        <button className='border-2 border-white-500 rounded-lg p-2 px-3 text-white hover:bg-white hover:text-red-600' onClick={()=> setDisplayAddRowError(false)}>X</button>
        </div>
        <h2 className='text-white mt-2'>Please fill in all the fields to add a task!</h2>
        
      </Modal>
    </div>
    </div>
  );
};

export default GridNew;
