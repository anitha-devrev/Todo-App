import React, { useState, useEffect, useRef, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import "../styles/grid.css";
// import DateTimePicker from "react-datetime-picker";
import Modal from "react-modal";
import  {DateTimePicker}  from '@mui/x-date-pickers';
import {DeleteOutline, Edit} from '@mui/icons-material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateTimeField } from "@mui/x-date-pickers/DateTimeField";
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';

const GridNew = () => {
  const gridRef = useRef(null);
  const [rowData, setRowData] = useState([]);
  const [newTask, setNewTask] = useState({ task_name: '', deadline: '', status: '' });
  
  const [hoveredRow, setHoveredRow] = useState(null); 

  const [editStatus, setEditStatus] = useState({
    editable: false
  })
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

        gridApi.addEventListener('rowMouseOver', handleRowMouseOver);
        gridApi.addEventListener('rowMouseOut', handleRowMouseOut);
    
        return () => {
          gridApi.removeEventListener('rowMouseOver', handleRowMouseOver);
          gridApi.removeEventListener('rowMouseOut', handleRowMouseOut);
        };
    }
}, [gridRef]);

    

  const handleDeleteRow = (index) => {
    const updatedRows = rowData.filter((_, i) => i !== index);
    setRowData(updatedRows);
  };

//   const handleEditRow = (rowData, rowIndex) => {
//     const updatedRowData = rowData.map((row,index) => {
//         if(index == rowIndex) {
//             return {
//                 ...row,
//                 task_name: <input type="text" defaultValue={row.task_name} />,
//           deadline: (
//             <DateTimePicker
//               renderInput={(props) => <input {...props} />}
//               defaultValue={new Date(row.deadline)}
//             />
//           ),
//           status: (
//             <Dropdown className='mt-1'
//             options={options} 
//             onChange={(e) => handleInputChange(e.value, 'status')} 
//             value={newTask.status} 
//             placeholder="Select status" 
//         />
//           ),
//           actions: <Edit onClick={() => handleEditRow(rowData, rowIndex)} />,
//             };
//         }
        
//         return row;
//     });
//         return updatedRowData;
//   }

const handleEditRow = (rowData, rowIndex) => {
    if (!Array.isArray(rowData)) {
        console.error("rowData is not an array.");
        return;
    }
    setEditStatus({editable: true})
    const updatedRowData = rowData.map((row, index) => {
        if (index === rowIndex) {
            return {
                ...row,
                task_name: <input type="text" defaultValue={row.task_name} />,
                deadline: (
                    <DateTimePicker
                        renderInput={(props) => <input {...props} />}
                        defaultValue={new Date(row.deadline)}
                    />
                ),
                status: (
                    <Dropdown
                        className='mt-1'
                        options={options}
                        onChange={(e) => handleInputChange(e.value, 'status')}
                        value={newTask.status}
                        placeholder="Select status"
                    />
                ),
                actions: <Edit onClick={() => handleEditRow(rowData, rowIndex)} />,
            };
        }
        return row;
    });
    
    return updatedRowData;
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
     const {value}  = event.target;
    setNewTask({ ...newTask, [field]: value });
  };
  const handleDateChange = (dateValue) => {
    const formattedDate = dayjs(dateValue).format('MMM DD YYYY, h:mm a');
    setNewTask({...newTask, 'deadline': formattedDate})
  }
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

  const actionsRenderer = ({ rowIndex,node }) => {
    console.log("\nin actionsRenderer.. \nrowIndex = ", rowIndex)
    if (rowIndex === hoveredRow && !node.group) {
      return (
        <div className='flex flex-row justify-between w-20 ml-7'>
            <Edit className='hover:text-blue-600 cursor-pointer' onClick={() => handleEditRow(rowData, rowIndex)} />
            <DeleteOutline className='hover:text-red-600 cursor-pointer'
            onClick={()=> handleDeleteRow(rowIndex)}/>
        </div>
      );
    }
    return <div></div>;
  };
  const columnDefs = [
    { headerName: 'Task Name', field: 'task_name', cellRenderer: taskNameRenderer },
    { headerName: 'Deadline', field: 'deadline', cellRenderer: deadlineRenderer },
    { headerName: 'Status', field: 'status', cellRenderer: statusRenderer },
    { headerName: 'Edit/Delete',field: 'actions', cellRenderer: actionsRenderer, cellRendererParams: { rowIndex: hoveredRow }, filter: false} ,
  ];
  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
    }),
    []
  );

  return (
    <div>
    <div className='text-5xl text-white mt-10 bg-sky-700 py-3'>To-do-app</div>
    <div className='mt-10 flex flex-col h-400 w-800'>
    <div className="ag-theme-alpine grid-container " 
    style={{ height: '400px', width: '800px' }}
    >
      
      
      <AgGridReact
        columnDefs={columnDefs}
        rowData={rowData}
        rowClassRules={{
          'hovered-row': (params) => params.rowIndex === hoveredRow
        }}
        onCellMouseOver={(event) => {
            setHoveredRow(event.node.rowIndex)
            console.log("Hovered row: ", hoveredRow);
        }}
        onCellMouseOut={() => setHoveredRow(null)}
        
        defaultColDef={defaultColDef}
      />
      <div className = 'border-2 border-sky-500 mt-5 rounded-lg p-5 flex flex-row justify-between'>
        <input className='h-10 border rounded-lg pl-3'
          type="text"
          value={newTask.task_name}
          onChange={(e) => handleTextBoxInputChange(e, 'task_name')}
          placeholder="Enter Task Name"
        />
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimeField
            label="Enter Deadlines"
            value={dayjs(newTask.deadline)}   /*buggy*/
            onChange={handleDateChange}
            disablePast='true'
            renderInput={(params) => <TextField {...params} />} // Use TextField for rendering
       />
    </LocalizationProvider>
        {/* <input className='h-10 border rounded-lg pl-3'
          type="text"
          value={newTask.deadline}
          onChange={(e) => handleTextBoxInputChange(e, 'deadline')}
          placeholder="Enter Deadline"
        /> */}
        <Dropdown className='mt-1'
            options={options} 
            onChange={(e) => handleInputChange(e.value, 'status')} 
            value={newTask.status} 
            placeholder="Select status" 
        />
        
        <button className='border border-sky-500 rounded-lg p-3 text-sky-800 hover:bg-sky-500 hover:text-white'
         onClick={handleAddRow}>Add Task</button>
      </div>
      
        <div>
            <br></br>
            Hovered row: {hoveredRow}
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
        <h2 className='text-white mt-2'>Please fill in all the fields to add a task! Incase of date
        enter future or present date and time past is not allowed!</h2>
        
      </Modal>
    </div>
    </div>
    </div>
  );
};

export default GridNew;
