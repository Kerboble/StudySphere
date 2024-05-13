import {React, useContext, useEffect, useState} from 'react'
import { AuthContext } from '../context/authContext'
import bell from "../img/bell.png"
import axios from 'axios'
import { StudentContext } from '../context/studentContext';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const {currentUser } = useContext(AuthContext)
    const{setStudent} = useContext(StudentContext);
    const Navigate = useNavigate();
    const [navDisplay, setNavDisplay] = useState();

    const goToProfile = async (id) => {
      try {
          const res = await axios.get("http://localhost:4000/get-user", {
              params: {
                  id: id
              }
          });
          setStudent(res.data);
          localStorage.setItem('student', JSON.stringify(res.data));
          Navigate('../home/studentprofile');
      } catch (error) {
          // Handle errors
          console.error(error);
      }
  }

  useEffect(() => {
    console.log('user updated')
  }, [currentUser])


  return (
    <nav className='top-navbar'>
        <input type="text" placeholder='search here....' />
        <div className='nav-user-info'>
        <img className='notification-icon' src={bell} alt="" />
          <img style={{cursor:"pointer"}} onClick={() => goToProfile(currentUser._id)} className='profile-photo' src={currentUser.profilePicture} alt="" />
          <div className='user-info'>
            <p><strong>{currentUser.username}</strong></p>
            <p style={{fontSize:"10px", color:"gray"}}>{currentUser.role}</p>
          </div>
        </div>
    </nav>
  )
};

export default Navbar