// Home.js
import React, { useContext } from 'react';
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

  const test = async () => {
    await checkAndRenewToken();
    const accessToken = localStorage.getItem('accessToken');
    try {
      console.log('hello');
      const res = await axios.get('http://localhost:3000/test', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };



  return (
    <>
      <h1>
        {currentUser ? `Welcome, ${currentUser.username}` : 'Welcome'}
      </h1>
      <button className='log-out-btn' onClick={logout}> log out</button>
      <button onClick={test}>test</button>
    </>
  );
}

export default Home;
