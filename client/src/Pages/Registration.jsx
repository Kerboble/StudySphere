// Registration.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    refreshToken: ''
  });

  console.log("registration")
  const navigate = useNavigate();

  const { username, password, confirmPassword, refreshToken} = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.error('Passwords do not match');
    } else {
      try {
        const res = await axios.post('http://localhost:4000/register', { username, password, refreshToken});
        console.log(res.data); // Handle successful registration
        navigate("/login"); // Redirect to login page after successful registration
      } catch (err) {
        console.error('Registration error:', err.response.data);
      }
    }
  };

  return (
    <form onSubmit={e => onSubmit(e)}>
      <input
        type='text'
        placeholder='Username'
        name='username'
        value={username}
        onChange={e => onChange(e)}
        required
      />
      <input
        type='password'
        placeholder='Password'
        name='password'
        value={password}
        onChange={e => onChange(e)}
        minLength='6'
        required
      />
      <input
        type='password'
        placeholder='Confirm Password'
        name='confirmPassword'
        value={confirmPassword}
        onChange={e => onChange(e)}
        minLength='6'
        required
      />
      <button type='submit'>Register</button>
    </form>
  );
};

export default Registration;
