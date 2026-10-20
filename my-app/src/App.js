import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import About from './About1';
import Contact from './Contact';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/Home">Home</Link> |{" "}
          <Link to="/About1">About</Link> |{" "}
          <Link to="/Contact">Contact</Link>
        </nav>
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/About1" element={<About />} />
          <Route path="/Contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;