import Link from "next/link";

export default function Navbar() {
  const linkStyle = {
    color: "white",
    textDecoration: "none",
    fontWeight: "500",
    padding: "0.5rem",
  };

  const linkHoverStyle = {
    textDecoration: "underline",
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-around",
        padding: "1rem",
        backgroundColor: "#222",
      }}
    >
      <Link href="/" style={linkStyle}>Home</Link>
      <Link href="/tasks" style={linkStyle}>Tasks</Link>
      <Link href="/progress" style={linkStyle}>Progress</Link>
      {/* <Link href="/logout" style={linkStyle}>Logout</Link> */}
    </nav>
  );
}


