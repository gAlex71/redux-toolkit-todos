import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchTodos = createAsyncThunk(
	'todos/fetchTodos', 
	async function (_, {rejectWithValue}) {
		try {
			const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');

			if(!response.ok){
				throw new Error('Something went wrong');
			}

			const data = await response.json();
			return data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
});

const todoSlice = createSlice({
	name: 'todos',
	initialState: {
		todos: [],
		status: null,
		error: null,
	},
	reducers: {
		addTodo(state, action) {
			state.todos.push({
				id: new Date().toISOString(),
				text: action.payload.text,
				completed: false,
			});
		},
		removeTodo(state, action) {
			state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
		},
		toggleTodoComplete(state, action) {
			const toggleTodo = state.todos.find((todo) => todo.id === action.payload.id);
			toggleTodo.completed = !toggleTodo.completed;
		},
	},
	extraReducers: {
		//Статус ожидание
		[fetchTodos.pending]: (state) => {
			state.status = 'loading';
			state.error = null;
		},
		// Выполненный запрос
		[fetchTodos.fulfilled]: (state, action) => {
			state.status = 'resolved';
			state.todos = action.payload;
		},
		// Ошибка
		[fetchTodos.rejected]: (state, action) => {
			state.status = 'rejected';
			state.error = action.payload;
		},
	},
});

//actions создаются автоматически
export const { addTodo, removeTodo, toggleTodoComplete } = todoSlice.actions;

export default todoSlice.reducer;
