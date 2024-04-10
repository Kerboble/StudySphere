// Home.js
import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/authContext';
import { checkAndRenewToken } from '../utilities/checkToken';
import axios from 'axios'

function Home() {
  const { currentUser, setIsLoggedIn, setCurrentUser } = useContext(AuthContext);
  console.log(currentUser);
  const logout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    localStorage.setItem('accessToken', null);
    localStorage.setItem('refreshToken', null);
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
      console.log(res.data);
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
      </h1>
      <button className='log-out-btn' onClick={logout}> log out</button>
      <button onClick={test}>test</button>
      <h3>accessToken: {showToken}</h3>
    </>
  );
}

export default Home;
