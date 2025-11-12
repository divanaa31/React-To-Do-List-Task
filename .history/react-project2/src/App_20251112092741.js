import React, { useState, useEffect } from 'react';
import { Container, Row, Col, ProgressBar, Button, Form, Card } from 'react-bootstrap';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [deadlineDate, setDeadlineDate] = useState('');
  const [deadlineTime, setDeadlineTime] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [time, setTime] = useState(new Date());

  // update jam real-time
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // ambil data dari localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(saved);
  }, []);

  // simpan data ke localStorage
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!taskInput.trim() || !deadlineDate || !deadlineTime) {
      toast.warn('⚠️ Lengkapi nama tugas dan deadline!');
      return;
    }
    const newTask = {
      id: Date.now().toString(),
      text: taskInput,
      completed: false,
      deadline: `${deadlineDate} ${deadlineTime}`,
    };
    setTasks([...tasks, newTask]);
    setTaskInput('');
    setDeadlineDate('');
    setDeadlineTime('');
    toast.success('✨ Tugas berhasil ditambahkan!');
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(t => 
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
    toast.info('🎯 Status tugas diperbarui!');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
    toast.error('🗑️ Tugas dihapus!');
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reordered = Array.from(tasks);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    setTasks(reordered);
  };

  const progress = (tasks.filter(t => t.completed).length / tasks.length) * 100 || 0;

  const tasksDone = tasks.filter(t => t.completed);
  const tasksInProgress = tasks.filter(t => !t.completed);

  return (
    <div className={darkMode ? 'dark-mode' : 'light-mode'}>
      <Container className="mt-5 text-center p-4 rounded shadow-lg main-container">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="app-title">🌸 To-Do List Tracker</h2>
          <Button 
            variant={darkMode ? "light" : "dark"} 
            onClick={() => setDarkMode(!darkMode)}
            className="toggle-btn"
          >
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </Button>
        </div>

        <div className="time-display mb-4">
          <h5>🕒 {time.toLocaleTimeString()}</h5>
          <p>{time.toDateString()}</p>
        </div>

        <Row className="justify-content-center">
          {/* Kolom kiri - Input dan daftar semua tugas */}
          <Col md={6}>
            <div className="todo-card p-4 rounded shadow-sm">
              <Form.Control
                type="text"
                placeholder="✍️ Tulis tugas baru..."
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                className="mb-3"
              />

              <Row className="mb-3">
                <Col>
                  <Form.Control
                    type="date"
                    value={deadlineDate}
                    onChange={(e) => setDeadlineDate(e.target.value)}
                  />
                </Col>
                <Col>
                  <Form.Control
                    type="time"
                    value={deadlineTime}
                    onChange={(e) => setDeadlineTime(e.target.value)}
                  />
                </Col>
              </Row>

              <Button onClick={addTask} className="btn-gradient w-100 mb-3">
                Tambah 💕
              </Button>

              <ProgressBar now={progress} label={`${Math.round(progress)}%`} className="mb-3" />

              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="tasks">
                  {(provided) => (
                    <ul 
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="list-group"
                    >
                      {tasks.length === 0 && (
                        <p className="text-muted">Belum ada tugas 🌸</p>
                      )}
                      {tasks.map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided) => (
                            <li 
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`list-group-item d-flex justify-content-between align-items-start ${
                                task.completed ? 'completed' : ''
                              }`}
                            >
                              <div className="d-flex flex-column align-items-start">
                                <div className="d-flex align-items-center">
                                  <Form.Check 
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => toggleComplete(task.id)}
                                    className="me-2"
                                  />
                                  <span className="task-text">{task.text}</span>
                                </div>
                                <small className="text-muted">
                                  Deadline: {task.deadline}
                                </small>
                              </div>
                              <Button 
                                variant="outline-danger"
                                size="sm"
                                onClick={() => deleteTask(task.id)}
                              >
                                🗑️
                              </Button>
                            </li>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </ul>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
          </Col>

          {/* Kolom kanan - Status tugas */}
          <Col md={4}>
            <Card className="status-card mb-3 shadow-sm">
              <Card.Body>
                <Card.Title className="text-success">✅ Selesai</Card.Title>
                {tasksDone.length > 0 ? (
                  tasksDone.map(t => (
                    <div key={t.id} className="text-start mb-2">
                      <p className="mb-0 fw-semibold">{t.text}</p>
                      <small className="text-muted">Deadline: {t.deadline}</small>
                    </div>
                  ))
                ) : (
                  <p className="text-muted">Belum ada tugas selesai</p>
                )}
              </Card.Body>
            </Card>

            <Card className="status-card shadow-sm">
              <Card.Body>
                <Card.Title className="text-warning">🕓 Dalam Pengerjaan</Card.Title>
                {tasksInProgress.length > 0 ? (
                  tasksInProgress.map(t => (
                    <div key={t.id} className="text-start mb-2">
                      <p className="mb-0 fw-semibold">{t.text}</p>
                      <small className="text-muted">Deadline: {t.deadline}</small>
                    </div>
                  ))
                ) : (
                  <p className="text-muted">Belum ada tugas dalam pengerjaan</p>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <ToastContainer position="bottom-right" autoClose={2000} />
      </Container>
    </div>
  );
}

export default App;
