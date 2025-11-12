import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function TaskForm({ addTask }) {
  const [task, setTask] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      addTask(task);
      setTask('');
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-3">
      <Form.Group className="d-flex">
        <Form.Control 
          type="text" 
          placeholder="Tambahkan tugas baru..." 
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <Button type="submit" variant="primary" className="ms-2">
          Tambah
        </Button>
      </Form.Group>
    </Form>
  );
}

export default TaskForm;
