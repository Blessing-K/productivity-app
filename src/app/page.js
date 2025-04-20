"use client";

import { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";

const QuoteBanner = dynamic(() => import("@/src/components/QuoteBanner"), {
  loading: () => <p style={{ fontStyle: "italic", color: "gray" }}>Loading motivation...</p>,
  ssr: false,
});

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [firstName, setFirstName] = useState("");
  const [showAll, setShowAll] = useState(false); // 👈 Toggle state

  useEffect(() => {
    const loadTasks = async () => {
      const response = await fetch("/api");
      const tasks = await response.json();
      console.log("Data from API:", tasks);
      setTasks(tasks);
    };

    const fetchName = async () => {
      const response = await fetch("/api/name");
      const name = await response.json();
      console.log("Name:", name);
      setFirstName(name.firstName);
    };

    loadTasks();
    fetchName();
    document.addEventListener("visibilitychange", loadTasks);

    return () => {
      document.removeEventListener("visibilitychange", loadTasks);
    };
  }, []);

  const addTask = async () => {
    if (!newTask.trim()) return;
    try {
      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ name: newTask }),
      });

      const created = await response.json();
      if (!response.ok) throw new Error(created.error || "Failed to create task");

      setTasks((prev) => [...prev, created]);
      setNewTask("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const toggleTask = async (id) => {
    const current = tasks.find((task) => task.id === id);
    if (!current) return;

    try {
      const response = await fetch("/api", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ id, completed: !current.completed }),
      });

      const updated = await response.json();
      if (!response.ok) throw new Error(updated.error || "Failed to toggle task");

      setTasks((prev) =>
        prev.map((task) => (task.id === id ? { ...task, completed: updated.completed } : task))
      );
    } catch (error) {
      console.error("Error toggling task:", error);
    }
  };

  const completedTasks = useMemo(() => tasks.filter((task) => task.completed).length, [tasks]);
  const totalTasks = useMemo(() => tasks.length, [tasks]);
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div style={{ textAlign: "center", padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Hello, {firstName}!</h1>

      <QuoteBanner />

      <div style={{ marginTop: "2rem", textAlign: "left" }}>
        <h2>📝 Tasks & Goals</h2>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {(showAll ? tasks : tasks.slice(0, 3)).map((task) => (
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

        {tasks.length > 3 && (
          <button
            onClick={() => setShowAll((prev) => !prev)}
            style={{
              marginTop: "0.5rem",
              background: "none",
              border: "none",
              color: "#0070f3",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            {showAll ? "Show Less" : "Show All"}
          </button>
        )}

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
          {completionRate}% Completed | {totalTasks - completedTasks} Task(s) Pending
        </p>
      </div>
    </div>
  );
}
