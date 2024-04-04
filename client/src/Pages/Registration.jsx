// Registration.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();

  const { username, password, confirmPassword } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.error('Passwords do not match');
    } else {
      try {
        const res = await axios.post('http://localhost:3000/register', { username, password });
        console.log(res.data); // Handle successful registration
        navigate("/login"); // Redirect to login page after successful registration
      } catch (err) {
        console.error('Registration error:', err.response.data);
      }
    }
  };

  return (
    <form className="login" onSubmit={e => onSubmit(e)}>
      <input 
        className='setup'
        type='text'
        placeholder='Username'
        name='username'
        value={username}
        onChange={e => onChange(e)}
        required
      />
      {/* <div className=''>
        Password
      </div> */}
      <input
        className='setup'
        type='password'
        placeholder='Password'
        name='password'
        value={password}
        onChange={e => onChange(e)}
        minLength='6'
        required
      />
      <input
        className='setup'
        type='password'
        placeholder='Confirm Password'
        name='confirmPassword'
        value={confirmPassword}
        onChange={e => onChange(e)}
        minLength='6'
        required
      />
      <button className="submit" type='submit'>Register</button>
    </form>
  );
};

export default Registration;
