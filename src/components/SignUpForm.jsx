import { useState } from "react";

export default function SignUpForm({ setToken }) {
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    if (username.length < 8) {
      setUsernameError("Username must be at least 8 characters long.");
      return;
    } else {
      setUsernameError(null);
    }

    try {
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/signup",
        {
          method: "POST",
          body: JSON.stringify({ username, password }),
        }
      );
      const result = await response.json();
      console.log(result);
      setToken(result.token);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <>
      <h2>Sign Up</h2>
      {usernameError && <p>{usernameError}</p>}
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Username:{" "}
          <input
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </label>
        <br />
        <hr />
        <label>
          Password:{" "}
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </label>
        <br />
        <hr />
        <button>Sumit</button>
      </form>
    </>
  );
}
