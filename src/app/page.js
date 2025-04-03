"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import jwt from "jsonwebtoken";
import QuoteBanner from "@/src/components/QuoteBanner";

export default function Home() {
  const router = useRouter();

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>Welcome to Your Productivity App</h1>
      <p>You are logged in!</p>
    </div>
  );
}
