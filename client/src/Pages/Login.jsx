import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../authContext';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const { setCurrentUser } = useContext(AuthContext); // Use the AuthContext here

  const { username, password } = formData;
  const navigate = useNavigate();

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4000/login', { username, password });
      const { accessToken, refreshToken, user } = res.data;
      // Store access token in localStorage
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      setCurrentUser(user); // Set the currentUser using the context
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
      <button type='submit'>Login</button>
    </form>
  );
};

export default Login;
