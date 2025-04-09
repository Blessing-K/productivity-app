"use client";

import { useState } from "react";

export default function GoalCard({ task, onToggle, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(task.name);
  const [editedDueDate, setEditedDueDate] = useState(task.dueDate || "");
  const [editedPriority, setEditedPriority] = useState(task.priority || "Low");

  const handleSave = () => {
    onEdit(task.id, editedName, editedDueDate, editedPriority);
    setIsEditing(false);
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "1rem",
        marginBottom: "1rem",
        backgroundColor: task.completed ? "#e6ffe6" : "#fff",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <input type="checkbox" checked={task.completed} onChange={onToggle} />
          {isEditing ? (
            <div style={{ marginLeft: "0.5rem" }}>
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                placeholder="Task name"
                style={{ marginBottom: "0.3rem", padding: "0.2rem", width: "100%" }}
              />
              <input
                type="date"
                value={editedDueDate}
                onChange={(e) => setEditedDueDate(e.target.value)}
                style={{ marginBottom: "0.3rem", padding: "0.2rem", width: "100%" }}
              />
              <select
                value={editedPriority}
                onChange={(e) => setEditedPriority(e.target.value)}
                style={{ padding: "0.2rem", width: "100%" }}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High ⚠️</option>
              </select>
            </div>
          ) : (
            <span
              style={{
                marginLeft: "0.5rem",
                textDecoration: task.completed ? "line-through" : "none",
                fontWeight: "bold",
              }}
            >
              {task.name}
            </span>
          )}

          {!isEditing && (
            <div style={{ marginLeft: "1.5rem", fontSize: "0.85rem", color: "#666" }}>
              <div>📅 Due: {task.dueDate || "N/A"}</div>
              <div>⚡ Priority: {task.priority || "Low"}</div>
            </div>
          )}
        </div>

        <div>
          {isEditing ? (
            <>
              <button onClick={handleSave} style={buttonStyle}>Save</button>
              <button onClick={() => setIsEditing(false)} style={buttonStyle}>Cancel</button>
            </>
          ) : (
            <>
              <button onClick={() => setIsEditing(true)} style={buttonStyle}>Edit</button>
              <button onClick={onDelete} style={buttonStyle}>Delete</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const buttonStyle = {
  marginLeft: "0.3rem",
  padding: "0.2rem 0.5rem",
  fontSize: "0.8rem",
  cursor: "pointer",
};
