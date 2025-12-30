import { useEffect, useState } from 'react'
import './App.css'
import { TodoProvider } from './context/TodoContext';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';

function App() {
  //todos===it is an array
  const [todos, setTodos]=useState([]);
  const addTodo=(todo)=>{
    setTodos((prev)=>[{id:Date.now(), ...todo},...prev])
  }
  /// when return only one exp, (data)=>data.json() or (data)=>(data.json()) or (data)={return data.json()}
  //prev === todos, prevTodo is element of todos, todo it is a msg
  const updateTodo=( id, todo)=>{
    setTodos((prev)=>(prev.map((prevTodo)=>(prevTodo.id===id?todo:prevTodo))))
  }
  const deleteTodo=(id)=>{
    setTodos((prev)=>prev.filter((prevTodo)=>prevTodo.id!=id))
  }
  const toggleCompleted=(id)=>{
    setTodos((prev)=>prev.map((prevTodo)=>prevTodo.id===id ? {...prevTodo, completed: !prevTodo.completed}: prevTodo))
  }
  useEffect(()=>{
    const todos=JSON.parse(localStorage.getItem("todos"));
    if(todos && todos.length>0){
      setTodos(todos);
    }
  }, [])
  useEffect(()=>{
    localStorage.setItem("todos", JSON.stringify(todos))
  },[todos])
  return (
    <TodoProvider value={{todos, addTodo, deleteTodo, updateTodo, toggleCompleted}}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
            <TodoForm/>
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.map((todo)=>(
              <div key={todo.id} className='w-full'>
                <TodoItem todo={todo}/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}
export default App;
