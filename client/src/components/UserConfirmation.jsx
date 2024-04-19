import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function EmailConfirmation() {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.post(`http://localhost:4000/confirmation`, { token })
      .then(res => {
        console.log(res.data); // Handle successful confirmation
        navigate('/login');
      })
      .catch(error => {
        console.error(error); // Handle errors, such as invalid or expired token
      });
  }, [token]);

  return (
    <div>
      Confirming your email...
    </div>
  );
}

export default EmailConfirmation;
