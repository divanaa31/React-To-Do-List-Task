import React, { useState, useEffect } from 'react';
import { Container, Row, Col, ProgressBar, Button, Form } from 'react-bootstrap';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { ToastContainer, toast } from 'react-toastify';
import Calendar from 'react-calendar';
import 'react-toastify/dist/ReactToastify.css';
import 'react-calendar/dist/Calendar.css';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!taskInput.trim()) return;
    const newTask = {
      id: Date.now().toString(),
      text: taskInput,
      completed: false,
      date: selectedDate.toDateString()
    };
    setTasks([...tasks, newTask]);
    setTaskInput('');
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

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const hasTask = tasks.some(t => t.date === date.toDateString());
      return hasTask ? 'highlight-date' : null;
    }
  };

  const filteredTasks = tasks.filter(t => t.date === selectedDate.toDateString());
  const progress = (tasks.filter(t => t.completed).length / tasks.length) * 100 || 0;

  return (
    <div className={darkMode ? 'dark-mode' : 'light-mode'}>
      <Container className="mt-5 text-center p-4 rounded shadow-lg main-container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="app-title">🌷 Elegant To-Do Calendar</h2>
          <Button 
            variant={darkMode ? "light" : "dark"} 
            onClick={() => setDarkMode(!darkMode)}
            className="toggle-btn"
          >
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </Button>
        </div>

        <Row className="justify-content-center">
          <Col md={4}>
            <div className="calendar-card p-3 rounded shadow-sm">
              <Calendar 
                onChange={setSelectedDate} 
                value={selectedDate}
                tileClassName={tileClassName}
              />
            </div>
          </Col>

          <Col md={6}>
            <div className="todo-card p-4 rounded shadow-sm">
              <Form.Control
                type="text"
                placeholder="✍️ Tulis tugas baru..."
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                className="mb-3"
              />
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
                      {filteredTasks.map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided) => (
                            <li 
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`list-group-item d-flex justify-content-between align-items-center ${
                                task.completed ? 'completed' : ''
                              }`}
                            >
                              <span onClick={() => toggleComplete(task.id)} className="task-text">
                                {task.text}
                              </span>
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
        </Row>
        <ToastContainer position="bottom-right" autoClose={2000} />
      </Container>
    </div>
  );
}

export default App;
