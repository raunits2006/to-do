import React, { useState } from 'react';
import axios from 'axios';

const AddTodo = () => {
  const [todoName, setTodoName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/todos', { todo_id: 0, todo_name: todoName });
      setTodoName('');
      // Force page reload (simple approach)
      window.location.reload();
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={todoName}
        onChange={(e) => setTodoName(e.target.value)}
        placeholder="New Todo"
      />
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default AddTodo;