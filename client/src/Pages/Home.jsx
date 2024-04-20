// Home.js
import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/authContext';
import axios from 'axios'
import Loading from '../components/Loading';
import Navbar from '../components/Navbar';
import AdminNavBar from '../components/AdminNavbar';
import { Outlet } from 'react-router-dom';

function Home() {
  const { currentUser, setIsLoggedIn, setCurrentUser } = useContext(AuthContext);
  const [userRole, setUserRole] = useState(currentUser.role)
  const [users, setUsers] = useState('');
  const [refreshData, setRefreshData] = useState(0)
  const [cohorts, setCohorts] = useState([]);

  console.log(cohorts)

  useEffect(() => {
    // Function to fetch data
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:4000/cohorts");
        setCohorts(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    // Fetch data initially
    fetchData();
  }, [refreshData]);



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
  }, [refreshData]);
  
  
const resetTheData = () => {
  setRefreshData(refreshData + 1)
}

  console.log(refreshData)


  return (
    <div className="home-container">
      <div className='home'>
        {userRole === 'SuperAdmin' ? <AdminNavBar /> : null}
        <div className="home-body">
          <Navbar />
          <button onClick={resetTheData} type="button" className="btn btn-primary">Refresh Data</button>
          <Outlet context={[users, refreshData, cohorts]} />
        </div>
      </div>
    </div>
  );
}

export default Home;

