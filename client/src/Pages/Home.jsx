import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/authContext';
import axios from 'axios';
import Loading from '../components/Loading';
import Navbar from '../components/Navbar';
import AdminNavBar from '../components/AdminNavbar';
import { Outlet } from 'react-router-dom';
import UserNavbar from '../components/UserNavbar';

function Home() {
  const { currentUser, setIsLoggedIn, setCurrentUser } = useContext(AuthContext);
  const [userRole, setUserRole] = useState(currentUser.role);
  const [users, setUsers] = useState('');
  const [refreshData, setRefreshData] = useState(0);
  const [cohorts, setCohorts] = useState([]);

  console.log(refreshData);

  
  useEffect(() => {
    // Fetch cohorts data
    const fetchCohorts = async () => {
      try {
        const res = await axios.get("http://localhost:4000/cohorts");
        setCohorts(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCohorts();
  }, [refreshData]);

  useEffect(() => {
    // Fetch users data
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:4000/users");
        setUsers(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, [refreshData]);

  console.log(currentUser.role)

  return (
    <div className="home-container">
      <div className='home'>
        {currentUser.role == "SuperAdmin" && <AdminNavBar />}
        {currentUser.role === "student"  && <UserNavbar />}
        <div className="home-body">
          <Navbar />
          <Outlet context={[users, setRefreshData, cohorts]} />
        </div>
      </div>
    </div>
  );
  
}

export default Home;
