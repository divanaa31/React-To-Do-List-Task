import React, { useState } from 'react';
import TaskForm from './components/TaskForm';
import { Container, Row, Col, ListGroup, Button } from 'react-bootstrap';

function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    setTasks([...tasks, { id: Date.now(), task, completed: false }]);
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(t => 
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const updateTask = (id, newTask) => {
    setTasks(tasks.map(t => 
      t.id === id ? { ...t, task: newTask } : t
    ));
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="text-center mb-4 text-primary">To-Do List</h2>
          <TaskForm addTask={addTask} />

          <ListGroup>
            {tasks.map((t) => (
              <ListGroup.Item 
                key={t.id} 
                className="d-flex justify-content-between align-items-center"
              >
                <span 
                  onClick={() => toggleComplete(t.id)} 
                  style={{ 
                    textDecoration: t.completed ? 'line-through' : 'none',
                    cursor: 'pointer'
                  }}
                >
                  {t.task}
                </span>
                <div>
                  <Button 
                    variant="outline-danger" 
                    size="sm" 
                    onClick={() => deleteTask(t.id)}
                  >
                    Hapus
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
