// Home.js
import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/authContext';
import { checkAndRenewToken } from '../utilities/checkToken';
import axios from 'axios'


function Home() {
  const { currentUser, setIsLoggedIn, setCurrentUser } = useContext(AuthContext);
  const avatar = currentUser.profilePicture;

  const logout = () => {
    console.log("logged out")
    setIsLoggedIn(false);
    setCurrentUser(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('currentUser')
  };

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
      setShowToken(accessToken)
    } catch (error) {
      console.error(error);
    }
  };

  console.log(localStorage.getItem("accessToken"))


  return (
    <>
      <h1>
        {currentUser ? `Welcome, ${currentUser.username}` : 'Welcome'}
        {avatar == '' || avatar == null ? "" : <img  width={100} height={100} src={avatar}/>}
      </h1>
      <button className='log-out-btn' onClick={logout}> log out</button>
      <button onClick={test}>test</button>
      <h3>accessToken: {showToken}</h3>
    </>
  );
}

export default Home;
