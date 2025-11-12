import React, { useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';

function TodoForm({ addTodo }) {
  const [task, setTask] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.trim()) return;
    addTodo(task);
    setTask('');
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-3">
      <InputGroup>
        <Form.Control
          type="text"
          placeholder="Tambahkan tugas baru..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <Button type="submit" variant="primary">Tambah</Button>
      </InputGroup>
    </Form>
  );
}

export default TodoForm;
