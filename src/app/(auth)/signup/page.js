"use client"

import { useState } from "react";
import style from "./signup.module.css";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsConditions, setTermsConditions] = useState(false);

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [termsConditionsError, setTermsConditionsError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    let hasErrors = false;

    // Validations
    if (firstName.trim() === "" || firstName.length < 2) {
      setFirstNameError("Please enter a valid first name");
      hasErrors = true;
    } else {
      setFirstNameError("");
    }

    if (lastName.trim() === "" || lastName.length < 2) {
      setLastNameError("Please enter a valid last name");
      hasErrors = true;
    } else {
      setLastNameError("");
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email");
      hasErrors = true;
    } else {
      setEmailError("");
    }

    if (password.trim().length < 6) {
      setPasswordError("Password must be at least 6 characters");
      hasErrors = true;
    } else {
      setPasswordError("");
    }

    if (!termsConditions) {
      setTermsConditionsError("You must accept the terms");
      hasErrors = true;
    } else {
      setTermsConditionsError("");
    }

    if (!hasErrors) {
      try {
        const response = await fetch('/api/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            password,
            termsConditions
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Signup failed");
        }

        alert("Signup successful!");
        resetFields();
      } catch (error) {
        alert(error.message || "An error occurred during signup");
      }
    }
  }

  function resetFields() {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setTermsConditions(false);
    // Reset errors
    setFirstNameError("");
    setLastNameError("");
    setEmailError("");
    setPasswordError("");
    setTermsConditionsError("");
  }

  return (
    <section className={style.signup_body}>
      <div className={style.signup_form}>
        <form className={style.form} onSubmit={handleSubmit}>
          <h1>Task Manager</h1>
          <h2>Ready to start your story?</h2>
          <p>Sign up and manage your tasks effortlessly</p>

          {/* Name */}
          <div className={style.form_group}>
            <input
              className={style.form_input}
              type="text"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                setFirstNameError("");
              }}
              placeholder="First Name"
            />
            {firstNameError && <span className={style.error_message}>{firstNameError}</span>}
          </div>

          {/* LastName */}
          <div className={style.form_group}>
            <input
              className={style.form_input}
              type="text"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
                setLastNameError("");
              }}
              placeholder="Last Name"
            />
            {lastNameError && <span className={style.error_message}>{lastNameError}</span>}
          </div>

          {/* Email */}
          <div className={style.form_group}>
            <input
              className={style.form_input}
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
              placeholder="Email"
            />
            {emailError && <span className={style.error_message}>{emailError}</span>}
          </div>

          {/* Password */}
          <div className={style.form_group}>
            <input
              className={style.form_input}
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError("");
              }}
              placeholder="Password"
            />
            {passwordError && <span className={style.error_message}>{passwordError}</span>}
          </div>

          {/* Terms and conditions */}
          <div className={style.form_terms}>
            <label className={style.terms_label}>
              <input
                type="checkbox"
                checked={termsConditions}
                onChange={(e) => {
                  setTermsConditions(e.target.checked);
                  setTermsConditionsError("");
                }}
                className={style.terms_checkbox}
              />
              Accept terms and conditions
            </label>
            {termsConditionsError && <span className={style.error_message}>{termsConditionsError}</span>}
          </div>

          {/* Buttons */}
          <div className={style.form_buttons}>
            <button className={style.submit_button} type="submit">
              Sign Up
            </button>
            <button className={style.reset_button} type="button" onClick={resetFields}>
              Reset
            </button>
          </div>
        </form>
      </div>
      <div className={style.signup_image_container}>
        <img className={style.signup_image} src="/images/signup_image.jpeg" alt="Sign Up" />
      </div>
    </section>
  );
}