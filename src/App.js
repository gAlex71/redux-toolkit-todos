import React, { useState } from 'react';
import './App.css';
import TodoList from './components/TodoList';
import InputField from './components/InputField';
import { useDispatch } from 'react-redux';
import { addTodo } from './store/todoSlice';

// useSelector - достать элемент из store
// useDispatch - выполнить какое-либо действие

const App = () => {
	const [text, setText] = useState('');
	const dispatch = useDispatch();

	const addTask = () => {
		dispatch(addTodo({ text }));
    setText('');
	};

	return (
		<div className="App">
			<InputField text={text} handleInput={setText} handleSubmit={addTask} />

			<TodoList />
		</div>
	);
};

export default App;
