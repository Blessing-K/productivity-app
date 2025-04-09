"use client";

export default function Progress() {
  return (
    <div style={{ padding: "2rem", maxWidth: "700px", margin: "0 auto" }}>
      <h1>📅 Weekly Progress</h1>

      {/* Week Selector Placeholder */}
      <div style={{ marginBottom: "1rem" }}>
        <label>Select Week: </label>
        <select>
          <option>This Week</option>
          <option>Last Week</option>
        </select>
      </div>

      {/* Stats Cards */}
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "1rem" }}>
        <div style={cardStyle}>✅ 12/20 Tasks Completed</div>
        <div style={cardStyle}>🔥 3-day Streak</div>
        <div style={cardStyle}>⏱️ 18h 45m Focus Time</div>
      </div>

      {/* Productivity Graph Placeholder */}
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

      {/* Completed Tasks */}
      <div style={{ marginBottom: "1rem" }}>
        <h3>Completed Tasks</h3>
        <ul>
          <li> React app (Mon ✅)</li>
          <li> Java app (Tue ✅)</li>
          <li> Python app (Wed ✅)</li>
        </ul>
      </div>

      {/* Achievements */}
      <div>
        <h3>🏆 Achievements</h3>
        <p>3/10 Badges Unlocked</p>
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
