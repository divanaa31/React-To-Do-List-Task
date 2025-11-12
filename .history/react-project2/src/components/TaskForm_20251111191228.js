import React, { useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';

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
      <InputGroup>
        <Form.Control
          type="text"
          placeholder="💖 Tulis tugas baru..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="rounded-start-pill shadow-sm border-pink"
        />
        <Button
          type="submit"
          variant="pink"
          className="rounded-end-pill px-4 fw-bold shadow-sm"
        >
          Tambah
        </Button>
      </InputGroup>
    </Form>
  );
}

export default TaskForm;
