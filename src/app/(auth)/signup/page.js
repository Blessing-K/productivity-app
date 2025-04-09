"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import style from "./signup.module.css";

export default function SignUp() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsConditions, setTermsConditions] = useState(false);

  const [error, setError] = useState(null);
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [termsConditionsError, setTermsConditionsError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    let hasErrors = false;

    if (firstName.trim() === "") {
      setFirstNameError("First name is required");
      hasErrors = true;
    } else {
      setFirstNameError("");
    }

    if (lastName.trim() === "") {
      setLastNameError("Last name is required");
      hasErrors = true;
    } else {
      setLastNameError("");
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid Email");
      hasErrors = true;
    } else {
      setEmailError("");
    }

    if (password.trim().length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      hasErrors = true;
    } else {
      setPasswordError("");
    }

    if (!termsConditions) {
      setTermsConditionsError("You must accept the terms and conditions");
      hasErrors = true;
    } else {
      setTermsConditionsError("");
    }

    if (hasErrors) return;

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      alert("Signup successful!");
      router.push("/");
    } catch (err) {
      setError(err.message);
    }
  }

  function DeleteFields() {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setTermsConditions(false);
    setFirstNameError("");
    setLastNameError("");
    setEmailError("");
    setPasswordError("");
    setTermsConditionsError("");
  }

  return (
    <section className={style.login_body}>
      <div className={style.login_form}>
        <form className={style.form} onSubmit={handleSubmit}>
          <h1>Task Manager</h1>
          <h2>Welcome!</h2>
          <h3>Please enter your details</h3>

          <div className={style.form_input_group}>
            <input
              className={style.form_input}
              type="text"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                setFirstNameError("");
              }}
              placeholder="Enter your first name"
            />
            {firstNameError && <span className={style.login_span}>{firstNameError}</span>}
          </div>

          <div className={style.form_input_group}>
            <input
              className={style.form_input}
              type="text"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
                setLastNameError("");
              }}
              placeholder="Enter your last name"
            />
            {lastNameError && <span className={style.login_span}>{lastNameError}</span>}
          </div>

          <div className={style.form_input_group}>
            <input
              className={style.form_input}
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
              placeholder="Enter your email"
            />
            {emailError && <span className={style.login_span}>{emailError}</span>}
          </div>

          <div className={style.form_input_group}>
            <input
              className={style.form_input}
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError("");
              }}
              placeholder="Enter your password"
            />
            {passwordError && <span className={style.login_span}>{passwordError}</span>}
          </div>

          <div className={style.form_terms}>
            <label>
              <input
                type="checkbox"
                checked={termsConditions}
                onChange={(e) => {
                  setTermsConditions(e.target.checked);
                  setTermsConditionsError("");
                }}
              />
              Accept our terms and conditions
            </label>
            {termsConditionsError && <span className={style.login_span}>{termsConditionsError}</span>}
          </div>

          <div className={style.buttons_login}>
            <button className={style.submit_button} type="submit">Submit</button>
            <button className={style.delete_button} type="button" onClick={DeleteFields}>Delete</button>
          </div>

          {error && <p className={style.login_span}>{error}</p>}
        </form>
      </div>

      <div className={style.login_image}>
        <img src="/images/login_image.jpeg" alt="Login Image" />
      </div>
    </section>
  );
}