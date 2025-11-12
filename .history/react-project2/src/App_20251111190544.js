import React, { useState } from 'react';
import TaskForm from './components/TaskForm';
import { Container, Row, Col, ListGroup, Button, Card } from 'react-bootstrap';

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

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <Card className="shadow-lg border-0 rounded-4">
              <Card.Header className="bg-primary text-white text-center rounded-top-4 py-3">
                <h3 className="fw-bold mb-0">🌟 To-Do List App</h3>
                <p className="mb-0" style={{ fontSize: '0.9rem' }}>
                  Buat rencana harianmu dengan mudah!
                </p>
              </Card.Header>
              <Card.Body className="p-4">
                <TaskForm addTask={addTask} />

                <ListGroup variant="flush">
                  {tasks.length === 0 ? (
                    <p className="text-muted text-center mt-3">
                      Belum ada tugas. Tambahkan sekarang! 😊
                    </p>
                  ) : (
                    tasks.map((t) => (
                      <ListGroup.Item
                        key={t.id}
                        className="d-flex justify-content-between align-items-center rounded-3 mb-2 shadow-sm"
                        style={{
                          backgroundColor: t.completed ? '#d4edda' : '#fff',
                          border: t.completed ? '1px solid #28a745' : '1px solid #dee2e6',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        <span
                          onClick={() => toggleComplete(t.id)}
                          style={{
                            textDecoration: t.completed ? 'line-through' : 'none',
                            cursor: 'pointer',
                            color: t.completed ? '#6c757d' : '#212529',
                            fontWeight: '500'
                          }}
                        >
                          {t.task}
                        </span>
                        <Button
                          variant={t.completed ? 'outline-danger' : 'outline-success'}
                          size="sm"
                          onClick={() => deleteTask(t.id)}
                        >
                          {t.completed ? 'Hapus' : 'Selesai'}
                        </Button>
                      </ListGroup.Item>
                    ))
                  )}
                </ListGroup>
              </Card.Body>
              <Card.Footer className="text-center text-muted">
                <small>✨ Dibuat dengan React & Bootstrap</small>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
