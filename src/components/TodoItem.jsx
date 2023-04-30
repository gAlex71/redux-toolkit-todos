import React from 'react';
import {useDispatch} from 'react-redux';
import {removeTodo, toggleTodoComplete} from '../store/todoSlice';

const TodoItem = ({id, text, completed}) => {
	const dispatch = useDispatch();

	const removeItem = (id) => dispatch(removeTodo({id}));
	const selectedItem = (id) => dispatch(toggleTodoComplete({id}));

	return (
		<li>
			<input 
                type="checkbox" 
                checked={completed} 
                onChange={() => selectedItem(id)} 
            />
			<span>{text}</span>
			<span className="delete" onClick={() => removeItem(id)}>
				&times;
			</span>
		</li>
	);
};

export default TodoItem;
