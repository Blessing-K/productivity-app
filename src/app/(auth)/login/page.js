"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import style from "./login.module.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let hasErrors = false;

    // Validaciones
    if (!email) {
      setEmailError("Email is required");
      hasErrors = true;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email");
      hasErrors = true;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password is required");
      hasErrors = true;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      hasErrors = true;
    } else {
      setPasswordError("");
    }

    if (!hasErrors) {
      setLoading(true);
      try {
        const response = await fetch("/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Login failed");
        }

        router.push("/");
      } catch (err) {
        setPasswordError(err.message || "Login failed. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <section className={style.login_body}>
      <div className={style.login_image_container}>
        <img className={style.login_image} src="/images/signup_image.jpeg" />
      </div>
      <div className={style.login_form}>
        <form className={style.form} onSubmit={handleSubmit}>
          <h1>Task Manager</h1>
          <h2>Welcome back!</h2>
          <p>Login to continue managing your tasks</p>

          <div className={style.form_group}>
            <input
              className={style.form_input}
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
            />
            {emailError && <span className={style.error_message}>{emailError}</span>}
          </div>

          <div className={style.form_group}>
            <input
              className={style.form_input}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError("");
              }}
            />
            {passwordError && <span className={style.error_message}>{passwordError}</span>}
          </div>

          <button
            type="submit"
            className={style.submit_button}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <p className={style.signup_redirect}>
            Do not have an account?{" "}
            <a href="/signup" className={style.signup_link}>Sign up here</a>
          </p>
        </form>
      </div>
    </section>
  );
}