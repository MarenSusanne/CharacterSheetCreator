import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const LogInComponent = () => {
  const [userData, setUserData] = useState({
    username: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState(''); // State for error message
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = userData;

    axios.post('http://localhost:5042/api/User/login', { username, password })
      .then((response) => {
        console.log('Logged in successfully:', response.data);
        navigate('/home'); // Redirect to the home page on successful login
      })
      .catch((error) => {
        console.error('Error logging in:', error);
        setErrorMessage('Invalid username or password. Please try again.'); // Set error message
      });
  };

  const handleRegisterClick = () => {
    navigate('/register'); // Redirect to the register page
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
    setErrorMessage(''); // Clear error message on input change
  };


  return (
    <div>
      <h2 className="centre-content">
        Log In
      </h2>
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
        <button type="submit">
          Log In
        </button>
        <button onClick={handleRegisterClick}>
          Register new account
        </button>
      </form>
      {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Display error message */}
    </div>
  );
};

export default LogInComponent;
