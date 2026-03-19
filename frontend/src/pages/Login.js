import React, { useState } from "react";
import axios from "axios";

function Login({ setIsLoggedIn, setIsSignup }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8080/api/login", {
        username,
        password,
      });

      if (res.data) {
        alert("Login successful ✅");
        setIsLoggedIn(true);
      } else {
        alert("Invalid username or password ❌");
      }

    } catch (error) {
      console.error(error);
      alert("Server error ❌");
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>

      <p>
        Don’t have an account?{" "}
        <button onClick={() => setIsSignup(true)}>Signup</button>
      </p>
    </div>
  );
}

export default Login;