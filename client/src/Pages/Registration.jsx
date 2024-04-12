import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import defaultProfilePicture from "../img/user(1).png";
import BigSphere from "../img/globe(1).png";
import PasswordStrengthBar from 'react-password-strength-bar'; // Import PasswordStrengthBar component

const Registration = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    profilePicture: ''
  });
  const [avatar, setAvatar] = useState('');
  const [showPasswordStrength, setShowPasswordStrength] = useState(false); // State to track if password strength should be shown
  const navigate = useNavigate();
  const { username, email, phoneNumber, password, confirmPassword, profilePicture } = formData;

  const passwordStrengthStyle = {
    color:"blue",
    fontFamily:"arial",
    fontWeight:"bold",
    fontSize:"20px"
  }

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === 'password' && e.target.value.trim() !== '') {
      setShowPasswordStrength(true);
    } else {
      setShowPasswordStrength(false);
    }
  };

  const onFileChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      setFormData({ ...formData, profilePicture: reader.result });
      setAvatar(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.error('Passwords do not match');
    } else {
      try {
        const res = await axios.post('http://localhost:4000/register', { username, email, phoneNumber, password, profilePicture });
        console.log(res.data);
        navigate("/login");
      } catch (err) {
        console.error('Registration error:', err.response.data);
      }
    }
  };

  return (
    <div className='register-container'>
      <div className='centeredContentLeft'> 
        <span className='app-title'> Study Sphere</span>
        <img src={BigSphere} alt="Sphere" className='big-sphere'/> 
      </div>
      <div className='formContainer'>
        <div className='formWrapper'>
          <span className='logo'>Register</span>
          <form onSubmit={e => onSubmit(e)}>
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
            {showPasswordStrength && <PasswordStrengthBar 
            password={password} 
            scoreWordStyle={passwordStrengthStyle}
            />}
            <div className="inputWrapper">
              <input type="password" id="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={e => onChange(e)} minLength='6' required placeholder='Confirm Password'/>
            </div>
            <div className='avatar-container'>
              <label htmlFor='file' className='avatar-input'>
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
            <button type='submit'>Register</button>
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
