import React, { useState } from 'react';
import './App.css';
import TodoList from './components/TodoList';
import InputField from './components/InputField';

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
      <InputField text={text} handleInput={setText} handleSubmit={addTodo}/>

      <TodoList 
        todos={todos} 
        removeTodo={removeTodo} 
        toggleCompleted={toggleCompleted}
      />
    </div>
  );
}

export default App;
