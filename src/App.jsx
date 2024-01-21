import { useEffect, useState } from "react";
import "./styles.css"
// import TaskLogo from './Task.svg';
import TaskSlogan from './taskSlogan.svg'
import { NewTodoForm } from "./NewTodoForm";
import { TodoList } from "./ToDoList";

export default function App() {
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS")
    
    return JSON.parse(localValue)
  })

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos))
  }, [todos])

  function addTodo(title) {
    setTodos((currentTodos) => {
      return [
        ...currentTodos,
      {id: crypto.randomUUID(), title, completed: false },
      ]
    })
  }
  
  function toggleTodo(id, completed) {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed }
        }

        return todo
      })
    })
  }

  function deleteTodo(id) {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id)
    })
  }

  return (
    <>
    <img src={TaskSlogan} />
    {/* <div style={{ position: 'absolute', top: 0, left: 0, padding: '10px' }}>
      <img
        src={TaskLogo} alt="Your Logo Alt Text"
        style={{ width: '50%', height: '50%' }}
      />
  </div> */}
      
      <NewTodoForm onSubmit={addTodo} />
      <h1 className="header">Your Tasks</h1>
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo}/>
    </>
  )
}