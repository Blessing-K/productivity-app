import React from "react";

export default function GoalCard({ task, onToggle, onEdit, onDelete }) {
  const { name, completed, dueDate, priority } = task;

  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "1rem",
        marginBottom: "1rem",
        backgroundColor: completed ? "#e0ffe0" : "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <input
          type="checkbox"
          checked={completed}
          onChange={onToggle}
          style={{ marginRight: "0.5rem" }}
        />
        <strong>{name}</strong>
        <div style={{ fontSize: "0.85rem", color: "#555" }}>
          Due: {dueDate || "Not set"} {priority && `| Priority: ${priority}`}
        </div>
      </div>
      <div>
        <button onClick={onEdit} style={{ marginRight: "0.5rem" }}>Edit</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
}
