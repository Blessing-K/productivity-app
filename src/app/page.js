"use client";

import { useState, useEffect } from "react";
import QuoteBanner from "@/src/components/QuoteBanner";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    const loadTasks = () => {
      const stored = localStorage.getItem("tasks");
      if (stored) setTasks(JSON.parse(stored));
    };

    loadTasks();
    document.addEventListener("visibilitychange", loadTasks);

    return () => {
      document.removeEventListener("visibilitychange", loadTasks);
    };
  }, []);

  const syncTasks = (updatedTasks) => {
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const addTask = () => {
    if (!newTask.trim()) return;
    const stored = localStorage.getItem("tasks");
    const currentTasks = stored ? JSON.parse(stored) : [];
    const newTaskObj = {
      id: Date.now(),
      name: newTask,
      completed: false,
    };
    const updatedTasks = [...currentTasks, newTaskObj];
    syncTasks(updatedTasks);
    setNewTask("");
  };

  const toggleTask = (id) => {
    const stored = localStorage.getItem("tasks");
    const currentTasks = stored ? JSON.parse(stored) : tasks;
    const updatedTasks = currentTasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    syncTasks(updatedTasks);
  };

  const completedTasks = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;
  const completionRate =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div
      style={{ textAlign: "center", padding: "2rem", maxWidth: "600px", margin: "0 auto" }}
    >
      <h1>Hello, [User]!</h1>

      <QuoteBanner />

      <div style={{ marginTop: "2rem", textAlign: "left" }}>
        <h2>📝 Tasks & Goals</h2>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {tasks.slice(0, 3).map((task) => (
            <li key={task.id} style={{ marginBottom: "0.5rem" }}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
              />
              <span
                style={{
                  marginLeft: "0.5rem",
                  textDecoration: task.completed ? "line-through" : "none",
                }}
              >
                {task.name}
              </span>
            </li>
          ))}
        </ul>

        <div style={{ marginTop: "1rem" }}>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add new task..."
            style={{
              padding: "0.5rem",
              width: "70%",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
          <button
            onClick={addTask}
            style={{
              marginLeft: "0.5rem",
              padding: "0.5rem 1rem",
              backgroundColor: "#0070f3",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Add Task
          </button>
        </div>
      </div>

      <div
        style={{
          marginTop: "2rem",
          padding: "1rem",
          background: "#f5f5f5",
          borderRadius: "8px",
        }}
      >
        <h3>📊 Progress Summary</h3>
        <p>
          {completionRate}% Completed | {totalTasks - completedTasks} Task(s)
          Pending
        </p>
      </div>
    </div>
  );
}