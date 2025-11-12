import React, { useState } from 'react';
import { ListGroup, Button, Form } from 'react-bootstrap';

function TodoList({ todos, toggleComplete, deleteTodo, updateTodo }) {
  const [editId, setEditId] = useState(null);
  const [newTask, setNewTask] = useState('');

  const handleEdit = (id, task) => {
    setEditId(id);
    setNewTask(task);
  };

  const handleUpdate = (id) => {
    updateTodo(id, newTask);
    setEditId(null);
  };

  return (
    <ListGroup>
      {todos.map((todo) => (
        <ListGroup.Item 
          key={todo.id} 
          className="d-flex justify-content-between align-items-center"
        >
          {editId === todo.id ? (
            <>
              <Form.Control 
                type="text" 
                value={newTask} 
                onChange={(e) => setNewTask(e.target.value)} 
                className="me-2"
              />
              <Button variant="success" onClick={() => handleUpdate(todo.id)}>Simpan</Button>
            </>
          ) : (
            <>
              <span 
                onClick={() => toggleComplete(todo.id)} 
                style={{
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  cursor: 'pointer'
                }}
              >
                {todo.task}
              </span>
              <div>
                <Button 
                  variant="outline-secondary" 
                  size="sm" 
                  onClick={() => handleEdit(todo.id, todo.task)}
                >
                  Edit
                </Button>{' '}
                <Button 
                  variant="outline-danger" 
                  size="sm" 
                  onClick={() => deleteTodo(todo.id)}
                >
                  Hapus
                </Button>
              </div>
            </>
          )}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default TodoList;
