import React from 'react'
import "../styles/navbarstyles.css"
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className="navbar">
        <div className="logo">
        <Link to={`/home`}>
          <img src="https://i.imgur.com/rC13KsY.png" alt="Logo"/>
        </Link>
        </div>
    </div>
  );
}

export default Navbar