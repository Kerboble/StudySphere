import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import defaultProfilePicture from "../img/user(1).png";
import BigSphere from "../img/globe(1).png";
import PasswordStrengthBar from 'react-password-strength-bar'; // Import PasswordStrengthBar component
import thumbsUp from "../img/dislike(2).png"
import thumbsDown from "../img/dislike(1).png"

const Registration = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    profilePicture: null // Initialize profilePicture as null
  });

  const [avatar, setAvatar] = useState('');
  const [userAvailability, setUserAvailability] = useState(null);
  const [showPasswordStrength, setShowPasswordStrength] = useState(false);
  const navigate = useNavigate();
  const { username, email, phoneNumber, password, confirmPassword, profilePicture } = formData;

  const passwordStrengthStyle = {
    color:"#023E8A",
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
    };
  };

  const onFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, profilePicture: file }); // Set the file itself in formData
    const reader = new FileReader();
    reader.onload = () => {
      setAvatar(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.error('Passwords do not match');
      return; // Add return statement to prevent further execution
    }

    const formDataToSend = new FormData(); // Create FormData object
    formDataToSend.append('username', username);
    formDataToSend.append('email', email);
    formDataToSend.append('phoneNumber', phoneNumber);
    formDataToSend.append('password', password);
    formDataToSend.append('profilePicture', profilePicture);

    try {
      const res = await axios.post('http://localhost:4000/register', formDataToSend);
      navigate("/login");
    } catch (err) {
      console.error('Registration error:', err.response ? err.response.data : err.message); // Display error message
    }
  };

  const checkUsernameAvailability = async () => {
    try {
      const res =  await axios.post('http://localhost:4000/checkUsername', { username });
      setUserAvailability(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (username === '') {
      setUserAvailability(null);
    } else {
      checkUsernameAvailability();
    }
  }, [username]);

  return (
    <div className='register-container'>
      <div className='centeredContentLeft'> 
        <span className='app-title'> Study Sphere</span>
        <img src={BigSphere} alt="Sphere" className='big-sphere'/> 
      </div>
      <div className='formContainer'>
        <div className='formWrapper'>
          <span className='form-message'>Register</span>
          <form onSubmit={onSubmit}>
            <div className="inputWrapper username-wrapper">
              <input type="text" id="userName" name="username" value={username} onChange={onChange} required  placeholder='Username'/>
              {userAvailability === true && <img className="thumbs-up" src={thumbsUp}/>}
              {userAvailability === false && <img className="thumbs-down" src={thumbsDown}/>}
            </div>
            <div className="inputWrapper username-wrapper">
              <input type="email" id="email" name="email" value={email} onChange={onChange} required placeholder='Email'/>
            </div>
            <div className="inputWrapper">
              <input type="tel" id="phoneNumber" name="phoneNumber" value={phoneNumber} onChange={onChange} required placeholder='Phone Number'/>
            </div>
            <div className="inputWrapper">
              <input type="password" id="password" name="password" value={password} onChange={onChange} minLength='6' required placeholder='Password'/>
            </div>
            {showPasswordStrength && <PasswordStrengthBar 
              password={password} 
              scoreWordStyle={passwordStrengthStyle}
            />}
            <div className="inputWrapper">
              <input type="password" id="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={onChange} minLength='6' required placeholder='Confirm Password'/>
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
