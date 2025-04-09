"use client";

import { useState, useEffect } from "react";
import GoalCard from "@/src/components/GoalCard";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Low");
  const [filter, setFilter] = useState("All");

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
      dueDate,
      priority,
    };
    const updatedTasks = [...currentTasks, newTaskObj];
    syncTasks(updatedTasks);
    setNewTask("");
    setDueDate("");
    setPriority("Low");
  };

  const toggleTask = (id) => {
    const stored = localStorage.getItem("tasks");
    const currentTasks = stored ? JSON.parse(stored) : tasks;
    const updatedTasks = currentTasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    syncTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    const stored = localStorage.getItem("tasks");
    const currentTasks = stored ? JSON.parse(stored) : tasks;
    const updatedTasks = currentTasks.filter((task) => task.id !== id);
    syncTasks(updatedTasks);
  };

  const editTask = (id, newName, newDueDate, newPriority) => {
    const stored = localStorage.getItem("tasks");
    const currentTasks = stored ? JSON.parse(stored) : tasks;
    const updatedTasks = currentTasks.map((task) =>
      task.id === id
        ? { ...task, name: newName, dueDate: newDueDate, priority: newPriority }
        : task
    );
    syncTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "All") return true;
    if (filter === "Pending") return !task.completed;
    if (filter === "Completed") return task.completed;
  });

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h1>📝 Manage Your Tasks</h1>

      <div style={{ margin: "1.5rem 0" }}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter new task"
          style={{ padding: "0.5rem", width: "100%", marginBottom: "0.5rem" }}
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          style={{ padding: "0.5rem", marginBottom: "0.5rem", width: "100%" }}
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          style={{ padding: "0.5rem", marginBottom: "0.5rem", width: "100%" }}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High ⚠️</option>
        </select>
        <button
          onClick={addTask}
          style={{ padding: "0.5rem 1rem", display: "block", width: "100%" }}
        >
          Save
        </button>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <span role="img" aria-label="chart">📊</span> Filter Tasks: {" "}
        {["All", "Pending", "Completed"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            style={{
              margin: "0 0.5rem",
              padding: "0.3rem 0.6rem",
              backgroundColor: filter === status ? "#0070f3" : "#eee",
              color: filter === status ? "#fff" : "#333",
              border: "none",
              borderRadius: "4px",
            }}
          >
            {status}
          </button>
        ))}
      </div>

      <div>
        {filteredTasks.map((task) => (
          <GoalCard
            key={task.id}
            task={task}
            onToggle={() => toggleTask(task.id)}
            onEdit={editTask}
            onDelete={() => deleteTask(task.id)}
          />
        ))}
      </div>
    </div>
  );
}
