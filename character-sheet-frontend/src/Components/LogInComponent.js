import React, { useState } from 'react';
import axios from 'axios';

const LogInComponent = () => {
    const [userData, setUserData] = useState({
      username: '',
      email: '',
      password: ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      const { username, email, password } = userData;
      axios.post('http://localhost:5042/api/User', { username, email, password })
        .then((response) => {
          console.log('Account created successfully:', response.data);
          setUserData({
            username: '',
            email: '',
            password: ''
          });
        })
        .catch((error) => {
          console.error('Error creating account:', error);
        });
    }  

const handleChange = (e) => {
  const { name, value } = e.target;
  setUserData({
    ...userData,
    [name]: value
  });
};


  return (
    <div>
      <h2 class="centre-content">Log In:</h2>
      <form class="display-vertical" onSubmit={handleSubmit}>
        <div>
          <label>Username: </label>
          <input class="transparent50"
            type="text"
            name="username"
            value={userData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password: </label>
          <input class="transparent50"
            type="text"
            name="password"
            value={userData.password}
            onChange={handleChange}
            required
          />
        </div>
      </form>
    </div>
  );
}

export default LogInComponent;