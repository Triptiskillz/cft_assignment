import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const history = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:4000/login", {
        username,
        password,
      });
      const userData = response.data;
      if (userData) {
        localStorage.setItem("userData", JSON.stringify(userData));
      }
      if (userData.role === "admin") {
        window.location.href = "/addstudent";
      } else {
        window.location.href = "/attendancestudent";
      }
    } catch (error) {
      setError("Server error");
    }
  };
  return (
    <div className="container mt-5 pt-5">
      <div className="row mt-5">
        <div className="col-md-6">
          <img
            src="https://th.bing.com/th/id/OIP.oOHxdfNVZgtyYy6R_vosaQHaG-?rs=1&pid=ImgDetMain"
            className="img-fluid"
          />
        </div>
        <div className="col-md-6">
          <form>
            <h1>Login</h1>
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
      </div>
    </div>
  );
}

export default LoginPage;
