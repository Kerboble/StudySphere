// Registration.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import defaultProfilePicture from "../img/user(1).png"
import BigSphere from "../img/globe(1).png"

const Registration = () => {
  // State variables to store form data and profile picture
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    profilePicture:''
  });

  // State variable to store profile picture preview
  const [avatar, setAvatar] = useState('');

  // Navigate hook from react-router-dom
  const navigate = useNavigate();

  // Destructuring form data for easier access
  const { username, email, phoneNumber, password, confirmPassword, profilePicture } = formData;

  // Function to handle input changes
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to handle file input change (for profile picture)
  const onFileChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      setFormData({ ...formData, profilePicture: reader.result });
      setAvatar(reader.result)
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  // Function to handle form submission
  const onSubmit = async e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.error('Passwords do not match');
    } else {
      try {
        // Making a POST request to register the user
        const res = await axios.post('http://localhost:4000/register', { username, email, phoneNumber, password, profilePicture });
        console.log(res.data); // Handle successful registration
        navigate("/login"); // Redirect to login page after successful registration
      } catch (err) {
        console.error('Registration error:', err.response.data);
      }
    }
  };

  // Rendering the registration form
  return (
    <div className='register-container'>
      {/* Left side content with app title and big sphere image */}
      <div className='centeredContentLeft'> 
        <span className='app-title'> Study Sphere</span>
        <img src={BigSphere} alt="Sphere" className='big-sphere'/> 
      </div>
      {/* Right side content with registration form */}
      <div className='formContainer'>
        <div className='formWrapper'>
          {/* Register form */}
          <span className='logo'>Register</span>
          <form onSubmit={e => onSubmit(e)}>
            {/* Input fields for user information */}
            <div className="inputWrapper">
              <input type="text" id="userName" name="username" value={username} onChange={e => onChange(e)} required  placeholder='Username'/>
            </div>
            <div className="inputWrapper">
              <input type="email" id="email" name="email" value={email} onChange={e => onChange(e)} required placeholder='Email'/>
            </div>
            <div className="inputWrapper">
              <input type="tel" id="phoneNumber" name="phoneNumber" value={phoneNumber} onChange={e => onChange(e)} required placeholder='Phone Number'/>
            </div>
            <div className="inputWrapper">
              <input type="password" id="password" name="password" value={password} onChange={e => onChange(e)} minLength='6' required placeholder='Password'/>
            </div>
            <div className="inputWrapper">
              <input type="password" id="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={e => onChange(e)} minLength='6' required placeholder='Confirm Password'/>
            </div>
            {/* File input for profile picture */}
            <div className='avatar-container'>
              <label htmlFor='file' className='avatar-input'>
                {/* Displaying the selected avatar image */}
                {avatar == '' || avatar == null ? <img  className="selected-avatar-image" width={100} height={100} src={defaultProfilePicture}/> : <img  className="selected-avatar-image" width={100} height={100} src={avatar}/>}
                <input
                  type="file"
                  id="file"
                  name="profilePicture"
                  onChange={onFileChange}
                  style={{ display: 'none', cursor: 'pointer' }}
                />
              </label>
            </div>
            {/* Register button */}
            <button type='submit'>Register</button>
            {/* Already have an account link */}
            <p>
              Already have an account? {' '}
              <button onClick={() => navigate("/login")}>Login</button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;

