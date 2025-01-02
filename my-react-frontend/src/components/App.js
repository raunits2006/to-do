import React from 'react';
import AddTodo from './AddTodo';
import ModifyTodo from './ModifyTodo';

const App = () => {
    return (
        <div>
            <h1>Todo App</h1>
            <AddTodo />
            <ModifyTodo />
            
        </div>
    );
};

export default App;