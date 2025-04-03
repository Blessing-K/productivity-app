
import { useState } from "react";
import style from "./login.module.css";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsConditions, setTermsConditions] = useState(false);

  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [termsConditionsError, setTermsConditionsError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    let hasErrors = false;

    if (username.trim() === "" || username.trim().toLowerCase() === "username" || username.length < 5) {
      setUsernameError("Please enter a valid Username");
      hasErrors = true;
    } else {
      setUsernameError("");
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

    if (!hasErrors) {
      alert("Form submitted successfully!");
      DeleteFields();
    }
  }

  function DeleteFields() {
    setUsername("");
    setEmail("");
    setPassword("");
    setTermsConditions(false);
    setUsernameError("");
    setEmailError("");
    setPasswordError("");
    setTermsConditionsError("");
  }

  return (
    <section className={style.login_body}>
      <div className={style.login_form}>
        <form className={style.form} onSubmit={handleSubmit}>
        <h1>Task manager</h1>
          <h1>Welcome!</h1>
          <h2>Please enter your details</h2>
          <div className={style.form_username}>
            <input
              className={style.form_input}
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setUsernameError("");
              }}
              placeholder="Enter your username"
            />
            <br/>
            {usernameError && <span className={style.login_span}>{usernameError}</span>}
          </div>

          <div className={style.form_email}>
            <input
              className={style.form_input}
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
              placeholder="Enter your email"
            />
            <br/>
            {emailError && <span className={style.login_span}>{emailError}</span>}
          </div>

          <div className={style.form_password}>
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
            <br/>
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
            <br/>
            {termsConditionsError && <span className={style.login_span}>{termsConditionsError}</span>}
          </div>
          <div className={style.buttons_login}>
          <button className={style.submit_button} type="submit">
            Submit
          </button>

          <button className={style.delete_button} type="button" onClick={DeleteFields}>
            Delete
          </button>
          </div>

        </form>
      </div>
      <div className={style.login_image}>
        <img src="/images/login_image.jpeg" alt="Login Image" />
      </div>
    </section>
  );
}
