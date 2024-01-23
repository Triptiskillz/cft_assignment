import { Fragment, useState, useEffect } from "react";

import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Routes,
} from "react-router-dom";

import LoginPage from "./component/LoginPage";
import NavbarTop from "./component/Navbar";
import LogoutPage from "./component/LogoutPage";
import AddStudent from "./component/AddStudent";
import StudentPage from "./component/StudentPage";
import AttendanceStudentPage from "./component/AttendanceStudentPage";
import Access from "./component/Access";

function App() {
  const [user, setUser] = useState("");
  useEffect(() => {
    const handleUser = () => {
      const userDate = JSON.parse(localStorage.getItem("userData"));
      setUser(userDate);
    };

    handleUser();
  }, []);
  return (
    <Fragment>
      <NavbarTop />
      <Router>
        <Routes>
          <Route
            path="/attendancestudent"
            element={<AttendanceStudentPage />}
          />
          <Route
            path="/allstudent"
            element={
              user && user.role === "admin" ? <StudentPage /> : <Access />
            }
          />
          <Route
            path="/addstudent"
            element={
              user && user.role === "admin" ? <AddStudent /> : <Access />
            }
          />
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="/" element={!user ? <LoginPage /> : <Access />} />
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
