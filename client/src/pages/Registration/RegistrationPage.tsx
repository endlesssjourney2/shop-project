import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";
import s from "./RegistrationPage.module.css";
import { TextField } from "@mui/material";

const RegistrationPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/login");
    } catch (err: any) {
      if (err.code === "auth/email-already-in-use") {
        setError("This email is already registered.");
      } else if (err.code === "auth/weak-password") {
        setError("Password is too weak (min. 6 characters).");
      } else {
        setError("Registration error. Please try again.");
      }
      console.error(err);
    }
  };

  return (
    <div className={s.registrationPage}>
      <form className={s.registrationForm} onSubmit={handleSubmit}>
        <h2 className={s.title}>Register</h2>
        <div>
          <TextField
            className={s.input}
            fullWidth
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{
              input: { color: "#f1f5f9" },
              label: { color: "#f1f5f9" },
            }}
          />
        </div>
        <div>
          <TextField
            className={s.input}
            fullWidth
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={{
              input: { color: "#f1f5f9" },
              label: { color: "#f1f5f9" },
            }}
          />
        </div>
        {error && <p>{error}</p>}
        <button className={s.submitButton} type="submit">
          Register
        </button>
        <p className={s.pText}>
          Already have an account?{" "}
          <Link className={s.link} to="/login">
            Log in
          </Link>
        </p>
        <p className={s.pText}>
          <Link className={s.link} to="/">
            Back to Home
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegistrationPage;
