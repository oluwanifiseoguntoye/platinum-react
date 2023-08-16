import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import "../styles/password.css"

function Password() {
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  localStorage.setItem('authenticated', 'false')

  const handlePasswordSubmit = (event) => {
    event.preventDefault();
    if (password === '50s') {
      localStorage.setItem('authenticated', 'true');
      console.log('Authentication:', localStorage.getItem('authenticated'));
      navigate('/home');
    } else {
      setErrorMessage('Incorrect password. Please try again.');
    }
  };

  return (
    <div className="fullContainer">
      <div className="container">
        <img className="logo" alt="Animated Logo" src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExc2g3bG5ydHVqdDlwbnU4cHc3cnRqOTRra2R5a3k1ajZpZmFwb21oNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/TXcH2jcXNYcKVqjxqr/giphy.gif"></img>
        <h2>enter store using password</h2>
        {errorMessage && <p className="error">{errorMessage}</p>}
      </div>
      <form onSubmit={handlePasswordSubmit}>
        <div className="inputBox">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="submitButton" style={{ textTransform: "uppercase" }} type="submit">enter</button>
        </div>
      </form>
      <div>
        <Link to={'/admin/login'} style={{ textDecoration: 'none' }}>
            <p style={{ color: 'red' }}> if your name is Nifise, click here</p>
        </Link>
      </div>
    </div>
  );
}

export default Password;