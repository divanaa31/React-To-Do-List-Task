import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  ListGroup,
  Badge,
} from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [task, setTask] = useState("");
  const [deadline, setDeadline] = useState("");
  const [todos, setTodos] = useState([]);
  const [nearestTask, setNearestTask] = useState(null);

  useEffect(() => {
    if (todos.length > 0) {
      const upcoming = todos
        .filter((t) => !t.completed && t.deadline)
        .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))[0];
      setNearestTask(upcoming);
    } else {
      setNearestTask(null);
    }
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    if (!task) return toast.warning("Tulis dulu tugasnya ya 💡");
    const newTodo = {
      id: Date.now(),
      task,
      deadline,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setTask("");
    setDeadline("");
    toast.success("Tugas berhasil ditambahkan! 🎉");
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    toast.info("Tugas dihapus 🗑️");
  };

  const ongoingTasks = todos.filter((t) => !t.completed);
  const completedTasks = todos.filter((t) => t.completed);

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #ffe4ec 0%, #ffd6e0 50%, #ffe8f0 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingTop: "40px",
      }}
    >
      <Container>
        <ToastContainer position="top-center" autoClose={2000} />

        <Row className="justify-content-center">
          <Col md={8}>
            <Card
              className="shadow-lg border-0 rounded-4 p-4"
              style={{
                background: "rgba(255, 240, 247, 0.95)",
                border: "2px solid #ffc2d1",
                boxShadow: "0 10px 20px rgba(255, 192, 203, 0.3)",
              }}
            >
              <h2 className="text-center mb-3" style={{ color: "#d63384" }}>
                🌸 To-Do List Elegan
              </h2>

              {/* 🔔 Reminder tugas terdekat */}
              {nearestTask ? (
                <Card
                  className="mb-4 p-3 border-0 text-center"
                  style={{
                    background: "#ffe1eb",
                    borderRadius: "15px",
                    color: "#c2185b",
                  }}
                >
                  <h5>
                    🔔 Tugas Terdekat:{" "}
                    <span className="fw-bold">{nearestTask.task}</span>
                  </h5>
                  <p className="mb-0">
                    Deadline:{" "}
                    <Badge bg="warning" text="dark">
                      {new Date(nearestTask.deadline).toLocaleDateString(
                        "id-ID",
                        {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }
                      )}
                    </Badge>
                  </p>
                </Card>
              ) : (
                <p className="text-center text-muted mb-4">
                  Belum ada tugas terdekat 🌷
                </p>
              )}

              {/* Form tambah tugas */}
              <Form onSubmit={addTodo} className="mb-4">
                <Row>
                  <Col md={6}>
                    <Form.Control
                      type="text"
                      placeholder="Tulis tugas..."
                      value={task}
                      onChange={(e) => setTask(e.target.value)}
                      style={{
                        borderRadius: "12px",
                        borderColor: "#ffa6c9",
                      }}
                    />
                  </Col>
                  <Col md={4}>
                    <Form.Control
                      type="date"
                      value={deadline}
                      onChange={(e) => setDeadline(e.target.value)}
                      style={{
                        borderRadius: "12px",
                        borderColor: "#ffa6c9",
                      }}
                    />
                  </Col>
                  <Col md={2}>
                    <Button
                      type="submit"
                      variant="danger"
                      className="w-100 fw-semibold"
                      style={{ borderRadius: "12px" }}
                    >
                      Tambah
                    </Button>
                  </Col>
                </Row>
              </Form>

              {/* Daftar tugas dalam pengerjaan */}
              <h5
                className="text-center mb-3"
                style={{ color: "#c2185b", fontWeight: "600" }}
              >
                📝 Dalam Pengerjaan
              </h5>
              <ListGroup className="mb-4">
                {ongoingTasks.length === 0 ? (
                  <ListGroup.Item
                    className="text-center text-muted"
                    style={{
                      backgroundColor: "#fff0f6",
                      borderRadius: "10px",
                    }}
                  >
                    Tidak ada tugas aktif 🌸
                  </ListGroup.Item>
                ) : (
                  ongoingTasks.map((todo) => (
                    <ListGroup.Item
                      key={todo.id}
                      className="d-flex justify-content-between align-items-center"
                      style={{
                        background: "#fff7fa",
                        borderRadius: "10px",
                        marginBottom: "6px",
                      }}
                    >
                      <Form.Check
                        type="checkbox"
                        onChange={() => toggleComplete(todo.id)}
                        checked={todo.completed}
                        label={
                          <span className="fw-semibold" style={{ color: "#d63384" }}>
                            {todo.task}
                            {todo.deadline && (
                              <small className="text-muted ms-2">
                                (🕓{" "}
                                {new Date(todo.deadline).toLocaleDateString(
                                  "id-ID"
                                )}
                                )
                              </small>
                            )}
                          </span>
                        }
                      />
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => deleteTodo(todo.id)}
                        style={{
                          borderRadius: "10px",
                          fontWeight: "500",
                        }}
                      >
                        Hapus
                      </Button>
                    </ListGroup.Item>
                  ))
                )}
              </ListGroup>

              {/* Daftar tugas selesai */}
              <h5
                className="text-center mb-3"
                style={{ color: "#2e7d32", fontWeight: "600" }}
              >
                ✅ Tugas Selesai
              </h5>
              <ListGroup>
                {completedTasks.length === 0 ? (
                  <ListGroup.Item
                    className="text-center text-muted"
                    style={{
                      backgroundColor: "#fff0f6",
                      borderRadius: "10px",
                    }}
                  >
                    Belum ada tugas selesai 💪
                  </ListGroup.Item>
                ) : (
                  completedTasks.map((todo) => (
                    <ListGroup.Item
                      key={todo.id}
                      className="d-flex justify-content-between align-items-center"
                      style={{
                        background: "#e8f9ee",
                        borderRadius: "10px",
                        marginBottom: "6px",
                        textDecoration: "line-through",
                      }}
                    >
                      <span>{todo.task}</span>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => deleteTodo(todo.id)}
                      >
                        Hapus
                      </Button>
                    </ListGroup.Item>
                  ))
                )}
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
