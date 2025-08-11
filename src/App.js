import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  let[todolist,setTodolist]=useState([])

  let addToDoList=(event)=>{
    event.preventDefault();
    let toDoName=event.target.toDoName.value;
   
    if(toDoName === '') {
    toast.error("Please enter a task before adding!");
    return; 
    }
    else if(!todolist.includes(toDoName)){
      let finalTododlist=[...todolist,toDoName]
      setTodolist(finalTododlist)
      event.target.toDoName.value = '';
    }

    else{
      toast.error("To Do Name already exists!");
      event.target.toDoName.value = '';
    }
    
  }

  let list=todolist.map((value,index)=>{
    return(
      < TodolistItems value={value}  key={value} indexNumber={index} todolist={todolist} setTodolist={setTodolist}/>
    )
  })

  return (
    <div className='main'>
      <h1>ToDo APP</h1>
      <form className='title-div mt-5' onSubmit={addToDoList}> 
        <input className='todo-input' type='text' placeholder='Enter Title' name='toDoName'/> 
        <button className='purple-btn' type='submit'>Add</button>
      </form>
      
      <div className='outerDiv'>
        <ul>
          {list}
        </ul>
      </div>

      <ToastContainer />
    </div>
         
    
  );
}

export default App;

function TodolistItems({value, indexNumber, todolist, setTodolist }){

  let[status,setStatus]=useState(false)
  let deleteRow=()=>{
    let finalData=todolist.filter((v,i)=>i!=indexNumber)
    setTodolist(finalData);
  }

  let checkStatus=()=>{
    setStatus(!status)
  }

  return(
      <li className={(status)? 'completeTodo' : ''} onClick={checkStatus}>{value} <span onClick={deleteRow}> <i className="bi bi-trash3"></i></span></li> 
   
  )
}
