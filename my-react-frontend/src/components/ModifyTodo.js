import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Url } from './Url';

const UnifiedTodos = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  // Fetch all todos from the backend
  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${Url}/todos`);
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  // Mark a todo as completed
  const handleComplete = async (todoId) => {
    try {
      await axios.put(`${Url}/todos/complete`, {
        todo_id: todoId,
      });
      // Refresh the list
      fetchTodos();
    } catch (error) {
      console.error('Error completing todo:', error);
    }
  };

  // Delete a todo
  const handleDelete = async (todoId) => {
    try {
      await axios.delete(`${Url}/todos/delete`, {
        data: { todo_id: todoId },
      });
      // Refresh the list
      fetchTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  // Separate incomplete and completed todos
  const incompleteTodos = todos.filter((todo) => !todo.todo_completion);
  const completedTodos = todos.filter((todo) => todo.todo_completion);

  return (
    <div>
      <h1>Todos</h1>

      {/* Incomplete todos with complete & delete icons */}
      <h2>Incomplete</h2>
      <ul>
        {incompleteTodos.map((todo) => (
          <li key={todo.todo_id}>
            <button onClick={() => handleComplete(todo.todo_id)}>
              ✅
            </button>{' '}
            {todo.todo_name}{' '}
            <button onClick={() => handleDelete(todo.todo_id)}>
              🗑️
            </button>
          </li>
        ))}
      </ul>

      {/* Completed todos with delete icon */}
      <h2>Completed</h2>
      <ul>
        {completedTodos.map((todo) => (
          <li key={todo.todo_id}>
            {todo.todo_name}{' '}
            <button onClick={() => handleDelete(todo.todo_id)}>
              🗑️
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UnifiedTodos;