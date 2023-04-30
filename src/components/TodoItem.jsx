import React from 'react';

const TodoItem = ({id, text, completed, removeTodo, toggleCompleted}) => {
	return (
		<li>
			<input 
                type="checkbox" 
                checked={completed} 
                onChange={() => toggleCompleted(id)} 
            />
			<span>{text}</span>
			<span className="delete" onClick={() => removeTodo(id)}>
				&times;
			</span>
		</li>
	);
};

export default TodoItem;
