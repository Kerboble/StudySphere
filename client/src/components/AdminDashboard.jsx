import Navbar from "./Navbar";
import {React, useContext, useEffect, useState} from 'react'
import AdminNavbar from "./AdminNavbar";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import student from "../img/online-education.png"

function AdminDashboard() {

  const currentUser = useContext(AuthContext);
  console.log(currentUser)
  const [users, setUsers] = useState('');

  useEffect(() => {
     async function fetch() {
      const res = await axios.get("http://localhost:4000/users");
      try {
        setUsers(res.data)
      } catch (error) {
        console.error(error)
      } 
    } 
    fetch(); 
  }, [])

  console.log(users.length)

  const students = users ? users.filter(user => user.role === "student") : [];
  const teachers = users ? users.filter(user => user.role === "teacher") : [];
 
  

  return (
    <div className="admin-dashboard">
        <div className="admin-dashboard-body">
          <div className="statistics">
            <div className="info">
              <p>{students.length}</p>
              <p>Total Students</p>
            </div>
            <div className="stats-picture">
              <img  src={student} alt="" />
            </div>
          </div>
          <div className="statistics">
            <div className="info">
              <p>{teachers.length}</p>
              <p>Total Teachers</p>
            </div>
            <div className="stats-picture">
              <img  src={student} alt="" />
            </div>
          </div>
        </div>
    </div>
  )
}

export default AdminDashboard