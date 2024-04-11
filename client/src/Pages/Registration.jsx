
// Registration.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sphere from "../img/globe.png"
import Add from "../img/gallery (1).png"
import SphereComponent from '../components/SideSphere.jsx';

const Registration = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    profilePicture:''
  });

  console.log(formData.profilePicture)
  const [avatar, setAvatar] = useState('');


  console.log("registration")
  const navigate = useNavigate();

  const { username, email, phoneNumber, password, confirmPassword, profilePicture } = formData;
  

  const onChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
    

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.error('Passwords do not match');
    } else {
      try {
        const res = await axios.post('http://localhost:4000/register', { username, email, phoneNumber, password, profilePicture });
        console.log(res.data); // Handle successful registration
        navigate("/login"); // Redirect to login page after successful registration
      } catch (err) {
        console.error('Registration error:', err.response.data);
      }
    }
  };

  const onFileChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      setFormData({ ...formData, profilePicture: reader.result });
      setAvatar(reader.result)
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div className='register-container'>
      <SphereComponent />
  
      <div className='formContainer'>
        <div className='formWrapper'>
          <img src={Sphere} alt="Sphere" className='register-logo'/>
          <span className='logo'>Register</span>
          <form onSubmit={e => onSubmit(e)}>
            <div className="inputWrapper">
              <label htmlFor="firstName">Username</label>
              <input type="text" id="userName" name="username" value={username} onChange={e => onChange(e)} required />
            </div>
            <div className="inputWrapper">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" name="email" value={email} onChange={e => onChange(e)} required />
            </div>
            <div className="inputWrapper">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input type="tel" id="phoneNumber" name="phoneNumber" value={phoneNumber} onChange={e => onChange(e)} required />
            </div>
            <div className="inputWrapper">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" value={password} onChange={e => onChange(e)} minLength='6' required />
            </div>
            <div className="inputWrapper">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input type="password" id="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={e => onChange(e)} minLength='6' required />
            </div>
            <label htmlFor='file' className='avatarInput'>
              <img src={Add} alt='Add avatar' className='avatar-logo' />
              <input
                type="file"
                id="file"
                name="profilePicture"
                onChange={onFileChange}
                style={{ display: 'none', cursor: 'pointer' }}
              />
            </label>
            {avatar == '' || avatar == null ? "" : <img  width={100} height={100} src={avatar}/>}
            <button type='submit'>Register</button>
          </form>
          <p>
            Already have an account? {' '}
            <button onClick={() => navigate("/login")}>Login</button>
          </p>
        </div>
      </div>
    </div>
  );
  };

export default Registration;

