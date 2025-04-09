"use client";

import { useState, useEffect } from "react";
import TaskCard from "@/src/components/TaskCard"; 

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    }
  }, []);

  const addTask = () => {
    if (newTask.trim() === "") return;
    const newTaskObj = {
      id: Date.now(),
      name: newTask,
      completed: false
    };
    setTasks([newTaskObj, ...tasks]);
    setNewTask("");
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h1>📝 Task Manager</h1>

      {/* Add Task Form */}
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter new task"
          style={{
            padding: "0.5rem",
            width: "70%",
            borderRadius: "4px",
            border: "1px solid #ccc"
          }}
        />
        <button
          onClick={addTask}
          style={{
            marginLeft: "0.5rem",
            padding: "0.5rem 1rem",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "4px"
          }}
        >
          Add
        </button>
      </div>

      {/* Filter Buttons */}
      <div style={{ marginBottom: "1rem" }}>
        <button onClick={() => setFilter("all")} disabled={filter === "all"}>All</button>{" "}
        <button onClick={() => setFilter("pending")} disabled={filter === "pending"}>Pending</button>{" "}
        <button onClick={() => setFilter("completed")} disabled={filter === "completed"}>Completed</button>
      </div>

      {/* Task List */}
      {filteredTasks.length === 0 && <p>No tasks to show.</p>}
      {filteredTasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onToggle={toggleComplete}
          onDelete={deleteTask}
        />
      ))}
    </div>
  );
}
