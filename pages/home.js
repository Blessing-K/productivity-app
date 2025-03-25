import { useEffect } from "react";
import { useRouter } from "next/router";
import QuoteBanner from "@/components/QuoteBanner";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>Welcome to Your Productivity App</h1>
      <p>You're logged in!</p>

      <QuoteBanner />
    </div>
  );
}
