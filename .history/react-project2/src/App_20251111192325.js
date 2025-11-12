import React, { useState, useEffect } from 'react';
import { Container, Row, Col, ProgressBar } from 'react-bootstrap';
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
  const progress = (tasks.filter(t => t.completed).length / tasks.length) * 100*
