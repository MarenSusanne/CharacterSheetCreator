import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterComponent = () => {
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    email: '' // Add any other required fields here
  });
  const [errorMessage, setErrorMessage] = useState(''); // State for error message
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    const { username, password, email } = userData;

    axios.post('http://localhost:5042/api/User/Create', { username, password, email }) // Ensure this matches your API
      .then((response) => {
        console.log('Registered successfully:', response.data);
        navigate('/login'); // Redirect to login after successful registration
      })
      .catch((error) => {
        console.error('Error registering:', error);
        setErrorMessage('Registration failed. Please try again.'); // Set error message
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
    setErrorMessage(''); // Clear error message on input change
  };

  const handleLoginClick = () => {
    navigate('/login'); 
  };

  return (
    <div>
      <h2 className="centre-content">Register</h2>
      <form className="display-vertical" onSubmit={handleSubmit}>
        <div>
          <label>Username: </label>
          <input
            className="transparent50"
            type="text"
            name="username"
            value={userData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email: </label>
          <input
            className="transparent50"
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            className="transparent50"
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button type="submit">Register</button>
          <button onClick={handleLoginClick}>Log in</button>
        </div>
      </form>
      {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Display error message */}
    </div>
  );
};

export default RegisterComponent;
