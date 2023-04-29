import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  const addTodo = (e) => {
    if(text.trim().length){
      setTodos([
        ...todos,
        {
          id: new Date().toISOString(),
          text,
          completed: false
        }
      ])
      setText('')
    }
  }

  const removeTodo = (todoId) => {
    setTodos(todos.filter(todo => todo.id !== todoId))
  }

  const toggleCompleted = (todoId) => {
    setTodos(todos.map(todo => {
      if(todo.id !== todoId) return 
      
      return {...todo, completed: !todo.completed}
    }))
  }

  return (
    <div className="App">
      <label>
        <input value={text} onChange={(e) => setText(e.target.value)}/>
        <button onClick={addTodo}>Add todo</button>
      </label>

      <ul>
        {todos.map(todo => 
          <li key={todo.id}>
            <input type='checkbox' checked={todo.completed} onChange={() => toggleCompleted(todo.id)}/>
            <span>{todo.text}</span>
            <span className='delete' onClick={() => removeTodo(todo.id)}>&times;</span>
          </li>
        )}
      </ul>
    </div>
  );
}

export default App;
