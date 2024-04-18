// Home.js
import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/authContext';
import { checkAndRenewToken } from '../utilities/checkToken';
import axios from 'axios'
import Loading from '../components/Loading';
import Navbar from '../components/Navbar';
import AdminNavBar from '../components/AdminNavbar';
import { Outlet } from 'react-router-dom';

function Home() {
  const { currentUser, setIsLoggedIn, setCurrentUser } = useContext(AuthContext);
  const [userRole, setUserRole] = useState(currentUser.role)
  const [users, setUsers] = useState('');



  useEffect(() => {
    // Function to fetch data
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:4000/users");
        setUsers(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    // Fetch data initially
    fetchData();

    // Set interval to fetch data every 20 seconds
    const intervalId = setInterval(fetchData, 20000000);

    // Cleanup function to clear interval
    return () => clearInterval(intervalId);
  }, []);


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
          <Outlet context={users} />
        </div>
      </div>
    </div>
  );
}

export default Home;

