import React, { useState } from "react";
import axios from "axios";

function AddStudent() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/register/student",
        {
          username,
          password,
        }
      );
      console.log(response.data);
      const userData = response.data;
      alert(userData);
    } catch (error) {
      setError("Server error");
    }
  };
  return (
    <>
      <h1 className="text-center mt-5">Add Student</h1>
      <div className="d-flex justify-content-center mt-5">
        <form>
          <div class="mb-3 mt-4">
            <label class="form-label">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              class="form-control rounded-0 border-dark"
            />
          </div>
          <div class="mb-3">
            <label class="form-label">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              class="form-control rounded-0 border-dark"
            />
          </div>
          {error && <p className="text-danger">{error}</p>}
          <button
            type="submit"
            onClick={handleLogin}
            class="btn btn-dark rounded-0 border-0 w-100"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default AddStudent;
