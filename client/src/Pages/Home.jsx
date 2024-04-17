// Home.js
import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/authContext';
import { checkAndRenewToken } from '../utilities/checkToken';
import axios from 'axios'
import Loading from '../components/Loading';
import Navbar from '../components/Navbar';
import AdminNavBar from '../components/AdminNavbar';
import AdminDashboard from '../components/AdminDashboard';

function Home() {
  const { currentUser, setIsLoggedIn, setCurrentUser } = useContext(AuthContext);
  const [userRole, setUserRole] = useState(currentUser.role)


  const logout = () => {
    console.log("logged out")
    setIsLoggedIn(false);
    setCurrentUser(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('currentUser')
  };

  return (
    <div className="home-container">
       <div className='home'>
        {userRole === 'SuperAdmin' ? <AdminNavBar /> : null}
       <div className="home-body">
        <Navbar />
        {userRole === 'SuperAdmin' ? <AdminDashboard /> : null}
       </div>
      </div>
    </div>
  );
}

export default Home;

const passwordStrengthStyle = {
  color:"blue",
  fontFamily:"arial",
  fontWeight:"bold",
  fontSize:"20px"
}