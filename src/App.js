import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './components/home';
import Search from './components/search';
import Faq from './components/faq';
import Program from './components/program';
import Contact from './components/contact';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/:university/:degree" element={<Program />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/search" element={<Search />} />
        <Route exact path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
