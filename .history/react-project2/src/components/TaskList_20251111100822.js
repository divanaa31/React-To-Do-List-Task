import React from "react";
import { Button, Card } from "react-bootstrap";

const TaskList = ({ tasks, deleteTask, showEditForm }) => {
  return (
    <div>
      {tasks.length === 0 ? (
        <p className="text-center text-secondary">No tasks yet. Add one!</p>
      ) : (
        tasks.map((task, index) => (
          <Card
            key={index}
            className="mb-3 shadow-sm border-0 bg-secondary bg-opacity-25 text-light"
          >
            <Card.Body className="d-flex justify-content-between align-items-center">
              <div>
                <h5 className="mb-1">{task.name}</h5>
                <p className="mb-0">
                  <strong>Priority:</strong> {task.priority} <br />
                  <strong>Status:</strong> {task.status}
                </p>
              </div>
              <div>
                <Button
                  variant="outline-info"
                  size="sm"
                  className="me-2"
                  onClick={() => showEditForm(task)}
                >
                  ✏️ Edit
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => deleteTask(task.id)}
                >
                  🗑 Delete
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
};

export default TaskList;
