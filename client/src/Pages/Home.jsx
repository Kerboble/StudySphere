import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/authContext';
import axios from 'axios';
import Loading from '../components/Loading';
import Navbar from '../components/Navbar';
import AdminNavBar from '../components/AdminNavbar';
import { Outlet } from 'react-router-dom';

function Home() {
  const { currentUser, setIsLoggedIn, setCurrentUser } = useContext(AuthContext);
  const [userRole, setUserRole] = useState(currentUser.role);
  const [users, setUsers] = useState('');
  const [refreshData, setRefreshData] = useState(0);
  const [cohorts, setCohorts] = useState([]);

  console.log(cohorts);

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

  const resetTheData = () => {
    setRefreshData(refreshData + 1);
  };

  console.log(refreshData);

  return (
    <div className="home-container">
      {userRole === "SuperAdmin" && (
        <div className='home'>
          {userRole === 'SuperAdmin' ? <AdminNavBar /> : null}
          <div className="home-body">
            <Navbar />
            {userRole === 'SuperAdmin' && (
              <button onClick={resetTheData} type="button" className="btn btn-primary" style={{borderRadius:"0px", backgroundColor:"#0077B6", border:"none"}}>Refresh Data</button>
            )}
            <Outlet context={[users, refreshData, cohorts]} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
