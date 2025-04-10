"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = async () => {
    const reponse = fetch('/api/logout')
    router.replace("/login");
  };

  const linkStyle = {
    color: "white",
    textDecoration: "none",
    fontWeight: "500",
    padding: "0.5rem",
    fontSize: "1rem",
    fontFamily: "inherit",
    background: "none",
    border: "none",
    cursor: "pointer",
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
      <button onClick={handleLogout} style={linkStyle}>Logout</button>
    </nav>
  );
}
