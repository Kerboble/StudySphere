// Home.js
import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/authContext';
import { checkAndRenewToken } from '../utilities/checkToken';
import axios from 'axios'
import Loading from '../components/Loading';
import UserModal from '../components/userModal';


function Home() {
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
  };
  console.log(userRole)

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
      <h3>accessToken: {showToken}</h3>

      <div>
      <button onClick={openModal}>Open User List Modal</button>
      <UserModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
    </>
  );
}

export default Home;

const passwordStrengthStyle = {
  color:"blue",
  fontFamily:"arial",
  fontWeight:"bold",
  fontSize:"20px"
}