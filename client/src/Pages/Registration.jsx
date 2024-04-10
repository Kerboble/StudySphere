// // Registration.js
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Registration = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     password: '',
//     confirmPassword: ''
//   });

//   const navigate = useNavigate();

//   const { username, password, confirmPassword } = formData;

//   const onChange = e =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const onSubmit = async e => {
//     e.preventDefault();
//     if (password !== confirmPassword) {
//       console.error('Passwords do not match');
//     } else {
//       try {
//         const res = await axios.post('http://localhost:3000/register', { username, password });
//         console.log(res.data); // Handle successful registration
//         navigate("/login"); // Redirect to login page after successful registration
//       } catch (err) {
//         console.error('Registration error:', err.response.data);
//       }
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
//       <input
//         type='password'
//         placeholder='Confirm Password'
//         name='confirmPassword'
//         value={confirmPassword}
//         onChange={e => onChange(e)}
//         minLength='6'
//         required
//       />
//       <button type='submit'>Register</button>
//     </form>
//   );
// };

// export default Registration;






// Registration.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sphere from "../img/icons8-sphere-50.png"
import Add from "../img/icons8-image-50.png"
import SphereComponent from '../components/SideSphere.jsx';

const Registration = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  });

  console.log("registration")
  const navigate = useNavigate();

  const { firstName, lastName, email, phoneNumber, password, confirmPassword } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.error('Passwords do not match');
    } else {
      try {
        const res = await axios.post('http://localhost:3000/register', { firstName, lastName, email, phoneNumber, password });
        console.log(res.data); // Handle successful registration
        navigate("/login"); // Redirect to login page after successful registration
      } catch (err) {
        console.error('Registration error:', err.response.data);
      }
    }
  };

  return (
    <div>
      <SphereComponent/>

      <div className='formContainer'>
        <div className='formWrapper'>
          <img src={Sphere} alt="Sphere"/> 
          <span className='logo'>Register</span>
          <form onSubmit={e => onSubmit(e)}>
            <div className="inputWrapper">
              <label htmlFor="firstName">Username</label>
              <input type="text" id="firstName" name="Username" value={firstName} onChange={e => onChange(e)} required />
            </div>
            <div className="inputWrapper">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" name="email" value={email} onChange={e => onChange(e)}  required />
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
            <input style={{display:"none"}} type="file" id="file"/>
              <label htmlFor='file' className='avatarInput'> 
               <span>Avatar</span>
                <img src={Add} alt='Add avatar' />  
                <input type='file' id='file' style={{ display: 'none' }} />
              </label>
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

