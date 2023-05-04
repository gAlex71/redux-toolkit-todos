import React, { useState, useEffect } from 'react';
import './App.css';
import TodoList from './components/TodoList';
import InputField from './components/InputField';
import { useDispatch, useSelector } from 'react-redux';
import { addNewTodo, fetchTodos } from './store/todoSlice';

// useSelector - достать элемент из store
// useDispatch - выполнить какое-либо действие

const App = () => {
	const [text, setText] = useState('');
	const dispatch = useDispatch();
	const {status, error} = useSelector(state => state.todos);

	useEffect(() => {
		dispatch(fetchTodos());
	}, [dispatch]);

	const addTask = () => {
		dispatch(addNewTodo(text));
    	setText('');
	};

	return (
		<div className="App">
			<InputField text={text} handleInput={setText} handleSubmit={addTask} />

			{status === 'loading' && <h2>Loading...</h2>}
			{error && <h2>Something went wrong</h2>}

			<TodoList />
		</div>
	);
};

export default App;
