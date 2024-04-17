import {React, useContext} from 'react'
import { AuthContext } from '../context/authContext'
import bell from "../img/bell.png"

function Navbar() {
    const {currentUser } = useContext(AuthContext)

  return (
    <nav className='top-navbar'>
        <input type="text" placeholder='search here....' />
        <div className='nav-user-info'>
        <img className='notification-icon' src={bell} alt="" />
          <img className='profile-photo' src={currentUser.profilePicture} alt="" />
          <div className='user-info'>
            <p><strong>{currentUser.username}</strong></p>
            <p style={{fontSize:"10px", color:"gray"}}>{currentUser.role}</p>
          </div>
        </div>
    </nav>
  )
};

export default Navbar