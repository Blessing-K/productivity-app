"use client";

import { useState, useEffect } from "react";

export default function ProgressPage() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const loadTasks = async () => {
      const response = await fetch("/api")
      const tasks = await response.json()
      console.log(tasks)
      setTasks(tasks)
    };

    loadTasks();
    document.addEventListener("visibilitychange", loadTasks);

    return () => {
      document.removeEventListener("visibilitychange", loadTasks);
    };
  }, []);

  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;

  return (
    <div style={{ padding: "2rem", maxWidth: "700px", margin: "0 auto" }}>
      <h1>📅 Weekly Progress</h1>

      <div style={{ marginBottom: "1rem" }}>
        <label>Select Week: </label>
        <select>
          <option>This Week</option>
          <option>Last Week</option>
        </select>
      </div>

      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "1rem" }}>
        <div style={cardStyle}>✅ {completedCount}/{totalCount} Tasks Completed</div>
        <div style={cardStyle}>🔥 3-day Streak</div>
        <div style={cardStyle}>⏱️ 18h 45m Focus Time</div>
      </div>

      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          height: "200px",
          marginBottom: "1.5rem",
          textAlign: "center",
          paddingTop: "3rem",
          color: "#777",
        }}
      >
        📈 Productivity Graph (Line chart placeholder)
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <h3>Completed Tasks</h3>
        <ul>
          {tasks.filter((t) => t.completed).map((task) => (
            <li key={task.id}> {task.name} (✓)</li>
          ))}
        </ul>
      </div>

      <div>
        <h3>🏆 Achievements</h3>
        <p>{completedCount}/10 Badges Unlocked</p>
      </div>
    </div>
  );
}

const cardStyle = {
  flex: "1",
  minWidth: "200px",
  backgroundColor: "#f0f0f0",
  padding: "1rem",
  borderRadius: "8px",
  textAlign: "center",
  fontWeight: "bold",
};
