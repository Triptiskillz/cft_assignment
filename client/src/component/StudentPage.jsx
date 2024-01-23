import React, { useState } from "react";
import axios from "axios";

function StudentPage() {
  const [data, setData] = useState(0);
  const handelDate = async (value) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/attendance/${value}`
      );
      const userData = response.data;
      setData(response.data);
    } catch (error) {
      console.log("Server error");
    }
  };
  return (
    <div className="container mt-5">
      <form>
        <input
          type="date"
          className="form-control rounded-0 border-dark"
          onChange={(e) => handelDate(e.target.value)}
        />
      </form>

      <div className="mt-5">
        <h5>No of students: {data}</h5>
      </div>
    </div>
  );
}

export default StudentPage;
