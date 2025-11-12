import React, { useState, useEffect } from 'react';
import { Container, Row, Col, ProgressBar } from 'react-bootstrap';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { ToastContainer, toast } from 'react-toastify';
import Calendar from 'react-calendar';
import 'react-toastify/dist/ReactToastify.css';
import 'react-calendar/dist/Calendar.css';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());

  // 🔄 Load & Save ke localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // ➕ Tambah Tugas
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
    toast.success('💖 Tugas berhasil ditambahkan!');
  };

  // ✅ Toggle Selesai
  const toggleComplete = (id) => {
    setTasks(tasks.map(t => 
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
    toast.info('✅ Status tugas berubah!');
  };

  // ❌ Hapus
  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
    toast.error('🗑️ Tugas dihapus!');
  };

  // 🔀 Drag & Drop
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reordered = Array.from(tasks);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    setTasks(reordered);
  };

  // 🎨 Warna tanggal dengan tugas
  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const hasTask = tasks.some(t => t.date === date.toDateString());
      return hasTask ? 'highlight-date' : null;
    }
  };

  const filteredTasks = tasks.filter(t => t.date === selectedDate.toDateString());
  const progress = (tasks.filter(t => t.completed).length / tasks.length) * 100 || 0;

  return (
    <Container className="mt-5 text-center">
      <h2 className="mb-4 text-pink">💗 To-Do List Calendar 💗</h2>
      <Row className="justify-content-center">
        <Col md={4}>
          <Calendar 
            onChange={setSelectedDate} 
            value={selectedDate}
            tileClassName={tileClassName}
          />
        </Col>

        <Col md={6}>
          <input 
            type="text" 
            placeholder="Tulis tugas baru..." 
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            className="form-control mb-3"
          />
          <button onClick={addTask} className="btn btn-pink w-100 mb-3">Tambah 💕</button>
          
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
                          <button 
                            onClick={() => deleteTask(task.id)} 
                            className="btn btn-sm btn-outline-danger"
                          >
                            🗑️
                          </button>
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </Col>
      </Row>

      <ToastContainer position="bottom-right" autoClose={2000} />
    </Container>
  );
}

export default App;
