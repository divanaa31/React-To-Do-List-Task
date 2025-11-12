import React, { useState } from 'react';
import TaskForm from './components/TaskForm';
import { Container, Row, Col, ListGroup, Button, Card } from 'react-bootstrap';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [date, setDate] = useState(new Date());

  const addTask = (task) => {
    setTasks([...tasks, { id: Date.now(), task, completed: false, date }]);
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
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-pink">
      <Container>
        <Row className="justify-content-center">
          <Col md={7}>
            <Card className="shadow-lg border-0 rounded-4 pink-card">
              <Card.Header className="bg-pink-dark text-white text-center rounded-top-4 py-3">
                <h3 className="fw-bold mb-0">💗 My Lovely To-Do List</h3>
                <p className="mb-0" style={{ fontSize: '0.9rem' }}>
                  Catat kegiatanmu dengan semangat manis!
                </p>
              </Card.Header>

              <Card.Body className="p-4">
                <div className="calendar-container mb-4 text-center">
                  <Calendar
                    onChange={setDate}
                    value={date}
                    className="mx-auto rounded-3 shadow-sm calendar-pink"
                  />
                </div>

                <TaskForm addTask={addTask} />

                <ListGroup variant="flush">
                  {tasks.length === 0 ? (
                    <p className="text-muted text-center mt-3">
                      Belum ada tugas hari ini 💕
                    </p>
                  ) : (
                    tasks.map((t) => (
                      <ListGroup.Item
                        key={t.id}
                        className="d-flex justify-content-between align-items-center rounded-3 mb-2 shadow-sm task-item"
                        style={{
                          backgroundColor: t.completed ? '#ffe6f2' : '#fff',
                          border: t.completed ? '1px solid #ff66b2' : '1px solid #f3c2d8',
                        }}
                      >
                        <div>
                          <span
                            onClick={() => toggleComplete(t.id)}
                            style={{
                              textDecoration: t.completed ? 'line-through' : 'none',
                              cursor: 'pointer',
                              color: t.completed ? '#a36a84' : '#e83e8c',
                              fontWeight: '500'
                            }}
                          >
                            {t.task}
                          </span>
                          <div className="small text-muted">
                            📅 {new Date(t.date).toLocaleDateString()}
                          </div>
                        </div>
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

              <Card.Footer className="text-center text-muted bg-light-pink">
                <small>🌸 Dibuat dengan cinta menggunakan React & Bootstrap 🌸</small>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
