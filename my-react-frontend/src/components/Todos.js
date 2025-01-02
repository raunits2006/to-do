import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Todos = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get('http://localhost:8000/todos');
        setTodos(response.data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };
    fetchTodos();
  }, []);

  return (
    <div>
      <h1>Todos</h1>
      <ul>
        {todos && todos.map(todo => (
          <li key={todo.todo_id}>
            {todo.todo_name} - {todo.todo_completion ? 'Completed' : 'Pending'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todos;