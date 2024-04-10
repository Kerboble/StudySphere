
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
    confirmPassword: ''
  });

  const [avatar, setAvatar] = useState('');


  console.log("registration")
  const navigate = useNavigate();

  const { username, email, phoneNumber, password, confirmPassword } = formData;
  

  const onChange = (e) => {
    if (e.target.name === 'file') {
      setFormData({ ...formData, avatarPic: e.target.files[0] });
      setAvatar(e.target.files[0].name);
      console.log(formData.avatarPic)
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  
    

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.error('Passwords do not match');
    } else {
      try {
        const res = await axios.post('http://localhost:4000/register', { username, email, phoneNumber, password });
        console.log(res.data); // Handle successful registration
        navigate("/login"); // Redirect to login page after successful registration
      } catch (err) {
        console.error('Registration error:', err.response.data);
      }
    }
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
            <input
              type="file"
              id="file"
              onChange={(e) => {
                setAvatar(e.target.files[0].name);
                // Add any other file handling logic here
              }}
              style={{ display: 'none', cursor: 'pointer' }}
            />
            <label htmlFor='file' className='avatarInput'>
              <img src={Add} alt='Add avatar' className='avatar-logo' />
              <input type='file' id='avatarPic' style={{ display: 'none', cursor: 'pointer' }} name="avatarPic" onClick={e => onChange(e)}/>
            </label>
            {avatar && <p>Selected file: {avatar}</p>}
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

