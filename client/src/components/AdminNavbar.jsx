import {React, useContext, useState} from 'react'
import { AuthContext } from '../context/authContext';
import logo from "../img/globe(1).png"
import logoutIcon from "../img/right-arrow.png"
import dashboard from "../img/dashboards(1).png"
import dashboard2 from "../img/dashboards(2).png"
import student from "../img/graduation.png"
import teachers from "../img/seminar.png"
import cohort from "../img/multiple-users-silhouette.png"
import { NavLink } from 'react-router-dom';


function AdminNavBar() {

  const {setCurrentUser, setIsLoggedIn} = useContext(AuthContext)
  const [active, setActive] =useState(false)
  

  const logout = () => {
    console.log("logged out")
    setIsLoggedIn(false);
    setCurrentUser(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('currentUser')
  };

  const activeStyles = {
    fontWeight: "bold",
    textDecoration: "none",
    color: "#023e8a",
    backgroundColor: "rgba(255, 255, 255, 0.555)",
    height: "45px",
    borderRadius: "9px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center", 
    marginTop: "50px",
    padding: "20px"
  };
  
  const unActiveStyles = {
    fontWeight: "bold",
    textDecoration: "none",
    color: "white",
    height: "45px",
    borderRadius: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center", 
    marginTop: "50px",
    padding: "20px"
  };



  return (
    <nav className='side-navbar'>
      <div className='company'>
          <img style={{height:"50px", width:"50px"}} className='logo' src={logo} alt="" />
      </div>
       <div className='dashboard'>
          <NavLink
          to={"admindashboard"}  
          style={({ isActive }) => isActive ? activeStyles : unActiveStyles}> 
          <img src={dashboard} alt="" />
          Dashboard
          </NavLink>
       </div>
       <div className="instructors">
          <NavLink to={"adminsteachers"} style={({ isActive }) => isActive ? activeStyles : unActiveStyles}> <img src={teachers} alt="" />Teachers</NavLink>
       </div>
       <div className="student">
          <NavLink to={"adminstudents"}  style={({ isActive }) => isActive ? activeStyles : unActiveStyles}> <img src={student} alt="" />Students</NavLink>
       </div>
       <div className="cohorts">
          <NavLink to={"admincohorts"} style={({ isActive }) => isActive ? activeStyles : unActiveStyles}> <img src={cohort} alt="" />Cohorts</NavLink>
       </div>
       <button className='logout-btn' onClick={() => logout()}> <img src={logoutIcon} alt="" />Logout</button>
    </nav>
  )
};

export default AdminNavBar