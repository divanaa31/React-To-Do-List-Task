import React, { useState } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { Container, Row, Col } from 'react-bootstrap';

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (task) => {
    setTodos([...todos, { id: Date.now(), task, completed: false }]);
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const updateTodo = (id, updatedTask) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, task: updatedTask } : todo
    ));
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="text-center mb-4 text-primary">To-Do List</h2>
          <TodoForm addTodo={addTodo} />
          <TodoList 
            todos={todos} 
            toggleComplete={toggleComplete} 
            deleteTodo={deleteTodo}
            updateTodo={updateTodo}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
