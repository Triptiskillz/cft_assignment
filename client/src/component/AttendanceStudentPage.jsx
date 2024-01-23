import React, { useEffect, useState } from "react";
import axios from "axios";

function AttendanceStudentPage() {
  const [username, setUsername] = useState("");
  const [date, setDate] = useState("");
  const [selfire, setSelfire] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    setDate(getTodayDate());
    const userDate = JSON.parse(localStorage.getItem("userData"));
    setUsername(userDate.username);
  }, []);

  const getTodayDate = () => {
    const today = new Date();
    const y = today.getFullYear();
    const m = String(today.getMonth() + 1).padStart(2, "0");
    const d = String(today.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };
  const handleFileChange = (e) => {
    setSelfire(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("selfie", selfire);
    formData.append("username", username);
    formData.append("date", date);

    try {
      const response = await axios.post(
        "http://localhost:4000/submit-attendance",
        formData
      );
      const userData = response.data;
      alert(userData);
    } catch (error) {
      setError("Server error");
    }
  };
  return (
    <>
      <h1 className="text-center mt-5">Submit Attendance</h1>
      <div className="d-flex justify-content-center mt-5">
        <form onSubmit={handleSubmit}>
          <div class="mb-3 mt-4">
            <label class="form-label">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              readOnly
              class="form-control rounded-0 border-dark"
            />
          </div>
          <div class="mb-3">
            <label class="form-label">Date</label>
            <input
              type="date"
              id="date"
              value={date}
              //   onChange={(e) => setDate(e.target.value)}
              class="form-control rounded-0 border-dark"
            />
          </div>

          <div class="mb-3">
            <label class="form-label">Selfire</label>
            <input
              type="file"
              onChange={handleFileChange}
              class="form-control rounded-0 border-dark"
            />
          </div>
          {error && <p className="text-danger">{error}</p>}
          <button type="submit" class="btn btn-dark rounded-0 border-0 w-100">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default AttendanceStudentPage;
