import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CompleteTodo = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:8000/todos');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleComplete = async (todoId) => {
    try {
      await axios.put('http://localhost:8000/todos/complete', {
        todo_id: todoId,
      });
      fetchTodos();
    } catch (error) {
      console.error('Error completing todo:', error);
    }
  };

  // Separate incomplete and completed todos
  const incompleteTodos = todos.filter((todo) => !todo.todo_completion);
  const completedTodos = todos.filter((todo) => todo.todo_completion);

  return (
    <div>
      <h1>Todos</h1>

      <h2>Incomplete</h2>
      <ul>
        {incompleteTodos.map((todo) => (
          <li key={todo.todo_id}>
            <button onClick={() => handleComplete(todo.todo_id)}>✅</button>
            {' '}
            {todo.todo_name}
          </li>
        ))}
      </ul>

      <h2>Completed</h2>
      <ul>
        {completedTodos.map((todo) => (
          <li key={todo.todo_id}>{todo.todo_name}</li>
        ))}
      </ul>
    </div>
  );
};

export default CompleteTodo;