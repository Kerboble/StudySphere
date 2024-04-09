import React, { useContext } from 'react';
import { AuthContext } from '../../authContext';

function Home() {
  const { currentUser, setIsLoggedIn, setCurrentUser } = useContext(AuthContext);
  console.log(currentUser)

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    localStorage.setItem('accessToken', null);
    localStorage.setItem('refreshToken', null);
  };
  
  return (
    <>
    <h1>
      {currentUser ? `Welcome, ${currentUser.username}` : 'Welcome'}
    </h1>
    <button className='log-out-btn' onClick={logout}> log out</button>
    </>
  );
}

export default Home;
