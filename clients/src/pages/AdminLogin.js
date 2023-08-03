import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../styles/adminlogin.css"

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/admin/login', {
        username: username,
        password: password,
      });

      const token = response.data.token;

      localStorage.setItem('adminToken', token);
      console.log(token)

      navigate('/admin');
    } catch (error) {

      console.error('Error during login:', error);
    }
  };

  return (
    <div className="adminLogin">
      <div className='loginContainer'>
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <button className="adminLoginButton" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;