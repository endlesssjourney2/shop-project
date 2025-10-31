import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";
import s from "./LoginPage.module.css";
import { TextField } from "@mui/material";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
      alert("Success! Logged in.");
    } catch (err) {
      setError("Failed to log in. Check your email and password.");
      console.error(err);
    }
  };

  return (
    <div className={s.loginPage}>
      <form className={s.loginForm} onSubmit={handleSubmit}>
        <h2 className={s.title}>Login</h2>
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
            sx={{
              input: { color: "#f1f5f9" },
              label: { color: "#f1f5f9" },
            }}
          />
        </div>
        {error && <p>{error}</p>}
        <button className={s.submitButton} type="submit">
          Log In
        </button>
        <p className={s.pText}>
          Don't have an account?{" "}
          <Link className={s.link} to="/register">
            Register
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

export default LoginPage;
