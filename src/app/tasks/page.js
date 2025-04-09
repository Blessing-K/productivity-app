"use client";

import { useState } from "react";
import GoalCard from "@/src/components/GoalCard";

export default function TasksPage() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: "Practice React",
      completed: true,
      dueDate: "Today",
      priority: "High",
    },
    {
      id: 2,
      name: "Build Java app",
      completed: false,
      dueDate: "Friday",
      priority: "Medium",
    },
    {
      id: 3,
      name: "Revise Python",
      completed: false,
      dueDate: "",
      priority: "Low",
    },
  ]);

  const [newTask, setNewTask] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Low");
  const [filter, setFilter] = useState("All");

  const handleAddTask = () => {
    if (!newTask.trim()) return;
    const newTaskObj = {
      id: Date.now(),
      name: newTask,
      completed: false,
      dueDate,
      priority,
    };
    setTasks([newTaskObj, ...tasks]);
    setNewTask("");
    setDueDate("");
    setPriority("Low");
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "All") return true;
    if (filter === "Pending") return !task.completed;
    if (filter === "Completed") return task.completed;
  });

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h1>📝 Manage Your Tasks</h1>

      {/* Add New Task Form */}
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
          onClick={handleAddTask}
          style={{ padding: "0.5rem 1rem", display: "block", width: "100%" }}
        >
          Save
        </button>
      </div>

      {/* Filter Buttons */}
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

      {/* Task List */}
      <div>
        {filteredTasks.map((task) => (
          <GoalCard
            key={task.id}
            task={task}
            onToggle={() =>
              setTasks(
                tasks.map((t) =>
                  t.id === task.id ? { ...t, completed: !t.completed } : t
                )
              )
            }
            onEdit={() => alert("Edit coming soon")}
            onDelete={() => setTasks(tasks.filter((t) => t.id !== task.id))}
          />
        ))}
      </div>
    </div>
  );
}
