import React, { useState,useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import "../styles/grid.css"
import DateTimePicker from "react-datetime-picker"
// import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

const TextComponent = ({ todoInput, setTodoInput }) => {
  return (
    <input
      type="text"
      placeholder='New task'
      value={todoInput}
      onChange={e => setTodoInput(e.target.value)}
    />
  );
};

const Grid = () => {
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState('');
  const [cols, setCols] = useState([
    { field: "Task Name", cellRenderer: TextComponent },
    { field: "Deadline" },
    { field: "Status" },
  ]);
  const [dateTime, setDateTime] = useState()

  const handleChange= (newDateTime) => {
    setDateTime(newDateTime);
  }

  const handleAddTodo = () => {
    if (todoInput.trim() !== '') {
      setTodos([...todos, { todo: todoInput }]);
      setTodoInput('');
    }
    const newColDefs = [
      ...cols,
      {headerName: "New Task", field: "newTask"}
    ]
    setCols(newColDefs)
  };
  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
    }),
    []
  );
  const handleRemoveTodo = () => {
    const selectedNodes = gridApi.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    const remainingTodos = todos.filter(todo => !selectedData.includes(todo));
    setTodos(remainingTodos);
  };

  let gridApi;

  const onGridReady = params => {
    gridApi = params.api;
  };
  const textboxRenderer = (params) => {
    return (
      <input
        type="text"
        value={params.value}
        onChange={(e) => params.setValue(e.target.value)}
      />
    );
  };

  return (
    <div>
      <div className='text-5xl mt-10 bg-sky-700'>To-do-app</div>
      {/* <div className= "text-box" style={{ marginBottom: '10px' }}>
      </div> */}
      <div
        className='ag-theme-alpine grid-container'
        style={{ width: '50%', height: '300px' }}
      >
        {/* <h className='mt-100px'>Tailwind test</h> */}
        <AgGridReact
          columnDefs={cols}
          rowData={todos}
          rowSelection="multiple"
          onGridReady={onGridReady}
          defaultColDef={defaultColDef}
          frameworkComponents={{ textboxRenderer }}
        ></AgGridReact>
        {/* <button className='mt-200' onClick={handleAddTodo}>Add Task</button> */}
        <div className = 'add-task'>
        <input
          type="text"
          onChange={e => setTodoInput(e.target.value)}
          value={todoInput}
          placeholder="Enter todo..."
        />

       <DateTimePicker
        onChange={handleChange}
        value={dateTime}
        format="y-MM-dd HH:mm:ss"
        className="w-100 p-3 border rounded-md"/>
      
        
        <button id="add-todo" onClick={handleAddTodo}> Add Todo</button>
       
        </div>
    
      </div>
      
    </div>
  );
};

export default Grid;
