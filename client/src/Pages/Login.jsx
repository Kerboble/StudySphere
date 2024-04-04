// Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const { username, password } = formData;
  const navigate = useNavigate();

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/login', { username, password });
      console.log(res.data); // Handle successful login
      navigate("/home"); // Redirect to home page after successful login
    } catch (err) {
      console.error('Login error:', err.response.data);
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
      <button className="submit" type='submit'>Login</button>
    </form>
  );
};

export default Login;
