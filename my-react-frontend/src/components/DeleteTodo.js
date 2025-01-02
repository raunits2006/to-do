import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DeleteTodo = () => {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    const response = await axios.get('http://localhost:8000/todos');
    setTodos(response.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleDelete = async (todoId) => {
    await axios.delete('http://localhost:8000/todos/delete', {
      data: { todo_id: todoId },
    });
    // Re-fetch todos to refresh the list
    fetchTodos();
  };

  return (
    <div>
      <h1>Todos</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.todo_id}>
            {todo.todo_name} - {todo.todo_completion ? 'Completed' : 'Pending'}
            {' '}
            <button onClick={() => handleDelete(todo.todo_id)}>
              {/* Trash can icon (emoji or a library icon) */}
              🗑️
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DeleteTodo;
