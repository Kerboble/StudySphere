// // Login.js
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     password: '',
//   });

//   const { username, password } = formData;
//   const navigate = useNavigate();

//   const onChange = e =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const onSubmit = async e => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('http://localhost:3000/login', { username, password });
//       console.log(res.data); // Handle successful login
//       navigate("/home"); // Redirect to home page after successful login
//     } catch (err) {
//       console.error('Login error:', err.response.data);
//     }
//   };

//   return (
//     <form onSubmit={e => onSubmit(e)}>
//       <input
//         type='text'
//         placeholder='Username'
//         name='username'
//         value={username}
//         onChange={e => onChange(e)}
//         required
//       />
//       <input
//         type='password'
//         placeholder='Password'
//         name='password'
//         value={password}
//         onChange={e => onChange(e)}
//         minLength='6'
//         required
//       />
//       <button type='submit'>Login</button>
//     </form>
//   );
// };

// export default Login;



import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SphereComponent from '../components/SideSphere.jsx';
import Sphere from "../img/icons8-sphere-50.png"

const Login = (props) => {
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
      navigate("/"); // Redirect to home page after successful login
    } catch (err) {
      console.error('Login error:', err.response.data);
    }
  };

  return (
    <div>
      <SphereComponent/>
      <div className='formContainer'>
        <div className='formWrapper'>
          <img src={Sphere} alt="Sphere"/> 
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
          <button onClick={() => navigate("/")}>Sign up here</button> 
            <button>Forgot password</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;