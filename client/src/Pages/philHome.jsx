// Home.js
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import { checkAndRenewToken } from '../utilities/checkToken';
import axios from 'axios'
import Loading from '../components/Loading';
import UserModal from '../components/userModal';

function TopNavBar() {
  return (
    <div className="top-navbar">
      <div className="logo">Student Name?</div>
      <div className="spacer"></div>
      <div className="settings">Settings</div>
    </div>
  );
}


function SideNavBar() {
  const navigate = useNavigate(); // Hook for navigation

  const handleLogout = () => {
    // Navigate to the login page when logout button is clicked
    navigate('/login');
  };

  return (
    <div className="side-navbar">
      <div className="course-title">Course 5</div>
      <ul>
        <li>Cards</li>
        <li>Vocab</li>
        <li>Videos</li>
      </ul>
      <button className="logout" onClick={handleLogout}>Logout</button>
    </div>
  );
}

function NewHome() {
  const navigate = useNavigate();
  const { currentUser, setIsLoggedIn, setCurrentUser } = useContext(AuthContext);
  const avatar = currentUser.profilePicture;
  const [userRole, setUserRole] = useState(currentUser.role)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const logout = () => {
    console.log("logged out")
    setIsLoggedIn(false);
    setCurrentUser(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('currentUser')
    console.log('Logged out successfully!')
  };
  console.log(userRole);

  const[showToken, setShowToken] = useState('')
  const test = async () => {
    await checkAndRenewToken();
    const accessToken = localStorage.getItem('accessToken');
    try {
      const res = await axios.get('http://localhost:3000/test', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      console.log(res.data)
      setShowToken(accessToken)
    } catch (error) {
      console.error(error);
    }
  };

  const newCohort = async () => {
    navigate("/newCohort");
  }
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  

  console.log(localStorage.getItem("accessToken"))


  return (
    <>
      <h1>
        {currentUser ? `Welcome, ${currentUser.username}` : 'Welcome'}
        {avatar == '' || avatar == null ? "" : <img  width={100} height={100} src={avatar}/>}
      </h1>
      <h3>Role: {currentUser.role}</h3>
      <button className='log-out-btn' onClick={logout}> log out</button>
      <button onClick={test}>test</button>
      <button onClick={newCohort}>New Cohort</button>
      <h3>accessToken: {showToken}</h3>
      <TopNavBar />
      <SideNavBar />
      <div>
      <button onClick={openModal}>Open User List Modal</button>
      <UserModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
    </>
  );
}

export default NewHome;