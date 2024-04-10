
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SphereComponent from '../components/SideSphere.jsx';
import Sphere from "../img/globe.png"
import { AuthContext } from '../context/authContext';

const Login = (props) => {
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
    <div className='login-container'>
      <SphereComponent/>

      <div className='formContainer'>
        <div className='formWrapper'>
          <img src={Sphere} alt="Sphere" className='register-logo'/> 
          <span className='logo'>Welcome!</span>
          <form onSubmit={e => onSubmit(e)}>
            <div className="inputWrapper">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name='username'
                value={username}
                onChange={e => onChange(e)}
                required
              />
            </div>
            <div className="inputWrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name='password'
                value={password}
                onChange={e => onChange(e)}
                minLength='6'
                required
              />
            </div>
            <button type='submit'>Login</button>
          </form>
          <p>
          <button onClick={() => navigate("/")}>Signup here</button> 
            <button>Forgot password</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;