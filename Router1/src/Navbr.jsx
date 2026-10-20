import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';


const Navbr = () => {
  const location = useLocation();


  const getActiveClass = (path) => {
    return location.pathname === path ? 'active' : '';
  };
  return (
    <nav className="Navclass" aria-label="Main navigation">
      <ul>
        <li><Link to="/firstpage" className={getActiveClass('/firstpage')}>First</Link></li>
        <li><Link to="/secondpage" className={getActiveClass('/secondpage')}>Second</Link></li>
        <li><Link to="/thirdpage" className={getActiveClass('/thirdpage')}>Third</Link></li>
        <li><Link to="/fourthpage" className={getActiveClass('/fourthpage')}>Fourth</Link></li>
      </ul>
    </nav>
  );
};


export default Navbr;


