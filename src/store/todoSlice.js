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

export const deleteTodo = createAsyncThunk(
	'todos/deleteTodo',
	async function (id, {rejectWithValue, dispatch}) {
		try {
			const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {method: 'DELETE'});

			if(!response.ok){
				throw new Error('Can`t delete todo');
			}

			//И так же удаляем локально
			dispatch(removeTodo({id}));

		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
)

export const toggleStatus = createAsyncThunk(
	'todos/toggleStatus',
	async function (id, {rejectWithValue, dispatch, getState}) {
		const todo = getState().todos.todos.find(todo => todo.id === id);

		try {
			const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
				method: 'PATCH',
				headers: {
					'Content-type': 'application-json',
				},
				body: JSON.stringify({
					completed: !todo.completed
				})
			});

			if(!response.ok){
				throw new Error('Can`t toggle todo');
			}

			dispatch(toggleTodoComplete({id}))

		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
)

export const addNewTodo = createAsyncThunk(
	'todos/addNewTodo',
	async function (text, {rejectWithValue, dispatch}) {
		try {
			const newTodo = {
				title: text,
				userId: 1,
				completed: false
			}

			const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
				method: 'POST',
				headers: {
					'Content-type': 'application-json',
				},
				body: JSON.stringify(newTodo)
			});

			if(!response.ok){
				throw new Error('Can`t add todo');
			}

			//Ввиде ответа от сервера получаем новую созданную todo
			const data = await response.json();
			console.log(data);
			dispatch(addTodo(data));

		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
)

const setError = (state, action) => {
	state.status = 'rejected';
	state.error = action.payload;
};

const todoSlice = createSlice({
	name: 'todos',
	initialState: {
		todos: [],
		status: null,
		error: null,
	},
	reducers: {
		addTodo(state, action) {
			state.todos.push(action.payload);
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
		[fetchTodos.rejected]: setError,
		[deleteTodo.rejected]: setError,
		[toggleStatus.rejected]: setError
	},
});

//actions создаются автоматически
const { addTodo, removeTodo, toggleTodoComplete } = todoSlice.actions;

export default todoSlice.reducer;
