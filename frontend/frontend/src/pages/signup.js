import React, { useState } from "react";
import axios from "axios";

function Signup({ setIsSignup }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8080/api/signup", {
        username,
        password,
        email,
      });

      alert("Signup successful ✅");

      // Go back to login
      setIsSignup(false);

    } catch (error) {
      console.error(error);
      alert("Signup failed ❌");
    }
  };

  return (
    <div>
      <h2>Signup</h2>

      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Signup</button>
      </form>

      <p>
        Already have an account?{" "}
        <button onClick={() => setIsSignup(false)}>Login</button>
      </p>
    </div>
  );
}

export default Signup;