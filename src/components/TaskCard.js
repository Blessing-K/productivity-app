export default function TaskCard({ task, onToggle, onDelete }) {
    return (
      <div style={{
        background: "#f9f9f9",
        padding: "1rem",
        marginBottom: "0.75rem",
        borderRadius: "6px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <div>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
          />
          <span style={{
            marginLeft: "0.5rem",
            textDecoration: task.completed ? "line-through" : "none"
          }}>
            {task.name}
          </span>
        </div>
        <button
          onClick={() => onDelete(task.id)}
          style={{
            background: "red",
            color: "white",
            border: "none",
            padding: "0.3rem 0.6rem",
            borderRadius: "4px"
          }}
        >
          Delete
        </button>
      </div>
    );
  }