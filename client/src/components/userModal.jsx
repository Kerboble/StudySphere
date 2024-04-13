import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserModal({ isOpen, onClose }) {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:4000/users');
        console.log(response.data)
        setUsers(response.data);
      } catch (error) {
        setError(error); // Set error state if an error occurs
      } finally {
        setIsLoading(false);
      }
    };

    if (isOpen) {
      fetchUsers();
    }
  }, [isOpen]);


  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>User List</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error fetching users: {error.message}</p> // Display error message
        ) : (
          <ul>
            {users.map(user => (
              <li key={user.id}>
                {user.username} - {user.email} - role: {user.role}{/* Example fields, adjust as per your user schema */}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default UserModal;
