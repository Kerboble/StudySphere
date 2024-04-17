import {React, useContext} from 'react'
import { AuthContext } from '../context/authContext';
import logo from "../img/globe(2).png"
import logoutIcon from "../img/right-arrow.png"
import dashboard from "../img/dashboards(1).png"
import dashboard2 from "../img/dashboards(2).png"
import student from "../img/graduation.png"
import teachers from "../img/seminar.png"
import cohort from "../img/multiple-users-silhouette.png"

function AdminNavBar() {

  const {setCurrentUser, setIsLoggedIn} = useContext(AuthContext)

  const logout = () => {
    console.log("logged out")
    setIsLoggedIn(false);
    setCurrentUser(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('currentUser')
  };

  return (
    <nav className='side-navbar'>
      <div className='company'>
          <img className='logo' src={logo} alt="" />
          <p>StudySphere</p>
      </div>
       <div className='dashboard'>
        <img src={dashboard} alt="" />
          <h5>Dashboard</h5>
       </div>
       <div className="instructors">
          <img src={teachers} alt="" />
          <h5>Teachers</h5>
       </div>
       <div className="student">
          <img src={student} alt="" />
          <h5>Students</h5>
       </div>
       <div className="cohorts">
            <img src={cohort} alt="" />
          <h5>Cohorts</h5>
       </div>
       <button className='logout-btn' onClick={() => logout()}> <img src={logoutIcon} alt="" />Logout</button>
    </nav>
  )
};

export default AdminNavBar